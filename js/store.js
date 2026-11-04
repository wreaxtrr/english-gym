/* Прогресс в localStorage: интервальное повторение по заданиям,
   «вес» (освоенность) по темам, копилка, история тренировок. */
window.EG = window.EG || {};

EG.store = (function () {
  const KEY = "english-gym-v1";
  const DAY = 86400000;
  // Коробки Лейтнера: через сколько дней снова показать задание после верного ответа
  const INTERVALS = [0, 1, 3, 7, 16, 35];

  function today() { return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / DAY); }
  function dayToDate(d) { return new Date(d * DAY + new Date().getTimezoneOffset() * 60000); }

  function fresh() {
    return {
      v: 1, created: Date.now(),
      items: {},      // itemId → { b: коробка, d: день следующего показа, n: показов, w: ошибок, l: последний день }
      topics: {},     // topicId → { m: освоенность 0..1, n, ok, l, h: последние результаты }
      passed: {},     // новые темы, которые пройдены: topicId → день
      seenTheory: {},
      current: null,  // тема, выбранная вручную
      bank: [],       // { term, tr, topic, at, exported, n }
      sessions: [],   // история тренировок
      writes: [],     // история письменных ответов
      days: [],       // дни с занятиями
      cur: null,      // незавершённая тренировка
      settings: { theme: "system", length: "normal", voice: "", rate: 0.95 }
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.v === 1) { const f = fresh(); return { ...f, ...s, settings: { ...f.settings, ...(s.settings || {}) } }; }
      }
    } catch (e) { /* приватный режим или битые данные */ }
    return fresh();
  }

  let state = load();
  let timer = null;
  function save() {
    clearTimeout(timer);
    timer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* нет доступа к хранилищу */ } }, 100);
  }
  function saveNow() { clearTimeout(timer); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function initialMastery(topicId) { return topicId.startsWith("e_") ? 0.35 : 0; }
  function topic(id) {
    if (!state.topics[id]) state.topics[id] = { m: initialMastery(id), n: 0, ok: 0, l: 0, h: [] };
    return state.topics[id];
  }
  function mastery(id) { return state.topics[id] ? state.topics[id].m : initialMastery(id); }

  function markDay() { const t = today(); if (!state.days.includes(t)) { state.days.push(t); state.days = state.days.slice(-500); } }

  // Результат по теме. weight: 1 — обычное задание, 2 — письменный ответ, 0.5 — косвенный признак
  function topicResult(id, ok, weight) {
    const t = topic(id);
    const a = 0.15 * (weight || 1);
    t.m = Math.max(0, Math.min(1, t.m * (1 - a) + (ok ? 1 : 0) * a));
    t.n += 1; if (ok) t.ok += 1;
    t.h.push(ok ? 1 : 0); if (t.h.length > 30) t.h = t.h.slice(-30);
    t.l = today();
    markDay(); save();
  }

  function itemResult(itemId, topicId, ok) {
    const it = state.items[itemId] || { b: 0, d: 0, n: 0, w: 0, l: 0 };
    it.n += 1; it.l = today();
    if (ok) { it.b = Math.min(it.b + 1, INTERVALS.length - 1); it.d = today() + INTERVALS[it.b]; }
    else { it.w += 1; it.b = 0; it.d = today() + 1; }
    state.items[itemId] = it;
    topicResult(topicId, ok, 1);
  }

  function addBank(term, tr, topicId) {
    term = String(term || "").replace(/[\t\r\n]+/g, " ").trim();
    tr = String(tr || "").replace(/[\t\r\n]+/g, " ").trim();
    if (!term) return false;
    const k = term.toLowerCase();
    const ex = state.bank.find((b) => b.term.toLowerCase() === k);
    if (ex) { ex.n = (ex.n || 1) + 1; ex.at = Date.now(); if (ex.exported) ex.exported = false; save(); return false; }
    state.bank.unshift({ term, tr, topic: topicId || "", at: Date.now(), exported: false, n: 1 });
    save();
    return true;
  }

  function streak() {
    const set = new Set(state.days);
    let d = today(), n = 0;
    if (!set.has(d)) d -= 1; // сегодня ещё не занимался — серия не сгорает до конца дня
    while (set.has(d)) { n++; d--; }
    return n;
  }

  return {
    get state() { return state; },
    today, dayToDate, INTERVALS, save, saveNow, mastery, topic, topicResult, itemResult, addBank, streak, markDay,
    replace(next) { const f = fresh(); state = { ...f, ...next, settings: { ...f.settings, ...(next.settings || {}) } }; saveNow(); },
    reset() { const s = state.settings; state = fresh(); state.settings = s; saveNow(); }
  };
})();
