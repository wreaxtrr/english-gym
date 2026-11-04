/* Банк заданий в формате IELTS (раздел «IELTS»).
   part: S1 / S2 / S3 — Speaking (отвечаем письменно, а Part 2 можно и вслух под таймер),
         W1 / W2 — Writing Task 1 / Task 2. */
window.EG = window.EG || {};

EG.ieltsParts = {
  S1: { title: "Speaking Part 1", hint: "Короткие вопросы о тебе. Отвечай на 2–4 предложения: ответ + причина + пример.", minutes: 1, words: [30, 70] },
  S2: { title: "Speaking Part 2", hint: "Карточка: минута на подготовку, 2 минуты монолога. Пройди все пункты карточки.", minutes: 2, prep: 1, words: [150, 260] },
  S3: { title: "Speaking Part 3", hint: "Абстрактные вопросы. Мнение → объяснение → пример → другая сторона.", minutes: 2, words: [60, 140] },
  W1: { title: "Writing Task 1", hint: "Опиши данные: overview (главный тренд) + 2 абзаца деталей с цифрами. Минимум 150 слов, 20 минут.", minutes: 20, words: [150, 220] },
  W2: { title: "Writing Task 2", hint: "Эссе: вступление с тезисом, 2 абзаца аргументов, вывод. Минимум 250 слов, 40 минут.", minutes: 40, words: [250, 320] }
};

EG.ielts = [
  { part: "S1", q: "Do you work or are you a student?", model: "I'm a student. I'm in my second year at Bauman Moscow State Technical University, where I study applied mathematics and computer science. I chose this programme because I've always liked maths and programming." },
  { part: "S1", q: "Where do you live at the moment?", model: "At the moment I live in a student dorm in Moscow. I share a room with one roommate, and we have a shared kitchen on our floor. It's not very comfortable, but it's close to the university and quite cheap." },
  { part: "S1", q: "How do you usually keep fit?", model: "I go to the gym three or four times a week. I've been training for about two years, mostly strength training. I also try to walk a lot, because I spend most of the day sitting at my laptop." },
  { part: "S1", q: "Do you prefer studying alone or with other people?", model: "It depends on the subject. For programming I prefer working alone, because I need to concentrate. But for maths I like studying with friends: when we work through problems together, we figure them out much faster." },
  { part: "S1", q: "What kind of apps do you use every day?", model: "I mostly use messengers, a banking app and a fitness tracker. I also use a couple of apps for learning English. As a future analyst, I'm always curious about how these apps measure what users do." },
  { part: "S1", q: "Did you enjoy your school years?", model: "Mostly yes. I enjoyed maths and computer science classes, but I didn't like PE because we had to run outside in winter. School was less stressful than university, but it was also more boring." },
  { part: "S2", q: "Describe a skill that took you a long time to learn.", cue: ["what the skill is", "when and how you learned it", "what difficulties you had", "and explain how you feel about this skill now"], model: "" },
  { part: "S2", q: "Describe a time when you made an important decision.", cue: ["what the decision was", "when you made it", "what options you had", "and explain why it was important"], model: "" },
  { part: "S2", q: "Describe a piece of technology you find useful.", cue: ["what it is", "how often you use it", "what you use it for", "and explain why it is useful for you"], model: "" },
  { part: "S2", q: "Describe a person who has influenced your studies or career plans.", cue: ["who this person is", "how you know them", "what they did", "and explain how they influenced you"], model: "" },
  { part: "S3", q: "Why do you think so many young people want to work in IT?", model: "" },
  { part: "S3", q: "Is it better for students to live in a dormitory or with their parents?", model: "" },
  { part: "S3", q: "Do you think companies collect too much data about their users?", model: "" },
  { part: "S3", q: "How has technology changed the way people learn?", model: "" },
  { part: "W1", q: "The table shows the number of active users (thousands) of a food delivery app by platform. iOS: 2022 — 120, 2023 — 150, 2024 — 160. Android: 2022 — 90, 2023 — 160, 2024 — 230. Web: 2022 — 60, 2023 — 50, 2024 — 35. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", model: "" },
  { part: "W1", q: "The line graph shows the average number of visitors per hour in a university gym on weekdays. 7 a.m. — 15, 10 a.m. — 10, 1 p.m. — 25, 4 p.m. — 40, 7 p.m. — 70, 10 p.m. — 30. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", model: "" },
  { part: "W2", q: "Some people believe that university education should be free for everyone. Others think students should pay for their own studies. Discuss both views and give your own opinion.", model: "" },
  { part: "W2", q: "Many young people today invest in cryptocurrencies and stocks. Do the advantages of this trend outweigh the disadvantages?", model: "" },
  { part: "W2", q: "Online courses are becoming more popular than traditional university programmes. Is this a positive or negative development?", model: "" },
  { part: "W2", q: "Companies should be allowed to use the personal data of their customers to improve their products. To what extent do you agree or disagree?", model: "" }
];
