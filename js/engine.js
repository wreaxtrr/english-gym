/* Движок: выбор текущей темы, подбор заданий с учётом слабых мест, план тренировки. */
window.EG = window.EG || {};

EG.engine = (function () {
  const S = EG.store;
  const topics = EG.topics;
  const byId = {};
  const items = {};
  topics.forEach((t) => {
    byId[t.id] = t;
    (t.items || []).forEach((it, i) => { it.id = t.id + "#" + i; it.topic = t.id; items[it.id] = it; });
  });
  const STAGE_ORDER = ["B1", "B2", "C1"];
  const errorTopics = topics.filter((t) => t.kind === "error");
  const curriculum = topics.filter((t) => t.kind === "new")
    .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage));
  const ready = (t) => t.items && t.items.length > 0;

  const PASS = { m: 0.75, n: 16 };
  const LENGTHS = {
    short: { warm: 6, practice: 7, review: 1, write: 0, minutes: "15" },
    normal: { warm: 8, practice: 10, review: 2, write: 1, minutes: "20–30" },
    long: { warm: 10, practice: 14, review: 3, write: 1, minutes: "35–45" }
  };
  const TYPE_ORDER = { choice: 0, listen: 1, gap: 2, fix: 3, tr: 4, write: 5 };

  function isPassed(id) { return !!S.state.passed[id]; }
  function currentTopic() {
    const st = S.state;
    if (st.current && byId[st.current] && ready(byId[st.current]) && !isPassed(st.current)) return byId[st.current];
    return curriculum.find((t) => ready(t) && !isPassed(t.id)) || null;
  }
  function checkPass(id) {
    const t = S.state.topics[id];
    if (!t || isPassed(id) || byId[id].kind !== "new") return false;
    if (t.m >= PASS.m && t.n >= PASS.n) {
      S.state.passed[id] = S.today();
      if (S.state.current === id) S.state.current = null;
      S.save();
      return true;
    }
    return false;
  }
  function status(id) {
    const t = byId[id];
    if (!ready(t)) return "planned";
    if (t.kind === "error") return "error";
    if (isPassed(id)) return "passed";
    const c = currentTopic();
    return c && c.id === id ? "current" : "queued";
  }

  // Пул для разминки: личные ошибки + пройденные новые темы
  function reviewPool() {
    return errorTopics.concat(curriculum.filter((t) => ready(t) && isPassed(t.id)));
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
  function dueCount(id) {
    const t = S.today();
    return (byId[id].items || []).filter((it) => { const s = S.state.items[it.id]; return s && s.n > 0 && s.d <= t; }).length;
  }

  function usable(it) {
    if (it.t === "write") return false;
    if (it.t === "listen" && !EG.tts.ok && it.o) return false; // выбор на слух без озвучки бессмыслен
    return true;
  }

  // Подбор k заданий темы: сначала просроченные к повторению, затем новые, затем давно не виденные
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

  // План разминки: k заданий из слабых тем
  function warmup(k, exclude) {
    const pool = reviewPool();
    const slots = weightedSample(pool.map((t) => ({ id: t.id, w: topicWeight(t.id) })), k, 2);
    const out = [];
    slots.forEach((tid) => { const [it] = pickItems(tid, 1, exclude); if (it) { exclude.add(it.id); out.push(it); } });
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
    warmup(L.warm, exclude).forEach((it) => plan.push({ sec: "warm", kind: "item", id: it.id }));
    const cur = currentTopic();
    if (cur) {
      plan.push({ sec: "theory", kind: "theory", id: cur.id });
      const main = pickItems(cur.id, L.practice, exclude);
      main.forEach((it) => exclude.add(it.id));
      main.sort((a, b) => TYPE_ORDER[a.t] - TYPE_ORDER[b.t]);
      const passedNew = curriculum.filter((t) => ready(t) && isPassed(t.id));
      const review = [];
      if (passedNew.length) {
        weightedSample(passedNew.map((t) => ({ id: t.id, w: topicWeight(t.id) })), L.review, 1)
          .forEach((tid) => { const [it] = pickItems(tid, 1, exclude); if (it) { exclude.add(it.id); review.push(it); } });
      }
      const practice = main.slice();
      review.forEach((it, i) => practice.splice(Math.min(practice.length, 3 + i * 4), 0, it));
      practice.forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
      if (L.write) { const w = nextWrite(cur.id); if (w) plan.push({ sec: "write", kind: "write", id: w.id }); }
    } else {
      warmup(L.practice, exclude).forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
    }
    plan.push({ sec: "summary", kind: "summary" });
    return newRun("daily", plan, cur ? cur.id : null);
  }

  // Точечная тренировка одной темы
  function buildDrill(topicId, n) {
    const t = byId[topicId];
    const plan = [];
    if (t.kind === "new" && !S.state.seenTheory[topicId]) plan.push({ sec: "theory", kind: "theory", id: topicId });
    const its = pickItems(topicId, n || 10, new Set()).sort((a, b) => TYPE_ORDER[a.t] - TYPE_ORDER[b.t]);
    its.forEach((it) => plan.push({ sec: "practice", kind: "item", id: it.id }));
    plan.push({ sec: "summary", kind: "summary" });
    return newRun("drill", plan, topicId);
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

  return { byId, items, topics, errorTopics, curriculum, ready, PASS, LENGTHS, currentTopic, checkPass, status, isPassed, buildSession, buildDrill, preview, topicWeight, dueCount, shuffle, STAGE_ORDER };
})();
