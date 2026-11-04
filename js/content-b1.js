/* Ступень B1 → B1+: новые темы по порядку изучения.
   Новые задания добавляй ТОЛЬКО в конец items: id задания = индекс в массиве. */
window.EG = window.EG || {};
EG.topics = EG.topics || [];

EG.topics.push(
{
  id: "n_pp", kind: "new", stage: "B1", title: "Present Perfect",
  short: "I've done · I've been to · for / since · already / yet",
  theory: `
<p><b>have / has + V3</b>. Связывает прошлое с настоящим: важен результат или опыт, а не момент.</p>
<table class="rule">
<tr><td>опыт, без времени</td><td>I<b>'ve been</b> to Kazan. <b>Have</b> you ever <b>traded</b> crypto?</td></tr>
<tr><td>результат сейчас</td><td>I<b>'ve finished</b> the task: you can check it.</td></tr>
<tr><td>незаконченный период</td><td>I<b>'ve been</b> to the gym four times <b>this week</b>.</td></tr>
<tr><td>for / since</td><td>I<b>'ve lived</b> in the dorm <b>for</b> two years / <b>since</b> 2024.</td></tr>
<tr><td>already / yet / just</td><td>I've <b>already</b> sent it. I haven't started <b>yet</b>.</td></tr>
</table>
<div class="trap">Есть точное время в прошлом (yesterday, last year, in 2023, ago)? Тогда Past Simple: ✗ I have passed the exam yesterday → ✓ I passed.<br>«Я учусь тут с 2024» — не Present Simple, а <b>I've studied / I've been studying</b> here since 2024.</div>
<p>Частые V3: been, done, gone, seen, written, taken, eaten, made, built, bought, lost, chosen, known, met, found.</p>
<p><b>been vs gone:</b> He's <b>been</b> to the gym (сходил и вернулся). He's <b>gone</b> to the gym (ушёл, сейчас там).</p>`,
  items: [
    { t: "gap", q: "I ___ the SQL assignment: you can check it now.", h: "finish", a: "have finished", ex: "Результат важен сейчас → Present Perfect." },
    { t: "gap", q: "Have you ever ___ crypto?", h: "trade", a: "traded", ex: "Опыт: Have you ever + V3." },
    { t: "gap", q: "I ___ in this dorm since September 2024.", h: "live", a: ["have lived", "have been living"], ex: "since + Present Perfect.", c: ["I've lived here since 2024", "живу здесь с 2024 (Present Perfect)"] },
    { t: "gap", q: "She ___ her internship yet.", h: "not start", a: ["has not started", "hasn't started"], ex: "yet в отрицании → Present Perfect." },
    { t: "gap", q: "We ___ to the gym four times this week.", h: "be", a: "have been", ex: "this week — период не закончился." },
    { t: "choice", q: "I ___ to Saint Petersburg three times.", o: ["went", "have been", "was going"], a: 1, ex: "Опыт без времени." },
    { t: "choice", q: "I ___ to Saint Petersburg last summer.", o: ["went", "have been", "have gone"], a: 0, ex: "last summer → Past Simple." },
    { t: "choice", q: "I've known my roommate ___ two years.", o: ["since", "for", "during"], a: 1, ex: "for + длительность." },
    { t: "choice", q: "I've been interested in data ___ 2024.", o: ["for", "since", "from"], a: 1, ex: "since + точка отсчёта." },
    { t: "choice", q: "Where's Max? — He ___ to the gym. He'll be back at 8.", o: ["has been", "has gone", "went"], a: 1, ex: "Ушёл и ещё там → has gone." },
    { t: "fix", q: "I have passed the exam yesterday.", a: "I passed the exam yesterday.", ex: "yesterday → Past Simple." },
    { t: "fix", q: "I study at BMSTU since 2024.", a: ["I have studied at BMSTU since 2024.", "I have been studying at BMSTU since 2024."], ex: "since → Present Perfect." },
    { t: "fix", q: "Have you ever be to a hackathon?", a: "Have you ever been to a hackathon?", ex: "V3 от be = been.", c: ["Have you ever been to…?", "Ты когда-нибудь был на…?"] },
    { t: "fix", q: "My friend has wrote a Telegram bot in Go.", a: "My friend has written a Telegram bot in Go.", ex: "write — wrote — written." },
    { t: "tr", q: "Я уже сделал дашборд для этого проекта.", a: "I have already {made|built|created} {a|the} dashboard for this project.", ex: "already + Present Perfect." },
    { t: "tr", q: "Ты когда-нибудь проходил собеседование на английском?", a: "Have you ever {had|done|gone through|been to} {an|a job} interview in English?", ex: "Опыт: Have you ever…?" },
    { t: "tr", q: "Я ещё не выбрал тему курсовой.", a: ["I have not chosen {a|the|my} topic for my {coursework|term paper|course project} yet.", "I have not chosen {a|the|my} {coursework|term paper|course project} topic yet."], ex: "yet в конце; choose — chose — chosen." },
    { t: "tr", q: "Я хожу в зал уже два года.", a: "I have been {going to the gym|working out|training} for {two|2} years [now].", ex: "Длится до сих пор: have been + -ing + for." },
    { t: "choice", q: "What ___ this semester? — I've learned pandas and basic statistics.", o: ["did you learn", "have you learned", "do you learn"], a: 1, ex: "Семестр ещё идёт, ответ тоже в Present Perfect." },
    { t: "choice", q: "How long ___ Python?", o: ["do you learn", "have you been learning", "are you learning"], a: 1, ex: "How long + Present Perfect (Continuous)." },
    { t: "write", q: "What have you achieved in the gym over the last two years?", need: "Present Perfect минимум 2 раза (I've gained, I've learned…) и одно предложение в Past Simple с точным временем.", focus: ["n_pp"], model: "I have been going to the gym for two years. During this time I have gained about eight kilos of muscle, and my bench press has increased from 50 to 85 kg. I have also learned how to plan my training and my diet. Last month I took part in a small powerlifting competition in our dorm and came third." },
    { t: "write", q: "IELTS Speaking Part 1 style: Tell me about your experience with data. What have you done so far?", need: "Present Perfect для опыта (I've studied, I've built, I haven't … yet), Past Simple для конкретного прошлого.", focus: ["n_pp", "n_interview"], model: "I have studied Python and SQL for about a year. I have completed several online courses on data analysis, and I have built a small project: a dashboard that tracks my crypto portfolio. I haven't worked as an analyst yet, but I have solved more than a hundred SQL problems. Last semester I also wrote a term paper on time series forecasting." }
  ]
},
{
  id: "n_pc", kind: "new", stage: "B1", title: "Past Continuous",
  short: "I was studying when… · while",
  theory: `
<p><b>was / were + V-ing</b>: действие было <i>в процессе</i> в какой-то момент в прошлом.</p>
<table class="rule">
<tr><td>фон + событие</td><td>I <b>was studying</b> when the lights <b>went</b> out.<br><span class="muted">длинное → Continuous, короткое → Simple</span></td></tr>
<tr><td>while</td><td><b>While</b> I <b>was waiting</b> for the bus, I read an article.</td></tr>
<tr><td>два процесса</td><td>While I <b>was coding</b>, my roommate <b>was cooking</b>.</td></tr>
<tr><td>момент в прошлом</td><td>At 9 p.m. yesterday I <b>was working out</b>.</td></tr>
</table>
<div class="trap">Глаголы состояния (know, like, want, believe, understand) не бывают в Continuous: ✗ I was knowing → ✓ I knew.</div>`,
  items: [
    { t: "gap", q: "I ___ for the exam when the lights went out.", h: "study", a: "was studying", ex: "Фон: was studying, событие: went out." },
    { t: "gap", q: "When you called me, I ___ out at the gym.", h: "work", a: "was working", ex: "Процесс, который прервал звонок." },
    { t: "gap", q: "While my roommate ___, I was fixing a bug.", h: "cook", a: "was cooking", ex: "Два параллельных процесса." },
    { t: "gap", q: "What were you ___ at 10 p.m. yesterday?", h: "do", a: "doing", ex: "Момент в прошлом → Continuous." },
    { t: "choice", q: "I ___ a bench press when I felt pain in my shoulder.", o: ["did", "was doing", "have done"], a: 1, ex: "Процесс прервало событие." },
    { t: "choice", q: "We were watching a match when the fire alarm ___.", o: ["was ringing", "rang", "rings"], a: 1, ex: "Короткое событие → Past Simple." },
    { t: "choice", q: "While I ___ through the logs, I found the error.", o: ["looked", "was looking", "am looking"], a: 1, ex: "while + Continuous." },
    { t: "fix", q: "I was knowing the answer, but I was too nervous.", a: "I knew the answer, but I was too nervous.", ex: "know — глагол состояния." },
    { t: "fix", q: "When I came home, my roommates was playing PlayStation.", a: "When I came home, my roommates were playing PlayStation.", ex: "roommates — мн. ч. → were." },
    { t: "fix", q: "At 9 p.m. yesterday I study in the library.", a: "At {9|nine} p.m. yesterday I was studying in the library.", ex: "Момент в прошлом → was studying." },
    { t: "fix", q: "While I was waited for the bus, I read an article about A/B testing.", a: "While I was waiting for the bus, I read an article about A/B testing.", ex: "was + -ing." },
    { t: "tr", q: "Когда я сидел на паре, мне написал рекрутер.", a: ["{When|While} I was {sitting in|in|at} {a lecture|a class|class}, a recruiter {wrote to me|texted me|messaged me|sent me a message}.", "A recruiter {wrote to me|texted me|messaged me|sent me a message} {when|while} I was {sitting in|in|at} {a lecture|a class|class}."], ex: "Фон — was sitting / was in, событие — wrote.", c: ["a recruiter messaged me", "мне написал рекрутер"] },
    { t: "tr", q: "Пока я писал код, мой сосед готовил ужин.", a: "While I was {writing code|coding}, my {roommate|neighbour} was {cooking|making} dinner.", ex: "Два процесса." },
    { t: "tr", q: "Я потерял телефон, когда бежал на пару.", a: "I lost my phone {when|while} I was running to {class|a class|a lecture|my class}.", ex: "lost — событие, was running — фон." },
    { t: "choice", q: "The price of Bitcoin ___ quickly, so I sold everything.", o: ["was falling", "is falling", "has been falling"], a: 0, ex: "Фон в прошлом → was falling." },
    { t: "gap", q: "It ___ when we left the dorm, so we took a taxi.", h: "rain", a: "was raining", ex: "Погода как фон." },
    { t: "write", q: "Describe a moment when something unexpected happened (in the dorm, at the gym or during an exam). What were you doing when it happened?", need: "Past Continuous для фона (I was …ing) и Past Simple для событий (when … happened).", focus: ["n_pc"], model: "Last winter I was preparing for my calculus exam in the dorm kitchen when the fire alarm went off. Everyone was running downstairs, but I was still holding my notes. While we were standing outside in the snow, my friend was explaining integrals to me. It turned out that someone had burnt toast, so we went back after twenty minutes." },
    { t: "write", q: "What were you doing at this time yesterday? What happened after that?", need: "Минимум 2 предложения в Past Continuous и 2 в Past Simple.", focus: ["n_pc", "e_tense"], model: "At this time yesterday I was sitting in a lecture on databases. The professor was explaining indexes, and I was taking notes on my laptop. After the lecture my friends and I went to the canteen and had lunch. Then I went to the gym and did a leg workout." }
  ]
},
{
  id: "n_modal", kind: "new", stage: "B1", title: "Модальные глаголы",
  short: "can · should · must · have to · mustn't ≠ don't have to",
  theory: `
<table class="rule">
<tr><td><b>can / could</b></td><td>умею, могу; could — вежливо или «умел в прошлом»</td><td>When I was 10, I <b>could</b> do 50 push-ups. <b>Could</b> you help me?</td></tr>
<tr><td><b>should</b></td><td>совет</td><td>You <b>should</b> learn SQL first.</td></tr>
<tr><td><b>must</b></td><td>сильная необходимость, правило, «я сам считаю»</td><td>I <b>must</b> finish this today.</td></tr>
<tr><td><b>have to</b></td><td>обязанность извне (расписание, правила)</td><td>We <b>have to</b> attend all labs.</td></tr>
<tr><td><b>mustn't</b></td><td>нельзя!</td><td>You <b>mustn't</b> use phones in the exam.</td></tr>
<tr><td><b>don't have to</b></td><td>не обязательно</td><td>You <b>don't have to</b> come; it's optional.</td></tr>
<tr><td><b>might / may</b></td><td>возможно</td><td>The data <b>might</b> be wrong.</td></tr>
</table>
<div class="trap">После модальных нет to (кроме have to). В прошлом must → <b>had to</b>, can → <b>could / was able to</b>.</div>`,
  items: [
    { t: "choice", q: "You ___ submit the report by Friday: it's a strict deadline.", o: ["must", "should", "might"], a: 0, ex: "Жёсткое требование → must." },
    { t: "choice", q: "You ___ come to the meetup: it's optional.", o: ["mustn't", "don't have to", "can't"], a: 1, ex: "Не обязательно → don't have to.", c: ["you don't have to", "тебе не обязательно"] },
    { t: "choice", q: "You ___ use your phone during the exam: it's forbidden.", o: ["mustn't", "don't have to", "shouldn't to"], a: 0, ex: "Запрет → mustn't.", c: ["you mustn't", "тебе нельзя"] },
    { t: "choice", q: "I think you ___ learn SQL before Python if you want an analyst job.", o: ["should", "must to", "have"], a: 0, ex: "Совет → should." },
    { t: "choice", q: "Last year I ___ work part-time to pay for food.", o: ["must", "had to", "should"], a: 1, ex: "must в прошлом → had to." },
    { t: "choice", q: "When I was 10, I ___ do 50 push-ups.", o: ["could", "can", "was able"], a: 0, ex: "Умел в прошлом → could." },
    { t: "gap", q: "We ___ wake up early tomorrow: the lab starts at 8:30.", h: "have to", a: "have to", ex: "Расписание, обязанность извне." },
    { t: "gap", q: "___ you help me with this query, please?", h: "вежливо", a: "Could", ex: "Вежливая просьба → Could." },
    { t: "fix", q: "You should to sleep at least 7 hours.", a: "You should sleep at least {7|seven} hours.", ex: "should без to." },
    { t: "fix", q: "I must to finish my coursework this week.", a: ["I must finish my coursework this week.", "I have to finish my coursework this week."], ex: "must без to." },
    { t: "fix", q: "She don't have to come to every lecture.", a: "She doesn't have to come to every lecture.", ex: "she → doesn't." },
    { t: "fix", q: "Yesterday I must stay in the lab until 9.", a: "Yesterday I had to stay in the lab until {9|nine}.", ex: "В прошлом → had to." },
    { t: "tr", q: "Тебе не обязательно знать машинное обучение для этой стажировки.", a: "You {don't have to|don't need to} know machine learning for this internship.", ex: "Не обязательно → don't have to." },
    { t: "tr", q: "Нам нельзя готовить в комнатах общежития.", a: "We {mustn't|can't|are not allowed to} cook in [our|the] {dorm rooms|rooms of the dorm|rooms}.", ex: "Запрет: mustn't / can't / aren't allowed to.", c: ["to be allowed to", "иметь разрешение"] },
    { t: "tr", q: "Тебе стоит решать задачи на SQL каждый день.", a: "You should {solve|do|practise} SQL {problems|tasks|exercises} every day.", ex: "Совет → should." },
    { t: "choice", q: "The data ___ be wrong. Let's double-check it.", o: ["might", "must to", "should to"], a: 0, ex: "Предположение → might." },
    { t: "tr", q: "Мне пришлось переписать весь скрипт.", a: "I had to rewrite the {whole|entire} script.", ex: "Пришлось → had to.", c: ["I had to", "мне пришлось"] },
    { t: "gap", q: "You ___ trade crypto with money you can't afford to lose.", h: "не стоит", a: ["should not", "shouldn't"], ex: "Совет в отрицании → shouldn't." },
    { t: "write", q: "Give advice to a first-year student at BMSTU. What should they do? What don't they have to worry about? What mustn't they do?", need: "Используй should, have to, don't have to и mustn't.", focus: ["n_modal", "e_modal"], model: "First of all, you should attend all the labs, because you have to pass them before the exams. You don't have to understand every lecture immediately; you can watch the recordings later. However, you mustn't leave your homework until the last week of the semester. You should also find friends in your group, because it is much easier to study together." },
    { t: "write", q: "What are the rules in your dorm? What do you have to do and what can't you do?", need: "have to, can / can't, mustn't, are (not) allowed to.", focus: ["n_modal", "e_can"], model: "In our dorm we have to show our student ID at the entrance. Guests can visit us, but they have to leave before eleven p.m. We aren't allowed to cook in our rooms, so everyone cooks in the shared kitchen. We mustn't smoke inside the building, and we have to keep our rooms clean." }
  ]
},
{
  id: "n_cond", kind: "new", stage: "B1", title: "Условные предложения 1 и 2",
  short: "If I pass, I'll… · If I had, I would…",
  theory: `
<table class="rule">
<tr><td><b>1-й тип</b><br>реально</td><td><b>If + Present, will + V</b></td><td>If I <b>pass</b> the exam, I<b>'ll go</b> home for the weekend.</td></tr>
<tr><td><b>2-й тип</b><br>нереально / маловероятно сейчас</td><td><b>If + Past, would + V</b></td><td>If I <b>had</b> more time, I <b>would learn</b> Go.<br>If I <b>were</b> you, I<b>'d apply</b> to Ozon.</td></tr>
</table>
<div class="trap">В части с if не бывает will / would: ✗ If I will finish → ✓ If I finish. ✗ If I would know → ✓ If I knew.<br>unless = if not: Unless you practise, you won't improve.</div>
<p>Выбор типа = насколько ты в это веришь: «если найду стажировку» (реально, 1-й) vs «если бы выиграл миллион» (2-й).</p>`,
  items: [
    { t: "gap", q: "If the test ___ significant, we'll launch the feature.", h: "be", a: "is", ex: "1-й тип: if + Present." },
    { t: "gap", q: "If I ___ more free time, I would learn Go.", h: "have", a: "had", ex: "2-й тип: if + Past." },
    { t: "gap", q: "If I were you, I ___ to Yandex and Ozon at the same time.", h: "apply", a: "would apply", ex: "would + V.", c: ["If I were you, I'd…", "на твоём месте я бы…"] },
    { t: "gap", q: "If you don't sleep enough, your muscles ___.", h: "not grow", a: ["will not grow", "won't grow"], ex: "1-й тип: will / won't." },
    { t: "choice", q: "If I ___ rich, I would buy a flat near the university.", o: ["am", "were", "would be"], a: 1, ex: "2-й тип: were." },
    { t: "choice", q: "If it rains tomorrow, we ___ in the dorm gym.", o: ["train", "will train", "would train"], a: 1, ex: "Реальная ситуация → will." },
    { t: "choice", q: "What would you do if you ___ a million dollars?", o: ["win", "won", "will win"], a: 1, ex: "2-й тип: if + Past." },
    { t: "choice", q: "If I get the internship, I ___ move out of the dorm.", o: ["will", "would", "am"], a: 0, ex: "Реально → will." },
    { t: "fix", q: "If I will finish early, I will call you.", a: "If I finish early, I will call you.", ex: "if + Present." },
    { t: "fix", q: "If I would know the answer, I would tell you.", a: "If I knew the answer, I would tell you.", ex: "В if-части нет would." },
    { t: "fix", q: "If I had a better laptop, I would trained bigger models.", a: "If I had a better laptop, I would train bigger models.", ex: "would + base form." },
    { t: "tr", q: "Если я сдам экзамен, я поеду домой.", a: "If I pass the exam, I {will|am going to} go home.", ex: "1-й тип." },
    { t: "tr", q: "Если бы я жил ближе к университету, я бы спал дольше.", a: "If I lived closer to [the] university, I would {sleep longer|sleep more|get more sleep}.", ex: "2-й тип: lived … would." },
    { t: "tr", q: "На твоём месте я бы начал с SQL.", a: "If I were you, I would start with SQL.", ex: "If I were you…" },
    { t: "choice", q: "Which sentence is about a REAL possibility?", o: ["If I have time, I'll help you.", "If I had time, I'd help you."], a: 0, ex: "1-й тип = реально." },
    { t: "gap", q: "Unless you ___ speaking, you won't feel confident at interviews.", h: "practise", a: "practise", ex: "unless + Present." },
    { t: "tr", q: "Что бы ты сделал, если бы тебе предложили работу в Лондоне?", a: "What would you do if {you were offered|someone offered you|they offered you|you got} a job in London?", ex: "2-й тип в вопросе." },
    { t: "write", q: "What would you do if you didn't have to study or work for a year?", need: "Минимум 3 предложения 2-го типа (If I…, I would…).", focus: ["n_cond", "e_modal"], model: "If I didn't have to study for a year, I would travel around Asia. I would spend a few months in Japan, because I have always wanted to see Tokyo. If I had enough money, I would also take a long English course abroad. I wouldn't stop going to the gym, though: I would just train at different gyms in different countries." },
    { t: "write", q: "What will you do if you get an internship this summer? And what would you do if you could choose any company in the world?", need: "Одно-два предложения 1-го типа и одно-два 2-го. Сравни, насколько это реально.", focus: ["n_cond", "e_tense"], model: "If I get an internship this summer, I will move closer to the office and work full-time. I will try to learn how real analytics teams use A/B tests. If I could choose any company in the world, I would choose Spotify, because I would love to analyse how people listen to music. But that is not realistic yet, so I will start with a Russian tech company." }
  ]
},
{
  id: "n_comp", kind: "new", stage: "B1", title: "Сравнительная степень",
  short: "harder than · more difficult · not as … as · the more…",
  theory: `
<table class="rule">
<tr><td>короткие</td><td>hard → hard<b>er</b>, big → bi<b>gg</b>er, easy → eas<b>ier</b></td></tr>
<tr><td>длинные</td><td><b>more</b> difficult, <b>more</b> interesting</td></tr>
<tr><td>неправильные</td><td>good → <b>better</b>, bad → <b>worse</b>, far → <b>further</b></td></tr>
<tr><td>усиление</td><td><b>much / far / a lot</b> harder; <b>a bit / slightly</b> faster</td></tr>
<tr><td>равенство</td><td><b>not as</b> fast <b>as</b> · the same <b>as</b></td></tr>
<tr><td>чем…, тем…</td><td><b>The more</b> you practise, <b>the better</b> you speak.</td></tr>
</table>
<div class="trap">✗ more harder, ✗ more better. После сравнения пишется <b>than</b>, а не then. Не забывай the: than <b>the</b> last one.</div>`,
  items: [
    { t: "gap", q: "Go is ___ than Python for this kind of task.", h: "fast", a: "faster", ex: "Короткое: faster." },
    { t: "gap", q: "This semester is ___ than the first one.", h: "difficult", a: "more difficult", ex: "Длинное: more difficult." },
    { t: "gap", q: "My squat is ___ than my bench press.", h: "good", a: "better", ex: "good → better." },
    { t: "gap", q: "Today I felt ___ than yesterday: I didn't sleep.", h: "bad", a: "worse", ex: "bad → worse." },
    { t: "gap", q: "Calculus is ___ than linear algebra for me.", h: "easy", a: "easier", ex: "y → ier." },
    { t: "choice", q: "SQL is ___ easier than C++ for beginners.", o: ["more", "much", "very"], a: 1, ex: "Усиление сравнения → much.", c: ["much easier", "намного легче"] },
    { t: "choice", q: "Python isn't ___ fast ___ C++.", o: ["as / as", "so / than", "more / than"], a: 0, ex: "not as … as.", c: ["not as fast as", "не такой быстрый, как"] },
    { t: "choice", q: "The more you practise, ___ you speak.", o: ["the better", "better", "the best"], a: 0, ex: "The more…, the better…", c: ["the more…, the better…", "чем больше…, тем лучше…"] },
    { t: "fix", q: "This laptop is more better than my old one.", a: ["This laptop is better than my old one.", "This laptop is much better than my old one."], ex: "better уже сравнительная." },
    { t: "fix", q: "My dorm room is bigger then my room at home.", a: "My dorm room is bigger than my room at home.", ex: "than, не then." },
    { t: "fix", q: "This year the competition is more hard than last year.", a: "This year the competition is harder than last year.", ex: "hard → harder." },
    { t: "fix", q: "Postgres is not as fast than ClickHouse for analytics.", a: "Postgres is not as fast as ClickHouse for analytics.", ex: "as … as." },
    { t: "tr", q: "Это задание намного сложнее, чем прошлое.", a: "This {task|assignment} is {much|far|a lot} {harder|more difficult} than the {last|previous} one.", ex: "much harder than the last one." },
    { t: "tr", q: "Мой сосед не такой организованный, как я.", a: "My {roommate|neighbour} is not as organized as {me|I am}.", ex: "not as … as." },
    { t: "tr", q: "Чем больше я тренируюсь, тем сильнее становлюсь.", a: "The more I {train|work out|exercise}, the stronger I {become|get}.", ex: "The more…, the stronger…" },
    { t: "choice", q: "Crypto is ___ than stocks.", o: ["riskier", "more riskier", "riskyer"], a: 0, ex: "risky → riskier." },
    { t: "write", q: "Compare studying at BMSTU with studying at school.", need: "Минимум 3 сравнения: -er than, more … than, not as … as, much + сравнительная.", focus: ["n_comp", "e_art"], model: "Studying at BMSTU is much harder than studying at school. The subjects are more abstract, and the professors don't check your homework as often as school teachers did. On the other hand, university life is more interesting: I have more freedom and I can choose my own projects. School was not as stressful as the exam period here, but it was also more boring." },
    { t: "write", q: "IELTS Writing Task 1 (mini): In 2024 our app had 40,000 users, in 2025 it had 65,000. The iOS share fell from 60% to 45%. Describe the changes.", need: "Сравнения и числа: rose from … to …, by …%, more than, not as … as. Без мнений — только факты.", focus: ["n_comp", "e_num"], model: "The number of users rose from 40,000 in 2024 to 65,000 in 2025, which is an increase of more than 60 percent. At the same time, the share of iOS users fell from 60 to 45 percent. As a result, Android became more popular than iOS in 2025. However, the absolute number of iOS users still grew slightly, from 24,000 to about 29,000." }
  ]
},
{
  id: "n_phr", kind: "new", stage: "B1", title: "Фразовые глаголы",
  short: "go through · work through · figure out · hang out",
  words: [
    ["go through", "тщательно просмотреть; пережить"], ["look through", "бегло просмотреть"], ["work through", "разобрать шаг за шагом"],
    ["get through", "справиться, пережить (трудный период)"], ["hang out", "тусоваться, проводить время"], ["figure out", "разобраться, понять"],
    ["find out", "узнать, выяснить"], ["come up with", "придумать"], ["look into", "изучить, разобраться (в проблеме)"],
    ["set up", "настроить, организовать"], ["give up", "бросить, сдаться"], ["keep up with", "не отставать от"],
    ["catch up (on)", "наверстать"], ["run out of", "закончиться (о запасе)"], ["put off", "откладывать"],
    ["turn out", "оказаться"], ["break down", "сломаться; разбить на части"], ["sign up for", "записаться на"],
    ["pick up", "быстро освоить, подхватить"], ["drop out", "бросить учёбу, отчислиться"]
  ],
  theory: `
<p>Фразовый глагол = глагол + частица, и смысл часто не складывается из частей. Учи их в контексте, по одному примеру на каждый. Отметь ниже глаголы, которых не знал: они попадут в копилку.</p>
<div class="trap">go through — тщательно, по пунктам; look through — бегло, по диагонали. В IELTS Speaking фразовые глаголы звучат естественно, а в эссе (Writing Task 2) лучше брать нейтральные синонимы: investigate вместо look into, postpone вместо put off.</div>`,
  items: [
    { t: "choice", q: "Before the interview, I ___ all my notes on statistics.", o: ["went through", "went on", "went off"], a: 0, ex: "Тщательно просмотрел → went through.", c: ["go through", "тщательно просмотреть"] },
    { t: "choice", q: "I only had five minutes, so I quickly ___ the report.", o: ["looked through", "looked after", "looked for"], a: 0, ex: "Бегло → looked through.", c: ["look through", "бегло просмотреть"] },
    { t: "choice", q: "We ___ the problem set step by step with our TA.", o: ["worked through", "worked off", "worked up"], a: 0, ex: "Разобрали по шагам → worked through.", c: ["work through", "разобрать шаг за шагом"] },
    { t: "choice", q: "The exam period was tough, but I ___ it.", o: ["got through", "got over with", "got along"], a: 0, ex: "Пережил, справился → got through.", c: ["get through", "справиться, пережить"] },
    { t: "gap", q: "On Fridays we usually hang ___ in the kitchen on our floor.", a: "out", ex: "hang out.", c: ["hang out", "тусоваться"] },
    { t: "gap", q: "I can't figure ___ why this JOIN returns duplicates.", a: "out", ex: "figure out.", c: ["figure out", "разобраться"] },
    { t: "gap", q: "Let's look ___ this anomaly in the retention data.", a: "into", ex: "look into.", c: ["look into", "изучить проблему"] },
    { t: "gap", q: "We came ___ with a new metric for user engagement.", a: "up", ex: "come up with.", c: ["come up with", "придумать"] },
    { t: "gap", q: "I almost gave ___ trading after losing money in 2022.", a: "up", ex: "give up.", c: ["give up", "бросить, сдаться"] },
    { t: "gap", q: "I'm trying to keep up ___ my classmates in math.", a: "with", ex: "keep up with.", c: ["keep up with", "не отставать от"] },
    { t: "gap", q: "We've run out ___ protein powder.", a: "of", ex: "run out of.", c: ["run out of", "закончиться"] },
    { t: "gap", q: "Stop putting ___ your coursework!", a: "off", ex: "put off.", c: ["put off", "откладывать"] },
    { t: "gap", q: "It turned ___ that the bug was in the timezone conversion.", a: "out", ex: "turn out.", c: ["turn out", "оказаться"] },
    { t: "gap", q: "I signed ___ for an online course on A/B testing.", a: "up", ex: "sign up for.", c: ["sign up for", "записаться на"] },
    { t: "tr", q: "Мне нужно разобраться, как работает этот алгоритм.", a: "I need to {figure out|work out} how this algorithm works.", ex: "figure out + how … works (прямой порядок слов)." },
    { t: "tr", q: "Давай потусуемся после пар.", a: "Let's hang out after {classes|class|lectures}.", ex: "hang out." },
    { t: "tr", q: "Я быстро освоил Go, потому что уже знал C.", a: ["I picked up Go quickly because I already knew C.", "I quickly picked up Go because I already knew C."], ex: "pick up = быстро освоить.", c: ["pick up", "быстро освоить"] },
    { t: "tr", q: "Оказалось, что данные были неполными.", a: ["It turned out that the data {was|were} incomplete.", "The data turned out to be incomplete."], ex: "turn out." },
    { t: "choice", q: "My laptop ___ right before the deadline.", o: ["broke down", "broke up", "broke out"], a: 0, ex: "Сломался → broke down.", c: ["break down", "сломаться"] },
    { t: "choice", q: "Let's ___ this big task ___ smaller steps.", o: ["break / down into", "break / up", "put / off"], a: 0, ex: "break down into — разбить на части." },
    { t: "write", q: "How do you prepare for a difficult exam?", need: "Минимум 3 фразовых глагола (go through, work through, put off, get through, figure out…).", focus: ["n_phr"], model: "First, I go through all the lecture notes and mark the topics I don't understand. Then I work through old exam problems with my friends, because it is easier to figure out difficult tasks together. I try not to put off revision until the last night. During the exam period I sleep at least seven hours, otherwise I can't get through the week." },
    { t: "write", q: "IELTS Speaking Part 1: How do you usually spend time with your friends?", need: "hang out + ещё 2 фразовых глагола; Present Simple для привычек (без can!).", focus: ["n_phr", "e_can", "e_calque"], model: "My friends and I usually hang out in the dorm kitchen in the evenings. We cook something together, talk about our studies and sometimes play board games. At weekends we often go to the city centre or work out at the gym together. When someone is behind with homework, the others help him catch up." }
  ]
},
{
  id: "n_link", kind: "new", stage: "B1", title: "Связки для аргументации",
  short: "however · on the other hand · as a result · although / despite",
  words: [
    ["however", "однако (в начале предложения, с запятой)"], ["on the one hand / on the other hand", "с одной стороны / с другой стороны"],
    ["as a result", "в результате"], ["therefore", "поэтому, следовательно"], ["moreover / in addition", "более того / кроме того"],
    ["although / even though", "хотя (+ подлежащее и глагол)"], ["despite / in spite of", "несмотря на (+ сущ. или -ing)"],
    ["for example / for instance", "например"], ["such as", "такие как (внутри предложения)"], ["in conclusion / overall", "в заключение / в целом"]
  ],
  theory: `
<table class="rule">
<tr><td>противопоставление</td><td>I like Python. <b>However,</b> it's slow. · I like Python, <b>but</b> it's slow.<br><b>Although</b> I was tired, I went. · <b>Despite</b> the rain / <b>Despite being</b> tired…</td></tr>
<tr><td>две стороны</td><td><b>On the one hand,</b> … <b>On the other hand,</b> … (✗ on the other side)</td></tr>
<tr><td>следствие</td><td><b>As a result,</b> … · <b>Therefore,</b> … · <b>That's why</b> … (устно)</td></tr>
<tr><td>добавление</td><td><b>Moreover,</b> … · <b>In addition,</b> …</td></tr>
<tr><td>пример</td><td><b>For example,</b> … · languages <b>such as</b> Go and C++</td></tr>
</table>
<div class="trap">Despite + существительное / -ing, although + целое предложение: ✗ Despite I studied → ✓ Although I studied / Despite studying. Для IELTS Task 2 связки обязательны: на них держится критерий Coherence &amp; Cohesion.</div>`,
  items: [
    { t: "choice", q: "I enjoy trading. ___, it takes too much time and causes stress.", o: ["However", "Although", "Despite"], a: 0, ex: "Новое предложение + запятая → However." },
    { t: "choice", q: "___ I was tired, I went to the gym.", o: ["Despite", "Although", "However"], a: 1, ex: "Дальше целое предложение → Although." },
    { t: "choice", q: "___ the rain, we went for a run.", o: ["Although", "Despite", "However"], a: 1, ex: "Дальше существительное → Despite." },
    { t: "choice", q: "I practised SQL every day. ___, I passed the technical interview.", o: ["As a result", "On the other hand", "Although"], a: 0, ex: "Следствие → As a result." },
    { t: "choice", q: "On the one hand, Moscow offers many jobs. ___, rent is very expensive.", o: ["On the other hand", "As a result", "For example"], a: 0, ex: "Вторая сторона." },
    { t: "choice", q: "I know several languages, ___ Python, Go and C++.", o: ["such as", "for example,", "as a result"], a: 0, ex: "Внутри перечисления → such as." },
    { t: "choice", q: "The dorm is cheap. ___, it's close to the university.", o: ["Moreover", "However", "Despite"], a: 0, ex: "Добавление → Moreover." },
    { t: "fix", q: "Despite I studied a lot, I failed the test.", a: ["Although I studied a lot, I failed the test.", "Despite studying a lot, I failed the test.", "Even though I studied a lot, I failed the test."], ex: "Despite + -ing или Although + предложение.", c: ["despite + -ing / although + clause", "несмотря на / хотя"] },
    { t: "fix", q: "I like Python. Although, it's slow for some tasks.", a: ["I like Python. However, it is slow for some tasks.", "I like Python, but it is slow for some tasks."], ex: "Although не работает как «Однако,». В начале предложения с запятой — However; although — только внутри предложения." },
    { t: "fix", q: "On the other side, remote work saves time.", a: "On the other hand, remote work saves time.", ex: "on the other hand.", c: ["on the other hand", "с другой стороны"] },
    { t: "tr", q: "Однако у меня пока нет коммерческого опыта.", a: "However, I {don't have any|don't have|have no} commercial experience yet.", ex: "However + запятая." },
    { t: "tr", q: "В результате конверсия выросла на 5%.", a: "As a result, [the|our] conversion [rate] {grew|increased|went up|rose} by 5 percent.", ex: "As a result, … rose by 5%." },
    { t: "tr", q: "Хотя я устал, я закончил задачу.", a: "{Although|Even though|Though} I was tired, I finished the task.", ex: "Although + предложение." },
    { t: "choice", q: "In ___, I think a data analyst needs both technical and communication skills.", o: ["conclusion", "the end", "result"], a: 0, ex: "In conclusion — для вывода в эссе." },
    { t: "gap", q: "First, I clean the data. ___, I build the dashboard.", h: "затем", a: ["Then", "Next", "Secondly", "After that"], ex: "Последовательность шагов." },
    { t: "write", q: "IELTS Task 2 (mini): Should students work part-time while studying?", need: "On the one hand / On the other hand + However / As a result. 4–6 предложений, вывод в конце.", focus: ["n_link", "e_art"], model: "On the one hand, a part-time job gives students money and real experience. For example, a junior analyst position can be more useful than some university courses. On the other hand, work takes a lot of time, and as a result, many students fall behind with their studies. However, if the job is related to their future profession, the benefits are usually bigger than the costs. In conclusion, I believe students should work only if the job helps their career." },
    { t: "write", q: "Is it better to learn data analytics at university or through online courses?", need: "Минимум 4 разные связки. Аргумент + пример.", focus: ["n_link", "n_comp"], model: "In my opinion, university gives a stronger foundation than online courses. For instance, at BMSTU we study probability theory and statistics in depth. However, online courses are more practical and up to date: they teach tools such as dbt or Airflow. Moreover, they are much cheaper and more flexible. Overall, I think the best option is to combine both." }
  ]
},
{
  id: "n_interview", kind: "new", stage: "B1", title: "Собеседование и проекты",
  short: "be responsible for · run an A/B test · findings · strengths",
  words: [
    ["internship", "стажировка"], ["requirements", "требования (к кандидату)"], ["responsibilities", "обязанности"],
    ["to be responsible for", "отвечать за"], ["to run an A/B test", "провести A/B-тест"], ["to track metrics", "отслеживать метрики"],
    ["findings", "выводы, результаты исследования"], ["insight", "инсайт, ценный вывод"], ["stakeholder", "заинтересованная сторона, заказчик"],
    ["churn", "отток"], ["retention", "удержание"], ["conversion rate", "конверсия"], ["to meet a deadline", "уложиться в срок"],
    ["attention to detail", "внимательность к деталям"], ["to be eager to", "очень хотеть, стремиться"], ["pet project", "личный проект"],
    ["to walk sb through sth", "подробно рассказать по шагам"], ["strengths and weaknesses", "сильные и слабые стороны"],
    ["to come up with a hypothesis", "выдвинуть гипотезу"], ["to present findings", "представить результаты"]
  ],
  theory: `
<p>На собеседовании про проекты удобно рассказывать по схеме <b>STAR</b>: Situation (контекст) → Task (задача) → Action (что сделал <i>ты</i>) → Result (результат, лучше в цифрах).</p>
<ul>
<li>Прошлые проекты — Past Simple: I <b>built</b>, I <b>ran</b>, I <b>found</b>.</li>
<li>Опыт в целом — Present Perfect: I<b>'ve worked</b> with pandas for a year.</li>
<li>Глаголы действия вместо «did»: analysed, built, cleaned, designed, automated, reduced, increased.</li>
</ul>
<div class="trap">responsible <b>for</b> (не about/of); run a test (не make); findings — всегда во множественном числе.</div>`,
  items: [
    { t: "choice", q: "In my pet project, I was responsible ___ data collection and cleaning.", o: ["for", "of", "about"], a: 0, ex: "responsible for.", c: ["to be responsible for", "отвечать за"] },
    { t: "choice", q: "I ___ an A/B test to check if the new button increases conversion.", o: ["ran", "made", "did run"], a: 0, ex: "run a test.", c: ["to run an A/B test", "провести A/B-тест"] },
    { t: "choice", q: "One of my ___ is attention to detail.", o: ["strengths", "strongs", "forces"], a: 0, ex: "strengths — сильные стороны." },
    { t: "choice", q: "I'm ___ to learn from experienced analysts.", o: ["eager", "hungry", "wishful"], a: 0, ex: "be eager to.", c: ["to be eager to", "очень хотеть"] },
    { t: "choice", q: "We managed to ___ the deadline.", o: ["meet", "catch", "keep"], a: 0, ex: "meet a deadline.", c: ["to meet a deadline", "уложиться в срок"] },
    { t: "gap", q: "Our main ___ was 7-day retention.", h: "метрика", a: "metric", ex: "metric." },
    { t: "gap", q: "I'm applying for a data analyst ___.", h: "стажировка", a: "internship", ex: "internship." },
    { t: "gap", q: "I presented my ___ to the product team.", h: "выводы", a: ["findings", "insights"], ex: "findings — всегда мн. ч.", c: ["findings", "выводы исследования"] },
    { t: "gap", q: "The goal was to reduce customer ___.", h: "отток", a: "churn", ex: "churn.", c: ["churn", "отток"] },
    { t: "tr", q: "Я построил дашборд, который отслеживает ключевые метрики.", a: "I {built|created|made|have built} a dashboard {that|which} tracks [the] key metrics.", ex: "built a dashboard that tracks…", c: ["to track key metrics", "отслеживать ключевые метрики"] },
    { t: "tr", q: "Мне не хватает опыта работы в команде.", a: ["I lack experience {of|in} working in a team.", "I {don't have|do not have} enough experience {of|in} working in a team.", "I lack teamwork experience.", "I {don't have|do not have} enough teamwork experience."], ex: "lack sth (без of) / don't have enough experience." },
    { t: "tr", q: "Расскажите, пожалуйста, о своём последнем проекте.", a: ["Could you [please] tell {me|us} about your {last|latest|most recent} project[, please]?", "Please tell {me|us} about your {last|latest|most recent} project."], ex: "Could you tell me about…?" },
    { t: "tr", q: "Я очистил данные и нашёл несколько интересных закономерностей.", a: "I cleaned the data and found {several|a few|some} interesting patterns.", ex: "clean the data; pattern — закономерность.", c: ["pattern", "закономерность"] },
    { t: "fix", q: "I am responsible about cleaning data.", a: ["I am responsible for cleaning [the] data.", "I am responsible for data cleaning."], ex: "responsible for." },
    { t: "fix", q: "In my project I did an analysis of retention and maked a dashboard.", a: ["In my project I analysed retention and made a dashboard.", "In my project I did an analysis of retention and made a dashboard.", "In my project I analysed retention and built a dashboard."], ex: "make — made (неправильный)." },
    { t: "choice", q: "Tell me about yourself. Which start is the strongest?", o: ["I am 19 years old student from Bauman.", "I'm a second-year applied maths and computer science student at BMSTU, and I'm really interested in product analytics.", "My name is Ivan. I was born in 2007 in…"], a: 1, ex: "Сразу кто ты и чем интересуешься. Биография с рождения не нужна." },
    { t: "gap", q: "Conversion ___ by 12% after we changed the onboarding.", h: "выросла", a: ["increased", "grew", "went up", "rose"], ex: "rose / increased by X%.", c: ["to increase by 12%", "вырасти на 12%"] },
    { t: "write", q: "Interview: Tell me about yourself.", need: "4–6 предложений: кто ты → что умеешь (Present Perfect) → проект (Past Simple) → почему эта стажировка.", focus: ["n_interview", "n_pp", "e_art", "e_prep"], model: "I'm a second-year student at BMSTU, where I study applied mathematics and computer science. I've been interested in data analytics for about a year, and I've learned SQL, Python and the basics of statistics. Last semester I built a dashboard that tracks my crypto portfolio and calculates its risk. I'm eager to work with real product data, and that's why I'm applying for this internship." },
    { t: "write", q: "Interview: Tell me about a project where you worked with data. What was the goal, what did you do, and what was the result?", need: "STAR: Situation → Task → Action → Result. Глаголы действия в Past Simple, результат в цифрах.", focus: ["n_interview", "e_tense", "e_num"], model: "In our dorm, people often complained that the gym was too crowded. My task was to find out when it was least busy. I collected check-in data for three months, cleaned it in pandas and built a simple heatmap by hour and weekday. As a result, I found two quiet time slots, and after the dorm council shared them, the evening queue dropped by about 30 percent." },
    { t: "write", q: "Interview: What are your strengths and weaknesses?", need: "Сильная сторона + пример. Слабая сторона + что ты с ней делаешь.", focus: ["n_interview", "e_be"], model: "I think my main strength is that I learn quickly. For example, I picked up Go in two weeks for a university project. My weakness is that I sometimes spend too much time on small details. To deal with it, I now set a time limit for each task and ask for feedback earlier." }
  ]
}
);
