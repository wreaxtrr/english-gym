/* Движок: последовательная карта уроков, подбор заданий с учётом слабых мест, план тренировки, тесты. */
window.EG = window.EG || {};

EG.engine = (function () {
  const S = EG.store;
  const STAGE_ORDER = EG.stages.map((s) => s.id);
  const byId = {};
  const items = {};
  EG.topics.forEach((t) => {
    byId[t.id] = t;
    (t.items || []).forEach((it, i) => { it.id = t.id + "#" + i; it.topic = t.id; items[it.id] = it; });
  });
  // Порядок карты: по уровню, внутри уровня — как в файлах
  const units = EG.topics.slice().sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage));
  units.forEach((t, i) => { t.n = i + 1; });
  const ready = (t) => t.items && t.items.length > 0;

  const PASS = { m: 0.75, n: 16 };
  const TEST = { size: 8, need: 7 };
  const LENGTHS = {
    short: { warm: 5, practice: 8, review: 1, write: 0, minutes: "15" },
    normal: { warm: 7, practice: 10, review: 2, write: 1, minutes: "20–30" },
    long: { warm: 10, practice: 14, review: 3, write: 1, minutes: "35–45" }
  };
  const TYPE_ORDER = { choice: 0, listen: 1, gap: 2, fix: 3, rw: 4, tr: 5, write: 6 };

  function isPassed(id) { return !!S.state.passed[id]; }
  function currentTopic() {
    const st = S.state;
    if (st.current && byId[st.current] && ready(byId[st.current]) && !isPassed(st.current)) return byId[st.current];
    return units.find((t) => ready(t) && !isPassed(t.id)) || null;
  }
  function markPassed(id) {
    S.state.passed[id] = S.today();
    if (S.state.current === id) S.state.current = null;
    S.save();
  }
  function checkPass(id) {
    const t = S.state.topics[id];
    if (!t || isPassed(id)) return false;
    if (t.m >= PASS.m && t.n >= PASS.n) { markPassed(id); return true; }
    return false;
  }
  function status(id) {
    if (!ready(byId[id])) return "planned";
    if (isPassed(id)) return "passed";
    const c = currentTopic();
    return c && c.id === id ? "current" : "queued";
  }

  // Повторение: только пройденные уроки
  function reviewPool() { return units.filter((t) => ready(t) && isPassed(t.id)); }

  function dueCount(id) {
    const t = S.today();
    return (byId[id].items || []).filter((it) => { const s = S.state.items[it.id]; return s && s.n > 0 && s.d <= t; }).length;
  }
  function topicWeight(id) {
    const st = S.state.topics[id];
    const m = S.mastery(id);
    let w = Math.pow(1 - m, 1.5) * 3 + 0.08;
    const days = st && st.l ? S.today() - st.l : 7;
    w += Math.min(days / 7, 1) * 0.5;
    w += dueCount(id) * 0.25;
    if (st && m >= 0.85 && st.n >= 12) w *= 0.25; // стабильно правильно — реже
    return w;
  }

  function usable(it) {
    if (it.t === "write") return false;
    if (it.t === "listen" && !EG.tts.ok && it.o) return false;
    return true;
  }

  // k заданий темы: просроченные → новые → давно не виденные
  function pickItems(topicId, k, exclude) {
    const t = S.today();
    const list = (byId[topicId].items || []).filter((it) => usable(it) && !exclude.has(it.id));
    const scored = list.map((it) => {
      const s = S.state.items[it.id];
      let score;
      if (!s || !s.n) score = 2 + Math.random();
      else if (s.d <= t) score = 3 + (t - s.d) * 0.1 + s.w * 0.3 + Math.random() * 0.5;
      else score = 0.5 / (1 + s.b) + (t - s.l) * 0.02 + Math.random() * 0.3;
      return { it, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k).map((x) => x.it);
  }

  function weightedSample(entries, n, maxPer) {
    const out = [], used = {};
    for (let i = 0; i < n * 4 && out.length < n; i++) {
      const pool = entries.filter((e) => (used[e.id] || 0) < maxPer);
      if (!pool.length) break;
      const total = pool.reduce((a, e) => a + e.w, 0);
      let r = Math.random() * total;
      const pick = pool.find((e) => (r -= e.w) <= 0) || pool[pool.length - 1];
      used[pick.id] = (used[pick.id] || 0) + 1;
      out.push(pick.id);
    }
    return out;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function fromPool(pool, k, exclude, maxPer) {
    const out = [];
    weightedSample(pool.map((t) => ({ id: t.id, w: topicWeight(t.id) })), k, maxPer)
      .forEach((tid) => { const [it] = pickItems(tid, 1, exclude); if (it) { exclude.add(it.id); out.push(it); } });
    return out;
  }

  function nextWrite(topicId) {
    const ws = (byId[topicId].items || []).filter((it) => it.t === "write");
    if (!ws.length) return null;
    ws.sort((a, b) => ((S.state.items[a.id] || {}).n || 0) - ((S.state.items[b.id] || {}).n || 0));
    return ws[0];
  }

  function buildSession() {
    const L = LENGTHS[S.state.settings.length] || LENGTHS.normal;
    const exclude = new Set();
    const plan = [];
    const pool = reviewPool();
    const cur = currentTopic();
    if (pool.length) fromPool(pool, L.warm, exclude, 2).forEach((it) => plan.push({ sec: "warm", kind: "item", id: it.id }));
    if (cur) {
      plan.push({ sec: "theory", kind: "theory", id: cur.id });
      const main = pickItems(cur.id, L.practice, exclude);
      main.forEach((it) => exclude.add(it.id));
      main.sort((a, b) => TYPE_ORDER[a.t] - TYPE_ORDER[b.t]);
      const review = pool.length ? fromPool(pool, L.review, exclude, 1) : [];
      const practice = main.slice();
      review.forEach((it, i) => practice.splice(Math.min(practice.length, 3 + i * 4), 0, it));
      practice.forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
      if (L.write) { const w = nextWrite(cur.id); if (w) plan.push({ sec: "write", kind: "write", id: w.id }); }
    } else if (pool.length) {
      fromPool(pool, L.practice, exclude, 3).forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
    }
    plan.push({ sec: "summary", kind: "summary" });
    return newRun("daily", plan, cur ? cur.id : null);
  }

  function buildDrill(topicId, n) {
    const t = byId[topicId];
    const plan = [];
    if (!S.state.seenTheory[topicId]) plan.push({ sec: "theory", kind: "theory", id: topicId });
    pickItems(topicId, n || 10, new Set()).sort((a, b) => TYPE_ORDER[a.t] - TYPE_ORDER[b.t])
      .forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
    plan.push({ sec: "summary", kind: "summary" });
    return newRun("drill", plan, t.id);
  }

  // Тест «я это уже знаю»: TEST.size заданий разных типов, без повторов в конце
  function buildTest(topicId) {
    const list = shuffle((byId[topicId].items || []).filter(usable).slice());
    const byType = {};
    list.forEach((it) => { (byType[it.t] = byType[it.t] || []).push(it); });
    const picked = [];
    const types = Object.keys(byType);
    while (picked.length < Math.min(TEST.size, list.length)) {
      for (const ty of types) { const it = byType[ty].shift(); if (it && picked.length < TEST.size) picked.push(it); }
    }
    picked.sort((a, b) => TYPE_ORDER[a.t] - TYPE_ORDER[b.t]);
    const plan = picked.map((it) => ({ sec: "test", kind: "item", id: it.id }));
    plan.push({ sec: "summary", kind: "summary" });
    return newRun("test", plan, topicId);
  }

  function newRun(type, plan, topicId) {
    const touched = new Set(plan.filter((p) => p.id).map((p) => items[p.id] ? items[p.id].topic : p.id));
    const before = {};
    touched.forEach((id) => { before[id] = S.mastery(id); });
    S.state.cur = { type, topic: topicId, plan, i: 0, res: [], bank: 0, before, started: Date.now() };
    S.save();
    return S.state.cur;
  }

  function preview() {
    const L = LENGTHS[S.state.settings.length] || LENGTHS.normal;
    const pool = reviewPool().map((t) => ({ t, w: topicWeight(t.id) })).sort((a, b) => b.w - a.w).slice(0, 4).map((x) => x.t);
    return { L, warmTopics: pool, cur: currentTopic() };
  }

  return { byId, items, units, ready, PASS, TEST, LENGTHS, currentTopic, checkPass, markPassed, status, isPassed, reviewPool, buildSession, buildDrill, buildTest, preview, topicWeight, dueCount, shuffle, STAGE_ORDER };
})();
