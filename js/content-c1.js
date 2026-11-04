/* Уровень C1: уроки по порядку. Новые задания добавляй ТОЛЬКО в конец items. */
window.EG = window.EG || {};
EG.topics = EG.topics || [];

EG.topics.push(
{
  id: "c1_inv", stage: "C1", title: "Инверсия",
  short: "Never have I… · Not only did… · Had I known…",
  theory: `
<p>Если предложение начинается с отрицательного или ограничительного слова, дальше идёт порядок как в вопросе: <b>вспомогательный глагол + подлежащее</b>. Звучит формально и эмфатично: подходит для эссе и Speaking Part 3, но в меру.</p>
<table class="rule">
<tr><td>Never / Rarely / Seldom</td><td><b>Never have I seen</b> such a clean dataset.</td></tr>
<tr><td>Not only … but also</td><td><b>Not only did</b> conversion grow, <b>but</b> retention <b>also</b> improved.</td></tr>
<tr><td>Hardly / No sooner</td><td><b>Hardly had I</b> started when… · <b>No sooner had we</b> launched <b>than</b>…</td></tr>
<tr><td>Only after / when / then</td><td><b>Only after</b> the test <b>did we</b> realise…</td></tr>
<tr><td>Under no circumstances / Little</td><td><b>Under no circumstances should</b> you… · <b>Little did I know</b>…</td></tr>
<tr><td>условные без if</td><td><b>Had I known</b> = If I had known · <b>Should you</b> have questions = If you have</td></tr>
</table>
<div class="trap">В Past Simple нужен did: ✗ Not only she trains → ✓ Not only does she train.</div>`,
  items: [
    { t: "choice", q: "Never ___ such a clean dataset.", o: ["I have seen", "have I seen", "I saw"], a: 1, ex: "Never + have I." },
    { t: "choice", q: "Not only ___ the deadline, but we also exceeded the targets.", o: ["we met", "did we meet", "we did meet"], a: 1, ex: "Not only + did we." },
    { t: "choice", q: "___ I known about the internship, I would have applied.", o: ["If", "Had", "Have"], a: 1, ex: "Had I known = If I had known." },
    { t: "choice", q: "___ you have any questions, do not hesitate to contact me.", o: ["Should", "Would", "Had"], a: 0, ex: "Should you… = If you…" },
    { t: "choice", q: "Rarely ___ students read the whole syllabus.", o: ["do", "are", "have"], a: 0, ex: "Present Simple → do." },
    { t: "choice", q: "Little ___ that this small project would get me a job.", o: ["I knew", "did I know", "I did know"], a: 1, ex: "Little did I know." },
    { t: "gap", q: "Only after the test ___ we realise that the sample was biased.", a: "did", ex: "Only after … did we." },
    { t: "gap", q: "Hardly ___ I started the presentation when the projector died.", a: "had", ex: "Hardly had I … when." },
    { t: "gap", q: "No sooner had we launched the feature ___ users started complaining.", a: "than", ex: "No sooner … than." },
    { t: "gap", q: "Under no circumstances ___ you share your password.", a: "should", ex: "Under no circumstances should you." },
    { t: "fix", q: "Not only she trains every day, but she also studies at night.", a: "Not only does she train every day, but she also studies at night.", ex: "Not only + does she + base form." },
    { t: "fix", q: "Seldom I have seen such dedication.", a: "Seldom have I seen such dedication.", ex: "Seldom + have I." },
    { t: "tr", q: "Никогда я не видел такой жёсткой конкуренции.", a: "Never have I seen such {strong|fierce|tough|intense} competition.", ex: "Never have I…" },
    { t: "tr", q: "Знай я это раньше, я бы выбрал другой вуз.", a: "Had I known {this|that|it} {earlier|before}, I would have chosen {a different|another} university.", ex: "Had I known…" },
    { t: "rw", q: "I didn't realise how hard it would be.", h: "Начни с Little did I…", a: "Little did I {realise|know} how hard it would be.", ex: "Little did I know / realise." },
    { t: "write", q: "IELTS Task 2 paragraph: How has technology changed the way students learn?", need: "Минимум 2 инверсии (Not only…, Rarely…, Never before…).", focus: ["c1_inv"], model: "Never before have students had access to so many learning resources. Not only can they watch lectures from the world's best universities, but they can also practise with AI tutors at any time. However, rarely do these tools teach discipline. Only when students learn to plan their own time do they really benefit from online learning." }
  ]
},
{
  id: "c1_cleft", stage: "C1", title: "Расщеплённые предложения",
  short: "What I need is… · It was … that… · The reason why…",
  theory: `
<p>Cleft sentences выделяют главное. В Speaking они ещё и дают секунду подумать.</p>
<table class="rule">
<tr><td><b>It is / was … that / who</b></td><td><b>It was</b> the QA team <b>that</b> found the bug.</td></tr>
<tr><td><b>What … is / was</b></td><td><b>What I need is</b> more practice. <b>What surprised me was</b>…</td></tr>
<tr><td><b>What … did was</b></td><td><b>What we did was</b> (to) rewrite the pipeline.</td></tr>
<tr><td><b>The reason why / The thing that / All</b></td><td><b>The reason why</b> I chose BMSTU <b>is</b>… · <b>All I want is</b>…</td></tr>
</table>
<div class="trap">✗ What I need it is… → ✓ What I need is… (без it). Для людей — who или that, не which.</div>`,
  items: [
    { t: "choice", q: "___ I like most about analytics is finding patterns.", o: ["That", "What", "Which"], a: 1, ex: "What … is." },
    { t: "choice", q: "It was my coach ___ convinced me to compete.", o: ["who", "what", "which"], a: 0, ex: "Человек → who / that." },
    { t: "choice", q: "What we need ___ more data.", o: ["are", "is", "be"], a: 1, ex: "What … is." },
    { t: "gap", q: "It ___ in 2022 that I started trading.", a: "was", ex: "It was … that." },
    { t: "gap", q: "___ surprised me was how friendly the team was.", a: "What", ex: "What surprised me was…" },
    { t: "gap", q: "The reason ___ I chose BMSTU is its strong CS programme.", a: "why", ex: "The reason why." },
    { t: "gap", q: "All I want ___ a quiet place to study.", a: "is", ex: "All I want is…" },
    { t: "fix", q: "What I need it is more sleep.", a: "What I need is more sleep.", ex: "Лишнее it." },
    { t: "fix", q: "It was Sasha which fixed the bug.", a: "It was Sasha {who|that} fixed the bug.", ex: "Человек → who / that." },
    { t: "tr", q: "Больше всего меня мотивирует прогресс.", a: "What motivates me [the] most is {progress|my progress}.", ex: "What … is." },
    { t: "tr", q: "Именно статистика оказалась самым сложным предметом.", a: "It was statistics that turned out to be the {hardest|most difficult} subject.", ex: "It was … that." },
    { t: "tr", q: "Что мы сделали — так это переписали весь пайплайн.", a: "What we did was [to] rewrite the {whole|entire} pipeline.", ex: "What we did was (to) + V." },
    { t: "choice", q: "Which sentence emphasises WHO found the bug?", o: ["The QA team found the bug.", "It was the QA team that found the bug.", "The bug was found."], a: 1, ex: "It was … that." },
    { t: "write", q: "Interview: What motivates you, and what do you find most challenging in your studies?", need: "Минимум 3 cleft-конструкции.", focus: ["c1_cleft"], model: "What motivates me most is seeing measurable progress, both in the gym and in my studies. It was my first data project that showed me how satisfying this can be. What I find most challenging, though, is managing my time during the exam period. What I've started doing is planning every week on Sunday evening, and it really helps." }
  ]
},
{
  id: "c1_part", stage: "C1", title: "Причастные обороты",
  short: "Having analysed… · Based on… · Living in a dorm, I…",
  theory: `
<p>Participle clauses сжимают два предложения в одно и делают стиль плотнее.</p>
<table class="rule">
<tr><td><b>V-ing</b></td><td>одновременно / причина</td><td><b>Living</b> in a dorm, I learned to cook.</td></tr>
<tr><td><b>Having + V3</b></td><td>сначала одно, потом другое</td><td><b>Having analysed</b> the data, we presented the results.</td></tr>
<tr><td><b>V3</b></td><td>пассивное значение</td><td><b>Founded</b> in 1830, BMSTU… · <b>Based on</b> the results, …</td></tr>
<tr><td>сокращённое придаточное</td><td></td><td>Users <b>signing up</b> via mobile… · The data <b>collected</b> last month…</td></tr>
<tr><td>после предлогов</td><td></td><td><b>After training</b>, … · <b>without checking</b> …</td></tr>
</table>
<div class="trap">Подлежащее оборота и главного предложения должно совпадать: ✗ Walking to the lab, the rain started (дождь не шёл в лабораторию) → ✓ Walking to the lab, I got caught in the rain.</div>`,
  items: [
    { t: "choice", q: "___ the data, we noticed several outliers.", o: ["Cleaning", "Cleaned", "Having clean"], a: 0, ex: "Активное, одновременно → -ing." },
    { t: "choice", q: "___ the report, she sent it to the manager.", o: ["Having finished", "Finished", "Having finishing"], a: 0, ex: "Сначала закончила → Having + V3." },
    { t: "choice", q: "___ on last year's data, the model is now outdated.", o: ["Training", "Trained", "Having train"], a: 1, ex: "Модель обучили → пассив, V3." },
    { t: "choice", q: "Which sentence is correct?", o: ["Walking to the lab, the rain started.", "Walking to the lab, I got caught in the rain."], a: 1, ex: "Подлежащие должны совпадать." },
    { t: "gap", q: "___ on the results of the test, we decided to keep the old design.", h: "base", a: "Based", ex: "Based on…" },
    { t: "gap", q: "Users ___ up via the mobile app are more active.", h: "sign", a: "signing", ex: "= users who sign up." },
    { t: "gap", q: "The survey ___ last month showed high satisfaction.", h: "conduct", a: "conducted", ex: "= the survey which was conducted." },
    { t: "gap", q: "___ lived in a dorm for two years, I know how to share space.", h: "have", a: "Having", ex: "Having lived…" },
    { t: "fix", q: "Having finish the analysis, I wrote a summary.", a: "Having finished the analysis, I wrote a summary.", ex: "Having + V3." },
    { t: "fix", q: "After train, I always drink a protein shake.", a: "After training, I always drink a protein shake.", ex: "После предлога → -ing." },
    { t: "tr", q: "Проанализировав данные, мы нашли причину оттока.", a: "Having analyzed the data, we found the {cause|reason} {of|for} [the] churn.", ex: "Having analysed…" },
    { t: "tr", q: "Основанный в 1830 году, МГТУ — один из старейших вузов страны.", a: "Founded in 1830, BMSTU is one of the oldest universities in {the country|Russia}.", ex: "Founded in…" },
    { t: "tr", q: "Живя в общаге, я научился готовить.", a: "Living in a {dorm|dormitory}, I {learned|have learned} {to cook|how to cook}.", ex: "Living in…" },
    { t: "rw", q: "After we had tested the new design, we rolled it out to all users.", h: "Начни с Having…", a: "Having tested the new design, we rolled it out to all users.", ex: "Having + V3." },
    { t: "write", q: "Describe your best project in 4–5 sentences.", need: "Минимум 3 причастных оборота (Having…, Based on…, -ing, V3).", focus: ["c1_part"], model: "Having noticed that our dorm gym was always crowded, I decided to collect check-in data for three months. Using pandas, I cleaned the data and built a heatmap by hour and weekday. Based on the results, I suggested two new quiet time slots. Published in the dorm chat, the chart was viewed by over 400 students." }
  ]
},
{
  id: "c1_hedge", stage: "C1", title: "Хеджирование",
  short: "tends to · is likely to · it appears that · arguably",
  theory: `
<p>В академическом письме категоричность считается слабостью. Хеджирование — осторожные формулировки, обязательные для Band 7+.</p>
<table class="rule">
<tr><td>модальные</td><td>may, might, could: This <b>may</b> explain the drop.</td></tr>
<tr><td>глаголы</td><td>seem, appear, tend to, suggest, indicate: Users <b>tend to</b> churn after a week.</td></tr>
<tr><td>наречия</td><td>probably, arguably, generally, largely, to some extent</td></tr>
<tr><td>прилагательные</td><td>likely / unlikely: The effect is <b>likely to</b> be small.</td></tr>
<tr><td>количество</td><td>most, many, some, in most cases (вместо all, everyone)</td></tr>
<tr><td>безличные</td><td><b>It could be argued that</b>… <b>There is evidence that</b>…</td></tr>
</table>
<div class="trap">Не перебарщивай: «It may possibly perhaps be somewhat true» хуже, чем категоричное утверждение. Одной оговорки на мысль достаточно.</div>`,
  items: [
    { t: "choice", q: "Which is the most academic?", o: ["Social media destroys teenagers.", "Social media may have a negative effect on some teenagers.", "Social media is always bad."], a: 1, ex: "may + some." },
    { t: "choice", q: "The results ___ that the new design improves retention.", o: ["prove", "suggest", "show 100%"], a: 1, ex: "suggest осторожнее, чем prove." },
    { t: "choice", q: "Students ___ to study more before exams.", o: ["tend", "tends", "are tend"], a: 0, ex: "tend to." },
    { t: "choice", q: "It ___ be argued that remote work increases productivity.", o: ["could", "must", "will"], a: 0, ex: "It could be argued that…" },
    { t: "gap", q: "The drop in sales is ___ due to the price increase.", h: "вероятно", a: ["likely", "probably"], ex: "is likely / probably due to." },
    { t: "gap", q: "This approach seems to work ___ most cases.", a: "in", ex: "in most cases." },
    { t: "gap", q: "The data ___ to show a seasonal pattern.", h: "appear", a: "appears", ex: "appears to show." },
    { t: "gap", q: "To some ___, online courses can replace university.", a: "extent", ex: "To some extent." },
    { t: "tr", q: "Похоже, что пользователи предпочитают мобильную версию.", a: ["It {seems|appears} that users prefer the mobile version.", "Users {seem|appear} to prefer the mobile version."], ex: "seem / appear." },
    { t: "tr", q: "Можно утверждать, что образование должно быть бесплатным.", a: "It could be argued that education should be free.", ex: "It could be argued that…" },
    { t: "tr", q: "Как правило, студенты спят меньше семи часов.", a: ["{Generally|In general|As a rule}, students {sleep|tend to sleep} less than seven hours.", "Students {generally|tend to} sleep less than seven hours."], ex: "generally / tend to." },
    { t: "choice", q: "Hedge the claim 'Crypto is a scam':", o: ["Crypto is a total scam.", "Some cryptocurrencies could be considered highly speculative.", "Crypto is maybe a scam probably."], a: 1, ex: "Some + could be considered." },
    { t: "choice", q: "Which hedge is overdone?", o: ["It may possibly perhaps be somewhat true.", "It may be true.", "This is likely to be true."], a: 0, ex: "Одной оговорки достаточно." },
    { t: "write", q: "IELTS Task 2 paragraph: Do the advantages of investing in cryptocurrency outweigh the disadvantages?", need: "Минимум 4 средства хеджирования (may, tend to, likely, arguably, in most cases…).", focus: ["c1_hedge"], model: "It could be argued that cryptocurrencies offer young investors an accessible way to grow their savings. However, prices tend to be extremely volatile, and in most cases beginners are likely to buy at the peak and sell in panic. There is also evidence that many tokens have little real value. Therefore, for most young people the risks arguably outweigh the potential benefits." }
  ]
},
{
  id: "c1_nominal", stage: "C1", title: "Номинализация и академический стиль",
  short: "a sharp rise in · the introduction of · led to",
  theory: `
<p>Академический текст строится вокруг существительных, а не глаголов: так он звучит объективнее и плотнее.</p>
<table class="rule">
<tr><td>Users increased quickly.</td><td>There was a <b>rapid increase in</b> users.</td></tr>
<tr><td>We analysed the data and it showed…</td><td><b>The analysis of</b> the data showed…</td></tr>
<tr><td>Because prices went up, people bought less.</td><td><b>A rise in</b> prices <b>led to a decline in</b> demand.</td></tr>
</table>
<p>Полезные связки: lead to, result in, contribute to, have an impact on, be responsible for. Суффиксы: -tion, -ment, -ance/-ence, -ity, -ness, -sis.</p>
<div class="trap">Не превращай в существительные всё подряд: два-три номинализованных предложения на абзац — достаточно.</div>`,
  items: [
    { t: "choice", q: "Which is the most academic?", o: ["People bought less, so shops closed.", "A decline in consumer spending led to the closure of many shops.", "Shops closed because people didn't buy."], a: 1, ex: "Номинализация + led to." },
    { t: "gap", q: "The ___ of the new policy reduced costs.", h: "introduce", a: "introduction", ex: "introduce → introduction." },
    { t: "gap", q: "The rapid ___ of e-commerce changed retail.", h: "grow", a: "growth", ex: "grow → growth." },
    { t: "gap", q: "The ___ of the data took two weeks.", h: "analyse", a: "analysis", ex: "analyse → analysis." },
    { t: "gap", q: "The ___ of reliable data is a serious problem.", h: "absent", a: "absence", ex: "absent → absence." },
    { t: "gap", q: "Lack of sleep has a negative ___ on performance.", h: "влияние", a: ["impact", "effect"], ex: "have an impact on." },
    { t: "gap", q: "Poor onboarding ___ to high churn.", h: "приводит", a: "leads", ex: "lead to." },
    { t: "gap", q: "The ___ to move abroad was difficult.", h: "decide", a: "decision", ex: "decide → decision." },
    { t: "choice", q: "Noun form of 'fail':", o: ["failing", "failure", "failness"], a: 1, ex: "failure." },
    { t: "choice", q: "Noun form of 'reliable':", o: ["reliance", "reliability", "reliableness"], a: 1, ex: "reliability." },
    { t: "tr", q: "Рост числа пользователей привёл к увеличению нагрузки на сервер.", a: "{The growth in|The growth of|The increase in|The rise in} [the number of] users led to {an increase in|a rise in|higher} server load.", ex: "The growth in … led to an increase in…" },
    { t: "tr", q: "Внедрение новой системы заняло полгода.", a: "The {introduction|implementation} of the new system took {six months|half a year}.", ex: "The introduction of…" },
    { t: "rw", q: "Because prices increased a lot, demand fell.", h: "Через существительные: A … in … led to …", a: "{A sharp|A significant|A large|The sharp|The significant} {increase|rise} in prices led to a {fall|decline|drop|decrease} in demand.", ex: "Номинализация + led to." },
    { t: "write", q: "Rewrite in academic style: 'We changed the onboarding, so more users stayed, and we earned more money.' Then add 2–3 sentences explaining why this happened.", need: "Минимум 3 номинализации (the introduction of, an increase in, a reduction in…) + led to / resulted in.", focus: ["c1_nominal"], model: "The redesign of the onboarding process led to a significant improvement in user retention, which resulted in an increase in revenue. The main reason was the simplification of the registration form. In addition, the introduction of a short tutorial contributed to a better understanding of the product's key features." }
  ]
},
{
  id: "c1_awl", stage: "C1", title: "Академическая лексика",
  short: "significant · assess · sufficient · derive · comprise",
  words: [
    ["significant", "значимый, существенный"], ["assess", "оценивать"], ["sufficient", "достаточный"], ["adopt an approach", "применить подход"],
    ["comprise", "состоять из (без of)"], ["indicate", "указывать на"], ["estimate", "оценивать (количественно)"], ["evidence", "доказательства (неисч.)"],
    ["fluctuate", "колебаться"], ["vary", "различаться"], ["allocate", "выделять, распределять"], ["derive from", "получать из, происходить от"],
    ["consistent", "последовательный, согласующийся"], ["substantial", "значительный"], ["subsequent", "последующий"], ["crucial", "ключевой, решающий"],
    ["enhance", "улучшать, усиливать"], ["constraint", "ограничение"], ["interpret", "интерпретировать"], ["inherent", "присущий"]
  ],
  theory: `
<p>Academic Word List — около 570 семейств слов, которые чаще всего встречаются в академических текстах и в IELTS Reading. Здесь самые полезные для эссе и Task 1. Отметь незнакомые: они уйдут в копилку.</p>
<div class="trap">comprise — без of: The project comprises three stages (но consists of). evidence и data — без артикля a; evidence неисчисляемое.</div>`,
  items: [
    { t: "choice", q: "The results were statistically ___.", o: ["meaningful", "significant", "important"], a: 1, ex: "statistically significant." },
    { t: "choice", q: "We need to ___ the risks before investing.", o: ["assess", "access", "assist"], a: 0, ex: "assess — оценивать." },
    { t: "choice", q: "Our sample was not large enough: the data were not ___.", o: ["sufficient", "suffice", "sufficiently"], a: 0, ex: "sufficient — достаточный." },
    { t: "choice", q: "The team ___ a new approach to user segmentation.", o: ["adopted", "adapted", "adept"], a: 0, ex: "adopt an approach." },
    { t: "choice", q: "The project ___ three stages.", o: ["comprises", "comprises of", "is comprising"], a: 0, ex: "comprise без of." },
    { t: "gap", q: "These results ___ that the change worked.", h: "указывают", a: ["indicate", "suggest"], ex: "indicate." },
    { t: "gap", q: "We ___ the cost at about 2 million roubles.", h: "оценили", a: "estimated", ex: "estimate." },
    { t: "gap", q: "There is strong ___ that sleep affects memory.", h: "доказательства", a: "evidence", ex: "evidence (неисчисляемое)." },
    { t: "gap", q: "Prices ___ throughout the year.", h: "колебались", a: "fluctuated", ex: "fluctuate." },
    { t: "gap", q: "Results may ___ depending on the region.", h: "различаться", a: ["vary", "differ"], ex: "vary." },
    { t: "gap", q: "We need to ___ more resources to testing.", h: "выделить", a: "allocate", ex: "allocate resources to." },
    { t: "tr", q: "Этот подход требует много данных.", a: "This approach requires {a lot of|lots of|large amounts of|a large amount of} data.", ex: "require." },
    { t: "tr", q: "Данные получены из открытых источников.", a: "The data {was|were} {obtained|derived|taken|collected} from {open|public|publicly available} sources.", ex: "obtained / derived from." },
    { t: "fix", q: "The data is consisted of three tables.", a: ["The data consists of three tables.", "The data comprises three tables."], ex: "consist of / comprise — без is." },
    { t: "write", q: "IELTS Task 2 paragraph: Should companies be allowed to use customers' personal data to improve their products?", need: "Минимум 6 слов из списка урока.", focus: ["c1_awl"], model: "Data derived from customer behaviour can significantly enhance the quality of digital products. For instance, analysing how users interact with an app indicates which features are crucial and which ones are rarely used. However, companies must assess the risks carefully and allocate sufficient resources to data protection. Without such constraints, the benefits would be outweighed by a substantial loss of trust." }
  ]
},
{
  id: "c1_para", stage: "C1", title: "Перефразирование",
  short: "синонимы · части речи · смена структуры",
  theory: `
<p>Перефразирование нужно везде: вступление Task 1 и 2, ответы в Reading (там почти всегда синонимы), а в Speaking оно помогает не повторяться.</p>
<table class="rule">
<tr><td>синоним</td><td>important → <b>crucial</b>; show → <b>illustrate</b>; a lot of → <b>a large number of</b></td></tr>
<tr><td>часть речи</td><td>prices rose → <b>a rise in</b> prices</td></tr>
<tr><td>структура</td><td>актив → пассив; although → <b>despite</b> + -ing; people say → <b>is said to</b></td></tr>
<tr><td>число</td><td>doubled → <b>grew twofold</b>; half → <b>50 percent</b></td></tr>
</table>
<div class="trap">Смысл не должен меняться. Не бери синоним, в котором не уверен: точность важнее «умного» слова.</div>`,
  items: [
    { t: "choice", q: "Best paraphrase: 'Many young people invest in crypto.'", o: ["A large number of young people put money into cryptocurrencies.", "Young people never invest.", "Crypto invests in young people."], a: 0, ex: "Синонимы без смены смысла." },
    { t: "choice", q: "Paraphrase: 'The number of users doubled.'", o: ["The number of users rose by 50%.", "The user base grew twofold.", "Users became double."], a: 1, ex: "doubled = grew twofold / by 100%." },
    { t: "choice", q: "Paraphrase: 'Some people think university should be free.'", o: ["It is argued by some that higher education should be provided at no cost.", "Everybody agrees university is free.", "University is free for some people."], a: 0, ex: "Смысл тот же, структура другая." },
    { t: "choice", q: "Synonym for 'crucial':", o: ["essential", "crude", "critical analysis"], a: 0, ex: "crucial ≈ essential, vital." },
    { t: "gap", q: "'show' → The graph ___ the number of visitors.", a: ["illustrates", "depicts", "presents", "shows"], ex: "illustrates / depicts." },
    { t: "gap", q: "'because of' → ___ to bad weather, the event was cancelled.", a: ["Due", "Owing"], ex: "Due to / Owing to." },
    { t: "gap", q: "'got better' → Her English has ___ considerably.", a: "improved", ex: "improve." },
    { t: "gap", q: "'a lot of' → A ___ number of students live in dorms.", a: ["large", "significant", "considerable"], ex: "a large number of." },
    { t: "rw", q: "Researchers collected the data in 2024.", h: "Перепиши в пассиве", a: "The data {was|were} collected [by researchers] in 2024.", ex: "Пассив." },
    { t: "rw", q: "The price of housing rose sharply.", h: "Начни с There was…", a: "There was a sharp {rise|increase} in the {price|cost} of housing.", ex: "Глагол → существительное." },
    { t: "rw", q: "Although he was tired, he finished the report.", h: "Начни с Despite…", a: ["Despite being tired, he finished the report.", "Despite his tiredness, he finished the report.", "Despite the fact that he was tired, he finished the report."], ex: "Despite + -ing / сущ." },
    { t: "rw", q: "People say that BMSTU is very prestigious.", h: "Начни с BMSTU is said…", a: "BMSTU is said to be very prestigious.", ex: "be said to." },
    { t: "write", q: "Paraphrase this Task 2 question as an introduction (2 sentences): 'Companies should be allowed to use the personal data of their customers to improve their products. To what extent do you agree or disagree?'", need: "Не повторяй больше 3 слов подряд из вопроса. Второе предложение — твоя позиция.", focus: ["c1_para"], model: "It is sometimes argued that businesses should have the right to analyse information about their clients in order to develop better services. In my view, this practice is acceptable only if customers give clear consent and their data is properly protected." }
  ]
},
{
  id: "c1_sp3", stage: "C1", title: "IELTS Speaking Part 3",
  short: "развёрнутый ответ · спекуляции · сравнение поколений",
  theory: `
<p>Part 3 — абстрактные вопросы об обществе, технологиях, образовании. Нужно 4–6 предложений, а не «yes, because…».</p>
<p><b>Схема:</b> ответ → причина → пример → другая сторона или прогноз.</p>
<table class="rule">
<tr><td>выиграть время</td><td>That's a tricky question. · I've never really thought about it, but…</td></tr>
<tr><td>предположения</td><td>I suspect that… · It's hard to say, but… · I'd imagine that…</td></tr>
<tr><td>сравнение</td><td>Compared to our parents' generation, … · Unlike in the past, …</td></tr>
<tr><td>обобщение</td><td>On the whole, … · By and large, … · It depends on…</td></tr>
<tr><td>будущее</td><td>In the long run, … · It's likely that… · I wouldn't be surprised if…</td></tr>
</table>`,
  items: [
    { t: "choice", q: "Best start for 'Do you think AI will replace analysts?'", o: ["Yes.", "That's a tricky question. I don't think it will replace them completely, but it will definitely change the job.", "I don't know, maybe yes maybe no."], a: 1, ex: "Позиция + нюанс." },
    { t: "choice", q: "Which phrase helps you speculate?", o: ["I suspect that", "I'm 100% sure that", "Firstly"], a: 0, ex: "I suspect that…" },
    { t: "choice", q: "Which answer is too short for Part 3?", o: ["Because it's expensive.", "Mainly because housing in big cities is expensive, so many students simply can't afford to rent a flat. For example, most of my friends at BMSTU live in dorms for that reason."], a: 0, ex: "Нужны причина и пример." },
    { t: "gap", q: "___ the whole, I think young people are more open to change.", a: "On", ex: "On the whole." },
    { t: "gap", q: "___ to our parents' generation, we have far more opportunities.", h: "по сравнению", a: "Compared", ex: "Compared to / with." },
    { t: "gap", q: "That's a ___ question. Let me think.", a: ["tough", "tricky", "good", "interesting", "difficult"], ex: "Фраза, чтобы выиграть время." },
    { t: "gap", q: "It's hard to ___, but I think remote work will become the norm.", a: "say", ex: "It's hard to say." },
    { t: "gap", q: "By and ___, people trust banks more than crypto.", a: "large", ex: "By and large." },
    { t: "tr", q: "Это зависит от многих факторов.", a: "It depends on {many|a lot of|lots of|a number of|several} factors.", ex: "depend on." },
    { t: "tr", q: "Я никогда особо об этом не задумывался.", a: "I have never really thought about {it|that|this} [before].", ex: "I've never really thought about it." },
    { t: "tr", q: "В долгосрочной перспективе это, скорее всего, изменит рынок труда.", a: "In the long {run|term}, {this|it} will {probably|likely} change the {job|labour} market.", ex: "In the long run." },
    { t: "write", q: "IELTS Speaking Part 3: Why do you think so many young people want to work in IT?", need: "5–6 предложений: ответ → причина → пример → другая сторона / прогноз.", focus: ["c1_sp3", "c1_hedge"], model: "I think the main reason is money, to be honest. Compared to most other industries, IT offers much higher salaries, even for juniors. For example, a junior analyst in Moscow can earn more than an experienced engineer at a factory. There's also the flexibility: you can work remotely from anywhere. On the other hand, I suspect the market is becoming saturated, so in the long run it will probably be much harder to get a first job." }
  ]
}
);
