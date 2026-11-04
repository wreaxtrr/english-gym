/* Уровень B2: уроки по порядку. Новые задания добавляй ТОЛЬКО в конец items.
   Тип rw — «перепиши»: q — исходное предложение, h — что сделать. */
window.EG = window.EG || {};
EG.topics = EG.topics || [];

EG.topics.push(
{
  id: "b2_ppc", stage: "B2", title: "Present Perfect Continuous",
  short: "I've been working on it for… · Simple vs Continuous",
  theory: `
<p><b>have / has been + V-ing</b>: действие началось в прошлом и длится до сих пор (или только что закончилось и видны следы).</p>
<table class="rule">
<tr><td>длительность</td><td>I<b>'ve been learning</b> Python <b>for</b> six months. How long <b>have</b> you <b>been going</b> to the gym?</td></tr>
<tr><td>следы недавнего процесса</td><td>You look tired. <b>Have</b> you <b>been coding</b> all night?</td></tr>
</table>
<p><b>Simple или Continuous?</b> Результат и количество — Simple: I<b>'ve written</b> three queries today. Процесс и длительность — Continuous: I<b>'ve been writing</b> queries all day.</p>
<div class="trap">Глаголы состояния (know, like, believe, own, understand) — только Simple: I've known him for years.<br>«Я учу английский 5 лет» — не Present Simple: ✗ I learn English for 5 years → ✓ I've been learning English for 5 years.</div>`,
  items: [
    { t: "gap", q: "I ___ on this dashboard since Monday, and it's still not finished.", h: "work", a: "have been working", ex: "Процесс идёт до сих пор: have been working." },
    { t: "gap", q: "How long have you ___ to the gym?", h: "go", a: "been going", ex: "How long + have been + -ing." },
    { t: "gap", q: "I'm exhausted: I ___ SQL queries all day.", h: "write", a: "have been writing", ex: "Длительность и следы процесса." },
    { t: "gap", q: "I ___ three SQL queries today.", h: "write", a: "have written", ex: "Количество, результат → Simple." },
    { t: "choice", q: "I ___ my roommate since the first year.", o: ["have been knowing", "have known", "know"], a: 1, ex: "know — глагол состояния, только Simple." },
    { t: "choice", q: "You look tired. ___ all night?", o: ["Have you been coding", "Did you code", "Are you coding"], a: 0, ex: "Видны следы процесса." },
    { t: "choice", q: "We ___ the A/B test for two weeks, but the results aren't significant yet.", o: ["have run", "have been running", "are running"], a: 1, ex: "Процесс длится, for two weeks." },
    { t: "choice", q: "She ___ 20 kg since she started training.", o: ["has been losing", "has lost", "lost"], a: 1, ex: "Результат в цифрах → Simple." },
    { t: "fix", q: "I am learning English for five years.", a: "I have been learning English for five years.", ex: "for + длительность до сейчас → Present Perfect Continuous.", c: ["I've been learning English for five years", "я учу английский пять лет"] },
    { t: "fix", q: "How long are you living in the dorm?", a: ["How long have you been living in the dorm?", "How long have you lived in the dorm?"], ex: "How long … → Present Perfect (Continuous)." },
    { t: "fix", q: "I've been reading three books this month.", a: "I have read three books this month.", ex: "Количество законченного → Simple." },
    { t: "tr", q: "Я учу Python уже полгода.", a: "I have been {learning|studying} Python for {six months|half a year} [now].", ex: "for six months + Continuous." },
    { t: "tr", q: "Сколько ты уже тренируешься?", a: "How long have you been {training|working out|going to the gym}?", ex: "How long have you been…?" },
    { t: "tr", q: "Мы весь день анализировали логи.", a: "We have been {analyzing|looking through|going through} [the] logs all day.", ex: "all day — процесс." },
    { t: "write", q: "IELTS Speaking Part 1: How long have you been studying at university, and what have you been focusing on recently?", need: "Present Perfect Continuous минимум 2 раза и Present Perfect Simple для результата.", focus: ["b2_ppc"], model: "I have been studying at BMSTU for almost two years. Recently I have been focusing on statistics and SQL, because I want to become a data analyst. I have also been working on a small pet project: a dashboard for my gym progress. So far I have built three charts and connected them to my training log." }
  ]
},
{
  id: "b2_narr", stage: "B2", title: "Past Perfect и рассказ",
  short: "had already left · by the time · три прошедших времени",
  theory: `
<p><b>had + V3</b> — «предпрошедшее»: действие случилось <i>раньше</i> другого прошлого.</p>
<table class="rule">
<tr><td>Past Simple</td><td>события по порядку</td><td>I <b>got</b> to the station and <b>bought</b> a ticket.</td></tr>
<tr><td>Past Continuous</td><td>фон</td><td>It <b>was raining</b>, and people <b>were rushing</b>.</td></tr>
<tr><td>Past Perfect</td><td>то, что было ещё раньше</td><td>The train <b>had</b> already <b>left</b>.</td></tr>
<tr><td>Past Perfect Continuous</td><td>долгий процесс до момента в прошлом</td><td>I <b>had been waiting</b> for an hour when he called.</td></tr>
</table>
<p>Сигналы: by the time, already, before, never … before, when (= к тому моменту).</p>
<div class="trap">После after / before порядок и так понятен, поэтому Past Perfect не обязателен: After I cleaned the data, I built the model — тоже верно.<br>В косвенной речи и после «I realised / I found out» Past Perfect нужен: I realised I <b>had forgotten</b> my pass.</div>`,
  items: [
    { t: "gap", q: "When I got to the lecture hall, the lecture had already ___.", h: "start", a: "started", ex: "had + V3." },
    { t: "gap", q: "Before I came to BMSTU, I had never ___ in a dorm.", h: "live", a: "lived", ex: "Опыт до момента в прошлом." },
    { t: "gap", q: "By the time we finished the project, the deadline ___.", h: "pass", a: "had passed", ex: "By the time → Past Perfect." },
    { t: "gap", q: "I couldn't log in because I ___ my password.", h: "forget", a: "had forgotten", ex: "Забыл раньше, чем пытался войти." },
    { t: "choice", q: "When I checked the dashboard, someone ___ the filters.", o: ["changed", "had changed", "was changing"], a: 1, ex: "Изменили до проверки." },
    { t: "choice", q: "I ___ for two hours when my roommate finally came home.", o: ["had been waiting", "waited", "have waited"], a: 0, ex: "Долгий процесс до момента в прошлом." },
    { t: "choice", q: "After I ___ the data, I built the model.", o: ["cleaned", "had cleaned", "both are correct"], a: 2, ex: "after уже задаёт порядок: оба варианта верны." },
    { t: "choice", q: "I was nervous because I ___ an interview in English before.", o: ["never had", "had never had", "have never had"], a: 1, ex: "Опыт до момента в прошлом." },
    { t: "fix", q: "When I arrived, the train already left.", a: "When I arrived, the train had already left.", ex: "Поезд ушёл раньше: had left." },
    { t: "fix", q: "I had went to the gym before the lecture.", a: "I had gone to the gym before the lecture.", ex: "go — went — gone." },
    { t: "fix", q: "I realised that I have left my laptop in the lab.", a: "I realised that I had left my laptop in the lab.", ex: "После realised (прошлое) → had left." },
    { t: "tr", q: "Когда я проснулся, сосед уже ушёл на пары.", a: "When I woke up, my {roommate|neighbour} had already {left for|gone to} {classes|class|university|lectures}.", ex: "had already left." },
    { t: "tr", q: "До стажировки я никогда не видел столько данных.", a: ["I had never seen so much data before {my|the} internship.", "Before {my|the} internship, I had never seen so much data."], ex: "had never seen." },
    { t: "tr", q: "К тому времени, как я пришёл, они уже начали.", a: "By the time I {arrived|came|got there}, they had already {started|begun}.", ex: "By the time + had already." },
    { t: "write", q: "IELTS Speaking Part 2: Describe a time when something went wrong but ended well.", need: "Все три времени: Past Simple (события), Past Continuous (фон), Past Perfect (что было раньше).", focus: ["b2_narr"], model: "Last winter I was preparing for my first interview at a bank. On the day of the interview it was snowing heavily, and the metro was moving very slowly. When I finally arrived, the interviewer had already started with another candidate. I thought I had lost my chance, but she agreed to see me an hour later. The interview went well, and two weeks later I got an offer." }
  ]
},
{
  id: "b2_passive", stage: "B2", title: "Пассивный залог",
  short: "the data was collected · has been tested · is being updated",
  theory: `
<p><b>be + V3</b>. Важно действие и результат, а не кто сделал. Это главный инструмент отчётов и IELTS Task 1.</p>
<table class="rule">
<tr><td>Present</td><td>The metric <b>is calculated</b> daily.</td></tr>
<tr><td>Past</td><td>The data <b>was collected</b> in May.</td></tr>
<tr><td>Present Perfect</td><td>The feature <b>has been tested</b>.</td></tr>
<tr><td>Continuous</td><td>The dashboard <b>is being updated</b>.</td></tr>
<tr><td>Future / модальные</td><td>Results <b>will be presented</b>. Reports <b>must be submitted</b>.</td></tr>
<tr><td>безличные</td><td><b>It was found that</b>… BMSTU <b>is said to be</b> prestigious.</td></tr>
</table>
<p>Исполнителя добавляют через <b>by</b>, только если он важен.</p>
<div class="trap">✗ The experiment conducted in May → ✓ was conducted (без be — это уже не пассив). ✗ was answer → ✓ was answered.</div>`,
  items: [
    { t: "gap", q: "The data ___ from three sources last month.", h: "collect", a: "was collected", ex: "Past Simple Passive." },
    { t: "gap", q: "Our app ___ by more than 50,000 people every day.", h: "use", a: "is used", ex: "Present Simple Passive." },
    { t: "gap", q: "The new feature ___ yet.", h: "not test", a: ["has not been tested", "hasn't been tested"], ex: "yet → Present Perfect Passive." },
    { t: "gap", q: "The results ___ at the meeting tomorrow.", h: "present", a: "will be presented", ex: "Future Passive." },
    { t: "gap", q: "The dashboard ___ right now, so it may be slow.", h: "update", a: "is being updated", ex: "Present Continuous Passive." },
    { t: "choice", q: "The BMSTU main building ___ in the 18th century.", o: ["built", "was built", "has built"], a: 1, ex: "was built." },
    { t: "choice", q: "All reports must ___ by Friday.", o: ["submit", "be submitted", "been submitted"], a: 1, ex: "Модальный + be + V3." },
    { t: "choice", q: "It ___ that the new button increased conversion.", o: ["was found", "found", "was finding"], a: 0, ex: "Безличная конструкция It was found that…" },
    { t: "fix", q: "The experiment conducted in May.", a: "The experiment was conducted in May.", ex: "Нужен be." },
    { t: "fix", q: "The survey was answer by 300 students.", a: "The survey was answered by 300 students.", ex: "V3: answered." },
    { t: "fix", q: "The model has been train on last year's data.", a: "The model has been trained on last year's data.", ex: "V3: trained." },
    { t: "tr", q: "Результаты были проанализированы в Python.", a: "The results were {analyzed|processed} {in|with|using} Python.", ex: "were analysed." },
    { t: "tr", q: "Эта метрика рассчитывается каждый день.", a: "This metric is {calculated|computed|updated} every day.", ex: "is calculated." },
    { t: "tr", q: "Мне предложили стажировку.", a: ["I was offered an internship.", "I have been offered an internship."], ex: "Пассив с человеком: I was offered.", c: ["I was offered an internship", "мне предложили стажировку"] },
    { t: "rw", q: "Researchers collected the data in 2024.", h: "Перепиши в пассиве", a: "The data {was|were} collected [by researchers] in 2024.", ex: "Объект становится подлежащим." },
    { t: "write", q: "IELTS Task 1 (process): Describe how data for a dashboard is prepared: it is collected, cleaned, aggregated and visualised.", need: "Пассив минимум 4 раза + слова последовательности (first, then, after that, finally).", focus: ["b2_passive"], model: "First, raw events are collected from the mobile app and the website. Then the data is cleaned: duplicates are removed and missing values are filled in. After that, the events are aggregated by day and by platform. Finally, the results are visualised in a dashboard, which is updated every morning." }
  ]
},
{
  id: "b2_rel", stage: "B2", title: "Придаточные определительные",
  short: "who / which / that / whose / where · запятые",
  theory: `
<table class="rule">
<tr><td><b>who</b></td><td>люди</td><td>The analyst <b>who</b> built it left.</td></tr>
<tr><td><b>which</b></td><td>вещи</td><td>The script <b>which</b> cleans the data…</td></tr>
<tr><td><b>that</b></td><td>люди и вещи, только без запятых</td><td>The course <b>that</b> I'm taking…</td></tr>
<tr><td><b>whose</b></td><td>чей</td><td>My friend, <b>whose</b> father is a trader…</td></tr>
<tr><td><b>where / when</b></td><td>место / время</td><td>the gym <b>where</b> I train · the day <b>when</b> I got an offer</td></tr>
</table>
<p><b>Без запятых</b> (defining): уточняет, о ком речь. <b>С запятыми</b> (non-defining): доп. информация, that нельзя: BMSTU, <b>which</b> was founded in 1830, …</p>
<p>Если слово — дополнение, who/which/that можно опустить: the course (that) I took. Предлог уходит в конец: the team I work <b>with</b>.</p>
<div class="trap">✗ the project what I told you about → ✓ the project (that) I told you about.</div>`,
  items: [
    { t: "choice", q: "The analyst ___ built this dashboard has left the company.", o: ["who", "which", "whose"], a: 0, ex: "Человек → who." },
    { t: "choice", q: "This is the script ___ cleans the raw data.", o: ["who", "which", "where"], a: 1, ex: "Вещь → which / that." },
    { t: "choice", q: "That's the gym ___ I train every morning.", o: ["which", "where", "when"], a: 1, ex: "Место → where." },
    { t: "choice", q: "My friend, ___ father is a trader, taught me technical analysis.", o: ["who", "whose", "which"], a: 1, ex: "Чей → whose." },
    { t: "choice", q: "BMSTU, ___ was founded in 1830, is one of the oldest technical universities in Russia.", o: ["that", "which", "what"], a: 1, ex: "С запятыми that нельзя." },
    { t: "gap", q: "I remember the day ___ I got my first job offer.", a: ["when", "that"], ex: "Время → when." },
    { t: "gap", q: "The course ___ I'm taking now is about statistics.", h: "который", a: ["that", "which"], ex: "Можно и опустить: The course I'm taking…" },
    { t: "fix", q: "The person which helped me is my TA.", a: "The person {who|that} helped me is my TA.", ex: "Человек → who / that." },
    { t: "fix", q: "Python, that I use every day, is easy to read.", a: "Python, which I use every day, is easy to read.", ex: "С запятыми → which." },
    { t: "fix", q: "This is the project what I told you about.", a: ["This is the project {that|which} I told you about.", "This is the project I told you about."], ex: "what здесь не работает." },
    { t: "tr", q: "Это компания, в которой я хочу работать.", a: ["This is the company {where|that|which} I want to work [for|at].", "This is the company I want to work {for|at}."], ex: "the company I want to work for." },
    { t: "tr", q: "Человек, чей код я ревьюил, — мой одногруппник.", a: "The person whose code I reviewed is my {groupmate|classmate}.", ex: "whose." },
    { t: "tr", q: "Мой сосед, который учится на физике, всегда помогает мне с матаном.", a: "My {roommate|neighbour}, who studies physics, always helps me with calculus.", ex: "Non-defining → запятые + who." },
    { t: "choice", q: "У меня один брат. Какой вариант верный?", o: ["My brother who lives in Kazan is a developer.", "My brother, who lives in Kazan, is a developer."], a: 1, ex: "Брат один — придаточное лишь добавляет информацию, нужны запятые." },
    { t: "write", q: "Describe a tool or app that you use every day. Who made it, what does it do, and why do you like it?", need: "Минимум 3 придаточных (who / which / that / where), одно с запятыми.", focus: ["b2_rel"], model: "The app that I use most is a training log which tracks all my workouts. It was made by a small team from Saint Petersburg, whose founder is a former powerlifter. The feature that I like most is a chart which shows my progress for each exercise. I usually open it in the gym where I train, between sets." }
  ]
},
{
  id: "b2_ger", stage: "B2", title: "Герундий или инфинитив",
  short: "enjoy doing · decide to do · stop doing vs stop to do",
  theory: `
<table class="rule">
<tr><td><b>+ -ing</b></td><td>enjoy, avoid, finish, mind, consider, suggest, keep, give up, can't stand, look forward to</td></tr>
<tr><td><b>+ to + V</b></td><td>want, decide, plan, hope, manage, refuse, afford, agree, promise, learn, would like</td></tr>
<tr><td>после предлога</td><td>всегда -ing: interested <b>in learning</b>, good <b>at explaining</b>, <b>before starting</b>, thank you <b>for giving</b></td></tr>
</table>
<p><b>Меняется смысл:</b></p>
<ul>
<li>stop <b>doing</b> — перестать; stop <b>to do</b> — остановиться, чтобы сделать.</li>
<li>remember <b>doing</b> — помнить, что делал; remember <b>to do</b> — не забыть сделать.</li>
<li>try <b>doing</b> — попробовать как способ; try <b>to do</b> — стараться, пытаться.</li>
</ul>
<div class="trap">look forward to <b>meeting</b> you: здесь to — предлог, поэтому -ing.</div>`,
  items: [
    { t: "gap", q: "I enjoy ___ complex SQL problems.", h: "solve", a: "solving", ex: "enjoy + -ing." },
    { t: "gap", q: "We decided ___ the experiment for another week.", h: "extend", a: "to extend", ex: "decide + to." },
    { t: "gap", q: "I'm looking forward to ___ from you.", h: "hear", a: "hearing", ex: "look forward to + -ing.", c: ["I look forward to hearing from you", "жду вашего ответа"] },
    { t: "gap", q: "She managed ___ the bug before the release.", h: "fix", a: "to fix", ex: "manage + to." },
    { t: "gap", q: "I can't afford ___ another course right now.", h: "buy", a: "to buy", ex: "afford + to." },
    { t: "gap", q: "Have you considered ___ for a master's abroad?", h: "apply", a: "applying", ex: "consider + -ing." },
    { t: "choice", q: "I stopped ___ crypto when I lost half of my savings.", o: ["trading", "to trade"], a: 0, ex: "Перестал → stop + -ing." },
    { t: "choice", q: "On the way to the dorm I stopped ___ some groceries.", o: ["buying", "to buy"], a: 1, ex: "Остановился, чтобы → stop + to." },
    { t: "choice", q: "Remember ___ your code before you push it.", o: ["testing", "to test"], a: 1, ex: "Не забудь сделать → to." },
    { t: "choice", q: "I remember ___ my first line of code in Pascal.", o: ["writing", "to write"], a: 0, ex: "Помню, как делал → -ing." },
    { t: "fix", q: "I'm interested in to work with product data.", a: "I am interested in working with product data.", ex: "После предлога → -ing." },
    { t: "fix", q: "I avoid to eat sugar before training.", a: "I avoid eating sugar before training.", ex: "avoid + -ing." },
    { t: "fix", q: "Thank you for give me this opportunity.", a: "Thank you for giving me this opportunity.", ex: "for + -ing." },
    { t: "tr", q: "Я с нетерпением жду начала стажировки.", a: "I am looking forward to starting {my|the} internship.", ex: "look forward to + -ing." },
    { t: "tr", q: "Я бросил есть фастфуд.", a: "I {gave up|stopped|quit} eating fast food.", ex: "give up / stop + -ing." },
    { t: "write", q: "IELTS Speaking Part 1: What do you enjoy doing in your free time, and what would you like to try in the future?", need: "Минимум 3 формы -ing (после глаголов или предлогов) и 2 формы to + глагол.", focus: ["b2_ger"], model: "In my free time I enjoy lifting weights and reading about personal finance. I also like hanging out with friends in the dorm kitchen. In the future I would like to try rock climbing, because it looks like a great way to build grip strength. I'm also planning to learn Spanish, but I keep putting it off." }
  ]
},
{
  id: "b2_cond3", stage: "B2", title: "Условные 3, смешанные и wish",
  short: "If I had known… · I wish I were… · If only",
  theory: `
<table class="rule">
<tr><td><b>3-й тип</b> — прошлое, которое не случилось</td><td>If I <b>had known</b>, I <b>would have helped</b>.</td></tr>
<tr><td><b>смешанный</b> — прошлое влияет на сейчас</td><td>If I <b>had started</b> earlier, I <b>would be</b> fluent now.</td></tr>
<tr><td><b>wish + Past</b> — хотелось бы иначе сейчас</td><td>I wish I <b>had</b> more time. I wish I <b>were</b> taller.</td></tr>
<tr><td><b>wish + had V3</b> — сожаление о прошлом</td><td>I wish I <b>had bought</b> Bitcoin in 2015.</td></tr>
<tr><td><b>wish + would</b> — раздражение, хочу, чтобы кто-то изменился</td><td>I wish my roommate <b>would stop</b> playing music at night.</td></tr>
</table>
<p><b>If only</b> = wish, но эмоциональнее: If only I had slept more!</p>
<div class="trap">В части с if нет would: ✗ If I would have known → ✓ If I had known.</div>`,
  items: [
    { t: "gap", q: "If I had started English earlier, I ___ fluent by now.", h: "be", a: "would be", ex: "Смешанный: прошлое → сейчас." },
    { t: "gap", q: "If we had checked the logs, we ___ the bug.", h: "find", a: "would have found", ex: "3-й тип." },
    { t: "gap", q: "If I ___ about the deadline, I would have started earlier.", h: "know", a: "had known", ex: "if + had V3." },
    { t: "gap", q: "I wish I ___ more free time.", h: "have", a: "had", ex: "wish + Past (сейчас)." },
    { t: "gap", q: "I wish I ___ Bitcoin in 2015.", h: "buy", a: "had bought", ex: "wish + had V3 (прошлое).", c: ["I wish I had bought…", "жаль, что я не купил…"] },
    { t: "choice", q: "If I hadn't sold my shares, I ___ much richer now.", o: ["would have been", "would be", "will be"], a: 1, ex: "now → смешанный: would be." },
    { t: "choice", q: "If she had prepared better, she ___ the interview.", o: ["would pass", "would have passed", "had passed"], a: 1, ex: "3-й тип." },
    { t: "choice", q: "I wish my roommate ___ playing music at 2 a.m.", o: ["stopped", "would stop", "stops"], a: 1, ex: "Раздражение → wish + would." },
    { t: "fix", q: "If I would have known, I would have helped you.", a: "If I had known, I would have helped you.", ex: "В if-части — had known." },
    { t: "fix", q: "I wish I have more time for sport.", a: "I wish I had more time for sport.", ex: "wish + Past." },
    { t: "fix", q: "If we had launched earlier, we would get more users last year.", a: "If we had launched earlier, we would have {got|gotten} more users last year.", ex: "last year → would have + V3." },
    { t: "tr", q: "Если бы я не проспал, я бы успел на экзамен.", a: "If I hadn't overslept, I would have {made it to|got to|been on time for|arrived in time for} the exam.", ex: "3-й тип." },
    { t: "tr", q: "Жаль, что я не выучил английский в школе.", a: ["I wish I had {learned|studied} English at school.", "If only I had {learned|studied} English at school."], ex: "wish + had V3." },
    { t: "tr", q: "Если бы я тогда выбрал другой вуз, я бы сейчас жил дома.", a: "If I had chosen {another|a different} university [back then|then], I would {live|be living} at home now.", ex: "Смешанный тип." },
    { t: "write", q: "IELTS Speaking Part 2: Describe a decision that changed your life. What would have happened if you had chosen differently?", need: "3-й или смешанный тип минимум 2 раза и одна фраза с wish.", focus: ["b2_cond3"], model: "Two years ago I decided to apply to BMSTU instead of a university in my hometown. If I had stayed at home, I would have saved a lot of money, but I wouldn't be studying such strong maths now. I also wouldn't have met my best friends in the dorm. Sometimes I wish I had chosen a programme with more data science, but overall I don't regret my decision." }
  ]
},
{
  id: "b2_used", stage: "B2", title: "used to / be used to / get used to",
  short: "I used to trade · I'm used to waking up early",
  theory: `
<table class="rule">
<tr><td><b>used to + V</b></td><td>раньше (теперь нет)</td><td>I <b>used to trade</b> crypto. I <b>didn't use to</b> like vegetables.</td></tr>
<tr><td><b>would + V</b></td><td>повторялось в прошлом (только действия, не состояния)</td><td>My dad <b>would take</b> me fishing every summer.</td></tr>
<tr><td><b>be used to + -ing / сущ.</b></td><td>привык</td><td>I<b>'m used to waking</b> up early.</td></tr>
<tr><td><b>get used to + -ing / сущ.</b></td><td>привыкать</td><td>It's hard to <b>get used to</b> dorm life.</td></tr>
</table>
<div class="trap">Отрицание и вопрос — без d: didn't <b>use</b> to, Did you <b>use</b> to…? В be used to после to идёт -ing: ✗ I'm used to wake up.</div>`,
  items: [
    { t: "gap", q: "I ___ crypto every day, but now I only invest in index funds.", h: "раньше торговал", a: "used to trade", ex: "Прошлая привычка → used to." },
    { t: "choice", q: "I'm ___ to sharing a room now, but it was hard at first.", o: ["use", "used", "using"], a: 1, ex: "be used to." },
    { t: "choice", q: "It took me a month to get used to ___ up at 6 a.m.", o: ["wake", "waking", "woke"], a: 1, ex: "get used to + -ing." },
    { t: "choice", q: "Did you ___ play any sports at school?", o: ["use to", "used to", "using to"], a: 0, ex: "Вопрос: Did you use to…?" },
    { t: "choice", q: "When I was a kid, my dad ___ take me fishing every summer.", o: ["would", "was", "is used to"], a: 0, ex: "Повторяющееся действие → would." },
    { t: "choice", q: "I ___ live in Tula before I moved to Moscow.", o: ["would", "used to", "am used to"], a: 1, ex: "live — состояние, would нельзя." },
    { t: "fix", q: "I am used to wake up early.", a: "I am used to waking up early.", ex: "be used to + -ing." },
    { t: "fix", q: "I didn't used to like vegetables.", a: "I didn't use to like vegetables.", ex: "didn't use to." },
    { t: "fix", q: "I use to go to the gym at night when I was at school.", a: "I used to go to the gym at night when I was at school.", ex: "В утверждении — used to." },
    { t: "tr", q: "Раньше я жил с родителями.", a: "I used to live with my parents.", ex: "used to." },
    { t: "tr", q: "Я уже привык к московскому метро.", a: ["I am already used to the Moscow {metro|subway}.", "I have already {got|gotten} used to the Moscow {metro|subway}."], ex: "be / get used to + сущ." },
    { t: "tr", q: "Сложно привыкнуть к жизни в общаге.", a: "It is {hard|difficult} to get used to {living in a dorm|dorm life|life in a dorm|living in the dorm}.", ex: "get used to." },
    { t: "write", q: "IELTS Speaking Part 1: How has your daily life changed since you moved to Moscow?", need: "used to минимум 2 раза и be / get used to минимум 1 раз.", focus: ["b2_used"], model: "Before I moved to Moscow, I used to live with my parents and walk to school. My mum used to cook for me every day. Now I live in a dorm and cook for myself, which was strange at first. I'm already used to the metro, but I still haven't got used to sharing a room." }
  ]
},
{
  id: "b2_deduct", stage: "B2", title: "Модальные глаголы предположения",
  short: "must be · can't have done · might have · should have",
  theory: `
<table class="rule">
<tr><td></td><td><b>сейчас</b></td><td><b>о прошлом</b></td></tr>
<tr><td>уверен, что да</td><td>It <b>must be</b> a bug.</td><td>Someone <b>must have changed</b> it.</td></tr>
<tr><td>уверен, что нет</td><td>He <b>can't be</b> at the gym.</td><td>He <b>can't have written</b> this.</td></tr>
<tr><td>возможно</td><td>It <b>might / may / could be</b> wrong.</td><td>I <b>might have left</b> it in the lab.</td></tr>
<tr><td>следовало (но не сделал)</td><td></td><td>You <b>should have told</b> me.</td></tr>
</table>
<div class="trap">О прошлом всегда <b>модальный + have + V3</b>: ✗ must be forgot → ✓ must have forgotten. Отрицание уверенности — can't, а не mustn't.</div>`,
  items: [
    { t: "choice", q: "The query returns no rows. The filter ___ wrong.", o: ["must be", "can't be", "must have"], a: 0, ex: "Уверенность сейчас → must be." },
    { t: "choice", q: "He ___ be at the gym now: it's closed on Sundays.", o: ["must", "can't", "might"], a: 1, ex: "Уверен, что нет → can't." },
    { t: "choice", q: "I'm not sure, but I ___ have left my keys in the lab.", o: ["must", "might", "should"], a: 1, ex: "Не уверен → might have." },
    { t: "gap", q: "The server is down. Someone must have ___ the config.", h: "change", a: "changed", ex: "must have + V3." },
    { t: "gap", q: "She got 100 points. She ___ have studied a lot.", h: "наверняка", a: "must", ex: "Уверенность о прошлом." },
    { t: "gap", q: "You ___ have told me about the deadline! Now it's too late.", h: "следовало", a: "should", ex: "should have — упрёк.", c: ["you should have told me", "тебе следовало мне сказать"] },
    { t: "choice", q: "Conversion dropped right after we released the update. The update ___ caused it.", o: ["must have", "can't have", "should have"], a: 0, ex: "Логичный вывод → must have." },
    { t: "choice", q: "He ___ have written this code: he doesn't know Go.", o: ["must", "can't", "should"], a: 1, ex: "Невозможно → can't have." },
    { t: "fix", q: "She must be forgot about the meeting.", a: "She must have forgotten about the meeting.", ex: "must have + V3." },
    { t: "fix", q: "It can't have be him: he was in Kazan.", a: "It can't have been him: he was in Kazan.", ex: "have been." },
    { t: "tr", q: "Ты, наверное, очень устал после смены.", a: "You must be very tired after {the|your} shift.", ex: "must be." },
    { t: "tr", q: "Возможно, он не получил моё письмо.", a: "He {might|may} not have {received|got|gotten} my {email|letter|message}.", ex: "might not have + V3." },
    { t: "tr", q: "Мне следовало начать готовиться раньше.", a: "I should have started {preparing|to prepare} earlier.", ex: "should have started." },
    { t: "write", q: "Data case: Daily active users dropped by 20% yesterday. Suggest possible explanations.", need: "must / might / could / can't have минимум 3 раза.", focus: ["b2_deduct"], model: "The drop is very sharp, so something must have happened on our side. The new release might have broken the login on some devices. It can't have been seasonality, because yesterday was a normal Tuesday. Alternatively, the tracking could have stopped working, so the users might still be there. I would check the release logs first." }
  ]
},
{
  id: "b2_reported", stage: "B2", title: "Косвенная речь",
  short: "He said that he had… · asked me if… · told me not to",
  theory: `
<p>После said / told время обычно «сдвигается назад»:</p>
<table class="rule">
<tr><td>am / is → was</td><td>do → did</td><td>did / have done → had done</td><td>will → would · can → could</td></tr>
</table>
<ul>
<li><b>say</b> (something) vs <b>tell</b> somebody: He said that… / He told <b>me</b> that…</li>
<li>Вопросы — прямой порядок слов: She asked <b>where I studied</b> (✗ where did I study). Да/нет: asked <b>if / whether</b>…</li>
<li>Просьбы и советы: told me <b>to</b> sleep more, told me <b>not to</b> push.</li>
<li>Глаголы: suggest + -ing, admit + -ing, deny + -ing, promise to, refuse to, recommend + -ing.</li>
</ul>`,
  items: [
    { t: "gap", q: "'I'm tired,' he said. → He said that he ___ tired.", a: "was", ex: "am → was." },
    { t: "gap", q: "'We will launch next week.' → She said they ___ launch the following week.", a: "would", ex: "will → would." },
    { t: "gap", q: "'I have finished the report.' → He told me he ___ the report.", a: "had finished", ex: "have done → had done." },
    { t: "choice", q: "The recruiter asked me where ___.", o: ["did I study", "I studied", "do I study"], a: 1, ex: "Прямой порядок слов." },
    { t: "choice", q: "She asked ___ I had any experience with SQL.", o: ["that", "if", "what"], a: 1, ex: "Да/нет → if / whether." },
    { t: "choice", q: "My coach ___ me to keep my back straight.", o: ["said", "told", "spoke"], a: 1, ex: "tell somebody to do." },
    { t: "choice", q: "He suggested ___ the experiment for another week.", o: ["to run", "running", "run"], a: 1, ex: "suggest + -ing." },
    { t: "fix", q: "He said me that he would come.", a: ["He told me that he would come.", "He said that he would come."], ex: "said me нельзя: told me или said that." },
    { t: "fix", q: "The interviewer asked what is my biggest weakness.", a: "The interviewer asked what my biggest weakness was.", ex: "Прямой порядок + сдвиг времени." },
    { t: "fix", q: "She told me don't push to the main branch.", a: "She told me not to push to the main branch.", ex: "told me not to." },
    { t: "tr", q: "Он сказал, что уже отправил код.", a: "He said [that] he had already sent the code.", ex: "had sent." },
    { t: "tr", q: "Она спросила, сколько лет я учу Python.", a: "She asked [me] how long I had been {learning|studying} Python.", ex: "Прямой порядок, сдвиг времени." },
    { t: "tr", q: "Тренер посоветовал мне больше спать.", a: ["My coach advised me to {sleep more|get more sleep}.", "My coach told me to {sleep more|get more sleep}."], ex: "advise sb to do." },
    { t: "write", q: "Describe a conversation with a teacher, coach or interviewer. What did they say and ask you?", need: "Косвенная речь минимум 3 раза: said that, asked if / what, told me to.", focus: ["b2_reported"], model: "At my first interview, the recruiter asked me why I wanted to work in analytics. I said that I had always liked finding patterns in data. Then she asked if I had ever run an A/B test. I admitted that I had only done it in a course, and she told me not to worry about it. At the end she said they would contact me within a week." }
  ]
},
{
  id: "b2_future", stage: "B2", title: "Будущее: все формы",
  short: "will be doing · will have done · be about to · расписание",
  theory: `
<table class="rule">
<tr><td>will</td><td>решение сейчас, прогноз-мнение</td><td>I think AI <b>will</b> change analytics.</td></tr>
<tr><td>going to</td><td>план; прогноз по признакам</td><td>I'm <b>going to</b> apply. Look, it's <b>going to</b> rain.</td></tr>
<tr><td>Present Continuous</td><td>договорённость</td><td>I'm <b>meeting</b> my supervisor at 3.</td></tr>
<tr><td>Present Simple</td><td>расписание</td><td>The train <b>leaves</b> at 7:40.</td></tr>
<tr><td>Future Continuous</td><td>процесс в момент будущего</td><td>This time tomorrow I'<b>ll be defending</b> my thesis.</td></tr>
<tr><td>Future Perfect</td><td>сделано к моменту</td><td>By June I'<b>ll have passed</b> all exams.</td></tr>
<tr><td>be about to</td><td>вот-вот</td><td>The lecture <b>is about to</b> start.</td></tr>
</table>`,
  items: [
    { t: "choice", q: "This time tomorrow I ___ my thesis.", o: ["will defend", "will be defending", "defend"], a: 1, ex: "Процесс в момент будущего." },
    { t: "choice", q: "By June I ___ all my exams.", o: ["will pass", "will have passed", "am passing"], a: 1, ex: "By + момент → Future Perfect." },
    { t: "choice", q: "Hurry up, the lecture ___ start!", o: ["is about to", "will have", "is going"], a: 0, ex: "Вот-вот → be about to." },
    { t: "choice", q: "I ___ my supervisor at 3 p.m. tomorrow: we've already agreed.", o: ["will meet", "am meeting", "meet"], a: 1, ex: "Договорённость → Present Continuous." },
    { t: "choice", q: "The train ___ at 7:40 every morning.", o: ["leaves", "is leaving", "will leave"], a: 0, ex: "Расписание → Present Simple." },
    { t: "choice", q: "Look at those clouds: it ___ rain.", o: ["will", "is going to", "is about"], a: 1, ex: "Прогноз по признакам → going to." },
    { t: "gap", q: "By the end of the year, I ___ at the gym for three years.", h: "train", a: "will have been training", ex: "Future Perfect Continuous: длительность к моменту." },
    { t: "gap", q: "Don't call me at 8: I ___ out.", h: "work", a: "will be working", ex: "Процесс в момент будущего." },
    { t: "gap", q: "By 2028 I ___ my bachelor's degree.", h: "get", a: ["will have got", "will have gotten"], ex: "Future Perfect." },
    { t: "fix", q: "I will have finish the project by Friday.", a: "I will have finished the project by Friday.", ex: "will have + V3." },
    { t: "fix", q: "Tomorrow at 10 I will sit in an interview.", a: "Tomorrow at {10|ten} I will be sitting in an interview.", ex: "Процесс в момент → will be + -ing." },
    { t: "tr", q: "К концу лета я прочитаю десять книг на английском.", a: "By the end of [the] summer, I will have read ten books in English.", ex: "will have read." },
    { t: "tr", q: "Завтра в это время я буду лететь в Казань.", a: "[At] this time tomorrow I will be flying to Kazan.", ex: "will be flying." },
    { t: "write", q: "Interview / Speaking Part 1: Where do you see yourself in five years?", need: "will have done, will be doing и going to — хотя бы по разу.", focus: ["b2_future"], model: "In five years I will have finished my master's degree, hopefully abroad. I think I will be working as a product analyst in a big tech company. I'm going to spend the next two years building a strong portfolio. By then I will have also passed IELTS with a score of at least 7.5." }
  ]
},
{
  id: "b2_coll", stage: "B2", title: "Коллокации",
  short: "make progress · do research · take a risk · draw conclusions",
  words: [
    ["make a decision", "принять решение"], ["make progress", "добиться прогресса"], ["make a mistake", "ошибиться"], ["make an effort", "приложить усилия"],
    ["do research", "проводить исследование"], ["do a course", "проходить курс"], ["take a risk", "рискнуть"], ["take part in", "участвовать в"],
    ["take notes", "записывать, конспектировать"], ["take responsibility for", "взять ответственность за"], ["have a look at", "взглянуть на"],
    ["draw conclusions", "делать выводы"], ["gain experience", "получить опыт"], ["meet requirements", "соответствовать требованиям"],
    ["conduct a survey", "провести опрос"], ["pay attention to", "обращать внимание на"], ["a significant increase", "значительный рост"],
    ["raise a question", "поднять вопрос"], ["reach an agreement", "достичь соглашения"], ["play a key role in", "играть ключевую роль в"]
  ],
  theory: `
<p>Коллокации — устойчивые пары слов. Носитель скажет <b>make</b> a decision, а не «do a decision». Для IELTS Lexical Resource важно именно это, а не редкие слова.</p>
<table class="rule">
<tr><td><b>make</b></td><td>создать, результат: a decision, progress, a mistake, money, an effort, a difference</td></tr>
<tr><td><b>do</b></td><td>работа, деятельность: research, homework, a course, business, exercise, damage</td></tr>
<tr><td><b>take</b></td><td>a risk, part in, notes, a break, responsibility, a photo</td></tr>
<tr><td><b>другие</b></td><td>draw conclusions, gain experience, meet requirements, conduct a survey, pay attention, raise a question</td></tr>
<tr><td><b>прилагательные</b></td><td>a significant / sharp increase, heavy rain, high price, a key role, a strong argument</td></tr>
</table>`,
  items: [
    { t: "choice", q: "I ___ a lot of progress with my squat this year.", o: ["did", "made", "took"], a: 1, ex: "make progress." },
    { t: "choice", q: "Our team ___ research on user churn.", o: ["made", "did", "took"], a: 1, ex: "do research." },
    { t: "choice", q: "Investing in crypto means ___ a big risk.", o: ["making", "doing", "taking"], a: 2, ex: "take a risk." },
    { t: "choice", q: "Could you ___ a look at my CV?", o: ["make", "have", "do"], a: 1, ex: "have / take a look." },
    { t: "choice", q: "I ___ part in a hackathon last spring.", o: ["took", "made", "did"], a: 0, ex: "take part in." },
    { t: "choice", q: "We need to ___ conclusions from the data.", o: ["make", "draw", "take"], a: 1, ex: "draw conclusions." },
    { t: "choice", q: "This internship will help me ___ experience.", o: ["gain", "win", "earn"], a: 0, ex: "gain experience." },
    { t: "choice", q: "There was a ___ increase in sales after the campaign.", o: ["strong", "significant", "heavy"], a: 1, ex: "a significant increase." },
    { t: "gap", q: "I always ___ notes during lectures.", a: "take", ex: "take notes." },
    { t: "gap", q: "Everyone ___ mistakes when they learn a language.", a: "makes", ex: "make mistakes." },
    { t: "gap", q: "Unfortunately, I don't ___ all the requirements for this position.", a: "meet", ex: "meet requirements." },
    { t: "gap", q: "Please pay ___ to the axis labels.", a: "attention", ex: "pay attention to." },
    { t: "fix", q: "I did a mistake in the formula.", a: "I made a mistake in the formula.", ex: "make a mistake." },
    { t: "fix", q: "We made a survey of 200 students.", a: "We {conducted|carried out|did} a survey of 200 students.", ex: "conduct a survey." },
    { t: "tr", q: "Мне нужно принять решение до пятницы.", a: "I need to make a decision by Friday.", ex: "make a decision; до пятницы = by Friday." },
    { t: "write", q: "Describe a challenge you faced in a project or at the gym and how you dealt with it.", need: "Минимум 5 коллокаций из списка.", focus: ["b2_coll"], model: "Last year I took part in a student data hackathon. At first we made a big mistake: we didn't pay attention to missing values. When we noticed it, we had to make a quick decision and rebuild the pipeline. In the end we drew some interesting conclusions about user churn and made real progress as a team. I gained a lot of experience from it." }
  ]
},
{
  id: "b2_task1", stage: "B2", title: "IELTS Task 1: графики и тренды",
  short: "rose sharply · peaked at · fluctuated · overview",
  words: [
    ["rise / increase / grow", "расти"], ["fall / decrease / decline / drop", "падать"], ["peak at", "достичь пика на уровне"],
    ["hit a low of", "упасть до минимума"], ["fluctuate", "колебаться"], ["level off / remain stable", "выровняться / оставаться стабильным"],
    ["sharply / dramatically", "резко"], ["steadily / gradually", "стабильно / постепенно"], ["slightly", "немного"],
    ["account for", "составлять (долю)"], ["twice as many as", "в два раза больше, чем"], ["overall", "в целом"]
  ],
  theory: `
<p>Task 1: минимум 150 слов за 20 минут. Описываешь данные, мнения не даёшь.</p>
<ol>
<li><b>Перефраз задания</b>: The table shows / The graph illustrates…</li>
<li><b>Overview</b> — главный тренд без цифр: <i>Overall, Android grew strongly, while web usage declined.</i> Без overview больше 5 баллов за Task Achievement не получить.</li>
<li><b>Два абзаца деталей</b> с цифрами и сравнениями.</li>
</ol>
<table class="rule">
<tr><td>глагол + наречие</td><td>rose <b>sharply</b>, fell <b>slightly</b>, grew <b>steadily</b></td></tr>
<tr><td>прилагательное + сущ.</td><td>a <b>sharp rise in</b>, a <b>slight decrease in</b></td></tr>
<tr><td>предлоги</td><td>rose <b>by</b> 10% (на) · rose <b>to</b> 50 (до) · <b>from</b> 20 <b>to</b> 50 · peaked <b>at</b></td></tr>
<tr><td>сравнения</td><td>twice as many as · the highest · compared with · whereas</td></tr>
</table>`,
  items: [
    { t: "choice", q: "Sales rose ___ 20% (на 20%).", o: ["to", "by", "at"], a: 1, ex: "На сколько → by." },
    { t: "choice", q: "The number of users increased from 2,000 ___ 5,000.", o: ["to", "by", "until"], a: 0, ex: "from … to …" },
    { t: "choice", q: "Traffic ___ at 12,000 visits in December and then fell.", o: ["peaked", "topped up", "maxed"], a: 0, ex: "peak at." },
    { t: "choice", q: "Prices went up and down all year. They ___.", o: ["fluctuated", "fluctuating", "were fluctuate"], a: 0, ex: "fluctuate." },
    { t: "choice", q: "There was a ___ in the number of active users.", o: ["sharp rise", "sharply rise", "sharp rising"], a: 0, ex: "Прилагательное + существительное." },
    { t: "choice", q: "Which is the best overview sentence?", o: ["Overall, Android grew strongly, while web usage declined.", "In my opinion, Android is better.", "The graph shows the number of users."], a: 0, ex: "Overview — главный тренд, без мнения." },
    { t: "gap", q: "After March, the figure levelled ___ at around 500 users per day.", a: "off", ex: "level off — выровняться." },
    { t: "gap", q: "iOS users accounted ___ 45% of the total.", a: "for", ex: "account for." },
    { t: "gap", q: "Android had twice ___ many users as web in 2024.", a: "as", ex: "twice as many as." },
    { t: "fix", q: "The conversion increased on 5% in May.", a: "The conversion [rate] increased by 5 percent in May.", ex: "На 5% → by." },
    { t: "fix", q: "The revenue was grew steadily over the year.", a: "The revenue grew steadily over the year.", ex: "Лишнее was." },
    { t: "fix", q: "There was a dramatically fall in sales.", a: "There was a dramatic fall in sales.", ex: "Перед существительным — прилагательное." },
    { t: "tr", q: "Число пользователей резко выросло в 2024 году.", a: ["The number of users {rose|increased|grew} {sharply|dramatically|significantly} in 2024.", "There was a {sharp|dramatic|significant} {rise|increase} in the number of users in 2024."], ex: "rose sharply / a sharp rise." },
    { t: "tr", q: "В целом доля веба постепенно снижалась.", a: ["Overall, the share of web {gradually decreased|gradually declined|gradually fell|decreased gradually|declined gradually|fell gradually}.", "Overall, the web share {gradually decreased|gradually declined|gradually fell|decreased gradually|declined gradually|fell gradually}."], ex: "Overall + gradually." },
    { t: "write", q: "IELTS Task 1: Gym visitors per hour on weekdays: 7 a.m. — 15, 10 a.m. — 10, 1 p.m. — 25, 4 p.m. — 40, 7 p.m. — 70, 10 p.m. — 30. Summarise the main features and make comparisons.", need: "Overview + минимум 4 выражения тренда (rose, peaked at, fell…) и 2 сравнения. 120–170 слов.", focus: ["b2_task1"], model: "The line graph shows the average number of people in a university gym at different times on weekdays. Overall, the gym was quiet in the morning and became much busier in the evening, reaching a peak at 7 p.m. At 7 a.m. there were 15 visitors, and this figure fell slightly to 10 by 10 a.m. After that, attendance rose steadily, reaching 25 at 1 p.m. and 40 at 4 p.m. The number of visitors then increased sharply and peaked at 70 at 7 p.m., which was seven times as many as in the late morning. Finally, it dropped to 30 by 10 p.m." }
  ]
},
{
  id: "b2_task2", stage: "B2", title: "IELTS Task 2: эссе",
  short: "типы эссе · тезис · абзац: тема → объяснение → пример",
  theory: `
<p>Task 2: минимум 250 слов за 40 минут, весит вдвое больше Task 1.</p>
<table class="rule">
<tr><td>Opinion</td><td>To what extent do you agree or disagree?</td></tr>
<tr><td>Discussion</td><td>Discuss both views and give your own opinion.</td></tr>
<tr><td>Advantages / disadvantages</td><td>Do the advantages outweigh the disadvantages?</td></tr>
<tr><td>Problem–solution</td><td>What are the causes? What can be done?</td></tr>
</table>
<p><b>Структура в 4 абзаца:</b> вступление (перефраз вопроса + чёткий тезис) → body 1 → body 2 → вывод (позиция другими словами).</p>
<p><b>Абзац:</b> тема-предложение → объяснение → пример → связь с тезисом.</p>
<p>Фразы: It is often argued that… · I firmly believe that… · One major reason is that… · For instance, … · Opponents may claim that… · In conclusion, …</p>
<div class="trap">Тезис должен прямо отвечать на вопрос. «Education is very important nowadays» — это не тезис.</div>`,
  items: [
    { t: "choice", q: "Question type: 'Some people think X, others think Y. Discuss both views and give your opinion.'", o: ["Opinion", "Discussion", "Problem–solution"], a: 1, ex: "Discuss both views → Discussion." },
    { t: "choice", q: "Best thesis for 'Should university be free?':", o: ["Education is very important nowadays.", "I believe university should be free because it gives talented students equal opportunities.", "There are many opinions about this."], a: 1, ex: "Тезис отвечает на вопрос и даёт причину." },
    { t: "choice", q: "Where should your opinion first appear?", o: ["In the introduction", "Only in the conclusion", "Nowhere: IELTS essays are neutral"], a: 0, ex: "Позиция с самого начала." },
    { t: "choice", q: "Best topic sentence for a body paragraph:", o: ["Firstly, free education would make society more equal.", "Firstly, I want to say some words.", "Firstly, my friend studies at BMSTU."], a: 0, ex: "Тема-предложение = главная мысль абзаца." },
    { t: "choice", q: "Which phrase introduces an opposing view?", o: ["Opponents may argue that", "As a result", "For instance"], a: 0, ex: "Контраргумент." },
    { t: "choice", q: "How many words are required in Task 2?", o: ["at least 150", "at least 250", "exactly 300"], a: 1, ex: "250+." },
    { t: "gap", q: "It is often ___ that online learning is less effective.", h: "утверждают", a: ["argued", "claimed", "said"], ex: "It is often argued that…" },
    { t: "gap", q: "In ___, I believe the advantages outweigh the disadvantages.", a: "conclusion", ex: "In conclusion." },
    { t: "gap", q: "The advantages of remote work ___ its disadvantages.", h: "перевешивают", a: "outweigh", ex: "outweigh.", c: ["outweigh", "перевешивать"] },
    { t: "fix", q: "In my opinion I think that university should be free.", a: ["In my opinion, university should be free.", "I think that university should be free.", "I think university should be free."], ex: "In my opinion = I think, оба сразу — повтор." },
    { t: "fix", q: "Nowadays, a lot of peoples use social media.", a: "Nowadays, a lot of people use social media.", ex: "people — уже множественное число." },
    { t: "tr", q: "Некоторые считают, что технологии делают нас ленивыми.", a: "Some people {believe|think|argue|claim} that technology makes us lazy.", ex: "technology обычно в ед. ч." },
    { t: "tr", q: "Одна из главных причин — высокая стоимость жилья.", a: "One of the main reasons is the high cost of {housing|accommodation}.", ex: "One of the main reasons is…" },
    { t: "write", q: "IELTS Task 2 (intro + one body paragraph): Some people believe that university education should be free for everyone. To what extent do you agree or disagree?", need: "Вступление с тезисом + абзац: тема-предложение → объяснение → пример. 120–180 слов.", focus: ["b2_task2", "b1_link"], model: "It is often argued that higher education should be free for all students. I strongly agree with this view, because free university education gives equal opportunities to talented young people and benefits society as a whole.\n\nThe main reason is that many gifted students come from families who cannot afford high tuition fees. If education is free, these students can choose a university based on their abilities rather than their parents' income. For instance, many of my classmates at BMSTU come from small towns, and they would never have been able to study in Moscow without state funding. As a result, the country gains more qualified engineers and analysts." }
  ]
}
);
