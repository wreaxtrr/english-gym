/* Темы-ошибки: личные типичные ошибки. Они крутятся в разминке каждой тренировки
   и появляются тем чаще, чем хуже по ним результат.
   Новые задания добавляй ТОЛЬКО в конец списка items: id задания = индекс в массиве.

   Формат ответа (поле a): строка или массив строк.
   {a|b} — варианты, [x] — необязательная часть. Сокращения (I'm = I am), регистр,
   пунктуация и британское/американское написание при сравнении не важны. */
window.EG = window.EG || {};
EG.topics = EG.topics || [];

EG.topics.push(
{
  id: "e_be", kind: "error", stage: "B1", title: "Не терять глагол be",
  short: "I am interested · I'm going to · he is tired",
  theory: `
<p>В русском «я заинтересован», «я иду» обходятся без связки. В английском в каждом предложении должен быть глагол. Если действия нет, его место занимает <b>be</b>.</p>
<ul>
<li>Прилагательные и состояния: <b>I'm</b> tired, <b>I was</b> interested in trading, <b>she is</b> 20.</li>
<li>Continuous и going to всегда с be: <b>I'm</b> going to apply, <b>we are</b> studying.</li>
<li>Возраст: <b>I'm</b> 19 (не «I have 19»).</li>
</ul>
<div class="trap">Проверка: в предложении нет глагола, а после подлежащего сразу идёт прилагательное или слово на -ing? Значит, потерялся be.</div>`,
  items: [
    { t: "gap", q: "Two years ago I ___ interested in trading, but now I prefer data analysis.", h: "be", a: "was", ex: "Состояние в прошлом: was interested.", c: ["I was interested in trading", "я интересовался трейдингом (be + interested)"] },
    { t: "gap", q: "I ___ going to apply for an internship at Yandex next spring.", h: "be", a: "am", ex: "going to всегда с be: I'm going to.", c: ["I'm going to apply for an internship", "я собираюсь подать на стажировку"] },
    { t: "fix", q: "I interested in data analytics because I like numbers.", a: "I am interested in data analytics because I like numbers.", ex: "interested — прилагательное, нужен am." },
    { t: "fix", q: "My roommate always tired after the night shift.", a: "My roommate is always tired after the night shift.", ex: "is always tired: always ставится после be." },
    { t: "fix", q: "We going to the gym after classes today.", a: "We are going to the gym after classes today.", ex: "Present Continuous = be + -ing." },
    { t: "choice", q: "Right now I ___ my SQL homework, so I can't talk.", o: ["do", "am doing", "doing"], a: 1, ex: "Сейчас, в процессе: am doing." },
    { t: "tr", q: "Я не уверен, что готов к собеседованию.", a: "I am not sure [that] I am ready for {the|an|this} interview.", ex: "Две связки: I'm not sure + I'm ready.", c: ["I'm not sure I'm ready", "я не уверен, что готов"] },
    { t: "tr", q: "Мой друг работает аналитиком и очень доволен своей работой.", a: ["{My friend|A friend of mine} works as {an analyst|a data analyst} and [he] is very {happy|satisfied|pleased} with his job.", "{My friend|A friend of mine} works as {an analyst|a data analyst} and [he] likes his job very much."], ex: "be happy with — быть довольным; as an analyst — с артиклем.", c: ["to be happy with sth", "быть довольным чем-то"] },
    { t: "gap", q: "Where ___ you yesterday evening? — In the library.", h: "be", a: "were", ex: "you → were." },
    { t: "fix", q: "The exam was hard, but I not worried.", a: "The exam was hard, but I was not worried.", ex: "Отрицание с прилагательным: was not / wasn't worried." },
    { t: "choice", q: "This bug ___ really annoying: it breaks the whole pipeline.", o: ["—", "is", "are"], a: 1, ex: "bug — единственное число: is." },
    { t: "fix", q: "My brother 25 years old and he works in logistics.", a: "My brother is 25 [years old] and he works in logistics.", ex: "Возраст: be + число." },
    { t: "tr", q: "Мне 19 лет, я студент второго курса.", a: ["I am {19|nineteen} [years old] [and] I am a second-year student.", "I am {19|nineteen} [years old] [and] I am in my second year [at university]."], ex: "I'm 19; second-year student = студент второго курса.", c: ["I'm a second-year student", "я студент второго курса"] },
    { t: "gap", q: "The gym in our dorm ___ open on Sundays.", h: "be, отрицание", a: ["is not", "isn't"], ex: "Отрицание: isn't open." }
  ]
},
{
  id: "e_art", kind: "error", stage: "B1", title: "Артикли a / the",
  short: "a famous company · as a data analyst · the last one",
  theory: `
<p>Перед исчисляемым существительным в единственном числе почти всегда нужен артикль. Голое «company», «analyst», «project» — ошибка.</p>
<table class="rule">
<tr><td><b>a / an</b></td><td>один из многих, впервые упомянут, профессия</td><td>VkusVill is <b>a</b> famous company · I work as <b>a</b> data analyst · <b>an</b> intern</td></tr>
<tr><td><b>the</b></td><td>конкретный, уже известный, единственный, превосходная степень</td><td><b>the</b> hardest subject · harder than <b>the</b> last one · <b>the</b> gym (наш, привычный)</td></tr>
<tr><td><b>—</b></td><td>мн. ч. и неисчисляемые в общем смысле, компании, приёмы пищи</td><td>I like <b>data</b> · at <b>Yandex</b> · have <b>breakfast</b></td></tr>
</table>
<div class="trap">an ставится перед гласным <i>звуком</i>: an engineer, an hour, но a university.</div>`,
  items: [
    { t: "fix", q: "VkusVill is famous company in Russia.", a: "VkusVill is a famous company in Russia.", ex: "Компания одна из многих: a famous company.", c: ["a famous company", "известная компания (с артиклем a)"] },
    { t: "fix", q: "I want to work as data analyst after graduation.", a: "I want to work as a data analyst after graduation.", ex: "Профессия: as a data analyst.", c: ["to work as a data analyst", "работать аналитиком данных"] },
    { t: "fix", q: "This semester is harder than last one.", a: "This semester is harder than the last one.", ex: "the last one: конкретный, прошлый.", c: ["harder than the last one", "сложнее, чем прошлый"] },
    { t: "fix", q: "Linear algebra was hardest subject in my first year.", a: "Linear algebra was the hardest subject in my first year.", ex: "Превосходная степень всегда с the." },
    { t: "choice", q: "I'm ___ second-year student at BMSTU.", o: ["a", "the", "—"], a: 0, ex: "Один из многих студентов: a." },
    { t: "choice", q: "We collected ___ data from 3,000 users.", o: ["a", "the", "—"], a: 2, ex: "data — неисчисляемое, a нельзя." },
    { t: "choice", q: "Can you send me ___ link to the dashboard you mentioned?", o: ["a", "the", "—"], a: 1, ex: "Конкретная ссылка, оба знают какая: the." },
    { t: "gap", q: "I had ___ interview yesterday. The interview lasted an hour.", a: "an", ex: "Первое упоминание + гласный звук: an." },
    { t: "gap", q: "She is ___ engineer at Ozon.", a: "an", ex: "engineer начинается с гласного звука." },
    { t: "gap", q: "It's ___ best gym in our area.", a: "the", ex: "best → the best." },
    { t: "tr", q: "Он работает программистом в банке.", a: "He works as a {programmer|developer|software engineer} {at|in|for} a bank.", ex: "as a programmer; a bank — один из банков." },
    { t: "tr", q: "Это самый интересный проект, который я делал.", a: "This is the most interesting project [that|which] I have [ever] {done|worked on|made|built}.", ex: "the most interesting + Present Perfect для опыта." },
    { t: "fix", q: "I usually have the breakfast at 8.", a: "I usually have breakfast at {8|eight}.", ex: "Приёмы пищи без артикля: have breakfast.", c: ["to have breakfast", "завтракать (без артикля)"] },
    { t: "choice", q: "I'm going to ___ gym after classes.", o: ["a", "the", "—"], a: 1, ex: "the gym: свой привычный зал." },
    { t: "gap", q: "My roommate has ___ old laptop, so he can't run Docker.", a: "an", ex: "old — гласный звук: an old laptop." }
  ]
},
{
  id: "e_prep", kind: "error", stage: "B1", title: "Предлоги",
  short: "at BMSTU · next year · for breakfast · in my second year",
  theory: `
<table class="rule">
<tr><td>учиться / работать в организации</td><td><b>at</b> BMSTU, <b>at</b> Yandex, <b>at</b> VkusVill (или work <b>for</b> a company)</td></tr>
<tr><td>город, страна, внутри здания</td><td><b>in</b> Moscow, <b>in</b> the library, <b>in</b> a dorm</td></tr>
<tr><td>next / last / this + время</td><td><b>без предлога:</b> next year, last week</td></tr>
<tr><td>на завтрак / обед</td><td><b>for</b> breakfast, <b>for</b> lunch</td></tr>
<tr><td>упражнение на мышцу</td><td>an exercise <b>for</b> my biceps</td></tr>
<tr><td>на втором курсе</td><td><b>in</b> my second year</td></tr>
<tr><td>время</td><td><b>at</b> 9 a.m. · <b>on</b> Monday · <b>in</b> the morning · <b>in</b> May</td></tr>
<tr><td>управление глаголами</td><td>good <b>at</b>, interested <b>in</b>, depend <b>on</b>, apply <b>for</b> a job / <b>to</b> a company, wait <b>for</b>, listen <b>to</b></td></tr>
</table>`,
  items: [
    { t: "fix", q: "I study in BMSTU.", a: "I study at BMSTU.", ex: "Учебное заведение как организация: at.", c: ["I study at BMSTU", "я учусь в МГТУ (at + организация)"] },
    { t: "fix", q: "Last summer I worked in VkusVill as a courier.", a: "Last summer I worked {at|for} VkusVill as a courier.", ex: "Работать в компании: at / for.", c: ["to work at / for a company", "работать в компании"] },
    { t: "fix", q: "In next year I'm going to find an internship.", a: "Next year I am going to find an internship.", ex: "next year без предлога.", c: ["next year", "в следующем году (без in)"] },
    { t: "fix", q: "I usually eat oatmeal on the breakfast.", a: "I usually {eat|have} oatmeal for breakfast.", ex: "for breakfast — на завтрак.", c: ["for breakfast", "на завтрак"] },
    { t: "fix", q: "Today I did three exercises on biceps.", a: "Today I did three exercises for [my] biceps.", ex: "Упражнение для мышцы: for.", c: ["exercises for my biceps", "упражнения на бицепс"] },
    { t: "fix", q: "I'm on second course now.", a: ["I am in my second year now.", "I am a second-year student now."], ex: "Курс университета = year; на курсе = in my … year.", c: ["in my second year", "на втором курсе"] },
    { t: "choice", q: "I'm good ___ math, but bad ___ public speaking.", o: ["at / at", "in / in", "at / in"], a: 0, ex: "good at, bad at." },
    { t: "choice", q: "Our success depends ___ the quality of the data.", o: ["from", "on", "of"], a: 1, ex: "depend on (не from!).", c: ["to depend on", "зависеть от"] },
    { t: "choice", q: "I want to apply ___ a data analyst internship.", o: ["to", "for", "on"], a: 1, ex: "apply for a job / position.", c: ["to apply for an internship", "подать заявку на стажировку"] },
    { t: "choice", q: "I applied ___ three companies last month.", o: ["for", "to", "in"], a: 1, ex: "apply to a company / university.", c: ["to apply to a company", "подаваться в компанию"] },
    { t: "gap", q: "We have a lecture on Monday ___ 9 a.m.", a: "at", ex: "Точное время: at." },
    { t: "gap", q: "I'm waiting ___ the results of my exam.", a: "for", ex: "wait for.", c: ["to wait for", "ждать (кого-то/что-то)"] },
    { t: "tr", q: "Я учусь на втором курсе МГТУ им. Баумана.", a: ["I am a second-year student at {BMSTU|Bauman University|Bauman Moscow State Technical University}.", "I am in my second year at {BMSTU|Bauman University|Bauman Moscow State Technical University}.", "I study at {BMSTU|Bauman University} [and I am] in my second year."], ex: "at BMSTU + in my second year." },
    { t: "tr", q: "Я тренируюсь в зале три раза в неделю.", a: ["I {work out|train} {at|in} the gym {three|3} times a week.", "I go to the gym {three|3} times a week."], ex: "at the gym; three times a week." },
    { t: "choice", q: "I live ___ a dorm ___ Moscow.", o: ["in / in", "at / in", "on / in"], a: 0, ex: "in a dorm, in Moscow." }
  ]
},
{
  id: "e_3s", kind: "error", stage: "B1", title: "-s в третьем лице",
  short: "he studies and works · does + глагол без -s",
  theory: `
<p>he / she / it / my friend / everyone + глагол<b>-s</b>. Чаще всего -s теряется у <b>второго</b> глагола после and.</p>
<ul>
<li>My roommate studi<b>es</b> physics and work<b>s</b> at night.</li>
<li>Everyone cook<b>s</b> for themselves: everyone — это «он».</li>
<li>Но после does / doesn't — без -s: He doesn't <b>go</b>. Does she <b>work</b>?</li>
<li>Написание: study → studies, watch → watches, go → goes, have → has.</li>
</ul>`,
  items: [
    { t: "fix", q: "My roommate studies physics and work in a cafe at night.", a: "My roommate studies physics and works in a {cafe|café} at night.", ex: "Второй глагол тоже с -s: works." },
    { t: "fix", q: "He doesn't goes to the gym on Sundays.", a: "He doesn't go to the gym on Sundays.", ex: "doesn't уже несёт -s: go без -s." },
    { t: "gap", q: "Sasha writes backend in Go and ___ football on weekends.", h: "play", a: "plays", ex: "Второй глагол: plays." },
    { t: "gap", q: "Our team lead ___ a lot of meetings every day.", h: "have", a: "has", ex: "he/she → has." },
    { t: "gap", q: "The script ___ every night and updates the dashboard.", h: "run", a: "runs", ex: "script = it → runs." },
    { t: "gap", q: "My brother ___ crypto charts and trades every evening.", h: "watch", a: "watches", ex: "-ch → -es: watches." },
    { t: "choice", q: "Does your friend ___ in IT?", o: ["work", "works", "working"], a: 0, ex: "После does — base form." },
    { t: "fix", q: "This query take too much time.", a: "This query takes too much time.", ex: "query = it → takes." },
    { t: "fix", q: "Everyone in our dorm cook for themselves.", a: "Everyone in our dorm cooks for themselves.", ex: "everyone — единственное число.", c: ["everyone cooks for themselves", "каждый готовит себе сам"] },
    { t: "tr", q: "Мой сосед встаёт в 6 и бегает перед парами.", a: "My {roommate|neighbour} gets up at {6|six} and {runs|goes running|goes for a run} before {classes|lectures|class}.", ex: "Оба глагола с -s: gets up … runs.", c: ["to get up", "вставать"] },
    { t: "tr", q: "Она анализирует данные и строит дашборды.", a: "She {analyzes|analyses} data and {builds|makes|creates} dashboards.", ex: "analyzes … builds." },
    { t: "fix", q: "The model predict churn and help the team.", a: "The model predicts churn and helps the team.", ex: "model = it: predicts, helps." }
  ]
},
{
  id: "e_modal", kind: "error", stage: "B1", title: "Форма после would / must / did",
  short: "would choose · mustn't trade · didn't go · want to find",
  theory: `
<p>После <b>would, will, can, could, should, must, might, did, does, do</b> идёт глагол в базовой форме: без to, без -ed, без -ing.</p>
<table class="rule">
<tr><td>✗ would chosen</td><td>✓ would <b>choose</b></td></tr>
<tr><td>✗ mustn't trading</td><td>✓ mustn't <b>trade</b></td></tr>
<tr><td>✗ didn't went</td><td>✓ didn't <b>go</b></td></tr>
<tr><td>✗ should to sleep</td><td>✓ should <b>sleep</b></td></tr>
</table>
<p>А после <b>want, plan, try, would like, decide</b> нужно <b>to</b> + глагол: I want <b>to find</b>, I'd like <b>to learn</b>.</p>`,
  items: [
    { t: "fix", q: "If I were you, I would chosen Python.", a: "If I were you, I would choose Python.", ex: "would + base form.", c: ["I would choose", "я бы выбрал"] },
    { t: "fix", q: "Beginners mustn't trading with borrowed money.", a: "Beginners mustn't trade with borrowed money.", ex: "mustn't + base form.", c: ["mustn't trade", "нельзя торговать"] },
    { t: "fix", q: "I didn't went to the lecture yesterday.", a: "I didn't go to the lecture yesterday.", ex: "Прошедшее время уже в did, глагол — base form." },
    { t: "choice", q: "Did you ___ the new dataset?", o: ["downloaded", "download", "downloading"], a: 1, ex: "did + base form." },
    { t: "gap", q: "I can't ___ to the party: I have a deadline.", h: "come", a: "come", ex: "can't + base form." },
    { t: "gap", q: "You should ___ with SQL before learning Spark.", h: "start", a: "start", ex: "should + base form (без to)." },
    { t: "fix", q: "She will helps us with the presentation.", a: "She will help us with the presentation.", ex: "will + base form, -s не нужен." },
    { t: "fix", q: "I would like learn Go this summer.", a: "I would like to learn Go this summer.", ex: "would like + to + глагол.", c: ["I'd like to learn", "я бы хотел выучить"] },
    { t: "choice", q: "I want ___ an internship next year.", o: ["find", "to find", "finding"], a: 1, ex: "want + to." },
    { t: "tr", q: "Я бы выбрал другую тему для курсовой.", a: "I would choose {a different|another} topic for my {coursework|term paper|course project}.", ex: "would choose; курсовая — term paper / coursework.", c: ["term paper", "курсовая работа"] },
    { t: "fix", q: "Did he finished the task on time?", a: "Did he finish the task on time?", ex: "did + base form." },
    { t: "gap", q: "Why didn't you ___ me about the deadline?", h: "tell", a: "tell", ex: "didn't + base form." }
  ]
},
{
  id: "e_tense", kind: "error", stage: "B1", title: "Время ответа и after / when + Present",
  short: "отвечай в времени вопроса · after I finish",
  theory: `
<p><b>1. Отвечай в том же времени, что и вопрос.</b></p>
<ul>
<li>What <b>did</b> you do? → I <b>went</b>… (Past Simple)</li>
<li>What <b>do</b> you usually do? → I usually <b>go</b>… (Present Simple)</li>
<li>What <b>are</b> you <b>going to</b> do? → I'm <b>going to</b>…</li>
</ul>
<p><b>2. После after, when, before, as soon as, until, if</b> будущее выражается настоящим временем:</p>
<ul><li><b>After I finish</b> this course, I <b>will</b> apply. (✗ after I will finish)</li>
<li><b>When I graduate</b>, I'm going to move abroad.</li></ul>`,
  items: [
    { t: "fix", q: "After I will complete this course, I will apply for internships.", a: "After I {complete|finish} this course, I will apply for internships.", ex: "После after — Present.", c: ["after I finish", "после того как я закончу (без will)"] },
    { t: "fix", q: "When I will graduate, I want to work abroad.", a: "When I graduate, I want to work abroad.", ex: "When + Present.", c: ["when I graduate", "когда я закончу вуз"] },
    { t: "choice", q: "What did you do last weekend? — I ___ with friends.", o: ["hang out", "hung out", "am hanging out"], a: 1, ex: "Вопрос в Past Simple, ответ тоже." },
    { t: "choice", q: "What do you usually do after classes? — I usually ___ to the gym.", o: ["went", "go", "am going"], a: 1, ex: "usually → Present Simple." },
    { t: "choice", q: "What are you going to do this summer? — I ___ an internship.", o: ["'m going to do", "did", "do"], a: 0, ex: "Вопрос с going to, ответ тоже." },
    { t: "gap", q: "I'll call you as soon as I ___ the results.", h: "get", a: "get", ex: "as soon as + Present." },
    { t: "gap", q: "If the test ___ a significant effect, we will roll out the feature.", h: "show", a: "shows", ex: "if + Present, test = it → shows." },
    { t: "choice", q: "We won't release the update until QA ___ it.", o: ["will check", "checks", "checked"], a: 1, ex: "until + Present." },
    { t: "tr", q: "Когда я закончу университет, я поеду учиться в магистратуру за границу.", a: ["When I graduate [from university], I {will|am going to} {do|study for|get} a master's [degree] abroad.", "When I graduate [from university], I {will|am going to} go abroad to {do|study for|get} a master's [degree]."], ex: "When I graduate — без will.", c: ["a master's degree", "магистратура (степень)"] },
    { t: "fix", ctx: "How did you prepare for the exam?", q: "I solve a lot of problems and watch lectures.", a: "I solved a lot of problems and watched lectures.", ex: "Вопрос в прошлом, значит и ответ в прошлом." },
    { t: "fix", ctx: "Where do you usually study?", q: "I studied in the library.", a: "I usually study in the library.", ex: "usually → Present Simple." },
    { t: "gap", q: "Before you ___ the code, run the tests.", h: "push", a: "push", ex: "before + Present." }
  ]
},
{
  id: "e_can", kind: "error", stage: "B1", title: "can ≠ привычка",
  short: "on Fridays we go to parties (не «we can go»)",
  theory: `
<p><b>can</b> = умею / могу / разрешено. Для того, что ты <i>обычно делаешь</i>, нужен Present Simple.</p>
<table class="rule">
<tr><td>привычка</td><td>On Fridays we <b>go</b> to parties. After training I <b>drink</b> a shake.</td></tr>
<tr><td>умение</td><td>I <b>can</b> write Go, but I rarely do it.</td></tr>
<tr><td>разрешение</td><td>Students <b>can</b> use the gym for free.</td></tr>
</table>
<div class="trap">«По пятницам мы можем сходить на вечеринку» в смысле «обычно ходим» — это we go, без can.</div>`,
  items: [
    { t: "fix", q: "On Fridays we can go to parties in the dorm.", a: "On Fridays we [usually] go to parties in the dorm.", ex: "Привычка: Present Simple без can." },
    { t: "choice", q: "What do you do in your free time? — I ___ video games with my roommate.", o: ["can play", "play", "can playing"], a: 1, ex: "Вопрос о привычке → play." },
    { t: "choice", q: "My roommate ___ speak three languages: Russian, English and Kazakh.", o: ["can", "is", "—"], a: 0, ex: "Умение → can." },
    { t: "fix", q: "Every evening I can sit in the library until 10.", a: "Every evening I sit in the library until {10|ten}.", ex: "every evening = привычка." },
    { t: "tr", q: "По выходным мы с друзьями обычно гуляем по центру.", a: ["On {weekends|the weekend} my friends and I usually {walk around|go for a walk in|hang out in} the {city center|center}.", "My friends and I usually {walk around|go for a walk in|hang out in} the {city center|center} on {weekends|the weekend}."], ex: "my friends and I; привычка — без can." },
    { t: "tr", q: "Я умею писать на Go, но редко это делаю.", a: "I can {write|code|program} {in Go|Go}, but I rarely do {it|that|so}.", ex: "Умение → can." },
    { t: "choice", q: "In the dorm we usually ___ dinner together on Sundays.", o: ["can cook", "cook", "can to cook"], a: 1, ex: "usually → Present Simple." },
    { t: "fix", q: "After training I can drink a protein shake.", a: "After training I [usually] drink a protein shake.", ex: "Привычка, а не возможность." },
    { t: "choice", q: "Students ___ use the gym for free: it's included in the dorm fee.", o: ["can", "are", "do"], a: 0, ex: "Разрешение → can." }
  ]
},
{
  id: "e_calque", kind: "error", stage: "B1", title: "Кальки с русского",
  short: "Sasha and I · to get better · my own · explain it to me",
  theory: `
<table class="rule">
<tr><td>Мы с Сашей</td><td>✗ We with Sasha → ✓ <b>Sasha and I</b></td></tr>
<tr><td>Самый сложный предмет — это…</td><td>✗ The hardest subject it is… → ✓ The hardest subject <b>is</b>…</td></tr>
<tr><td>чтобы стать лучше</td><td>✗ for get better → ✓ <b>to</b> get better</td></tr>
<tr><td>свой проект</td><td>✗ own project → ✓ <b>my own</b> project</td></tr>
<tr><td>объясни мне</td><td>✗ explain me → ✓ explain <b>it to me</b></td></tr>
<tr><td>заниматься…</td><td>спортом — <b>do sport</b>; в зале — <b>work out</b>; проектом — <b>work on</b> a project</td></tr>
<tr><td>посещать пары</td><td><b>attend</b> classes (visit — навестить человека)</td></tr>
<tr><td>сделать фото / принять решение</td><td><b>take</b> a photo / <b>make</b> a decision</td></tr>
</table>`,
  items: [
    { t: "fix", q: "We with Sasha went to the gym yesterday.", a: "Sasha and I went to the gym yesterday.", ex: "«Мы с X» = X and I.", c: ["Sasha and I", "мы с Сашей"] },
    { t: "fix", q: "The hardest subject it is mathematical analysis.", a: "The hardest subject is {mathematical analysis|calculus}.", ex: "Подлежащее уже есть, it лишнее. Кстати, матанализ — calculus.", c: ["calculus", "математический анализ"] },
    { t: "fix", q: "I go to the gym for get stronger.", a: "I go to the gym to get stronger.", ex: "Цель «чтобы» = to + глагол.", c: ["to get stronger", "чтобы стать сильнее"] },
    { t: "fix", q: "I want to start own project.", a: "I want to start my own project.", ex: "own только с притяжательным: my own.", c: ["my own project", "свой собственный проект"] },
    { t: "choice", q: "I ___ sport three times a week.", o: ["do", "make", "engage"], a: 0, ex: "Заниматься спортом = do sport." },
    { t: "choice", q: "At the moment I ___ a pet project in Python.", o: ["am engaged", "am working on", "am doing on"], a: 1, ex: "Заниматься проектом = work on.", c: ["to work on a project", "заниматься проектом"] },
    { t: "choice", q: "Can you ___ a photo of my squat? I want to check my form.", o: ["make", "do", "take"], a: 2, ex: "take a photo." },
    { t: "tr", q: "Мы с соседом готовим ужин вместе.", a: "My {roommate|neighbour} and I {cook|make} dinner together.", ex: "My roommate and I." },
    { t: "tr", q: "Я занимаюсь в зале каждое утро.", a: "I {work out|train|exercise} {at|in} the gym every morning.", ex: "Заниматься в зале = work out.", c: ["to work out", "тренироваться, заниматься в зале"] },
    { t: "tr", q: "Чтобы лучше понимать данные, я изучаю статистику.", a: ["To understand data better, I {study|am studying|am learning|learn} statistics.", "I {study|am studying|am learning|learn} statistics to understand data better."], ex: "Цель = to + глагол." },
    { t: "fix", q: "In my university there is a lot of hard subjects.", a: ["There are a lot of {hard|difficult} subjects at my university.", "At my university there are a lot of {hard|difficult} subjects."], ex: "at my university; subjects — мн. ч. → there are." },
    { t: "choice", q: "I ___ all my classes this week.", o: ["visited", "attended", "went"], a: 1, ex: "Посещать пары = attend.", c: ["to attend classes", "посещать пары"] },
    { t: "fix", q: "He explained me the task.", a: "He explained the task to me.", ex: "explain something to somebody.", c: ["explain sth to sb", "объяснить что-то кому-то"] }
  ]
},
{
  id: "e_ff", kind: "error", stage: "B1", title: "Ложные друзья",
  short: "abs vs press · PE · year vs course · lines of code",
  theory: `
<table class="rule">
<tr><td>пресс (мышцы)</td><td><b>abs</b></td><td>жим = <b>press</b> (bench press)</td></tr>
<tr><td>физкультура</td><td><b>PE</b> (physical education)</td><td>physical culture — так не говорят</td></tr>
<tr><td>курс (год обучения)</td><td><b>year</b>: I'm in my second year</td><td>course = учебный курс, предмет</td></tr>
<tr><td>строка кода</td><td><b>line</b> of code</td><td>string — тип данных «строка»</td></tr>
<tr><td>работодатель / сотрудник</td><td><b>employer</b> / <b>employee</b></td><td></td></tr>
<tr><td>не исключаю</td><td>I don't <b>rule out</b></td><td>deny = отрицать факт</td></tr>
<tr><td>выбирать / выбрал</td><td><b>choose</b> / <b>chose</b> / chosen</td><td></td></tr>
<tr><td>актуальный</td><td><b>relevant, up to date</b></td><td>actual = фактический, реальный</td></tr>
<tr><td>контрольная / диплом</td><td><b>test</b> / <b>thesis</b></td><td>diploma — сам документ</td></tr>
</table>`,
  items: [
    { t: "choice", q: "I train my ___ twice a week, so I almost have a six-pack.", o: ["press", "abs", "belly"], a: 1, ex: "Пресс (мышцы) = abs.", c: ["abs", "пресс (мышцы живота)"] },
    { t: "choice", q: "My bench ___ is 90 kg now.", o: ["press", "abs", "push"], a: 0, ex: "Жим лёжа = bench press.", c: ["bench press", "жим лёжа"] },
    { t: "choice", q: "At school I hated ___ because we had to run in winter.", o: ["physical culture", "PE", "sport culture"], a: 1, ex: "Физкультура = PE.", c: ["PE (physical education)", "физкультура"] },
    { t: "choice", q: "I'm in my second ___ at BMSTU.", o: ["course", "year", "class"], a: 1, ex: "Курс вуза = year." },
    { t: "choice", q: "This semester I'm taking a ___ on databases.", o: ["course", "year", "faculty"], a: 0, ex: "Предмет / учебный курс = course." },
    { t: "choice", q: "The script is only 200 ___ of code.", o: ["strings", "lines", "rows"], a: 1, ex: "Строки кода = lines of code.", c: ["lines of code", "строки кода"] },
    { t: "choice", q: "Big tech companies are attractive ___: they pay well and offer training.", o: ["employers", "employees"], a: 0, ex: "Работодатели = employers.", c: ["employer", "работодатель"] },
    { t: "choice", q: "The company has 500 ___ and is still hiring.", o: ["employers", "employees"], a: 1, ex: "Сотрудники = employees.", c: ["employee", "сотрудник"] },
    { t: "choice", q: "I don't ___ moving abroad for my master's.", o: ["deny", "rule out"], a: 1, ex: "Не исключаю = don't rule out.", c: ["to rule out", "исключать (возможность)"] },
    { t: "choice", q: "Last year I ___ BMSTU because of its strong CS program.", o: ["choose", "chose", "chosen"], a: 1, ex: "Past Simple: chose." },
    { t: "choice", q: "This dataset is no longer ___: it's from 2019.", o: ["actual", "up to date", "accurate"], a: 1, ex: "Актуальный = up to date / relevant.", c: ["up to date", "актуальный, свежий"] },
    { t: "fix", q: "My graduation diploma will be about recommender systems.", a: "My {graduation thesis|thesis|diploma thesis} will be about recommender systems.", ex: "Дипломная работа = thesis.", c: ["thesis", "дипломная работа"] },
    { t: "fix", q: "Tomorrow we have a control work in calculus.", a: ["Tomorrow we have a test in calculus.", "Tomorrow we have a calculus test."], ex: "Контрольная = test.", c: ["test", "контрольная работа"] }
  ]
},
{
  id: "e_num", kind: "error", stage: "B1", title: "Числа",
  short: "800 thousand · more than 800 · three times · percent",
  theory: `
<ul>
<li>После числа hundred / thousand / million <b>без -s</b>: 800 <b>thousand</b> users, two <b>million</b> rows.</li>
<li>Без числа — с -s и of: <b>thousands of</b> students.</li>
<li>Больше 800 = <b>more than</b> 800 / <b>over</b> 800.</li>
<li>Раз: <b>once, twice, three times</b> a week.</li>
<li>Проценты: 15 <b>percent</b> (без -s). Дроби: 2.5 = two <b>point</b> five.</li>
<li>1,500 — это полторы тысячи: запятая отделяет тысячи, точка — дробь.</li>
</ul>`,
  items: [
    { t: "fix", q: "Our app has 800 thousends users.", a: "Our app has 800 thousand users.", ex: "thousand после числа без -s.", c: ["800 thousand", "800 тысяч (без -s)"] },
    { t: "fix", q: "The dataset contains more 800 rows.", a: ["The dataset contains more than 800 rows.", "The dataset contains over 800 rows."], ex: "more than / over.", c: ["more than 800", "больше 800"] },
    { t: "fix", q: "I go to the gym 3 time a week.", a: "I go to the gym {three|3} times a week.", ex: "times с -s.", c: ["three times a week", "три раза в неделю"] },
    { t: "choice", q: "___ students apply to big tech every year.", o: ["Thousand of", "Thousands of", "Thousands"], a: 1, ex: "Без числа: thousands of." },
    { t: "choice", q: "The conversion rate grew by 2.5 ___.", o: ["percents", "percent", "procent"], a: 1, ex: "percent без -s.", c: ["percent", "процент(ов)"] },
    { t: "gap", q: "I check my portfolio ___ a day: in the morning and in the evening.", h: "два раза", a: "twice", ex: "Два раза = twice." },
    { t: "tr", q: "В нашем общежитии живёт больше тысячи студентов.", a: ["{More than|Over} {a|one} thousand students live in our {dorm|dormitory}.", "There are {more than|over} {a|one} thousand students in our {dorm|dormitory}."], ex: "more than a thousand." },
    { t: "choice", q: "How do you say 3.7 in English?", o: ["three comma seven", "three point seven", "three and seven"], a: 1, ex: "Десятичная точка = point." },
    { t: "gap", q: "The table has two ___ rows.", h: "миллиона", a: "million", ex: "После числа без -s." },
    { t: "tr", q: "Я тренируюсь два раза в неделю.", a: ["I {train|work out|exercise} twice a week.", "I go to the gym twice a week."], ex: "twice a week." },
    { t: "choice", q: "We had 1,500 users. How do you read 1,500?", o: ["one thousand five hundred", "one point five hundred", "fifteen hundreds"], a: 0, ex: "Запятая разделяет тысячи." }
  ]
},
{
  id: "e_spell", kind: "error", stage: "B1", title: "Орфография",
  short: "together · internship · analytics · exercise · business",
  theory: `
<p>Слова, в которых ты ошибался. Тренируем их на слух: слушай и печатай. Если озвучка не работает, ориентируйся на перевод.</p>
<table class="rule">
<tr><td>together</td><td>to-geth-er (не toGAther)</td></tr>
<tr><td>internship</td><td>intern + ship</td></tr>
<tr><td>analytics</td><td>an-a-LY-tics: y после l</td></tr>
<tr><td>exercise</td><td>ex-er-cise: одна c, s в конце</td></tr>
<tr><td>interesting</td><td>inter + est + ing</td></tr>
<tr><td>business</td><td>bus-i-ness: u, i, двойная s в конце</td></tr>
<tr><td>engineer</td><td>engin + eer</td></tr>
<tr><td>talented</td><td>talent + ed</td></tr>
<tr><td>biggest</td><td>удвоение g: big → biggest</td></tr>
</table>`,
  items: [
    { t: "listen", say: "together", a: "together", ru: "вместе" },
    { t: "listen", say: "internship", a: "internship", ru: "стажировка" },
    { t: "listen", say: "analytics", a: "analytics", ru: "аналитика" },
    { t: "listen", say: "exercises", a: "exercises", ru: "упражнения" },
    { t: "listen", say: "interesting", a: "interesting", ru: "интересный" },
    { t: "listen", say: "business", a: "business", ru: "бизнес" },
    { t: "listen", say: "engineer", a: "engineer", ru: "инженер" },
    { t: "listen", say: "talented", a: "talented", ru: "талантливый" },
    { t: "listen", say: "biggest", a: "biggest", ru: "самый большой" },
    { t: "choice", q: "Choose the correct spelling:", o: ["togather", "together", "togeather"], a: 1, ex: "together." },
    { t: "choice", q: "Choose the correct spelling:", o: ["intership", "internship", "interneship"], a: 1, ex: "intern + ship." },
    { t: "choice", q: "Choose the correct spelling:", o: ["analitics", "analytics", "analythics"], a: 1, ex: "analytics." },
    { t: "choice", q: "Choose the correct spelling:", o: ["excercise", "exersise", "exercise"], a: 2, ex: "exercise." },
    { t: "listen", say: "experience", a: "experience", ru: "опыт" },
    { t: "listen", say: "university", a: "university", ru: "университет" },
    { t: "listen", say: "successful", a: "successful", ru: "успешный" },
    { t: "listen", say: "programming", a: "programming", ru: "программирование" },
    { t: "listen", say: "because", a: "because", ru: "потому что" }
  ]
},
{
  id: "e_listen", kind: "error", stage: "B1", title: "На слух",
  short: "buckwheat ≠ backwards · похожие слова и диктант",
  theory: `
<p>Длинные и похожие слова на слух сливаются. Тренировка: слушаешь фразу (можно замедлить) и печатаешь целиком или выбираешь услышанное слово.</p>
<ul><li><b>buckwheat</b> /ˈbʌkwiːt/ — гречка; <b>backwards</b> — назад</li>
<li><b>tapas</b> — испанские закуски; <b>cutlets</b> — котлеты</li>
<li><b>thirteen</b> (ударение в конце) vs <b>thirty</b> (ударение в начале)</li></ul>
<p>Совет: сначала слушай без текста, потом повтори фразу вслух (shadowing).</p>`,
  items: [
    { t: "listen", say: "I had buckwheat with chicken for lunch.", o: ["buckwheat", "backwards", "back with"], a: 0, ru: "гречка", c: ["buckwheat", "гречка"] },
    { t: "listen", say: "We ordered tapas in a small Spanish bar.", o: ["cutlets", "tapas", "taxes"], a: 1, ru: "испанские закуски", c: ["tapas", "тапас (испанские закуски)"] },
    { t: "listen", say: "My mom makes the best cutlets.", o: ["cutlets", "tablets", "cut lots"], a: 0, ru: "котлеты", c: ["cutlets", "котлеты"] },
    { t: "listen", say: "The meeting starts at thirteen minutes past five.", o: ["thirteen", "thirty"], a: 0, ru: "тринадцать" },
    { t: "listen", say: "There were thirty people at the meetup.", o: ["thirteen", "thirty"], a: 1, ru: "тридцать" },
    { t: "listen", say: "I'm looking for a data analyst internship.", a: "I'm looking for a data analyst internship.", ru: "Ищу стажировку аналитиком данных." },
    { t: "listen", say: "The query returns duplicate rows.", a: "The query returns duplicate rows.", ru: "Запрос возвращает дубли строк." },
    { t: "listen", say: "Our retention rate dropped last month.", a: "Our retention rate dropped last month.", ru: "Удержание упало в прошлом месяце." },
    { t: "listen", say: "I usually work out three times a week.", a: "I usually work out three times a week.", ru: "Обычно тренируюсь три раза в неделю." },
    { t: "listen", say: "Could you walk me through your last project?", a: "Could you walk me through your last project?", ru: "Расскажите по шагам о последнем проекте.", c: ["to walk sb through sth", "подробно рассказать по шагам"] },
    { t: "listen", say: "He walked backwards to the door.", o: ["buckwheat", "backwards", "back words"], a: 1, ru: "назад, задом наперёд" },
    { t: "listen", say: "My roommate and I share a fridge.", a: "My roommate and I share a fridge.", ru: "Мы с соседом делим холодильник." }
  ]
}
);
