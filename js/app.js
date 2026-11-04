/* Интерфейс: роутинг по hash, экраны, раннер тренировки, письмо, копилка, IELTS, прогресс. */
(function () {
  const S = EG.store, E = EG.engine, C = EG.check;
  const view = document.getElementById("view");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = (x) => Math.round(x * 100);
  const hashId = (id) => id.replace("_", "-");
  const idFromHash = (h) => h.replace("-", "_");

  const SEC = {
    warm: { t: "Разминка", d: "повторяем твои ошибки" },
    theory: { t: "Новая тема", d: "правило и примеры" },
    practice: { t: "Подходы", d: "практика" },
    write: { t: "Письмо", d: "ответ в 3–5 предложений" },
    summary: { t: "Итог", d: "" }
  };
  const TYPE = { gap: "Вставь пропущенное", choice: "Выбери вариант", fix: "Найди и исправь ошибку", tr: "Переведи на английский", listen: "Послушай", write: "Напиши ответ" };
  const STATUS = { current: "изучаем", passed: "пройдена", queued: "в очереди", planned: "в разработке", error: "личная ошибка" };

  // ───────── Тема оформления ─────────
  function applyTheme() {
    const t = S.state.settings.theme, r = document.documentElement;
    if (t === "light" || t === "dark") { r.setAttribute("data-theme", t); r.setAttribute("data-eg-theme", "1"); }
    else if (r.hasAttribute("data-eg-theme")) { r.removeAttribute("data-theme"); r.removeAttribute("data-eg-theme"); }
  }

  // ───────── Общие куски разметки ─────────
  function meter(m, label) {
    const v = Math.max(0, Math.min(1, m));
    const cls = v >= 0.75 ? "hi" : v >= 0.45 ? "mid" : "lo";
    return `<span class="meter ${cls}" role="img" aria-label="освоено ${pct(v)}%"><i style="width:${pct(v)}%"></i></span>${label === false ? "" : `<span class="meter-val">${pct(v)}%</span>`}`;
  }
  function chip(text, cls) { return `<span class="chip ${cls || ""}">${esc(text)}</span>`; }
  function topicTitle(id) { return E.byId[id] ? E.byId[id].title : id; }
  function fmtDate(ts) { const d = new Date(ts); return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }); }
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
  }
  async function copyText(text, fallbackEl) {
    try { await navigator.clipboard.writeText(text); toast("Скопировано"); }
    catch (e) { if (fallbackEl) { fallbackEl.focus(); fallbackEl.select(); } toast("Не удалось скопировать: выдели текст и нажми Ctrl+C"); }
  }
  function download(name, text) {
    try {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
      a.download = name; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) { toast("Скачивание недоступно, используй «Скопировать»"); }
  }

  // ───────── Навигация ─────────
  const NAV = [["today", "Сегодня"], ["map", "Карта"], ["write", "Письмо"], ["ielts", "IELTS"], ["bank", "Копилка"], ["stats", "Прогресс"]];
  function renderNav(active) {
    const nav = document.getElementById("nav");
    nav.innerHTML = NAV.map(([h, t]) => `<a href="#${h}" class="${active === h ? "on" : ""}"${active === h ? ' aria-current="page"' : ""}>${t}${h === "bank" && S.state.bank.length ? `<sup>${S.state.bank.length}</sup>` : ""}</a>`).join("");
  }

  function route() {
    const h = (location.hash || "#today").slice(1);
    const i = h.indexOf("-");
    const name = i < 0 ? h : h.slice(0, i);
    const arg = i < 0 ? "" : h.slice(i + 1);
    const R = { today: renderToday, session: renderSession, map: renderMap, topic: renderTopic, bank: renderBank, ielts: renderIelts, write: renderFreeWrite, stats: renderStats };
    const fn = R[name] || renderToday;
    renderNav(name === "topic" ? "map" : name === "session" ? "today" : name);
    view.onclick = null;
    view.innerHTML = "";
    fn(arg);
    if (name !== "session") window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  // ───────── Сегодня ─────────
  function stageProgress(stage) {
    const ts = E.curriculum.filter((t) => t.stage === stage);
    const ready = ts.filter(E.ready);
    return { total: ts.length, ready: ready.length, passed: ready.filter((t) => E.isPassed(t.id)).length };
  }
  function renderToday() {
    const p = E.preview(), run = S.state.cur, L = p.L;
    const b1 = stageProgress("B1");
    const weak = E.errorTopics.concat(E.curriculum.filter((t) => E.ready(t) && (E.isPassed(t.id) || (S.state.topics[t.id] || {}).n)))
      .map((t) => ({ t, m: S.mastery(t.id), w: E.topicWeight(t.id) })).sort((a, b) => b.w - a.w).slice(0, 6);
    const days = new Set(S.state.days), today = S.today();
    let strip = "";
    for (let d = today - 27; d <= today; d++) strip += `<i class="${days.has(d) ? "on" : ""}${d === today ? " now" : ""}" title="${S.dayToDate(d).toLocaleDateString("ru-RU")}"></i>`;
    const curT = p.cur;
    const ct = curT ? S.state.topics[curT.id] : null;
    view.innerHTML = `
<section class="hero">
  <div class="card hero-main">
    <p class="eyebrow">Тренировка дня · ${L.minutes} мин</p>
    <h1>${run ? "Тренировка на паузе" : curT ? esc(curT.title) : "Повторение"}</h1>
    ${run ? `<p class="lead">Пройдено ${run.i} из ${run.plan.length - 1} шагов. Продолжим с того же места.</p>` : `<p class="lead">${curT ? esc(curT.short) : "Все готовые темы пройдены. Тренируем слабые места."}</p>`}
    <ol class="plan">
      <li><b>Разминка</b><span>${L.warm} заданий на твои ошибки: ${p.warmTopics.map((t) => esc(t.title.toLowerCase())).join(", ")}</span></li>
      ${curT ? `<li><b>Новая тема</b><span>${esc(curT.title)}${ct && ct.n ? ` · освоено ${pct(S.mastery(curT.id))}%` : " · начинаем"}</span></li>
      <li><b>Подходы</b><span>${L.practice} заданий по теме${L.review ? ` + ${L.review} на повторение пройденного` : ""}</span></li>
      ${L.write ? `<li><b>Письмо</b><span>ответ на вопрос, 3–5 предложений, с разбором</span></li>` : ""}` : ""}
      <li><b>Итог</b><span>что выросло, что упало, что ушло в копилку</span></li>
    </ol>
    <div class="row">
      ${run ? `<button class="btn primary big" data-act="resume">Продолжить</button><button class="btn ghost" data-act="restart">Начать заново</button>`
             : `<button class="btn primary big" data-act="start">Начать тренировку</button>`}
    </div>
  </div>
  <aside class="tiles">
    <div class="tile"><span class="num">${S.streak()}</span><span class="lbl">дней подряд</span></div>
    <div class="tile"><span class="num">${b1.passed}<small>/${b1.ready}</small></span><span class="lbl">тем B1 пройдено</span></div>
    <a class="tile link" href="#bank"><span class="num">${S.state.bank.length}</span><span class="lbl">в копилке</span></a>
    <div class="tile"><span class="num">${E.errorTopics.concat(E.curriculum).reduce((a, t) => a + E.dueCount(t.id), 0)}</span><span class="lbl">заданий ждут повторения</span></div>
    <div class="tile wide"><span class="lbl">Последние 4 недели</span><div class="strip">${strip}</div></div>
  </aside>
</section>
<section class="block">
  <div class="block-head"><h2>Слабые места</h2><p class="muted">Чем ниже «вес», тем чаще тема попадает в разминку.</p></div>
  <ul class="weak">${weak.map(({ t, m }) => `
    <li><a href="#topic-${hashId(t.id)}" class="weak-name">${esc(t.title)}<small>${esc(t.short)}</small></a>
      <span class="weak-m">${meter(m)}</span>
      <button class="btn small" data-drill="${t.id}">8 заданий</button></li>`).join("")}</ul>
</section>`;
    view.onclick = (e) => {
      const a = e.target.closest("[data-act],[data-drill]");
      if (!a) return;
      if (a.dataset.drill) { E.buildDrill(a.dataset.drill, 8); location.hash = "#session"; return; }
      if (a.dataset.act === "start" || a.dataset.act === "restart") { E.buildSession(); location.hash = "#session"; }
      if (a.dataset.act === "resume") location.hash = "#session";
    };
  }

  // ───────── Раннер тренировки ─────────
  let ui = null;
  function renderSession() {
    const run = S.state.cur;
    if (!run) { location.hash = "#today"; return; }
    const step = run.plan[run.i];
    if (!step) { S.state.cur = null; S.save(); location.hash = "#today"; return; }
    ui = { checked: false, ok: null, chosen: null };
    const secs = [];
    run.plan.forEach((p, i) => { if (p.kind === "summary") return; const last = secs[secs.length - 1]; if (!last || last.sec !== p.sec) secs.push({ sec: p.sec, steps: [] }); secs[secs.length - 1].steps.push(i); });
    const resByIdx = {};
    run.res.forEach((r) => { resByIdx[r.idx] = r; });
    const progress = secs.map((g) => `<div class="pg-sec${g.steps.includes(run.i) ? " on" : ""}"><span class="pg-lbl">${SEC[g.sec].t}</span><div class="pg-cells">${g.steps.map((i) => {
      const r = resByIdx[i]; return `<i class="${i === run.i ? "cur" : r ? (r.ok ? "ok" : "bad") : ""}${run.plan[i].retry ? " retry" : ""}"></i>`; }).join("")}</div></div>`).join("");
    view.innerHTML = `
<div class="session-top">
  <div class="pg">${progress}</div>
  <button class="btn ghost small" data-act="pause" title="Прогресс сохранится">Пауза</button>
</div>
<div id="stage"></div>`;
    view.querySelector('[data-act="pause"]').onclick = () => { location.hash = "#today"; };
    const stage = document.getElementById("stage");
    if (step.kind === "item") renderItem(stage, step, run);
    else if (step.kind === "theory") renderTheoryStep(stage, step, run);
    else if (step.kind === "write") renderWriteStep(stage, step, run);
    else renderSummary(stage, run);
  }

  function gapInput(ans) {
    const w = Math.max(5, Math.min(22, String(ans || "").length + 3));
    return `<input class="gap" id="ans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${w}ch" aria-label="пропущенное слово">`;
  }

  function renderItem(stage, step, run) {
    const it = E.items[step.id];
    if (!it) { run.i++; S.save(); renderSession(); return; }
    const t = E.byId[it.topic];
    const answers = it.o ? null : C.answersOf(it);
    if (it.o && !step.order) { step.order = E.shuffle(it.o.map((_, i) => i)); S.save(); }
    let body = "";
    if (it.t === "gap") {
      const [a, b] = it.q.split("___");
      body = `<p class="sentence">${esc(a)}${gapInput(answers[0])}${esc(b || "")}${it.h ? ` <span class="hint">(${esc(it.h)})</span>` : ""}</p>`;
    } else if (it.t === "choice") {
      body = `<p class="sentence">${esc(it.q).replace("___", '<span class="blank">_____</span>')}</p>`;
    } else if (it.t === "fix") {
      body = `${it.ctx ? `<p class="ctx">Вопрос: <i>${esc(it.ctx)}</i></p>` : ""}<p class="manuscript">${esc(it.q)}</p>
        <label class="lbl-sm" for="ans">Исправленное предложение</label>
        <textarea id="ans" rows="2" spellcheck="false" autocapitalize="sentences">${esc(it.q)}</textarea>`;
    } else if (it.t === "tr") {
      body = `<p class="ru">${esc(it.q)}</p><label class="lbl-sm" for="ans">Перевод</label><textarea id="ans" rows="2" spellcheck="false" placeholder="Напиши по-английски…"></textarea>`;
    } else if (it.t === "listen") {
      const single = !/\s/.test(it.say);
      body = `<div class="listen">
          <button class="btn play" data-act="play">▶ Слушать</button><button class="btn ghost" data-act="slow">Медленно</button>
          ${EG.tts.ok ? "" : `<span class="muted">Озвучка в этом браузере недоступна: ориентируйся на перевод.</span>`}
        </div>
        ${it.o ? `<p class="muted">Какое слово прозвучало?</p>` : `<label class="lbl-sm" for="ans">${single ? "Напиши слово" : "Напиши фразу целиком"}</label>
        <input id="ans" class="line" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">`}
        ${it.ru ? (single || !EG.tts.ok ? `<p class="hint">${esc(it.ru)}</p>` : `<details class="hint"><summary>Показать перевод</summary>${esc(it.ru)}</details>`) : ""}`;
    }
    const opts = it.o ? `<div class="opts">${step.order.map((oi, k) => `<button class="opt" data-opt="${oi}"><kbd>${k + 1}</kbd><span>${esc(it.o[oi])}</span></button>`).join("")}</div>` : "";
    stage.innerHTML = `
<article class="card task">
  <header class="task-head">${chip(SEC[step.sec].t, "sec")}${chip(t.title)}${step.retry ? chip("ещё раз", "warn") : ""}<span class="qtype">${TYPE[it.t]}</span></header>
  ${body}${opts}
  <div class="row actions">
    ${it.o ? "" : `<button class="btn primary" data-act="check">Проверить</button>`}
    <button class="btn ghost" data-act="dunno">Не знаю</button>
    <span class="kbd-hint">${it.o ? "1–" + it.o.length + " — выбрать" : "Enter — проверить"}</span>
  </div>
  <div id="fb" class="fb" hidden></div>
</article>`;
    const inp = stage.querySelector("#ans");
    if (inp) { setTimeout(() => { inp.focus(); if (inp.tagName === "TEXTAREA" && it.t === "fix") inp.setSelectionRange(inp.value.length, inp.value.length); }, 30); }
    if (it.t === "listen") setTimeout(() => EG.tts.speak(it.say), 250);

    stage.onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.act === "play") EG.tts.speak(it.say);
      else if (b.dataset.act === "slow") EG.tts.speak(it.say, true);
      else if (b.dataset.opt !== undefined && !ui.checked) { ui.chosen = +b.dataset.opt; doCheck(stage, step, run, it); }
      else if (b.dataset.act === "check" && !ui.checked) doCheck(stage, step, run, it);
      else if (b.dataset.act === "dunno" && !ui.checked) { ui.dunno = true; doCheck(stage, step, run, it); }
      else if (b.dataset.act === "next") commit(step, run, it, ui.ok);
      else if (b.dataset.act === "override") { ui.ok = true; ui.override = true; toast("Засчитано как верный ответ"); commit(step, run, it, true); }
    };
    stage.onkeydown = (e) => {
      if (e.key === "Enter" && !e.shiftKey && e.target.id === "ans") { e.preventDefault(); if (!ui.checked) doCheck(stage, step, run, it); else commit(step, run, it, ui.ok); }
    };
  }

  function doCheck(stage, step, run, it) {
    ui.checked = true;
    let ok, best, near = false, user = "";
    const strict = it.t === "gap" || it.t === "listen" || it.topic === "e_spell";
    if (it.o) {
      ok = !ui.dunno && ui.chosen === it.a;
      best = it.o[it.a];
      stage.querySelectorAll(".opt").forEach((el) => {
        const oi = +el.dataset.opt; el.disabled = true;
        if (oi === it.a) el.classList.add("right"); else if (oi === ui.chosen) el.classList.add("wrong");
      });
    } else {
      const inp = stage.querySelector("#ans");
      user = ui.dunno ? "" : inp.value;
      const r = C.check(it, user, strict);
      ok = !ui.dunno && r.ok; best = r.best; near = !!r.near;
      inp.readOnly = true; inp.classList.add(ok ? "is-ok" : "is-bad");
    }
    ui.ok = ok;
    const fb = stage.querySelector("#fb");
    const all = it.o ? [] : C.answersOf(it);
    const others = all.filter((a) => C.norm(a) !== C.norm(best)).filter((a, i, arr) => arr.findIndex((x) => C.norm(x) === C.norm(a)) === i).slice(0, 3);
    const showDiff = !ok && user.trim() && (it.t === "fix" || it.t === "tr" || (it.t === "listen" && !it.o));
    const canOverride = !ok && user.trim() && (it.t === "tr" || it.t === "fix" || (near && it.topic !== "e_spell"));
    fb.className = "fb " + (ok ? "ok" : "bad");
    fb.innerHTML = `
      <p class="verdict">${ok ? "Верно." : ui.dunno ? "Ничего страшного, разберём." : near ? "Почти: отличается одной буквой." : "Не совсем."}</p>
      ${near ? `<p class="muted small">Проверь окончания: -s, -ed, than/then, time/times. Если это просто опечатка, засчитай ответ кнопкой ниже.</p>` : ""}
      ${!ok ? `<p class="answer-line"><span class="muted">Правильно:</span> <b class="answer">${esc(best)}</b></p>` : ""}
      ${showDiff ? `<p class="diff" aria-label="исправления">${renderDiff(user, best)}</p>` : ""}
      ${it.ex ? `<p class="ex">${esc(it.ex)}</p>` : ""}
      ${!ok && others.length && it.t !== "gap" ? `<p class="muted small">Тоже верно: ${others.map(esc).join(" · ")}</p>` : ""}
      ${!ok ? `<p class="muted small">Фраза ушла в копилку, а задание вернётся в конце раздела и в следующих тренировках.</p>` : ""}
      <div class="row">
        <button class="btn primary" data-act="next">Дальше →</button>
        ${canOverride ? `<button class="btn ghost" data-act="override">Мой вариант тоже верный</button>` : ""}
      </div>`;
    fb.hidden = false;
    const chk = stage.querySelector('[data-act="check"]'); if (chk) chk.remove();
    const dn = stage.querySelector('[data-act="dunno"]'); if (dn) dn.remove();
    const kh = stage.querySelector(".kbd-hint"); if (kh) kh.textContent = "Enter — дальше";
    if (it.t === "listen" && !ok) EG.tts.speak(it.say);
    setTimeout(() => { const n = fb.querySelector('[data-act="next"]'); if (n && !stage.querySelector("#ans")) n.focus(); }, 30);
  }

  function renderDiff(user, target) {
    return C.diff(user, target).map((d) => d.t === "eq" ? esc(d.w) : d.t === "del" ? `<del>${esc(d.w)}</del>` : `<ins>${esc(d.w)}</ins>`).join(" ");
  }

  function cardFor(it) {
    if (it.c) return it.c;
    const a = it.o ? it.o[it.a] : C.answersOf(it)[0];
    if (it.t === "tr") return [a, it.q];
    if (it.t === "fix") return [a, "ошибка: " + it.q];
    if (it.t === "listen") return [it.say, it.ru || ""];
    if (it.q && it.q.includes("___")) return [it.q.replace("___", a), it.ex || ""];
    return [a, it.ex || ""];
  }

  function commit(step, run, it, ok) {
    if (run.plan[run.i] !== step) return;
    if (!step.retry) S.itemResult(it.id, it.topic, !!ok);
    run.res.push({ idx: run.i, id: it.id, topic: it.topic, sec: step.sec, ok: !!ok, retry: !!step.retry });
    if (!ok) {
      const c = cardFor(it);
      if (c && S.addBank(c[0], c[1], it.topic)) run.bank++;
      if (!step.retry) {
        // вернуть задание в конце текущего раздела (но не раньше чем через 2 шага)
        let end = run.i + 1;
        while (end < run.plan.length && run.plan[end].sec === step.sec) end++;
        const pos = Math.max(Math.min(end, run.plan.length - 1), Math.min(run.i + 3, end));
        run.plan.splice(pos, 0, { sec: step.sec, kind: "item", id: it.id, retry: true, order: step.order });
      }
    }
    run.i++;
    S.save();
    renderSession();
    window.scrollTo(0, 0);
  }

  function wordsChecklist(t, idp) {
    if (!t.words) return "";
    const inBank = new Set(S.state.bank.map((b) => b.term.toLowerCase()));
    return `<div class="words"><p class="lbl-sm">Отметь, чего не знал: эти слова уйдут в копилку</p>
      <ul>${t.words.map((w, i) => `<li><label><input type="checkbox" id="${idp}${i}" data-w="${i}" ${inBank.has(w[0].toLowerCase()) ? "checked disabled" : ""}><b>${esc(w[0])}</b><span>${esc(w[1])}</span></label></li>`).join("")}</ul></div>`;
  }
  function collectWords(root, t) {
    let n = 0;
    root.querySelectorAll("input[data-w]:checked:not(:disabled)").forEach((el) => { const w = t.words[+el.dataset.w]; if (S.addBank(w[0], w[1], t.id)) n++; });
    return n;
  }

  function renderTheoryStep(stage, step, run) {
    const t = E.byId[step.id];
    const seen = !!S.state.seenTheory[t.id];
    stage.innerHTML = `
<article class="card theory">
  <header class="task-head">${chip("Новая тема", "sec")}${chip("ступень " + t.stage)}</header>
  <h1>${esc(t.title)}</h1>
  <p class="lead">${esc(t.short)}</p>
  ${seen ? `<details class="refresh"><summary>Освежить правило</summary><div class="rule-body">${t.theory}</div></details>` : `<div class="rule-body">${t.theory}</div>`}
  ${wordsChecklist(t, "tw")}
  <div class="row"><button class="btn primary" data-act="next">${seen ? "К практике →" : "Понятно, к практике →"}</button></div>
</article>`;
    stage.querySelector('[data-act="next"]').onclick = () => {
      const n = collectWords(stage, t);
      if (n) { run.bank += n; toast(`В копилку: ${n}`); }
      S.state.seenTheory[t.id] = S.today();
      run.res.push({ idx: run.i, sec: "theory", theory: true, ok: true });
      run.i++; S.save(); renderSession();
    };
    setTimeout(() => stage.querySelector('[data-act="next"]').focus({ preventScroll: true }), 30);
  }

  // ───────── Письмо (общий компонент) ─────────
  function aiPrompt(o, text) {
    return `Ты преподаватель английского и экзаменатор IELTS. Мой уровень сейчас около B1, цель — C1 / IELTS 8.0.
Задание: ${o.q}${o.cue ? "\nПункты карточки: " + o.cue.join("; ") : ""}${o.need ? "\nТребование: " + o.need : ""}

Мой ответ:
"""
${text}
"""

Разбери на русском:
1) Все ошибки списком: было → стало → короткое объяснение. Особенно проверь мои типичные ошибки: пропуск be, артикли, предлоги (at BMSTU, next year без in, for breakfast), -s в 3-м лице (особенно у второго глагола), форма глагола после would/must/did, время ответа и will после after/when/if, can вместо Present Simple для привычек, кальки с русского, ложные друзья, числа, орфография.
2) Исправленная версия моего текста, по возможности близко к оригиналу.
3) 3–5 слов или конструкций уровня B2–C1, которые сделали бы ответ сильнее, с примером на моём тексте.${o.ielts ? "\n4) Примерная оценка по критериям IELTS (" + (o.part && o.part[0] === "W" ? "Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy" : "Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy") + ") и по одному совету на каждый критерий." : ""}
В конце дай строки для импорта в Quizlet: английская фраза<TAB>перевод — только для моих ошибок и новых фраз.`;
  }

  function highlight(res) {
    let out = "", pos = 0;
    res.issues.forEach((is, i) => {
      out += esc(res.text.slice(pos, is.start)) + `<mark class="err" title="${esc(is.msg)}">${esc(is.text)}<sup>${i + 1}</sup></mark>`;
      pos = is.end;
    });
    return out + esc(res.text.slice(pos));
  }

  // opts: { q, need, model, focus, cue, part, ielts, minutes, words, onDone(text, meta), doneLabel, idp }
  function writer(root, o) {
    const idp = o.idp || "w";
    const draftKey = "draft:" + o.q.slice(0, 80);
    let draft = "";
    try { draft = sessionStorage.getItem(draftKey) || ""; } catch (e) {}
    const target = o.words ? `${o.words[0]}–${o.words[1]} слов` : "3–5 предложений";
    root.innerHTML = `
