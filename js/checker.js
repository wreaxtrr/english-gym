/* Проверка ответов: нормализация, варианты ответов, diff по словам,
   эвристическая проверка письменных ответов по личным типичным ошибкам. */
window.EG = window.EG || {};

(function () {
  // ───────── Варианты ответов: {a|b} — один из, [a|b] — необязательно ─────────
  function expand(pattern) {
    const parts = [];
    const re = /\{([^}]*)\}|\[([^\]]*)\]/g;
    let last = 0, m;
    while ((m = re.exec(pattern))) {
      parts.push([pattern.slice(last, m.index)]);
      if (m[1] !== undefined) parts.push(m[1].split("|"));
      else parts.push(["", ...m[2].split("|")]);
      last = re.lastIndex;
    }
    parts.push([pattern.slice(last)]);
    let out = [""];
    for (const opts of parts) {
      const next = [];
      for (const pre of out) for (const o of opts) { next.push(pre + o); if (next.length > 4000) break; }
      out = next;
    }
    return out.map((s) => s.replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").trim());
  }
  function answersOf(item) {
    if (item._exp) return item._exp;
    const list = Array.isArray(item.a) ? item.a : [item.a];
    const all = [];
    list.forEach((p) => expand(String(p)).forEach((s) => all.push(s)));
    item._exp = all;
    item._norm = all.map(norm);
    return all;
  }

  // ───────── Нормализация ─────────
  const NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const UKUS = [
    [/\b(analy|organi|reali|recogni|summari|categori|optimi|minimi|maximi|priori|visuali|speciali|apologi|emphasi|memori|utili|standardi|normali|personali|digiti|criti|customi)s(e|ed|es|ing|ation|ations|er|ers)\b/g, "$1z$2"],
    [/\b(cen|me|thea|li|fib)tre(s?)\b/g, "$1ter$2"],
    [/\b(neighb|col|fav|behavi|lab|hon|hum|flav)our/g, "$1or"],
    [/\bprogramme(s?)\b/g, "program$1"],
    [/\bpractis(e|ed|es|ing)\b/g, "practic$1"],
    [/\blicence\b/g, "license"],
    [/\b(trave|cance|mode|labe|fue)ll(ed|ing|er|ers)\b/g, "$1l$2"],
    [/\blearnt\b/g, "learned"], [/\bburnt\b/g, "burned"], [/\bdreamt\b/g, "dreamed"], [/\bspelt\b/g, "spelled"],
    [/\bwhilst\b/g, "while"], [/\bmaths\b/g, "math"], [/\bokay\b/g, "ok"], [/\bdormitory\b/g, "dorm"]
  ];
  function norm(s) {
    s = String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    s = s.replace(/[’‘`´]/g, "'");
    s = s.replace(/(\d),(\d{3})\b/g, "$1$2");
    s = s.replace(/%/g, " percent ").replace(/&/g, " and ");
    s = s.replace(/\bwon't\b/g, "will not").replace(/\bcan't\b/g, "can not").replace(/\bcannot\b/g, "can not")
      .replace(/\bshan't\b/g, "shall not").replace(/n't\b/g, " not")
      .replace(/\blet's\b/g, "let us")
      .replace(/\b(he|she|it|that|there|what|who|where|here|how)'s\b/g, "$1 is")
      .replace(/'m\b/g, " am").replace(/'re\b/g, " are").replace(/'ve\b/g, " have").replace(/'ll\b/g, " will").replace(/'d\b/g, " would");
    s = s.replace(/[^a-z0-9'.:\s]/g, " ");
    s = s.replace(/(^|[^0-9])[.:]|[.:](?=[^0-9]|$)/g, "$1 ");
    s = s.replace(/'/g, "");
    UKUS.forEach(([re, rep]) => { s = s.replace(re, rep); });
    s = s.replace(/\b(\d+)\b/g, (m, d) => (+d <= 20 ? NUM[+d] : d));
    return s.replace(/\s+/g, " ").trim();
  }

  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      [prev, cur] = [cur, prev];
    }
    return prev[n];
  }

  // Проверка ответа. strict — без допуска опечаток (орфография, диктант, вставка слова).
  function check(item, user, strict) {
    const all = answersOf(item);
    const u = norm(user);
    if (!u) return { ok: false, best: all[0], empty: true };
    const idx = item._norm.indexOf(u);
    if (idx >= 0) return { ok: true, best: all[idx] };
    // ближайший вариант по словам
    const ut = u.split(" ");
    let best = 0, bd = Infinity;
    item._norm.forEach((a, i) => { const d = lev(ut, a.split(" ")); if (d < bd) { bd = d; best = i; } });
    const cd = lev(u, item._norm[best]);
    // Опечатку в одну букву НЕ засчитываем: ровно так выглядят потерянное -s, then/than, time/times.
    return { ok: false, best: all[best], near: cd === 1 };
  }

  // ───────── Diff по словам (для показа исправлений) ─────────
  const tok = (s) => String(s).trim().split(/\s+/).filter(Boolean);
  const key = (w) => norm(w);
  function diff(user, target) {
    const a = tok(user), b = tok(target);
    const ka = a.map(key), kb = b.map(key);
    const m = a.length, n = b.length;
    const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--)
      L[i][j] = ka[i] === kb[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = [];
    let i = 0, j = 0;
    while (i < m && j < n) {
      if (ka[i] === kb[j]) { out.push({ t: "eq", w: b[j] }); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { out.push({ t: "del", w: a[i] }); i++; }
      else { out.push({ t: "ins", w: b[j] }); j++; }
    }
    while (i < m) out.push({ t: "del", w: a[i++] });
    while (j < n) out.push({ t: "ins", w: b[j++] });
    return out;
  }

  // ───────── Проверка письма ─────────
  const SPELL = {
    togather: "together", toghether: "together", togeather: "together", togehter: "together",
    intership: "internship", interneship: "internship", internshib: "internship", intrenship: "internship",
    analitics: "analytics", analythics: "analytics", analitycs: "analytics", analytic: "analytics", analitic: "analytic", analityc: "analytic", analitical: "analytical",
    exercize: "exercise", excercise: "exercise", exersice: "exercise", excersise: "exercise", exercice: "exercise", exersise: "exercise",
    exercizes: "exercises", excercises: "exercises", exersices: "exercises", excersises: "exercises", exercices: "exercises",
    intresting: "interesting", interesing: "interesting", intersting: "interesting", interisting: "interesting", intereting: "interesting",
    buisness: "business", bussiness: "business", busines: "business", bisness: "business", buseness: "business",
    enginer: "engineer", engeneer: "engineer", ingeneer: "engineer", engineeer: "engineer", enginear: "engineer", ingineer: "engineer",
    talanted: "talented", talentted: "talented",
    bigest: "biggest", thousend: "thousand", thousends: "thousands", thousents: "thousands", tousand: "thousand",
    univercity: "university", universiti: "university", unversity: "university",
    programing: "programming", langauge: "language", languge: "language", experiance: "experience", expirience: "experience",
    recieve: "receive", beleive: "believe", wich: "which", freind: "friend", freinds: "friends",
    becouse: "because", becuse: "because", bacause: "because", beacuse: "because", becaus: "because",
    realy: "really", finaly: "finally", begining: "beginning", sucessful: "successful", succesful: "successful", successfull: "successful",
    oportunity: "opportunity", enviroment: "environment", comming: "coming", writting: "writing", studing: "studying",
    stoped: "stopped", dificult: "difficult", difficalt: "difficult", necesary: "necessary", neccessary: "necessary",
    scolarship: "scholarship", colegue: "colleague", collegue: "colleague", adress: "address", tomorow: "tomorrow",
    abroard: "abroad", vegetabels: "vegetables", proffesional: "professional", profesional: "professional", sallary: "salary",
    knowlege: "knowledge", developper: "developer", wheather: "weather", untill: "until", alot: "a lot"
  };
  delete SPELL.analytic; // корректное слово, оставляем
  const SPELL_RE = new RegExp("\\b(" + Object.keys(SPELL).join("|") + ")\\b", "gi");

  const IRREG = new Set("went chosen gone done taken written seen had made got bought sold lost thought ate eaten came ran began begun wrote took saw knew known found said told felt left met paid spent won understood became brought built caught chose drove drank fell forgot forgotten gave given grew grown held kept learnt sent slept spoke spoken stood taught threw wore broke broken sang swam sat woke been was were".split(" "));
  const ED_BASE = new Set("need feed seed speed exceed succeed proceed bleed breed shed wed embed bed heed weed shred indeed".split(" "));
  const ING_OK = new Set("bring sing ring swing sting cling fling spring string wring nothing something anything everything morning evening during king ceiling".split(" "));
  const ORGS = new Set("bmstu bauman msu hse mipt itmo yandex vk ozon sber sberbank tinkoff t-bank vkusvill avito wildberries kaspersky google amazon microsoft meta apple spotify university".split(" "));
  const NOT_ORG = new Set(["IT", "AI", "ML", "USA", "UK", "UAE", "EU", "US", "SQL"]);
  const BASEV = "work|study|go|play|like|want|live|write|read|watch|make|do|have|cook|train|code|run|help|use|need|know|think|try|spend|build|test|take|get|teach|love|hate|enjoy|earn|save|sell|buy|trade|travel|drink|eat|sleep|wake|leave|come|start|finish|create|analyze|analyse|predict|update|send|check|fix|lift|swim|speak|say|tell|ask|answer";
  const SUBJ3 = "he|she|my\\s+(?:friend|roommate|brother|sister|mom|mother|dad|father|teacher|boss|neighbou?r|girlfriend|boyfriend|team\\s?lead)|everyone|everybody|nobody|somebody|someone";

  // Каждое правило: re (глобальный) + msg + fix(match) → строка-исправление или null; test(match) → bool
  const RULES = [
    { topic: "e_be", re: /(?<!\b(?:make|makes|made|making|get|gets|got|keep|keeps|kept|let|find|found|leave|left|want|wants|wanted|thank|am|is|are|was|were|do|does|did|will|would|can|could|should|have|has|had|see|saw|feel)\s+)\b(I|you|we|they|he|she)\s+(interested|tired|bored|excited|afraid|sure|ready|busy|happy|sad|good at|bad at|from|sorry|late|hungry|nervous|worried|keen on|fond of|responsible for|able to|\d{1,2} years old)\b/gi,
      msg: "Похоже, пропущен be: I am interested, he is tired.", fix: (m) => m[1] + " " + beFor(m[1]) + " " + m[2] },
    { topic: "e_be", re: /(?<!\b(?:am|is|are|was|were|be|been|keep|keeps|kept|see|saw|seen|watch|watched|hear|heard|imagine|mind|stop|stopped|like|love|hate|enjoy|have|has|had|let|catch|caught|find|found|without|about|of|for|by)\s+)\b(I|you|we|they|he|she)\s+(?!(?:bring|sing|ring|swing|sting|cling|fling|spring|string|wring|thing|nothing|something|anything|everything)\b)([a-z]+ing)\b/gi,
      msg: "Перед -ing нужен be: I am going, we are studying, he was working.", fix: (m) => m[1] + " " + beFor(m[1]) + " " + m[2] },
    { topic: "e_art", re: /\b(is|was|it's|that's)\s+((?:very|really|quite|such)\s+)?(famous|big|good|large|small|popular|great|interesting|hard|difficult|new|old|nice|cool|huge|strong|important|useful|typical|common|simple|easy|real|successful|bad|young|serious|well-known)\s+(company|university|place|city|app|project|task|subject|job|gym|team|book|idea|language|bank|student|analyst|engineer|developer|programmer|course|problem|question|skill|decision|tool|metric|feature|product|opportunity|dorm|room|friend|person|man|woman|teacher|professor|exam|test|day|week|year)\b/gi,
      msg: "Перед прилагательным + существительным в ед. ч. нужен артикль: a famous company.", fix: (m) => m[1] + " " + (/^[aeiou]/i.test(m[2] || m[3]) ? "an " : "a ") + (m[2] || "") + m[3] + " " + m[4] },
    { topic: "e_art", re: /\b(as|am|is|was|be|become|became|becoming|i'm|he's|she's)\s+((?:second-year|first-year|third-year|junior|senior|good|great|young|talented|data|product|backend|frontend|full-stack|software)\s+)?(analyst|scientist|developer|programmer|engineer|student|intern|courier|manager|trader|designer|tester|teacher|team lead)\b/gi,
      msg: "Профессия и роль с артиклем: as a data analyst, I'm a student.", fix: (m) => m[1] + " " + (/^[aeiou]/i.test(m[2] || m[3]) ? "an " : "a ") + (m[2] || "") + m[3] },
    { topic: "e_art", re: /\bthan\s+(last|previous)\s+one\b/gi, msg: "the last one: than the last one.", fix: (m) => "than the " + m[1] + " one" },
    { topic: "e_art", re: /\b(is|was|are|were|be)\s+(hardest|biggest|best|worst|easiest|largest|smallest|strongest|fastest|highest|lowest|most\s+(?!likely\b|of\b|probably\b|often\b|people\b)[a-z]+)\b/gi,
      msg: "Превосходная степень с the: the hardest, the most interesting.", fix: (m) => m[1] + " the " + m[2] },
    { topic: "e_art", re: /\ban\s+([bcdfgjklmnpqrstvwxz][a-z]*)\b/g, msg: "Перед согласным звуком пишется a, не an.", fix: (m) => "a " + m[1], test: (m) => m[1] !== m[1].toUpperCase() },
    { topic: "e_art", re: /\ba\s+([aeio][a-z]*)\b/gi, msg: "Перед гласным звуком пишется an: an engineer, an interview.", fix: (m) => "an " + m[1], test: (m) => !/^(one|once|eu|uni|use|usu)/i.test(m[1]) },
    { topic: "e_prep", re: /\b(study|studies|studied|studying|work|works|worked|working|intern|interned|interning)\s+in\s+(the\s+)?([A-Za-z-]+)\b/g,
      msg: "Учиться и работать в организации: at (at BMSTU, at Yandex).", fix: (m) => m[1] + " at " + (m[2] || "") + m[3],
      test: (m) => !NOT_ORG.has(m[3]) && (ORGS.has(m[3].toLowerCase()) || /^[A-Z]{2,}$/.test(m[3])) },
    { topic: "e_prep", re: /\bin\s+(next|last|this)\s+(year|week|month|semester|summer|winter|spring|autumn|fall|weekend)\b/gi, msg: "next / last / this year без предлога.", fix: (m) => m[1] + " " + m[2] },
    { topic: "e_prep", re: /\bon\s+(the\s+)?(breakfast|lunch|dinner)\b/gi, msg: "На завтрак = for breakfast.", fix: (m) => "for " + m[2] },
    { topic: "e_prep", re: /\b(exercises?|workouts?|training)\s+on\s+(my\s+|the\s+)?(biceps|triceps|legs|chest|back|abs|shoulders|press|glutes)\b/gi, msg: "Упражнение на мышцу = exercise for my biceps.", fix: (m) => m[1] + " for my " + (m[3] === "press" ? "abs" : m[3]) },
    { topic: "e_ff", re: /\b(on|in)\s+(the\s+|my\s+)?(first|second|third|fourth|fifth|1st|2nd|3rd|4th)\s+course\b/gi, msg: "Курс вуза = year: in my second year.", fix: (m) => "in my " + m[3] + " year" },
    { topic: "e_3s", re: new RegExp("\\b(" + SUBJ3 + "|it)\\s+((?:usually|often|always|also|never|sometimes)\\s+)?([a-z]+s)\\s+(?:[a-z'/-]+\\s+){0,5}?and\\s+(" + BASEV + ")\\b", "gi"),
      msg: "Третье лицо: -s и у второго глагола (studies and works).", fix: (m) => "and " + s3(m[4]), test: (m) => m[4] !== "Go" && !/^was$/i.test(m[3]) && !/\b(do|does|did|can|will|would|to)\s+[a-z]+\s*$/i.test(m[0].slice(0, m[0].lastIndexOf(" and "))) },
    { topic: "e_3s", re: new RegExp("(?<!\\b(?:did|does|didn't|doesn't|do|don't|will|won't|would|wouldn't|can|can't|cannot|could|couldn't|should|shouldn't|must|mustn't|might|may|let|make|makes|made|help|helps|helped|to|why|not|see|saw|watch|watched|hear|heard|and|or)\\s+)\\b(" + SUBJ3 + ")\\s+((?:usually|often|always|also|never|sometimes|really)\\s+)?(work|study|go|play|like|want|live|write|watch|make|do|have|cook|train|code|run|help|use|need|know|think|try|spend|build|take|get|teach|love|hate|enjoy|earn|trade|drink|eat|sleep|speak|say|tell)\\b", "gi"),
      msg: "he / she / my friend + глагол-s: he works, she studies.", fix: (m) => m[1] + " " + (m[2] || "") + s3(m[3]), test: (m) => !(/^like$/i.test(m[3]) && /^(some|every|no)/i.test(m[1])) },
    { topic: "e_modal", re: /\b(would|will|can|could|should|must|mustn't|might|did|didn't|does|doesn't|won't|can't|cannot|shouldn't|wouldn't|couldn't)\s+(not\s+)?([a-z]+)\b/gi,
      msg: "После would / will / must / did / can — базовая форма: would choose, didn't go.", fix: () => null,
      test: (m) => { const w = m[3].toLowerCase(); return IRREG.has(w) || (w.endsWith("ed") && w.length > 3 && !ED_BASE.has(w)) || (w.endsWith("ing") && w.length > 4 && !ING_OK.has(w)); } },
    { topic: "e_modal", re: /\b(would like|'d like|want|wants|wanted|plan|plans|planned|decide|decided|try|tries|tried|hope|hopes|hoped)\s+(learn|study|find|get|work|go|become|apply|start|improve|move|buy|make|build|do|be|have|see|visit|write|read|take)\b/gi,
      msg: "После want / would like / plan / decide нужен to: I want to find.", fix: (m) => m[1] + " to " + m[2] },
    { topic: "e_tense", re: /\b(after|when|before|as soon as|until|till|once|unless)\s+(I|you|we|they|he|she|it|the\s+[a-z]+|my\s+[a-z]+)(\s+will|\s+won't|'ll)\b/gi,
      msg: "После after / when / until будущее выражается Present: after I finish (без will). Исключение — косвенный вопрос «не знаю, когда он придёт».", fix: () => null },
    { topic: "e_tense", re: /\bif\s+(I|you|we|they|he|she|it|the\s+[a-z]+)(\s+will|'ll|\s+would|'d)\b/gi, msg: "В части с if не бывает will / would: If I finish… / If I knew…", fix: () => null },
    { topic: "e_calque", re: /\b[Ww]e\s+with\s+((?:my\s+|our\s+)?[A-Za-z]+)/g, msg: "«Мы с Сашей» = Sasha and I, «мы с другом» = my friend and I.", fix: (m) => m[1] + " and I", test: (m) => !/^(the|a|an|them|him|her|you|it|us|me|this|that)$/i.test(m[1]) },
    { topic: "e_calque", re: /\b(my|our)\s+(friend|roommate|brother|sister|mom|mother|dad|father|teacher|boss|university|dorm|gym|team|group)\s+(he|she|it|they)\s+/gi, msg: "Лишнее местоимение: My friend works…, без he.", fix: (m) => m[1] + " " + m[2] + " " },
    { topic: "e_calque", re: /\b(the|my|our)\s+(hardest|biggest|best|worst|easiest|most\s+[a-z]+|main|favourite|favorite|first|last)\s+([a-z]+)\s+it\s+(is|was)\b/gi, msg: "Лишнее it: The hardest subject is…", fix: (m) => m[1] + " " + m[2] + " " + m[3] + " " + m[4] },
    { topic: "e_calque", re: /\bfor\s+(get|improve|learn|become|make|be|understand|find|pass|prepare|save|earn|train|build|buy|see|keep|stay)\b/gi, msg: "Цель «чтобы» = to + глагол: to get better.", fix: (m) => "to " + m[1] },
    { topic: "e_calque", re: /\b(a|an|the|start|started|starting|have|has|had|with|create|created|build|built|launch|launched|open|opened)\s+own\b/gi, msg: "own только с притяжательным: my own, his own, our own.", fix: (m) => (/^(a|an|the)$/i.test(m[1]) ? "" : m[1] + " ") + "my own" },
    { topic: "e_calque", re: /\bexplain(s|ed|ing)?\s+(me|him|her|us|them)\b/gi, msg: "explain something to me (не explain me).", fix: (m) => "explain" + (m[1] || "") + " it to " + m[2] },
    { topic: "e_calque", re: /\bvisit(s|ed|ing)?\s+((?:the|my|all|all\s+the|all\s+my)\s+)?(lectures?|classes|seminars?|labs?|lessons?|pairs)\b/gi, msg: "Посещать пары = attend classes.", fix: (m) => "attend" + (m[1] || "") + " " + (m[2] || "") + m[3] },
    { topic: "e_can", re: /\b(we|I|they)\s+((?:usually|often|sometimes|always)\s+)?can\s+(go|hang|play|watch|sit|drink|eat|cook|meet|walk|spend|have|chill|talk|study|train)\b/gi,
      msg: "Если это привычка, can не нужен: On Fridays we go to parties.", fix: (m) => m[1] + " " + (m[2] || "") + m[3], sentence: /\b(every|usually|often|always|sometimes|on\s+(?:mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays|weekends)|at\s+weekends|in\s+the\s+evenings?|after\s+(?:classes|training|work|lectures))\b/i },
    { topic: "e_ff", re: /\bphysical\s+culture\b/gi, msg: "Физкультура = PE.", fix: () => "PE" },
    { topic: "e_ff", re: /\bstrings?\s+of\s+code\b/gi, msg: "Строки кода = lines of code.", fix: () => "lines of code" },
    { topic: "e_ff", re: /\b(train|trains|trained|training|pump|pumped|pumping|swing|swung)\s+(my\s+|the\s+)?press\b/gi, msg: "Пресс (мышцы) = abs; press = жим.", fix: (m) => m[1] + " " + (m[2] || "my ") + "abs" },
    { topic: "e_ff", re: /\bcontrol\s+works?\b/gi, msg: "Контрольная = test.", fix: () => "test" },
    { topic: "e_ff", re: /\bdiploma\s+(work|project|paper)\b/gi, msg: "Дипломная работа = thesis.", fix: () => "thesis" },
    { topic: "e_ff", re: /\bactual\s+(information|data|topic|problem|question|news|issue|version)\b/gi, msg: "Актуальный = relevant / up-to-date (actual = фактический).", fix: (m) => "up-to-date " + m[1] },
    { topic: "e_ff", re: /\b(don't|do not|doesn't|didn't)\s+deny\b/gi, msg: "Если имелось в виду «не исключаю» → I don't rule out (+ -ing).", fix: (m) => m[1] + " rule out" },
    { topic: "e_ff", re: /\b(I|we|he|she|they)\s+choose\b/gi, msg: "Прошедшее время от choose — chose.", fix: (m) => m[1] + " chose", sentence: /\b(ago|last|yesterday|in\s+20\d\d|in\s+(?:my\s+)?(?:first|school))\b/i },
    { topic: "e_num", re: /\b(\d+|two|three|four|five|six|seven|eight|nine|ten|several|few)\s+(thousands|millions|hundreds|billions)\b/gi, msg: "После числа hundred / thousand / million без -s.", fix: (m) => m[1] + " " + m[2].replace(/s$/, "") },
    { topic: "e_num", re: /\bmore\s+(\d[\d,.]*|a\s+hundred|a\s+thousand|a\s+million)\b(?!\s*(?:than|times))/gi, msg: "Больше 800 = more than 800 / over 800.", fix: (m) => "more than " + m[1] },
    { topic: "e_num", re: /\b(\d+|two|three|four|five|six|seven|eight|nine|ten|many|several)\s+time\b(?!\s*(?:zones?|series|frames?|slots?|limits?))/gi, msg: "Раз — times: three times a week.", fix: (m) => m[1] + " times" },
    { topic: "e_num", re: /\bpercents\b/gi, msg: "percent без -s.", fix: () => "percent" },
    { topic: "e_num", re: /\b(?:one|1)\s+time\s+(a|per)\s+(day|week|month|year)\b/gi, msg: "Один раз = once: once a week.", fix: (m) => "once " + m[1] + " " + m[2] },
    { topic: "e_num", re: /\b(?:two|2)\s+times\s+(a|per)\s+(day|week|month|year)\b/gi, msg: "Два раза = twice: twice a week.", fix: (m) => "twice " + m[1] + " " + m[2] },
    { topic: "n_comp", re: /\b(more|less|better|worse|bigger|smaller|harder|easier|faster|slower|higher|lower|stronger|cheaper|longer|shorter|simpler|newer|older|richer|safer|riskier)\s+then\b/gi, msg: "После сравнения — than, не then.", fix: (m) => m[1] + " than" },
    { topic: "n_comp", re: /\b((?:more|less)\s+[a-z]+|[a-z]{3,}er)\s+then\b/gi, msg: "После сравнения — than, не then.", fix: (m) => m[1] + " than",
      test: (m) => !/^(after|never|ever|other|either|neither|together|later|over|under|whether|rather|order|number|answer|remember|november|december|september|october|summer|winter|water|paper|computer|power|user|server|cluster|player|teacher|brother|sister|mother|father|manager|developer|engineer|trader|offer|enter|register|filter|consider|discover|cover|deliver)$/i.test(m[1]) },
    { topic: "n_comp", re: /\b(more|most)\s+(harder|easier|bigger|faster|better|worse|stronger|smaller|higher|lower|cheaper|longer|shorter|simpler|newer|older|hardest|easiest|biggest|fastest|best|worst|strongest|cheapest|longest|simplest)\b/gi, msg: "Двойное сравнение: harder (без more), the best (без most).", fix: (m) => m[2] },
    { topic: "n_link", re: /\bdespite\s+(I|we|they|he|she|the\s+fact\s+I)\s+/gi, msg: "Despite + существительное / -ing; с целым предложением — although.", fix: (m) => "although " + m[1].replace(/the\s+fact\s+/i, "") + " " },
    { topic: "n_link", re: /\bon\s+the\s+other\s+side\b/gi, msg: "С другой стороны = on the other hand.", fix: () => "on the other hand" },
    { topic: "n_interview", re: /\bresponsible\s+(about|of)\b/gi, msg: "responsible for.", fix: () => "responsible for" },
    { topic: "e_spell", re: SPELL_RE, msg: "Орфография.", fix: (m) => matchCase(m[1], SPELL[m[1].toLowerCase()]) }
  ];

  function beFor(p) { p = p.toLowerCase(); return p === "i" ? "am" : (p === "he" || p === "she" || p === "it") ? "is" : "are"; }
  function s3(v) {
    v = v.toLowerCase();
    if (v === "have") return "has"; if (v === "do") return "does"; if (v === "go") return "goes";
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + "ies";
    if (/(s|sh|ch|x|z|o)$/.test(v)) return v + "es";
    return v + "s";
  }
  function matchCase(src, w) { return src[0] === src[0].toUpperCase() ? w[0].toUpperCase() + w.slice(1) : w; }

  function sentenceAt(text, idx) {
    let s = text.lastIndexOf(".", idx), s2 = text.lastIndexOf("!", idx), s3_ = text.lastIndexOf("?", idx);
    s = Math.max(s, s2, s3_) + 1;
    let e = text.slice(idx).search(/[.!?]/);
    e = e < 0 ? text.length : idx + e;
    return text.slice(s, e);
  }

  function checkWriting(raw) {
    const text = String(raw || "").replace(/[’‘]/g, "'");
    const issues = [];
    RULES.forEach((r) => {
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(text))) {
        if (m[0].length === 0) { r.re.lastIndex++; continue; }
        if (r.test && !r.test(m)) continue;
        if (r.sentence && !r.sentence.test(sentenceAt(text, m.index))) continue;
        let start = m.index, end = m.index + m[0].length;
        if (r.topic === "e_3s" && r.re.source.includes("and\\s+(")) { start = m.index + m[0].lastIndexOf("and "); }
        if (issues.some((x) => x.start < end && start < x.end)) continue;
        issues.push({ topic: r.topic, msg: r.msg, start, end, text: text.slice(start, end), fix: r.fix ? r.fix(m) : null });
      }
    });
    issues.sort((a, b) => a.start - b.start);
    return { text, issues, stats: stats(text) };
  }

  // Использование целевых конструкций в письме
  const DETECT = {
    n_pp: /\b(have|has|haven't|hasn't|I've|we've|you've|they've)\s+(never\s+|already\s+|just\s+|ever\s+|not\s+|also\s+|recently\s+)?(been|done|gone|seen|written|taken|made|got|gotten|built|learnt|learned|bought|lost|won|had|known|met|found|become|grown|spent|chosen|begun|eaten|run|tried|worked|studied|lived|started|finished|completed|solved|improved|increased|gained|passed|used|created|developed|analysed|analyzed|wanted|decided|read|taught|given|understood|[a-z]+ed)\b/gi,
    n_pc: /\b(was|were|wasn't|weren't)\s+(?!going\s+to)([a-z]+ing)\b/gi,
    n_modal: /\b(should|shouldn't|must|mustn't|have\s+to|has\s+to|had\s+to|don't\s+have\s+to|doesn't\s+have\s+to|can|can't|could|couldn't|might|may|(?:are|is|am|aren't|isn't)\s+(?:not\s+)?allowed\s+to)\b/gi,
    n_cond: /\b(if|unless)\b[^.!?]*?\b(will|won't|'ll|would|wouldn't|'d)\b/gi,
    n_comp: /\b([a-z]+er\s+than|more\s+[a-z]+\s+than|less\s+[a-z]+\s+than|better\s+than|worse\s+than|not\s+as\s+[a-z]+\s+as|as\s+[a-z]+\s+as|the\s+more\b)/gi,
    n_phr: /\b(go|goes|went|gone|going)\s+through|\b(look|looks|looked|looking)\s+(through|into)|\b(work|works|worked|working)\s+(through|out)|\b(get|gets|got|getting)\s+through|\b(hang|hangs|hung|hanging)\s+out|\b(figure|figures|figured|figuring)\s+out|\b(find|finds|found|finding)\s+out|\b(come|comes|came|coming)\s+up\s+with|\b(set|sets|setting)\s+up|\b(give|gives|gave|given|giving)\s+up|\b(keep|keeps|kept|keeping)\s+up\s+with|\b(catch|catches|caught|catching)\s+up|\b(run|runs|ran|running)\s+out\s+of|\b(put|puts|putting)\s+off|\b(turn|turns|turned|turning)\s+out|\b(break|breaks|broke|broken|breaking)\s+down|\b(sign|signs|signed|signing)\s+up|\b(pick|picks|picked|picking)\s+up|\b(drop|drops|dropped|dropping)\s+out/gi,
    n_link: /\b(however|on\s+the\s+one\s+hand|on\s+the\s+other\s+hand|as\s+a\s+result|therefore|moreover|in\s+addition|furthermore|although|even\s+though|despite|in\s+spite\s+of|for\s+example|for\s+instance|such\s+as|in\s+conclusion|overall|firstly|secondly|finally|in\s+my\s+opinion|whereas|nevertheless)\b/gi,
    n_interview: /\b(internship|responsible\s+for|requirements|responsibilities|metrics?|retention|churn|conversion|insights?|findings|stakeholders?|deadline|dashboard|hypothes[ie]s|a\/b\s+test|pet\s+project|eager|strengths?|weakness(?:es)?|attention\s+to\s+detail|team\s?work|feedback)\b/gi
  };
  function usage(topicId, text) {
    const re = DETECT[topicId];
    if (!re) return null;
    re.lastIndex = 0;
    const found = [];
    let m;
    while ((m = re.exec(text))) found.push(m[0]);
    return found;
  }

  function stats(text) {
    const words = (text.match(/[A-Za-z][A-Za-z'-]*/g) || []);
    const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 2);
    const lower = words.map((w) => w.toLowerCase());
    const uniq = new Set(lower);
    const linkers = usage("n_link", text) || [];
    const long = lower.filter((w) => w.length >= 8).length;
    return {
      words: words.length,
      sentences: sentences.length,
      avgLen: sentences.length ? Math.round(words.length / sentences.length) : 0,
      variety: words.length ? Math.round((uniq.size / words.length) * 100) : 0,
      linkers: linkers.length,
      longWords: long
    };
  }

  EG.check = { expand, answersOf, norm, check, diff, checkWriting, usage, lev };
})();
