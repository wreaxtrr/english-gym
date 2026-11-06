/* Прогресс в localStorage: интервальное повторение по заданиям,
   «вес» (освоенность) по темам, копилка, история тренировок. */
window.EG = window.EG || {};

EG.store = (function () {
  const KEY = "english-gym-v1";
  const BACKUP_KEY = KEY + "-backup";
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
      drafts: {},    // незаконченные письменные ответы, сохраняются после закрытия вкладки
      days: [],       // дни с занятиями
      cur: null,      // незавершённая тренировка
      settings: { theme: "system", length: "normal", voice: "", rate: 0.95 }
    };
  }

  const object = (x) => x !== null && typeof x === "object" && !Array.isArray(x);
  const number = (x) => typeof x === "number" && Number.isFinite(x) && x >= 0;
  function validate(s) {
    const fail = () => { throw new Error("Некорректная резервная копия English Gym: текущий прогресс не изменён."); };
    if (!object(s) || s.v !== 1 || !object(s.topics)) fail();
    const f = fresh();
    for (const key of ["items", "topics", "passed", "seenTheory", "drafts", "settings"]) {
      if (key in s && !object(s[key])) fail();
    }
    for (const key of ["bank", "sessions", "writes", "days"]) {
      if (key in s && !Array.isArray(s[key])) fail();
    }
    const next = { ...f, ...s, settings: { ...f.settings, ...s.settings } };
    if (next.current !== null && typeof next.current !== "string") fail();
    for (const t of Object.values(next.topics)) {
      if (!object(t) || ![t.m, t.n, t.ok, t.l].every(number) || t.m > 1 || !Array.isArray(t.h) || !t.h.every(x => x === 0 || x === 1)) fail();
    }
    for (const it of Object.values(next.items)) {
      if (!object(it) || ![it.b, it.d, it.n, it.w, it.l].every(number) || !Number.isInteger(it.b) || it.b >= INTERVALS.length) fail();
    }
    for (const key of ["passed", "seenTheory"]) if (!Object.values(next[key]).every(number)) fail();
    if (!next.days.every(Number.isInteger) || !Object.values(next.drafts).every(x => typeof x === "string")) fail();
    if (!next.bank.every(b => object(b) && typeof b.term === "string" && typeof b.tr === "string" && number(b.at))) fail();
    if (!next.sessions.every(r => object(r) && [r.at, r.n, r.ok, r.min, r.bank].every(number) && typeof r.type === "string")) fail();
    if (!next.writes.every(w => object(w) && typeof w.text === "string" && typeof w.q === "string" && [w.at, w.words, w.issues].every(number))) fail();
    const run = next.cur;
    if (run !== null) {
      if (!object(run) || !["daily", "drill", "test"].includes(run.type) || !Array.isArray(run.plan) || !Array.isArray(run.res) || !object(run.before) || !number(run.bank) || !number(run.started) || !Number.isInteger(run.i) || run.i < 0 || run.i >= run.plan.length) fail();
      if (!run.plan.every(p => object(p) && ["item", "write", "theory", "summary"].includes(p.kind) && ["warm", "test", "theory", "practice", "write", "summary"].includes(p.sec) && (p.kind === "summary" || typeof p.id === "string") && (p.order === undefined || Array.isArray(p.order) && p.order.every(Number.isInteger)))) fail();
      if (!run.res.every(r => object(r) && Number.isInteger(r.idx) && r.idx >= 0 && r.idx < run.plan.length)) fail();
      if (!Object.values(run.before).every(x => number(x) && x <= 1)) fail();
    }
    return next;
  }

  let lastRaw = null, blocked = false, error = "", timer = null;
  function report(message) {
    if (error === message) return;
    error = message;
    window.dispatchEvent(new CustomEvent("eg-storage", { detail: message }));
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      lastRaw = raw;
      if (raw) {
        return validate(JSON.parse(raw));
      }
    } catch (e) {
      blocked = true;
      error = "Не удалось прочитать прогресс. Исходные данные сохранены; автосохранение остановлено. Скачай исходные данные в разделе «Прогресс».";
    }
    return fresh();
  }

  let state = load();
  function save() {
    clearTimeout(timer);
    timer = setTimeout(saveNow, 100);
  }
  function write(next, backup) {
    if (blocked && !backup) return false;
    try {
      if (localStorage.getItem(KEY) !== lastRaw) {
        blocked = true;
        report("Прогресс изменён в другой вкладке. Скачай копию текущей вкладки и обнови страницу, чтобы загрузить последние данные. Автосохранение остановлено.");
        return false;
      }
      const raw = JSON.stringify(next);
      if (backup) localStorage.setItem(BACKUP_KEY, blocked && lastRaw !== null ? lastRaw : JSON.stringify(state));
      localStorage.setItem(KEY, raw);
      lastRaw = raw;
      blocked = false;
      report("");
      return true;
    } catch (e) {
      report("Не удалось сохранить прогресс в браузере. Не закрывай вкладку: скачай резервную копию в разделе «Прогресс».");
      return false;
    }
  }
  function saveNow() { clearTimeout(timer); return write(state, false); }
  // Мобильный браузер может закрыть страницу, не дожидаясь отложенного сохранения.
  window.addEventListener("pagehide", saveNow);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveNow(); });
  function replace(next) {
    const candidate = validate(next);
    clearTimeout(timer);
    if (!write(candidate, true)) throw new Error(error);
    state = candidate;
  }

  function initialMastery() { return 0; }
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
    get error() { return error; },
    today, dayToDate, INTERVALS, save, saveNow, mastery, topic, topicResult, itemResult, addBank, streak, markDay,
    validate, replace,
    original() { return localStorage.getItem(KEY); },
    backup() { return localStorage.getItem(BACKUP_KEY); },
    reset() { const next = fresh(); next.settings = { ...state.settings }; replace(next); }
  };
})();