<article class="card writer">
  ${o.head || ""}
  <h2 class="wq">${esc(o.q)}</h2>
  ${o.cue ? `<ul class="cue">${o.cue.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
  ${o.need ? `<p class="need"><b>Условие:</b> ${esc(o.need)}</p>` : ""}
  ${o.minutes ? `<div class="timer" id="${idp}timer"><span class="t" aria-live="polite">${o.prep ? "1:00" : o.minutes + ":00"}</span><span class="tl">${o.prep ? "подготовка" : "на ответ"}</span><button class="btn small" data-act="timer">Старт</button></div>` : ""}
  <label class="lbl-sm" for="${idp}text">Твой ответ · цель: ${target}</label>
  <textarea id="${idp}text" class="wtext" rows="${o.words && o.words[0] >= 150 ? 12 : 6}" spellcheck="false" placeholder="Пиши по-английски. Ctrl+Enter — проверить.">${esc(draft)}</textarea>
  <div class="row wbar"><span class="muted small" id="${idp}cnt"></span>
    <span class="spacer"></span>
    <button class="btn ghost" data-act="ai">Промпт для проверки в ИИ</button>
    <button class="btn primary" data-act="check">Проверить</button></div>
  <div id="${idp}res"></div>
</article>`;
    const ta = root.querySelector(".wtext"), cnt = root.querySelector(`#${idp}cnt`), resBox = root.querySelector(`#${idp}res`);
    const upd = () => {
      const st = C.checkWriting(ta.value).stats;
      cnt.textContent = `${st.words} слов · ${st.sentences} предл.`;
      try { sessionStorage.setItem(draftKey, ta.value); } catch (e) {}
    };
    ta.addEventListener("input", upd); upd();
    setTimeout(() => ta.focus({ preventScroll: true }), 30);

    // таймер
    let tick = null, left = 0, phase = o.prep ? "prep" : "main";
    function fmt(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
    function startTimer(btn) {
      const tb = root.querySelector(`#${idp}timer`);
      if (tick) { clearInterval(tick); tick = null; btn.textContent = "Старт"; return; }
      if (!left) left = (phase === "prep" ? o.prep : o.minutes) * 60;
      btn.textContent = "Пауза";
      tick = setInterval(() => {
        if (!document.body.contains(tb)) { clearInterval(tick); return; }
        left--;
        tb.querySelector(".t").textContent = fmt(Math.max(left, 0));
        if (left <= 0) {
          clearInterval(tick); tick = null; btn.textContent = "Старт";
          if (phase === "prep") { phase = "main"; left = 0; tb.querySelector(".tl").textContent = "на ответ"; tb.querySelector(".t").textContent = fmt(o.minutes * 60); toast("Подготовка закончилась: говори или пиши"); }
          else { tb.classList.add("over"); tb.querySelector(".tl").textContent = "время вышло"; toast("Время вышло"); }
        }
      }, 1000);
    }

    let lastRes = null;
    function check() {
      const text = ta.value.trim();
      if (text.split(/\s+/).length < 5) { toast("Напиши хотя бы пару предложений"); return; }
      const res = C.checkWriting(text);
      lastRes = res;
      const st = res.stats;
      const focusNew = (o.focus || []).filter((f) => !f.startsWith("e_"));
      const usage = focusNew.map((f) => { const u = C.usage(f, text); return u ? { f, u } : null; }).filter(Boolean);
      const errTopics = E.errorTopics;
      const wordsWarn = o.words && st.words < o.words[0] ? `<p class="warnline">Меньше ${o.words[0]} слов: на экзамене за это снижают оценку.</p>` : "";
      resBox.innerHTML = `
<div class="wres">
  <h3>Автопроверка</h3>
  <div class="hl">${highlight(res)}</div>
  ${res.issues.length ? `<ol class="issues">${res.issues.map((is) => `<li><span class="was">${esc(is.text)}</span>${is.fix ? ` → <span class="now">${esc(is.fix)}</span>` : ""}<span class="why">${esc(is.msg)} <i>${esc(topicTitle(is.topic))}</i></span></li>`).join("")}</ol>`
    : `<p class="okline">Шаблонов твоих типичных ошибок не нашёл. Автопроверка ловит только известные шаблоны, так что сверься с образцом или отправь текст в ИИ.</p>`}
  ${wordsWarn}
  <dl class="wstats">
    <div><dt>слов</dt><dd>${st.words}</dd></div><div><dt>предложений</dt><dd>${st.sentences}</dd></div>
    <div><dt>средняя длина</dt><dd>${st.avgLen}</dd></div><div><dt>разнообразие</dt><dd>${st.variety}%</dd></div>
    <div><dt>связок</dt><dd>${st.linkers}</dd></div>
  </dl>
  ${usage.length ? `<ul class="usage">${usage.map(({ f, u }) => `<li>${u.length ? "✓" : "✗"} <b>${esc(topicTitle(f))}</b>: ${u.length ? `${u.length} × <i>${esc(u.slice(0, 4).join(", "))}</i>` : "не нашёл"}</li>`).join("")}</ul>` : ""}
  ${o.model ? `<details class="model"><summary>Образец ответа</summary><p>${esc(o.model)}</p></details>` : ""}
  <div class="self">
    <p class="lbl-sm">Сверься с образцом: какие ещё свои ошибки нашёл? Эти темы станут появляться чаще.</p>
    <div class="chips">${errTopics.map((t) => `<label class="tog"><input type="checkbox" id="${idp}e_${t.id}" value="${t.id}" ${res.issues.some((i) => i.topic === t.id) ? "checked disabled" : ""}><span>${esc(t.title)}</span></label>`).join("")}</div>
    ${o.need && focusNew.length ? `<p class="lbl-sm">Условие задания выполнено?</p>
    <div class="chips" role="radiogroup">${[["yes", "да"], ["part", "частично"], ["no", "нет"]].map(([v, l]) => `<label class="tog"><input type="radio" name="${idp}need" id="${idp}need_${v}" value="${v}" ${(v === "yes" && usage.every((x) => x.u.length >= 2)) || (v === "no" && usage.some((x) => !x.u.length)) ? "checked" : ""}><span>${l}</span></label>`).join("")}</div>` : ""}
  </div>
  <div class="row"><button class="btn primary" data-act="done">${o.doneLabel || "Сохранить"}</button><button class="btn ghost" data-act="ai">Промпт для ИИ</button></div>
</div>`;
      resBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function done() {
      const text = ta.value.trim();
      const res = lastRes || C.checkWriting(text);
      const flagged = new Set(res.issues.map((i) => i.topic));
      root.querySelectorAll(".self input[type=checkbox]:checked:not(:disabled)").forEach((el) => flagged.add(el.value));
      flagged.forEach((tid) => { if (E.byId[tid]) S.topicResult(tid, false, 1); });
      let added = 0;
      res.issues.forEach((is) => { if (is.fix && S.addBank(is.fix, "было: «" + is.text + "» — " + is.msg, is.topic)) added++; });
      const need = root.querySelector(`input[name="${idp}need"]:checked`);
      const focusNew = (o.focus || []).filter((f) => !f.startsWith("e_"));
      if (need && focusNew[0]) {
        if (need.value === "yes") S.topicResult(focusNew[0], true, 2);
        else if (need.value === "no") S.topicResult(focusNew[0], false, 1);
      }
      S.state.writes.unshift({ at: Date.now(), q: o.q, part: o.part || "", text, issues: res.issues.length, words: res.stats.words });
      S.state.writes = S.state.writes.slice(0, 40);
      S.markDay(); S.save();
      try { sessionStorage.removeItem(draftKey); } catch (e) {}
      if (added) toast(`В копилку: ${added}`);
      o.onDone && o.onDone({ added, issues: res.issues.length });
    }

    root.onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.act === "check") check();
      else if (b.dataset.act === "done") done();
      else if (b.dataset.act === "timer") startTimer(b);
      else if (b.dataset.act === "ai") {
        const text = ta.value.trim();
        if (!text) { toast("Сначала напиши ответ"); return; }
        copyText(aiPrompt(o, text), ta);
      }
    };
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); check(); } });
  }

  function renderWriteStep(stage, step, run) {
    const it = E.items[step.id];
    writer(stage, {
      q: it.q, need: it.need, model: it.model, focus: it.focus, idp: "s",
      head: `<header class="task-head">${chip("Письмо", "sec")}${chip(topicTitle(it.topic))}<span class="qtype">3–5 предложений</span></header>`,
      doneLabel: "Сохранить и к итогу →",
      onDone: ({ added }) => {
        const s = S.state.items[it.id] || { b: 0, d: 0, n: 0, w: 0, l: 0 };
        s.n++; s.l = S.today(); S.state.items[it.id] = s;
        run.bank += added;
        run.res.push({ idx: run.i, sec: "write", write: true, ok: true });
        run.i++; S.save(); renderSession(); window.scrollTo(0, 0);
      }
    });
  }

  // ───────── Итог ─────────
  function renderSummary(stage, run) {
    const res = run.res.filter((r) => r.id && !r.retry);
    const ok = res.filter((r) => r.ok).length;
    const bySec = {};
    res.forEach((r) => { (bySec[r.sec] = bySec[r.sec] || { n: 0, ok: 0 }); bySec[r.sec].n++; if (r.ok) bySec[r.sec].ok++; });
    const changes = Object.keys(run.before).filter((id) => E.byId[id]).map((id) => ({ id, a: run.before[id], b: S.mastery(id) }))
      .filter((c) => Math.abs(c.b - c.a) >= 0.005).sort((x, y) => (y.b - y.a) - (x.b - x.a));
    let passedMsg = "";
    if (run.topic && E.checkPass(run.topic)) {
      const next = E.currentTopic();
      passedMsg = `<div class="banner">Тема «${esc(topicTitle(run.topic))}» пройдена и переходит в повторение.${next ? ` Со следующей тренировки — «${esc(next.title)}».` : ""}</div>`;
    }
    if (!run.saved) {
      run.saved = true;
      S.state.sessions.unshift({ at: Date.now(), type: run.type, topic: run.topic, n: res.length, ok, min: Math.max(1, Math.round((Date.now() - run.started) / 60000)), bank: run.bank });
      S.state.sessions = S.state.sessions.slice(0, 200);
      S.save();
    }
    const acc = res.length ? ok / res.length : 0;
    const t = run.topic ? E.byId[run.topic] : null;
    const tm = t ? S.state.topics[t.id] : null;
    stage.innerHTML = `
<article class="card summary">
  <p class="eyebrow">Итог тренировки · ${Math.max(1, Math.round((Date.now() - run.started) / 60000))} мин</p>
  <h1><span class="big">${pct(acc)}%</span> верно с первой попытки</h1>
  ${passedMsg}
  <dl class="sum-secs">${["warm", "practice"].filter((s) => bySec[s]).map((s) => `<div><dt>${SEC[s].t}</dt><dd>${bySec[s].ok} из ${bySec[s].n}</dd></div>`).join("")}
    <div><dt>В копилку</dt><dd>${run.bank}</dd></div></dl>
  ${changes.length ? `<h2>Как изменился «вес» тем</h2><ul class="changes">${changes.map((c) => `<li><span>${esc(topicTitle(c.id))}</span><span class="meter-wrap">${meter(c.b, false)}</span><span class="delta ${c.b >= c.a ? "up" : "down"}">${pct(c.a)} → ${pct(c.b)}%</span></li>`).join("")}</ul>` : ""}
  ${t && tm && !E.isPassed(t.id) && t.kind === "new" ? `<p class="muted">До прохождения темы «${esc(t.title)}»: освоенность ${pct(tm.m)}% из ${pct(E.PASS.m)}% и ${Math.min(tm.n, E.PASS.n)} из ${E.PASS.n} ответов.</p>` : ""}
  <div class="row">
    <button class="btn primary" data-act="home">На главную</button>
    <button class="btn ghost" data-act="more">Ещё 8 заданий на слабое место</button>
    ${run.bank ? `<a class="btn ghost" href="#bank" data-act="tobank">Открыть копилку</a>` : ""}
  </div>
</article>`;
    stage.onclick = (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      if (b.dataset.act === "home") { S.state.cur = null; S.save(); location.hash = "#today"; }
      if (b.dataset.act === "tobank") { S.state.cur = null; S.save(); }
      if (b.dataset.act === "more") {
        const w = E.errorTopics.concat(E.curriculum.filter((x) => E.ready(x) && S.state.topics[x.id])).sort((a, b2) => E.topicWeight(b2.id) - E.topicWeight(a.id))[0];
        E.buildDrill(w.id, 8); renderSession();
      }
    };
  }

  // ───────── Карта ─────────
  function topicRow(t) {
    const st = E.status(t.id);
    const m = S.mastery(t.id);
    return `<li><a class="trow s-${st}" href="#topic-${hashId(t.id)}">
      <span class="tname">${esc(t.title)}<small>${esc(t.short)}</small></span>
      <span class="tstat">${st === "planned" ? chip(STATUS[st], "muted") : `${st === "error" ? "" : chip(STATUS[st], st)}<span class="tmeter">${meter(m)}</span>`}</span></a></li>`;
  }
  function renderMap() {
    view.innerHTML = `
<header class="page-head"><p class="eyebrow">Дорожная карта</p><h1>От B1 до C1 / IELTS 8.0</h1>
<p class="lead">Темы идут по порядку. Новая тема считается пройденной, когда освоенность ≥ ${pct(E.PASS.m)}% и набралось ${E.PASS.n}+ ответов. После этого она уходит в повторение и иногда попадает в разминку.</p></header>
<section class="block"><div class="block-head"><h2>Личные ошибки</h2><p class="muted">Крутятся в разминке каждый день. Чем ниже освоенность, тем чаще.</p></div>
<ul class="tlist">${E.errorTopics.map(topicRow).join("")}</ul></section>
${EG.stages.map((sg) => { const p = stageProgress(sg.id); return `
<section class="block stage"><div class="block-head"><h2>${esc(sg.title)} <span class="band">${esc(sg.ielts)}</span></h2>
<p class="muted">${esc(sg.goal)} ${p.ready ? `Пройдено ${p.passed} из ${p.ready}.` : "Темы этой ступени пока в разработке."}</p></div>
<ul class="tlist">${E.curriculum.filter((t) => t.stage === sg.id).map(topicRow).join("")}</ul></section>`; }).join("")}`;
  }

  function renderTopic(arg) {
    const t = E.byId[idFromHash(arg)];
    if (!t) { location.hash = "#map"; return; }
    const st = E.status(t.id), ts = S.state.topics[t.id];
    const last = ts ? ts.h.slice(-20) : [];
    const types = {};
    (t.items || []).forEach((it) => { types[it.t] = (types[it.t] || 0) + 1; });
    view.innerHTML = `
<p class="back"><a href="#map">← Карта</a></p>
<article class="card theory">
  <header class="task-head">${chip(t.kind === "error" ? "личная ошибка" : "ступень " + t.stage, "sec")}${st !== "error" ? chip(STATUS[st], st) : ""}</header>
  <h1>${esc(t.title)}</h1><p class="lead">${esc(t.short)}</p>
  ${st === "planned" ? `<p>${esc(t.plan)}</p><p class="muted">Заданий по этой теме пока нет. Тема откроется, когда добавим контент (см. README → «Как добавить тему»).</p>` : `
  <dl class="tstats">
    <div><dt>освоенность</dt><dd>${meter(S.mastery(t.id))}</dd></div>
    <div><dt>ответов</dt><dd>${ts ? ts.n : 0}</dd></div>
    <div><dt>последние 20</dt><dd>${last.length ? pct(last.reduce((a, b) => a + b, 0) / last.length) + "%" : "—"}</dd></div>
    <div><dt>к повторению</dt><dd>${E.dueCount(t.id)}</dd></div>
    <div><dt>заданий</dt><dd>${(t.items || []).length}</dd></div>
  </dl>
  <div class="row">
    <button class="btn primary" data-act="drill">Потренировать 10 заданий</button>
    ${t.kind === "new" && st !== "passed" && st !== "current" ? `<button class="btn ghost" data-act="current">Сделать текущей темой</button>` : ""}
    ${t.kind === "new" && st !== "passed" ? `<button class="btn ghost" data-act="pass">Я это знаю: отметить пройденной</button>` : ""}
    ${st === "passed" ? `<button class="btn ghost" data-act="unpass">Вернуть в изучение</button>` : ""}
  </div>
  <div class="rule-body">${t.theory}</div>
  ${t.words ? wordsChecklist(t, "pw") + `<div class="row"><button class="btn small" data-act="words">Добавить отмеченные в копилку</button></div>` : ""}`}
</article>`;
    view.onclick = (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.dataset.act;
      if (a === "drill") { E.buildDrill(t.id, 10); location.hash = "#session"; }
      if (a === "current") { S.state.current = t.id; S.save(); toast("Теперь это текущая тема"); renderTopic(arg); }
      if (a === "pass") { S.state.passed[t.id] = S.today(); if (S.state.current === t.id) S.state.current = null; S.save(); toast("Отмечено. Тема будет иногда появляться в разминке"); renderTopic(arg); }
      if (a === "unpass") { delete S.state.passed[t.id]; S.state.current = t.id; S.save(); renderTopic(arg); }
      if (a === "words") { const n = collectWords(view, t); toast(n ? `В копилку: ${n}` : "Ничего нового не отмечено"); renderTopic(arg); }
    };
  }

  // ───────── Свободное письмо ─────────
  const FREE = [
    { q: "Describe your typical day in the dorm.", focus: ["e_be", "e_3s", "e_prep", "e_can"] },
    { q: "Tell me about your gym routine. What do you do and why?", focus: ["e_ff", "e_prep", "e_num", "e_calque"] },
    { q: "Why did you choose BMSTU and your programme?", focus: ["e_tense", "e_art", "e_prep"] },
    { q: "What did you do last weekend?", focus: ["e_tense", "e_calque"] },
    { q: "What are your plans for next summer?", focus: ["e_be", "e_tense", "e_modal"] },
    { q: "Tell me about your experience with trading stocks and crypto. What did you learn?", focus: ["e_num", "e_tense", "e_modal"] },
    { q: "Describe a friend of yours: what does he or she do, and what do you usually do together?", focus: ["e_3s", "e_calque", "e_can"] },
    { q: "Which programming language do you like most and why?", focus: ["e_art", "n_comp", "e_ff"] }
  ];
  let freeIdx = null, freeOwn = "";
  function renderFreeWrite() {
    const fromTopics = E.topics.filter(E.ready).flatMap((t) => (t.items || []).filter((it) => it.t === "write" && (E.isPassed(t.id) || S.state.topics[t.id])).map((it) => ({ q: it.q, need: it.need, model: it.model, focus: it.focus })));
    const list = FREE.concat(fromTopics);
    if (freeIdx == null || freeIdx >= list.length) freeIdx = Math.floor(Math.random() * FREE.length);
    view.innerHTML = `
<header class="page-head"><p class="eyebrow">Свободное письмо</p><h1>Письмо с разбором</h1>
<p class="lead">Пиши на любую тему или выбери вопрос. Автопроверка подсветит твои типичные ошибки, а найденное уйдёт в копилку и повлияет на разминку.</p></header>
<div class="row picker">
  <label class="lbl-sm" for="fq">Вопрос</label>
  <select id="fq">${list.map((x, i) => `<option value="${i}" ${i === freeIdx ? "selected" : ""}>${esc(x.q.length > 90 ? x.q.slice(0, 88) + "…" : x.q)}</option>`).join("")}<option value="own" ${freeIdx === -1 ? "selected" : ""}>Своя тема…</option></select>
  <button class="btn small" data-act="rnd">Случайный</button>
</div>
${freeIdx === -1 ? `<div class="row picker"><label class="lbl-sm" for="fown">Своя тема</label><input id="fown" class="line" type="text" value="${esc(freeOwn)}" placeholder="Например: my pet project"></div>` : ""}
<div id="fw"></div>`;
    const sel = view.querySelector("#fq");
    sel.onchange = () => { freeIdx = sel.value === "own" ? -1 : +sel.value; renderFreeWrite(); };
    view.querySelector('[data-act="rnd"]').onclick = () => { freeIdx = Math.floor(Math.random() * list.length); renderFreeWrite(); };
    const own = view.querySelector("#fown");
    if (own) own.onchange = () => { freeOwn = own.value; renderFreeWrite(); };
    const o = freeIdx === -1 ? { q: freeOwn || "Free writing", focus: [] } : list[freeIdx];
    writer(view.querySelector("#fw"), { ...o, idp: "f", onDone: () => { toast("Сохранено"); freeIdx = Math.floor(Math.random() * list.length); renderFreeWrite(); } });
  }

  // ───────── IELTS ─────────
  let ieltsPart = "S1", ieltsIdx = 0;
  function renderIelts() {
    const P = EG.ieltsParts[ieltsPart];
    const list = EG.ielts.filter((x) => x.part === ieltsPart);
    if (ieltsIdx >= list.length) ieltsIdx = 0;
    const cur = list[ieltsIdx];
    view.innerHTML = `
<header class="page-head"><p class="eyebrow">IELTS Academic</p><h1>Формат экзамена</h1>
<p class="lead">Ориентиры: B1 ≈ 4.5–5.5, B2 ≈ 5.5–6.5, C1 ≈ 7.0–8.0. Балл 8.0 — это верх C1: нужны точность почти без ошибок и гибкая лексика. Тренируйся в формате понемногу уже сейчас, особенно Speaking Part 1 и Writing Task 1.</p></header>
<div class="tabs" role="tablist">${Object.entries(EG.ieltsParts).map(([k, v]) => `<button role="tab" aria-selected="${k === ieltsPart}" class="tab ${k === ieltsPart ? "on" : ""}" data-part="${k}">${esc(v.title)}</button>`).join("")}</div>
<p class="muted part-hint">${esc(P.hint)}</p>
<div class="row picker"><label class="lbl-sm" for="iq">Задание</label>
<select id="iq">${list.map((x, i) => `<option value="${i}" ${i === ieltsIdx ? "selected" : ""}>${esc(x.q.length > 90 ? x.q.slice(0, 88) + "…" : x.q)}</option>`).join("")}</select>
<button class="btn small" data-act="rnd">Случайное</button></div>
<div id="iw"></div>
<section class="block criteria"><div class="block-head"><h2>Что оценивают</h2></div>
<dl class="crit">
${ieltsPart[0] === "W" ? `<div><dt>Task ${ieltsPart === "W1" ? "Achievement" : "Response"}</dt><dd>${ieltsPart === "W1" ? "Есть overview с главным трендом, ключевые цифры и сравнения, нет мнений." : "Ясная позиция во всём эссе, каждый аргумент развит и подкреплён примером."}</dd></div>` : `<div><dt>Fluency &amp; Coherence</dt><dd>Говоришь без длинных пауз, мысли связаны: first of all, the main reason is, for example, on the other hand.</dd></div>`}
${ieltsPart[0] === "W" ? `<div><dt>Coherence &amp; Cohesion</dt><dd>Абзацы с одной главной мыслью, разнообразные связки, местоимения вместо повторов.</dd></div>` : ""}
<div><dt>Lexical Resource</dt><dd>Точные слова и коллокации, перефразирование вместо повтора. Для 7+ — менее частотная лексика без ошибок.</dd></div>
<div><dt>Grammatical Range &amp; Accuracy</dt><dd>Смесь простых и сложных предложений (условные, придаточные, пассив). Для 7+ большинство предложений без ошибок.</dd></div>
${ieltsPart[0] === "S" ? `<div><dt>Pronunciation</dt><dd>Понятность, ударения в словах и фразах, интонация. Тренируй вслух: слушай фразу в разделе «На слух» и повторяй (shadowing).</dd></div>` : ""}
</dl></section>`;
    view.querySelectorAll("[data-part]").forEach((b) => { b.onclick = () => { ieltsPart = b.dataset.part; ieltsIdx = 0; renderIelts(); }; });
    view.querySelector("#iq").onchange = (e) => { ieltsIdx = +e.target.value; renderIelts(); };
    view.querySelector('[data-act="rnd"]').onclick = () => { ieltsIdx = Math.floor(Math.random() * list.length); renderIelts(); };
    writer(view.querySelector("#iw"), {
      q: cur.q, cue: cur.cue, model: cur.model, part: ieltsPart, ielts: true, minutes: P.minutes, prep: P.prep, words: P.words, idp: "i",
      focus: ieltsPart[0] === "W" ? ["n_link", "n_comp"] : ["n_link"],
      onDone: () => { toast("Сохранено в историю"); ieltsIdx = (ieltsIdx + 1) % list.length; renderIelts(); }
    });
  }

  // ───────── Копилка ─────────
  let bankMode = "new";
  function tsv(list) { return list.map((b) => `${b.term}\t${b.tr}`).join("\n"); }
  function renderBank() {
    const bank = S.state.bank;
    const fresh = bank.filter((b) => !b.exported);
    const list = bankMode === "new" ? fresh : bank;
    view.innerHTML = `
<header class="page-head"><p class="eyebrow">Копилка</p><h1>${bank.length} ${plural(bank.length, "карточка", "карточки", "карточек")}</h1>
<p class="lead">Сюда попадают только фразы из заданий, где ты ошибся, слова, которые ты отметил как незнакомые, и исправления из письменных ответов. То, что ты уже употребил правильно, сюда не попадает.</p></header>
<section class="card export">
  <h2>Выгрузка в Quizlet</h2>
  <div class="chips" role="radiogroup">
    <label class="tog"><input type="radio" name="bm" id="bm_new" value="new" ${bankMode === "new" ? "checked" : ""}><span>Новые с прошлой выгрузки · ${fresh.length}</span></label>
    <label class="tog"><input type="radio" name="bm" id="bm_all" value="all" ${bankMode === "all" ? "checked" : ""}><span>Все · ${bank.length}</span></label>
  </div>
  <textarea id="tsv" class="mono" rows="6" readonly aria-label="Карточки для Quizlet">${esc(tsv(list))}</textarea>
  <div class="row">
    <button class="btn primary" data-act="copy" ${list.length ? "" : "disabled"}>Скопировать</button>
    <button class="btn ghost" data-act="dl" ${list.length ? "" : "disabled"}>Скачать .txt</button>
    <button class="btn ghost" data-act="mark" ${fresh.length ? "" : "disabled"}>Отметить как выгруженные</button>
  </div>
  <p class="muted small">Quizlet: «Создать» → «Импорт» → вставь текст. Разделитель между термином и определением — «Tab», между карточками — «Новая строка».</p>
</section>
<section class="block">
  <form class="row addform" id="addf">
    <input id="add_term" class="line" type="text" placeholder="Фраза на английском" aria-label="Фраза на английском" required>
    <input id="add_tr" class="line" type="text" placeholder="Перевод или подсказка" aria-label="Перевод">
    <button class="btn" type="submit">Добавить</button>
  </form>
  ${bank.length ? `<div class="table-wrap"><table class="bank"><thead><tr><th>Фраза</th><th>Перевод / подсказка</th><th>Тема</th><th></th></tr></thead><tbody>
  ${bank.map((b, i) => `<tr class="${b.exported ? "exp" : ""}"><td><b>${esc(b.term)}</b>${b.n > 1 ? ` <span class="rep" title="ошибся повторно">×${b.n}</span>` : ""}</td><td>${esc(b.tr)}</td><td class="muted small">${esc(b.topic ? topicTitle(b.topic) : "вручную")}<br>${fmtDate(b.at)}</td><td><button class="btn icon" data-del="${i}" aria-label="Удалить ${esc(b.term)}" title="Удалить">×</button></td></tr>`).join("")}
  </tbody></table></div>` : `<p class="empty">Пока пусто. Пройди тренировку: всё, в чём ошибёшься, окажется здесь.</p>`}
</section>`;
    view.querySelectorAll('input[name="bm"]').forEach((r) => { r.onchange = () => { bankMode = r.value; renderBank(); }; });
    view.querySelector("#addf").onsubmit = (e) => {
      e.preventDefault();
      const t = view.querySelector("#add_term").value, tr = view.querySelector("#add_tr").value;
      if (S.addBank(t, tr, "")) toast("Добавлено"); else toast("Такая фраза уже есть");
      renderBank(); renderNav("bank");
    };
    view.onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.act === "copy") copyText(tsv(list), view.querySelector("#tsv"));
      if (b.dataset.act === "dl") download(`quizlet-${new Date().toISOString().slice(0, 10)}.txt`, tsv(list));
      if (b.dataset.act === "mark") { bank.forEach((x) => { x.exported = true; }); S.save(); toast("Отмечено"); renderBank(); }
      if (b.dataset.del !== undefined) { bank.splice(+b.dataset.del, 1); S.save(); renderBank(); renderNav("bank"); }
    };
  }
  function plural(n, a, b, c) { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? b : c; }

  // ───────── Прогресс и настройки ─────────
  let confirmReset = false;
  function renderStats() {
    const st = S.state;
    const tot = Object.values(st.topics).reduce((a, t) => ({ n: a.n + t.n, ok: a.ok + t.ok }), { n: 0, ok: 0 });
    const rows = E.errorTopics.concat(E.curriculum.filter(E.ready));
    const voices = EG.tts.voices;
    view.innerHTML = `
<header class="page-head"><p class="eyebrow">Прогресс</p><h1>Статистика и настройки</h1></header>
<div class="tiles row-tiles">
  <div class="tile"><span class="num">${S.streak()}</span><span class="lbl">дней подряд</span></div>
  <div class="tile"><span class="num">${st.sessions.length}</span><span class="lbl">тренировок</span></div>
  <div class="tile"><span class="num">${tot.n}</span><span class="lbl">ответов</span></div>
  <div class="tile"><span class="num">${tot.n ? pct(tot.ok / tot.n) : 0}<small>%</small></span><span class="lbl">верно</span></div>
  <div class="tile"><span class="num">${st.writes.length}</span><span class="lbl">текстов</span></div>
</div>
<section class="block"><div class="block-head"><h2>Темы</h2></div>
<div class="table-wrap"><table class="topics-t"><thead><tr><th>Тема</th><th>Освоенность</th><th class="num">Ответов</th><th class="num">Посл. 20</th><th class="num">К повтор.</th></tr></thead><tbody>
${rows.map((t) => { const s = st.topics[t.id]; const h = s ? s.h.slice(-20) : []; return `<tr><td><a href="#topic-${hashId(t.id)}">${esc(t.title)}</a> <span class="muted small">${t.kind === "error" ? "ошибка" : t.stage}${E.isPassed(t.id) ? " · пройдена" : ""}</span></td><td class="mcell">${meter(S.mastery(t.id))}</td><td class="num">${s ? s.n : 0}</td><td class="num">${h.length ? pct(h.reduce((a, b) => a + b, 0) / h.length) + "%" : "—"}</td><td class="num">${E.dueCount(t.id)}</td></tr>`; }).join("")}
</tbody></table></div></section>
<section class="block"><div class="block-head"><h2>История тренировок</h2></div>
${st.sessions.length ? `<div class="table-wrap"><table><thead><tr><th>Дата</th><th>Тип</th><th class="num">Заданий</th><th class="num">Верно</th><th class="num">Мин</th></tr></thead><tbody>
${st.sessions.slice(0, 15).map((s) => `<tr><td>${new Date(s.at).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td><td>${s.type === "daily" ? "дня" : "тема: " + esc(topicTitle(s.topic))}</td><td class="num">${s.n}</td><td class="num">${s.n ? pct(s.ok / s.n) : 0}%</td><td class="num">${s.min}</td></tr>`).join("")}
</tbody></table></div>` : `<p class="empty">Тренировок пока не было.</p>`}</section>
${st.writes.length ? `<section class="block"><div class="block-head"><h2>Письменные ответы</h2></div><ul class="writes">${st.writes.slice(0, 10).map((w) => `<li><details><summary><span class="muted small">${fmtDate(w.at)}${w.part ? " · " + esc(w.part) : ""} · ${w.words} слов · подсказок автопроверки: ${w.issues}</span><br>${esc(w.q)}</summary><p class="wtext-saved">${esc(w.text)}</p></details></li>`).join("")}</ul></section>` : ""}
<section class="block settings"><div class="block-head"><h2>Настройки</h2></div>
<div class="form-grid">
  <label for="set_len">Длина тренировки</label>
  <select id="set_len">${Object.entries({ short: "Короткая · ~15 мин", normal: "Обычная · 20–30 мин", long: "Длинная · 35–45 мин" }).map(([k, v]) => `<option value="${k}" ${st.settings.length === k ? "selected" : ""}>${v}</option>`).join("")}</select>
  <label for="set_theme">Тема оформления</label>
  <select id="set_theme">${Object.entries({ system: "Как в системе", light: "Светлая", dark: "Тёмная" }).map(([k, v]) => `<option value="${k}" ${st.settings.theme === k ? "selected" : ""}>${v}</option>`).join("")}</select>
  <label for="set_voice">Голос озвучки</label>
  <div class="row"><select id="set_voice" ${EG.tts.ok ? "" : "disabled"}><option value="">Автовыбор</option>${voices.map((v) => `<option value="${esc(v.name)}" ${st.settings.voice === v.name ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")}</select>
  <button class="btn small" data-act="voice" ${EG.tts.ok ? "" : "disabled"}>Проверить</button></div>
  <label for="set_rate">Скорость речи</label>
  <div class="row"><input id="set_rate" type="range" min="0.6" max="1.2" step="0.05" value="${st.settings.rate}"><span class="muted small" id="rate_v">${st.settings.rate}</span></div>
</div>
${EG.tts.ok ? "" : `<p class="muted small">Браузер не поддерживает синтез речи: задания на слух покажут перевод вместо звука.</p>`}
</section>
<section class="block"><div class="block-head"><h2>Данные</h2><p class="muted">Прогресс хранится только в этом браузере. Чтобы перенести его на другое устройство или не потерять, сохрани резервную копию.</p></div>
<div class="row">
  <button class="btn" data-act="export">Скачать резервную копию</button>
  <button class="btn ghost" data-act="exportcopy">Скопировать JSON</button>
  <label class="btn ghost" for="imp">Загрузить из файла</label><input id="imp" type="file" accept=".json,application/json" hidden>
</div>
<details class="paste"><summary>Вставить JSON вручную</summary><textarea id="impt" class="mono" rows="4" placeholder="Вставь сюда резервную копию"></textarea><button class="btn small" data-act="importtext">Загрузить</button></details>
<div class="row danger">${confirmReset ? `<span>Удалить весь прогресс и копилку? Это необратимо.</span><button class="btn bad" data-act="reset2">Да, удалить</button><button class="btn ghost" data-act="reset0">Отмена</button>` : `<button class="btn ghost" data-act="reset1">Сбросить прогресс</button>`}</div>
</section>`;
    const q = (s) => view.querySelector(s);
    q("#set_len").onchange = (e) => { st.settings.length = e.target.value; S.save(); toast("Сохранено"); };
    q("#set_theme").onchange = (e) => { st.settings.theme = e.target.value; S.save(); applyTheme(); };
    q("#set_voice").onchange = (e) => { st.settings.voice = e.target.value; S.save(); };
    q("#set_rate").oninput = (e) => { st.settings.rate = +e.target.value; q("#rate_v").textContent = e.target.value; S.save(); };
    q("#imp").onchange = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => importJSON(r.result); r.readAsText(f); };
    view.onclick = (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.dataset.act;
      if (a === "voice") EG.tts.speak("Hi! I'm a second-year student at Bauman University, and I'm interested in data analytics.");
      if (a === "export") download(`english-gym-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(S.state));
      if (a === "exportcopy") copyText(JSON.stringify(S.state));
      if (a === "importtext") importJSON(q("#impt").value);
      if (a === "reset1") { confirmReset = true; renderStats(); }
      if (a === "reset0") { confirmReset = false; renderStats(); }
      if (a === "reset2") { confirmReset = false; S.reset(); toast("Прогресс сброшен"); renderStats(); renderNav("stats"); }
    };
  }
  function importJSON(text) {
    try {
      const s = JSON.parse(text);
      if (!s || s.v !== 1 || !s.topics) throw new Error("bad");
      S.replace(s); applyTheme(); toast("Прогресс загружен"); route();
    } catch (e) { toast("Это не похоже на резервную копию English Gym"); }
  }

  // ───────── Глобальные клавиши ─────────
  document.addEventListener("keydown", (e) => {
    if (!location.hash.startsWith("#session") || !ui) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (!ui.checked && /^[1-9]$/.test(e.key) && tag !== "input" && tag !== "textarea") {
      const btns = view.querySelectorAll(".opt");
      const b = btns[+e.key - 1]; if (b) { e.preventDefault(); b.click(); }
    } else if (ui.checked && e.key === "Enter" && tag !== "textarea" && tag !== "input" && tag !== "button") {
      const n = view.querySelector('[data-act="next"]'); if (n) { e.preventDefault(); n.click(); }
    }
  });

  applyTheme();
  route();
})();
