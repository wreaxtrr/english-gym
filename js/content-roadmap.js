/* Дорожная карта B1 → B2 → C1 (IELTS 8.0).
   Здесь темы ступеней B2 и C1, для которых пока есть только план.
   Чтобы открыть тему, перенеси её в отдельный content-b2.js / content-c1.js
   и заполни theory и items в формате content-b1.js. Пока items пустой,
   тема видна на карте как «в разработке» и в тренировки не попадает. */
window.EG = window.EG || {};
EG.topics = EG.topics || [];

EG.stages = [
  { id: "B1", title: "B1 → B1+", ielts: "IELTS 4.5–5.5", goal: "Убрать базовые ошибки, уверенно говорить о себе, учёбе, проектах. Главные времена, модальные, условные 1–2." },
  { id: "B2", title: "B1+ → B2", ielts: "IELTS 5.5–6.5", goal: "Все времена и пассив, сложные предложения, коллокации. Эссе Task 2 на 250 слов, описание графиков в Task 1." },
  { id: "C1", title: "B2 → C1", ielts: "IELTS 7.0–8.0", goal: "Точность и стиль: инверсия, причастные обороты, хеджирование, академическая лексика, развёрнутые ответы в Speaking Part 3." }
];

const planned = (id, stage, title, short, plan) => ({ id, kind: "new", stage, title, short, plan, theory: "", items: [] });

EG.topics.push(
  planned("b2_ppc", "B2", "Present Perfect Continuous", "I've been working on it for…", "Simple vs Continuous: результат или процесс. How long have you been…? Глаголы состояния."),
  planned("b2_narr", "B2", "Past Perfect и рассказ", "I had already left when…", "Past Perfect для «предпрошедшего», связка трёх прошедших времён в истории (Speaking Part 2)."),
  planned("b2_passive", "B2", "Пассивный залог", "the data was collected · has been tested", "Пассив во всех временах. Главный инструмент отчётов и Task 1: The results were analysed…"),
  planned("b2_rel", "B2", "Придаточные определительные", "who / which / that / whose · запятые", "Defining и non-defining, where и when, сокращение придаточных."),
  planned("b2_ger", "B2", "Герундий или инфинитив", "stop doing vs stop to do · avoid -ing", "Глаголы + -ing / to + V, смена смысла (remember, try, stop), предлог + -ing."),
  planned("b2_cond3", "B2", "Условные 3 и смешанные · wish", "If I had known… · I wish I were…", "Сожаления о прошлом, смешанные условные, wish / if only."),
  planned("b2_used", "B2", "used to / be used to / get used to", "I used to trade · I'm used to waking up early", "Прошлые привычки и привыкание: три похожие конструкции."),
  planned("b2_deduct", "B2", "Модальные глаголы предположения", "must be · can't have done · might have", "Уверенность и предположения о настоящем и прошлом."),
  planned("b2_reported", "B2", "Косвенная речь", "He said that he had… · asked me if…", "Сдвиг времён, косвенные вопросы, reporting verbs (suggest, admit, deny)."),
  planned("b2_future", "B2", "Будущее: оттенки", "will be doing · will have done · be about to", "Future Continuous и Perfect, планы и прогнозы в Speaking."),
  planned("b2_coll", "B2", "Коллокации", "make progress · do research · take a risk", "make/do/take/have, сильные пары прилагательное + существительное, бизнес-коллокации."),
  planned("b2_task1", "B2", "IELTS Task 1: графики и тренды", "rose sharply · fluctuated · peaked at", "Лексика трендов, сравнение данных, структура overview + детали. Тут тебе как аналитику легко набрать баллы."),
  planned("b2_task2", "B2", "IELTS Task 2: эссе", "opinion · discussion · problem–solution", "Типы эссе, структура на 4–5 абзацев, тезис, развитие аргумента, 250 слов за 40 минут."),
  planned("c1_inv", "C1", "Инверсия", "Not only… but also · Had I known…", "Эмфатическая инверсия для письма и Speaking Part 3."),
  planned("c1_cleft", "C1", "Расщеплённые предложения", "What I need is… · It was … that…", "Выделение главного в ответе и эссе."),
  planned("c1_part", "C1", "Причастные обороты", "Having analysed the data, … · Based on…", "Сжатие предложений, академический стиль."),
  planned("c1_hedge", "C1", "Хеджирование", "tends to · is likely to · it appears that", "Осторожные формулировки: обязательны в академическом письме и для Band 7+."),
  planned("c1_nominal", "C1", "Номинализация и академический стиль", "the growth of · a decline in", "Глагол → существительное, формальный регистр, безличные конструкции."),
  planned("c1_awl", "C1", "Академическая лексика (AWL)", "significant · approach · derive · assess", "Самые частотные слова академического списка, на твоих темах."),
  planned("c1_para", "C1", "Перефразирование", "synonyms · word forms · restructuring", "Основа Reading и Task 2: сказать то же самое другими словами без потери смысла."),
  planned("c1_sp3", "C1", "IELTS Speaking Part 3", "развёрнутые ответы · спекуляции · сравнения", "Абстрактные вопросы об обществе и технологиях: как отвечать на 4–6 предложений.")
);
