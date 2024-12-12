'use client'

import React, { useState, useRef, useEffect } from 'react'
import Confetti from "react-confetti";
import "../styles/CalculatorPage.css";

// ---------- ДАННЫЕ И КОНСТАНТЫ ----------

// Варианты типов школ
const schoolOptions = [
  "Государственная школа",
  "Частная школа",
  "Международная школа",
  "Гимназия",
  "Лицей",
  "Техническая школа",
  "Военная школа",
  "Религиозная школа",
  "Школа с углубленным изучением предметов",
  "Школа-интернат",
  "Школа искусств",
  "Школа для одаренных детей",
  "Другое"
];

const countries = ["США", "Канада", "Германия", "Великобритания", "Австралия", "Норвегия", "Швеция", "Финляндия", "Франция", "Турция", "Китай", "Малайзия", "Испания", "Португалия", "Венгрия", "Швейцария", "Сингапур", "Дания", "ОАЭ", "Чехия", "Италия", "Польша", "Латвия", "Гонконг", "Катар", "Австрия", "Нидерланды", "Бельгия", "Южная Корея"];
const formats = ["Бакалавриат"];

const countryBudgets = {
  "Норвегия": ["8,000$-18,000$"],
  "Швеция": ["8,000$-15,000$"],
  "Финляндия": ["7,000$-10,000$"],
  "Франция": ["7,000$-12,000$"],
  "Турция": ["5,000$-10,000$"],
  "Китай": ["5,000$-90,000$"],
  "Малайзия": ["5,000$-40,000$"],
  "Германия": ["500$-1,500$"],
  "Испания": ["4,000$-8,000$"],
  "Португалия": ["6,000$-9,000$"],
  "Венгрия": ["3,000$-5,000$"],
  "Швейцария": ["25,000$-40,000$"],
  "Сингапур": ["20,000$-40,000$"],
  "Дания": ["20,000$-35,000$"],
  "ОАЭ": ["20,000$-40,000$"],
  "Чехия": ["2,000$-5,000$"],
  "Италия": ["2,000$-9,000$"],
  "Польша": ["2,000$-4,000$"],
  "Латвия": ["2,000$-4,000$"],
  "Канада": ["15,000$-35,000$"],
  "Великобритания": ["15,000$-25,000$"],
  "Гонконг": ["18,000$-25,000$"],
  "Катар": ["15,000$-65,000$"],
  "Австрия": ["15,000$-25,000$"],
  "Нидерланды": ["12,000$-20,000$"],
  "Бельгия": ["12,000$-20,000$"],
  "Южная Корея": ["10,000$-15,000$"]
};

const countryLivingCosts = {
  "Великобритания": ["1,255$-1,610$"],
  "Нидерланды": ["1,840$"],
  "Финляндия": ["1,540$"],
  "Швеция": ["1,700$"],
  "Швейцария": ["2,310$-2,460$"],
  "Италия": ["1,540$-1,615$"],
  "Испания": ["1,310$-1,385$"],
  "Польша": ["920$-970$"],
  "Венгрия": ["970$"],
  "Франция": ["1,465$-1,850$"],
  "Латвия": ["820$"],
  "Португалия": ["1,140$"],
  "Чехия": ["970$"],
  "Норвегия": ["1,850$"],
  "Южная Корея": ["1,235$-1,720$"],
  "Сингапур": ["1,590$"],
  "Гонконг": ["2,000$"],
  "ОАЭ": ["1,465$-1,540$"],
  "Турция": ["760$-770$"],
  "Катар": ["1,840$"],
  "Канада": ["1,550$-1,885$"],
  "Австрия": ["1,220$"],
  "Дания": ["1,385$"],
  "Бельгия": ["1,210$"],
  "Китай": ["870$-895$"],
  "Малайзия": ["595$"],
  "Германия": ["1,160$-1,460$"],
};



// Направления и профессии
const directionProfessionMapping = {
  "Информатика и информационные системы": [
    "Разработчик ПО",
    "Инженер AI",
    "Кибербезопасность",
    "Аналитик данных",
    "Инженер-программист"
  ],
  "Инженерия и технологии": [
    "Электроинженер",
    "Инженер-робототехник",
    "Инженер DevOps",
    "Инженер по контролю качества",
    "Технолог производства",
    "Инженер-химик"
  ],
  "Бизнес и управление": [
    "Менеджер проектов",
    "Консультант по управлению",
    "Менеджер по продукту",
    "Бизнес-аналитик",
    "Маркетолог",
    "Финансовый менеджер",
    "Специалист по управлению инвестициями"
  ],
  "Медицина": [
    "Врач",
    "Хирург",
    "Стоматолог"
  ],
  "Экономика": [
    "Экономист"
  ],
  "Экономика и эконометрика": [
    "Финансовый аналитик",
    "Инвестиционный аналитик",
    "Аналитик"
  ],
  "Право": [
    "Юрист",
    "Адвокат",
    "Юрисконсульт",
    "Специалист по международному праву"
  ],
  "Машиностроение, авиастроение и производство": [
    "Инженер-механик",
    "Инженер-конструктор",
    "Инженер по производству",
    "Инженер-авиастроитель",
    "Конструктор машин"
  ],
  "Архитектура": [
    "Архитектор",
    "Градостроитель",
    "Ландшафтный архитектор",
    "Проектировщик зданий",
    "Архитектор-дизайнер"
  ],
  "Искусство и дизайн": [
    "Графический дизайнер",
    "UX/UI дизайнер",
    "Арт-директор",
    "Иллюстратор",
    "Fashion дизайнер",
    "3D-дизайнер",
    "Дизайнер интерьеров"
  ],
  "Бухгалтерский учет и финансы": [
    "Бухгалтер",
    "Аудитор",
    "Финансовый контролер"
  ],
  "Международные отношения и политические науки": [
    "Дипломат",
    "Специалист по политическим наукам",
    "Эксперт по внешней политике"
  ]
};

// Данные о востребованности, скорости трудоустройства, образовании, зарплатах и городах - см предыдущий код
// ... (Все данные сохранены как в предыдущем примере)

const demandData = {
  Великобритания: {
    "Инженер AI": {
      assistant: "Низкая",
      junior: "Средняя",
      middle: "Высокая",
    },
    "Разработчик ПО": {
      assistant: "Низкая",
      junior: "Средняя",
      middle: "Высокая",
    },
    "Хирург": {
      assistant: "Низкая",
      junior: "Средняя",
      middle: "Высокая",
    },
  },
  Германия: {
    "Инженер AI": {
      assistant: "Высокая",
      junior: "Высокая",
      middle: "Очень высокая",
    },
    "Программист": {
      assistant: "Средняя",
      junior: "Средняя",
      middle: "Высокая",
    },
    "Хирург": {
      assistant: "Мощно",
      junior: "Средняя",
      middle: "Высокая",
    },
  },
  США: {
    "Инженер AI": {
      assistant: "Очень низкая",
      junior: "Очень высокая",
      middle: "Очень высокая",
    },
    "Программист": {
      assistant: "Средняя",
      junior: "Высокая",
      middle: "Очень высокая",
    },
  },
};

const employmentSpeedData = {
  Великобритания: {
    "Инженер AI": {
      assistant: "1-2 месяца",
      junior: "1-3 месяца",
      middle: "1-4 месяца",
    },
    "Программист": {
      assistant: "2-3 месяца",
      junior: "2-4 месяца",
      middle: "2-5 месяцев",
    },
    "Хирург": {
      assistant: "1 месяц",
      junior: "2-4 месяца",
      middle: "2-5 месяцев",
    },
  },
  Германия: {
    "Инженер AI": {
      assistant: "2-3 месяца",
      junior: "2-5 месяцев",
      middle: "2-6 месяцев",
    },
    "Программист": {
      assistant: "3-4 месяца",
      junior: "3-5 месяцев",
      middle: "3-6 месяцев",
    },
  },
  США: {
    "Инженер AI": {
      assistant: "1-2 месяца",
      junior: "1-3 месяца",
      middle: "1-4 месяца",
    },
    "Программист": {
      assistant: "1-3 месяца",
      junior: "1-4 месяца",
      middle: "1-5 месяцев",
    },
  },
};

const educationData = {
  Великобритания: {
      "Информатика и информационные системы": {
          "Инженер AI": {
              tuition: 72500,
              salary: 41628,
              livingCost: 19200,
              roi: 7,
          },
          Программист: {
              tuition: 65000,
              salary: 40000,
              livingCost: 18000,
              roi: 6,
          },
      },
      Медицина: {
          Хирург: {
              tuition: 2333333,
              salary: 50000,
              livingCost: 20000,
              roi: 8,
          },
          Кардиолог: {
              tuition: 87000,
              salary: 52000,
              livingCost: 21000,
              roi: 7,
          },
      },
  },
  Германия: {
      Информатика: {
          "Инженер AI": {
              tuition: 68000,
              salary: 45000,
              livingCost: 17000,
              roi: 6,
          },
          Программист: {
              tuition: 62000,
              salary: 42000,
              livingCost: 16000,
              roi: 6,
          },
      },
      Медицина: {
          Хирург: {
              tuition: 88000,
              salary: 53000,
              livingCost: 19000,
              roi: 7,
          },
          Кардиолог: {
              tuition: 89000,
              salary: 54000,
              livingCost: 20000,
              roi: 7,
          },
      },
  },
  США: {
      Информатика: {
          "Инженер AI": {
              tuition: 85778700,
              salary: 60000,
              livingCost: 25000,
              roi: 6,
          },
          Программист: {
              tuition: 80000,
              salary: 58000,
              livingCost: 24000,
              roi: 7,
          },
      },
      Медицина: {
          Хирург: {
              tuition: 120000,
              salary: 80000,
              livingCost: 30000,
              roi: 5,
          },
          Кардиолог: {
              tuition: 125000,
              salary: 85000,
              livingCost: 32000,
              roi: 5,
          },
      },
  },
};

// console.log("selectedCountry:", selectedCountry);
// console.log("selectedDirection:", selectedDirection);
// console.log("selectedProfession:", selectedProfession);
console.log("educationData:", educationData);

const salaryData = {
  Великобритания: [
    { city: "Лондон", junior: 3000, middle: 4000, senior: 6000 },
    { city: "Манчестер", junior: 3000, middle: 4000, senior: 6000 },
    { city: "Бирмингем", junior: 2700, middle: 3700, senior: 5300 },
  ],
  Германия: [
    { city: "Берлин", junior: 3200, middle: 4500, senior: 7000 },
    { city: "Мюнхен", junior: 3400, middle: 4700, senior: 7200 },
    { city: "Гамбург", junior: 3100, middle: 4400, senior: 6900 },
  ],
  США: [
    { city: "Нью-Йорк", junior: 49890, middle: 6000, senior: 9000 },
    { city: "Сан-Франциско", junior: 4500, middle: 6500, senior: 10000 },
    { city: "Чикаго", junior: 3800, middle: 5700, senior: 8500 },
  ],
};

const tests = [
  {
    id: "verbal",
    title: "SAT verbal",
    color: "#86429A",
    questions: [
      {
        text: "Scent is tightly interwoven with our daily lives, often evoking significant memories and important social events. This connection is of growing interest to archaeologists who hope to use it to better understand ancient rituals, trade, social hierarchies, and medicine. Although the speed at which odor molecules dissipate makes identifying ancient scents challenging, advancements in biomolecular technologies show promise in unlocking ancient aromas from preserved artifacts. Archaeological studies making use of these advancements may provide new insights into past societies. According to the text, what is one reason some archaeologists are interested in recovering scents from ancient artifacts?  ",
        options: [
          "They are investigating whether people’s sense of smell has declined in recent centuries.",
          "They believe the scents could illuminate important aspects of ancient life.",
          "They think that ancient scents would be enjoyable to people today.",
          "They hope to develop new medicines using ancient scent molecules."
        ],
        correct: 1
      },
      {
        text: "Text 1 Dance choreographer Alvin Ailey’s deep admiration for jazz music can most clearly be felt in the rhythms and beats his works were set to.Ailey collaborated with some of the greatest jazz legends, like Charles Mingus, Charlie Parker, and perhaps his favorite, Duke Ellington.With his choice of music, Ailey helped bring jazz to life for his audiences. Text 2 Jazz is present throughout Ailey’s work, but it’s most visible in Ailey’s approach to choreography.Ailey often incorporated improvisation, a signature characteristic of jazz music, in his work.When managing his dance company, Ailey rarely forced his dancers to an exact set of specific moves.Instead, he encouraged his dancers to let their own skills and experiences shape their performances, as jazz musicians do. Based on the texts, how would Singh and Roy(Text 2) most likely respond to the research discussed in Text 1?  ",
        options: [
          "Dancers who worked with Ailey greatly appreciated his supportive approach as a choreographer.",
          "Ailey’s work was strongly influenced by jazz.",
          "Audiences were mostly unfamiliar with the jazz music in Ailey’s works.",
          "Ailey blended multiple genres of music together when choreographing dance pieces."
        ],
        correct: 1
      },
      {
        text: "While researching a topic, a student has taken the following notes: In 2013, paleontology professor Hesham Sallam and his students from Mansoura University in Egypt made a discovery The team found a partial dinosaur skeleton at a site in Egypt’s Dakhla Oasis. The skeleton belonged to a dinosaur species that lived approximately 80 million years ago. The new species was named Mansourasaurus to recognize the team that discovered it. The student wants to explain the origin of the species’ name.Which choice most effectively uses relevant information from the notes to accomplish this goal ? ",
        options: [
          "Mansourasaurus, a new species discovered in Egypt in 2013, lived approximately 80 million years ago.",
          "A partial dinosaur skeleton found in Egypt’s Dakhla Oasis belonged to a species named Mansourasaurus.",
          "Mansourasaurus, a species that lived approximately 80 million years ago, was discovered in 2013 by Egyptian paleontologist Hesham Sallam and a team of university students.",
          "The new species was named Mansourasaurus to recognize the team that discovered it, a professor and students from Mansoura University."
        ],
        correct: 3
      },
      {
        text: "In her book The Woman Warrior: Memoirs of a Girlhood Among Ghosts, author Maxine Hong Kingston examines themes ______ childhood, womanhood, and Chinese American identity by intertwining autobiography and mythology. Which choice completes the text so that it conforms to the conventions of Standard English? ",
        options: [
          "of:",
          "of",
          "of-",
          "of,"
        ],
        correct: 1
      },
      {
        text: "In recent years, economists around the world have created new tools that quantify the overall well-being of a country’s citizens. Economists in India, for example, use an Ease of Living Index. This tool ______ economic potential, sustainability, and citizens’ quality of life. Which choice completes the text so that it conforms to the conventions of Standard English?  ",
        options: [
          "measures",
          "had measured",
          "would have measured",
          "will have been measuring"
        ],
        correct: 0
      },
      {
        text: "The following text is from Srimati Svarna Kumari Devi’s 1894 novel The Fatal Garland (translated by A. Christina Albers in 1910). Shakti is walking near a riverbank that she visited frequently during her childhood. She crossed the woods she knew so well.The trees seemed to extend their branches like welcoming arms.They greeted her as an old friend.Soon she reached the river- side. Which choice best describes the function of the underlined portion in the text as a whole ? ",
        options: [
          "It suggests that Shakti feels uncomfortable near the river.",
          "It indicates that Shakti has lost her sense of direction in the woods.",
          "It emphasizes Shakti’s sense of belonging in the landscape.",
          "It conveys Shakti’s appreciation for her long-term friendships."
        ],
        correct: 2
      },
      {
        text: "Electric companies that use wind turbines rely on weather forecasts to predict the maximum amount of power, in megawatt hours (MWh), they can generate using wind so that they can determine how much they’ll need to generate from other sources. When winds are stronger than they were forecast to be, however, the predicted maximum amount of electricity wind turbines could generate will be too low. For example, the graph shows that for the West region, the winds were ______  Which choice most effectively uses data from the graph to complete the example?",
        options: [
          "strong enough to generate about 150 thousand more MWh of electricity from wind turbines.",
          "so weak that the electricity from wind turbines was about 175 thousand MWh less than predicted.",
          "so weak that the electricity from wind turbines was about 150 thousand MWh less than predicted.",
          "strong enough to generate about 175 thousand more MWh of electricity from wind turbines."
        ],
        correct: 0,
        image: require("../images/34.PNG"),
      }
    ],
    feedback: [
      {
        min: 0,
        max: 3,
        text: "Вы не допускаетесь к курсам по SAT Verbal. Рекомендуем пополнять словарный запас и улучшать общий уровень английского.",
      },
      {
        min: 4,
        max: 5,
        text: "Вы допускаетесь к групповым занятиям по SAT Verbal, но необходимо улучшить словарный запас для качественной подготовки.",
      },
      {
        min: 6,
        max: 7,
        text: "Вы можете претендовать на поступление в хорошие вузы. Это приблизительный прогноз, не учитывающий другие факторы.",
      },
    ],

  },
  {
    id: "math",
    title: "SAT math",
    color: "#FF7F00",
    questions: [
      {
        text: "2x + 16 = a(x+8)  In the given equation, **a** is a constant. If the equation has infinitely many solutions, what is the value of a?",
        type: "textInput",
        correctAnswer: "2",
      },
      {
        text: "The front of a roller-coaster car is at the bottom of a hill and is 15 feet above the ground. If the front of the roller-coaster car rises at a constant rate of 8 feet per second, which of the following equations gives the height \( h \), in feet, of the front of the roller-coaster car \( s \) seconds after it starts up the hill?",
        options: [
          "h = 8s + 15",
          "h = 15s + 335/8",
          "h = 8s + 335/15",
          "h = 15s + 8",
        ],
        correct: 0,
      },
      {
        text: " A store sells two different-sized containers of a certain Greek yogurt. The store’s sales of this Greek yogurt totaled dollars last month. The equation  5.48x + 7.30y = 1277.94  represents this situation, where is the number of smaller containers sold and is the number of larger containers sold. According to the equation, which of the following represents the price, in dollars, of each smaller container? ",
        options: ["5.48", "7.30y", "7.30", "5.48x"],
        correct: 0,
      },
      {
        text: "5x = 15  -4x + y = -2  The solution to the given system of equations is (x, y). What is the value of x + y?   ",
        options: ["-17", "-13", "13", "17"],
        correct: 2,
      },
      {
        text: " The point (8, 2)  in the xy-plane is a solution to which of the following systems of inequalities? ",
        options: [
          "x > 0; y > 0",
          "x > 0; y < 0",
          "x < 0; y > 0",
          "x < 0; y < 0",
        ],
        correct: 0,
      },
      {
        text: "Which expression is equivalent to 20w - (4w + 3w)? ",
        options: ["10w", "13w", "19w", "21w"],
        correct: 1,
      },
      {
        text: "For a person m miles from a flash of lightning, the length of the time interval from the moment the person sees the lightning to the moment the person hears the thunder is k seconds. The ratio of m to k can be estimated to be 1 to 5. According to this estimate, the person is how many miles from a flash of lightning if the time interval is 25 seconds?  ",
        options: ["10", "9", "6", "5"],
        correct: 3,
      },
      {
        text: "The scatterplot shows the relationship between two variables, x and y. A line of best fit is also shown.  Which of the following equations best represents the line of best fit shown?",
        image: require("../images/Capture.PNG"), // Замените на реальный URL изображения
        options: [
          "y = 13.5 + 0.8x",
          "y = 13.5 - 0.8x",
          "y = -13.5 + 0.8x",
          "y = -13.5 - 0.8x",
        ],
        correct: 1,
      },
      {
        text: "There are 55 students in Spanish club. A sample of the Spanish club students was selected at random and asked whether they intend to enroll in a new study program. Of those surveyed, 20% responded that they intend to enroll in the study program. Based on this survey, which of the following is the best estimate of the total number of Spanish club students who intend to enroll in the study program? ",
        options: ["11", "20", "44", "55"],
        correct: 0,
      },
      {
        text: " In the figure, line m is parallel to line n. What is the value of w?  ",
        image: require("../images/2.PNG"), // Замените на реальный URL изображения
        options: ["17", "30", "70", "170"],
        correct: 3,
      },
      {
        text: "  In the triangle shown, what is the value of tan(x)? ",
        image: require("../images/3.PNG"), // Замените на реальный URL изображения
        options: ["1/26", "19/26", "26/7", "33/7"],
        correct: 2,
      },
    ],
    feedback: [
      {
        min: 0,
        max: 6,
        text: "Вы не готовы к групповым занятиям по SAT Math. Рекомендуем записаться на индивидуальные уроки по математике."
      },
      {
        min: 7,
        max: 9,
        text: "Вы допускаетесь к групповым занятиям по SAT Math, но вам нужно улучшить базу, чтобы претендовать на действительно качественную подготовку к экзамену."
      },
      {
        min: 10,
        max: 11,
        text: "Поздравляем! Вы можете претендовать на поступление в хорошие вузы."
      }
    ],
  },
  {
    id: "placement",
    title: "PLACEMENT TEST",
    color: "#00A9CE",
    questions: [
      {
        text: "Since she moved to Paris, she __________ the Louvre 5 times.",
        options: ["visited", "is visiting", "has visited"],
        correct: 2
      },
      {
        text: "If I __________ enough time, I would visit my grandparents more often.",
        options: ["have", "had", "will have", "would have"],
        correct: 1
      },
      {
        text: "They __________ to the cinema last night.",
        options: ["go", "are going", "went", "have gone"],
        correct: 2
      },
      {
        text: "He __________ tennis every Sunday.",
        options: ["plays", "play", "is playing", "playes"],
        correct: 0
      },
      {
        text: "The letter _________ tomorrow.",
        options: ["will send", "will be sent", "would be send", "will be sending"],
        correct: 1
      },
      {
        text: "When I arrived, they __________ dinner.",
        options: ["cooked", "were cooking", "had cooked", "are cooking"],
        correct: 1
      },
      {
        text: "She __________ New York next Friday. Didn’t you know? She made the decision 2 weeks ago.",
        options: ["leaves", "is leaving", "will leave", "will be leaving"],
        correct: 1
      },
      {
        text: "I __________ go to the gym when I was younger.",
        options: ["used to", "was used to", "use to", "have used to"],
        correct: 0
      },
      {
        text: "If he __________ harder last week, he _____ the yesterday’s exam.",
        options: ["studied; would pass", "had studied; would have passed", "studied, would have passed", "had studied; would pass"],
        correct: 1
      },
      {
        text: "The movie __________ by a famous director.",
        options: ["directed", "was directing", "was directed", "directs"],
        correct: 2
      },
      {
        text: "The food __________ (not eat) yet.",
        options: ["hasn’t eaten", "hasn’t been eaten", "wasn’t eaten", "didn’t eat"],
        correct: 1
      },
      {
        text: "By the time we got to the station, the train __________ (leave).",
        options: ["had left", "has left", "had been leaving", "has been leaving"],
        correct: 0
      },
      {
        text: "They __________ (build) a new bridge at the moment.",
        options: ["were building", "build", "are building", "built"],
        correct: 2
      },
      {
        text: "He __________ (not like) swimming when he was a child.",
        options: ["not like", "hasn’t liked", "doesn’t like", "didn’t like"],
        correct: 3
      },
      {
        text: "This cake is __________ (delicious) than the one we had yesterday.",
        options: ["more delicious", "most delicious", "delicious", "deliciouser"],
        correct: 0
      },
      {
        text: "If you __________ (be) younger, you ______(win) the coming tournament.",
        options: ["are / will win", "were / would win", "was / would have won", "had been / could win"],
        correct: 1
      },
      {
        text: "By the time we arrived, he __________ (finish) his work.",
        options: ["had finished", "has finished", "was finished", "finishes"],
        correct: 0
      },
      {
        text: "They __________ (move) to the city last year.",
        options: ["are moving", "have moved", "moved", "move"],
        correct: 2
      },
      {
        text: "I __________ (already/ finish) reading the book.",
        options: ["already has finished", "have already finished", "already finish", "had already finished"],
        correct: 1
      },
      {
        text: "She __________ (wait) for the bus when it started raining.",
        options: ["waited", "waits", "was waiting", "had waited"],
        correct: 2
      },
      {
        text: "I’m believing that we will finish the project on time.",
        options: ["I believed that we will finish the project on time.", "I am believe that we will finish the project on time.", "I believe that we will finish the project on time.", "I am believing that we finish the project on time."],
        correct: 2
      },
      {
        text: "They doesn’t want come to the party.",
        options: ["They doesn’t wants come to the party.", "They don’t want to come to the party.", "They want come to the party.", "They don’t wants to come to the party."],
        correct: 1
      },
      {
        text: "The house was cleaning by my sister yesterday.",
        options: ["The house was cleaned by my sister yesterday.", "The house is cleaning by my sister yesterday.", "The house was cleaning from my sister yesterday.", "The house cleaned by my sister yesterday."],
        correct: 0
      },
      {
        text: "If I will find your keys, I’ll call you immediately.",
        options: ["If I find your keys, I’ll call you immediately.", "If I found your keys, I call you immediately.", "If I will finding your keys, I’ll call you immediately.", "If I will found your keys, I’ll call you immediately."],
        correct: 0
      },
      {
        text: "She did not talked to me yesterday.",
        options: ["She do not talk to me yesterday.", "She did not talk to me yesterday.", "She did not talking to me yesterday.", "She did talk to me yesterday."],
        correct: 1
      },
      {
        text: "He don’t plays tennis as much as he used to.",
        options: ["He don’t play tennis as much as he used to.", "He doesn’t play tennis as much as he used to.", "He doesn’t plays tennis as much as he used to.", "He don’t played tennis as much as he used to."],
        correct: 1
      },
      {
        text: "We aren’t don’t understand this topic.",
        options: ["We don’t understand this topic.", "We aren’t understanding this topic.", "We doesn’t understand this topic.", "We aren’t understand this topic."],
        correct: 0
      },
      {
        text: "We can to speak Spanish very well.",
        options: ["We can speak Spanish very well.", "We can speaking Spanish very well.", "We can speaks Spanish very well.", "We to can speak Spanish very well."],
        correct: 0
      },
      {
        text: "They don’t like you anymore?",
        options: ["Do they don’t like you anymore?", "They do like you anymore?", "Don’t they like you anymore?", "They doesn’t like you anymore?"],
        correct: 2
      },
      {
        text: "He don’t never eat pizza.",
        options: ["He never don’t eat pizza.", "He doesn’t eat pizza.", "He doesn’t never eat pizza.", "He never eats pizza."],
        correct: 1
      },
      {
        text: "She must studies harder to pass the test.",
        options: ["She must study harder to pass the test.", "She must studying harder to pass the test.", "She must studied harder to pass the test.", "She must to study harder to pass the test."],
        correct: 0
      },
      {
        text: "This is the more expensivest car I’ve ever seen.",
        options: ["This is the most expensive car I’ve ever seen.", "This is the most expensivest car I’ve ever seen.", "This is the more expensive car I’ve ever seen.", "This is more expensivest car I’ve ever seen."],
        correct: 0
      },
      {
        text: "You should to speak louder in presentations.",
        options: ["You should speaking louder in presentations.", "You should speak louder in presentations.", "You should spoke louder in presentations.", "You should have speak louder in presentations."],
        correct: 1
      },
      {
        text: "My house is the most big in the neighborhood.",
        options: ["My house is most big in the neighborhood.", "My house is bigger in the neighborhood.", "My house is biggest in the neighborhood.", "My house is the biggest in the neighborhood."],
        correct: 3
      },
      {
        text: "Could you drive a bit more slow, please?",
        options: ["Could you drive a bit slower, please?", "Could you driving a bit more slowly, please?", "Could you drive a bit slowest, please?", "Could you drive a bit most slow, please?"],
        correct: 0
      }
    ],
    feedback: [
      {
        min: 0,
        max: 24,
        text: "К подготовке к экзаменам SAT & IELTS автоматически не допускается. Рекомендуем повторить материал."
      },
      {
        min: 25,
        max: 29,
        text: "Допускается к групповым занятиям по IELTS, но необходимо улучшить знания по грамматике для более качественного обучения."
      },
      {
        min: 30,
        max: 35,
        text: "Вы можете претендовать на вузы самого высокого уровня."
      }
    ],
  },
];

const countryCityData = {
  "Великобритания": [
    {
      city: "Лондон",
      apartmentCost: 1600,
      dormCost: 1000,
      foodCost: 200,
      gymCost: 40,
      transportCost: 70,
      medicalCost: 0,
    },
    {
      city: "Оксфорд",
      apartmentCost: 1200,
      dormCost: 840,
      foodCost: 150,
      gymCost: 35,
      transportCost: 50,
      medicalCost: 0,
    },
    {
      city: "Кембридж",
      apartmentCost: 1200,
      dormCost: 840,
      foodCost: 150,
      gymCost: 35,
      transportCost: 50,
      medicalCost: 0,
    },
  ],
  "Нидерланды": [
    {
      city: "Амстердам",
      apartmentCost: 1500,
      dormCost: 1000,
      foodCost: 400,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Финляндия": [
    {
      city: "Хельсинки",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Швеция": [
    {
      city: "Стокгольм",
      apartmentCost: 1300,
      dormCost: 900,
      foodCost: 400,
      gymCost: 50,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Швейцария": [
    {
      city: "Цюрих",
      apartmentCost: 2000,
      dormCost: 1500,
      foodCost: 500,
      gymCost: 60,
      transportCost: 100,
      medicalCost: 50,
    },
    {
      city: "Берн",
      apartmentCost: 1900,
      dormCost: 1400,
      foodCost: 450,
      gymCost: 60,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Италия": [
    {
      city: "Милан",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
    {
      city: "Рим",
      apartmentCost: 1300,
      dormCost: 850,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Испания": [
    {
      city: "Мадрид",
      apartmentCost: 1000,
      dormCost: 700,
      foodCost: 300,
      gymCost: 30,
      transportCost: 80,
      medicalCost: 50,
    },
    {
      city: "Барселона",
      apartmentCost: 1100,
      dormCost: 750,
      foodCost: 300,
      gymCost: 30,
      transportCost: 80,
      medicalCost: 50,
    },
  ],
  "Польша": [
    {
      city: "Варшава",
      apartmentCost: 700,
      dormCost: 500,
      foodCost: 250,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
    {
      city: "Краков",
      apartmentCost: 650,
      dormCost: 450,
      foodCost: 250,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
  ],
  "Венгрия": [
    {
      city: "Будапешт",
      apartmentCost: 700,
      dormCost: 500,
      foodCost: 250,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
  ],
  "Франция": [
    {
      city: "Париж",
      apartmentCost: 1500,
      dormCost: 1000,
      foodCost: 400,
      gymCost: 50,
      transportCost: 100,
      medicalCost: 50,
    },
    {
      city: "Лион",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
    {
      city: "Марсель",
      apartmentCost: 1100,
      dormCost: 750,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Латвия": [
    {
      city: "Рига",
      apartmentCost: 600,
      dormCost: 400,
      foodCost: 200,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
  ],
  "Португалия": [
    {
      city: "Лиссабон",
      apartmentCost: 900,
      dormCost: 600,
      foodCost: 250,
      gymCost: 30,
      transportCost: 60,
      medicalCost: 50,
    },
  ],
  "Чехия": [
    {
      city: "Прага",
      apartmentCost: 700,
      dormCost: 500,
      foodCost: 250,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
  ],
  "Норвегия": [
    {
      city: "Осло",
      apartmentCost: 1500,
      dormCost: 1000,
      foodCost: 400,
      gymCost: 50,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Южная Корея": [
    {
      city: "Сеул",
      apartmentCost: 1000,
      dormCost: 1300,
      foodCost: 400,
      gymCost: 30,
      transportCost: 80,
      medicalCost: 60,
    },
    {
      city: "Пусан",
      apartmentCost: 700,
      dormCost: 650,
      foodCost: 400,
      gymCost: 30,
      transportCost: 80,
      medicalCost: 50,
    },
  ],
  "Сингапур": [
    {
      city: "Сингапур",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 400,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Гонконг": [
    {
      city: "Гонконг",
      apartmentCost: 1800,
      dormCost: 1000,
      foodCost: 400,
      gymCost: 50,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "ОАЭ": [
    {
      city: "Дубай",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
    {
      city: "Абу-Даби",
      apartmentCost: 1100,
      dormCost: 750,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Турция": [
    {
      city: "Стамбул",
      apartmentCost: 600,
      dormCost: 400,
      foodCost: 200,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
    {
      city: "Анкара",
      apartmentCost: 550,
      dormCost: 350,
      foodCost: 200,
      gymCost: 20,
      transportCost: 50,
      medicalCost: 50,
    },
  ],
  "Катар": [
    {
      city: "Доха",
      apartmentCost: 1800,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 50,
    },
  ],
  "Канада": [
    {
      city: "Торонто",
      apartmentCost: 1600,
      dormCost: 900,
      foodCost: 350,
      gymCost: 60,
      transportCost: 95,
      medicalCost: 80,
    },
    {
      city: "Монреаль",
      apartmentCost: 1200,
      dormCost: 800,
      foodCost: 350,
      gymCost: 40,
      transportCost: 70,
      medicalCost: 90,
    },
    {
      city: "Ванкувер",
      apartmentCost: 1700,
      dormCost: 900,
      foodCost: 350,
      gymCost: 60,
      transportCost: 80,
      medicalCost: 95,
    },
  ],
  "Австрия": [
    {
      city: "Вена",
      apartmentCost: 900,
      dormCost: 500,
      foodCost: 350,
      gymCost: 35,
      transportCost: 55,
      medicalCost: 80,
    },
  ],
  "Дания": [
    {
      city: "Копенгаген",
      apartmentCost: 1200,
      dormCost: 600,
      foodCost: 350,
      gymCost: 30,
      transportCost: 60,
      medicalCost: 45,
    },
  ],
  "Бельгия": [
    {
      city: "Брюссель",
      apartmentCost: 900,
      dormCost: 500,
      foodCost: 350,
      gymCost: 30,
      transportCost: 55,
      medicalCost: 75,
    },
  ],
  "Китай": [
    {
      city: "Пекин",
      apartmentCost: 750,
      dormCost: 350,
      foodCost: 200,
      gymCost: 40,
      transportCost: 30,
      medicalCost: 50,
    },
    {
      city: "Шанхай",
      apartmentCost: 800,
      dormCost: 350,
      foodCost: 200,
      gymCost: 40,
      transportCost: 25,
      medicalCost: 55,
    },
  ],
  "Малайзия": [
    {
      city: "Куала-Лумпур",
      apartmentCost: 400,
      dormCost: 200,
      foodCost: 200,
      gymCost: 35,
      transportCost: 30,
      medicalCost: 30,
    },
  ],
  "Германия": [
    {
      city: "Берлин",
      apartmentCost: 900,
      dormCost: 400,
      foodCost: 300,
      gymCost: 30,
      transportCost: 80,
      medicalCost: 100,
    },
    {
      city: "Мюнхен",
      apartmentCost: 1200,
      dormCost: 500,
      foodCost: 350,
      gymCost: 40,
      transportCost: 100,
      medicalCost: 120,
    },
    {
      city: "Гамбург",
      apartmentCost: 1000,
      dormCost: 450,
      foodCost: 320,
      gymCost: 35,
      transportCost: 90,
      medicalCost: 110,
    },
    {
      city: "Франкфурт",
      apartmentCost: 1100,
      dormCost: 480,
      foodCost: 330,
      gymCost: 38,
      transportCost: 95,
      medicalCost: 115,
    },
    {
      city: "Кёльн",
      apartmentCost: 950,
      dormCost: 420,
      foodCost: 310,
      gymCost: 32,
      transportCost: 85,
      medicalCost: 105,
    },
  ],
};


const getResultDescription = (test, correctAnswers) => {
  const feedbackRange = test.feedback.find(
    (range) => correctAnswers >= range.min && correctAnswers <= range.max
  );
  return feedbackRange ? feedbackRange.text : "Нет данных о вашем результате.";
};

// Внешкольная деятельность: Список активностей
const activities = {
  "Олимпиады, национальные олимпиады, конкурсы": {
    "Уровень олимпиады": ["Школьный", "Региональный", "Национальный", "Международный"],
    "Результаты": ["Призовые места", "Дипломы", "Участие без призов"],
    "Предмет/дисциплина": ["Математика", "Физика", "Химия", "Информатика", "Литература", "Искусство"],
    "Число участников": ["< 100", "100-500", "> 500"],
  },
  "Награды и достижения": {
    "Вид награды": ["Академическая", "Спортивная", "Культурная", "Творческая"],
    "Уровень конкурса": ["Школьный", "Региональный", "Национальный", "Международный"],
    "Признание": ["Сертификаты", "Медали", "Грамоты", "Стипендии"],
    "Частота участия": ["Ежегодно", "Раз в несколько лет", "Один раз"],
  },
};


export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Состояния вкладки Профиль
  const [schoolType, setSchoolType] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [classYear, setClassYear] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [favoriteSubjects, setFavoriteSubjects] = useState("");
  const [educationBudget, setEducationBudget] = useState("");
  const [preferredCountries, setPreferredCountries] = useState("");

  const handleSchoolChange = (e) => {
    setSchoolType(e.target.value);
    if (e.target.value !== "Другое") {
      setCustomSchool("");
    }
  };

  // Внешкольная деятельность
  const [selectedCriteria, setSelectedCriteria] = useState({});

  const handleCriteriaChange = (activity, criteria, event) => {
    setSelectedCriteria({
      ...selectedCriteria,
      [activity]: {
        ...selectedCriteria[activity],
        [criteria]: event.target.value,
      },
    });
  };

  // Финансы
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedLivingCost, setSelectedLivingCost] = useState("");
  const [selectedFinancialAid, setSelectedFinancialAid] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [availableBudgets, setAvailableBudgets] = useState([]);
  const [availableLivingCosts, setAvailableLivingCosts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      setAvailableBudgets(countryBudgets[selectedCountry] || []);
      setAvailableLivingCosts(countryLivingCosts[selectedCountry] || []);
    } else {
      setAvailableBudgets([]);
      setAvailableLivingCosts([]);
    }
  }, [selectedCountry]);

  const professions = selectedDirection
    ? directionProfessionMapping[selectedDirection]
    : [];

  const handleGenerateResult = () => {
    if (
      !selectedCountry ||
      !selectedFormat ||
      !selectedBudget ||
      !selectedLivingCost ||
      !selectedFinancialAid ||
      !selectedDirection ||
      !selectedProfession
    ) {
      alert("Все поля должны быть заполнены!");
      return;
    }
    setShowResults(true);
  };

  // Тесты
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const testContainerRef = useRef(null);

  const currentTest = tests[currentTestIndex];
  const currentQuestion = currentTest.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestion.type === "textInput") {
      // Проверка для вопросов с ручным вводом
      if (!selectedOption || selectedOption.trim() === "") {
        alert("Введите ответ перед переходом к следующему вопросу.");
        return;
      }

      const isCorrect = selectedOption.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

      setResults((prev) => [
        ...prev,
        {
          testId: currentTest.id,
          isCorrect,
        },
      ]);
    } else {
      // Проверка для вопросов с вариантами ответа
      if (selectedOption === null) {
        alert("Выберите ответ перед переходом к следующему вопросу.");
        return;
      }

      const isCorrect = selectedOption === currentQuestion.correct;

      setResults((prev) => [
        ...prev,
        {
          testId: currentTest.id,
          isCorrect,
        },
      ]);
    }

    // Переход к следующему вопросу
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsCompleted(true);
    }

    setSelectedOption(null);
  };


  const resetTests = () => {
    setCurrentTestIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setResults([]);
    setIsCompleted(false);
  };

  const calculateResults = (testId) => {
    const testResults = results.filter((result) => result.testId === testId);
    return testResults.reduce((acc, curr) => (curr.isCorrect ? acc + 1 : acc), 0);
  };

  // Рендер вкладок
  const renderProfileTab = () => {
    return (
      <div className="profile-form">
        <h2>Профиль</h2>
        <form>
          <div className="form-group">
            <label>Имя</label>
            <input type="text" placeholder="Введите имя" />
          </div>
          <div className="form-group">
            <label>Фамилия</label>
            <input type="text" placeholder="Введите фамилию" />
          </div>
          <div className="form-group">
            <label>Дата рождения</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Тип школы</label>
            <select value={schoolType} onChange={handleSchoolChange}>
              <option value="">Выберите тип школы</option>
              {schoolOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {schoolType === "Другое" && (
              <input
                type="text"
                placeholder="Введите название школы"
                value={customSchool}
                onChange={(e) => setCustomSchool(e.target.value)}
              />
            )}
          </div>
          <div className="form-group">
            <label>Класс обучения</label>
            <input
              type="number"
              placeholder="Введите класс"
              value={classYear}
              onChange={(e) => setClassYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Год выпуска</label>
            <input
              type="number"
              placeholder="Введите год выпуска"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Любимые предметы</label>
            <input
              type="text"
              placeholder="Физика, Математика"
              value={favoriteSubjects}
              onChange={(e) => setFavoriteSubjects(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Бюджет на обучение в год</label>
            <input
              type="text"
              placeholder="Введите бюджет"
              value={educationBudget}
              onChange={(e) => setEducationBudget(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Предпочитаемые страны для учебы</label>
            <input
              type="text"
              placeholder="Введите предпочитаемые страны"
              value={preferredCountries}
              onChange={(e) => setPreferredCountries(e.target.value)}
            />
          </div>
        </form>
      </div>
    );
  };

  const renderAcademicsTab = () => {
    return (
      <div className="test-container" ref={testContainerRef}>
        {isCompleted && testContainerRef.current && (
          <Confetti
            width={testContainerRef.current.offsetWidth}
            height={testContainerRef.current.offsetHeight}
            numberOfPieces={150}
            recycle={false}
          />
        )}
        {!isCompleted ? (
          <div className="test-card" style={{ borderColor: currentTest.color }}>
            <h2 style={{ color: currentTest.color }}>{currentTest.title}</h2>
            <p>Вопрос {currentQuestionIndex + 1} из {currentTest.questions.length}</p>
            <div className="question">
              <h3>{currentQuestion.text}</h3>
              {currentQuestion.image && (
                <img
                  src={currentQuestion.image}
                  alt="Иллюстрация вопроса"
                  className="question-image"
                />
              )}
            </div>
            <form className="answers">
              {currentQuestion.type === "textInput" ? (
                // Поле ввода текста для текстовых вопросов
                <input
                  type="text"
                  placeholder="Введите ваш ответ"
                  value={selectedOption || ""}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    width: "100%",
                    margin: "10px 0",
                  }}
                />
              ) : (
                // Радиокнопки для вопросов с вариантами ответов
                currentQuestion.options.map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedOption === index}
                      onChange={() => setSelectedOption(index)}
                    />
                    {option}
                  </label>
                ))
              )}
            </form>
            <button
              className="next-button"
              style={{ backgroundColor: currentTest.color }}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < currentTest.questions.length - 1
                ? "Следующий вопрос"
                : currentTestIndex < tests.length - 1
                  ? "Перейти к следующему тесту"
                  : "Завершить тест"}
            </button>
          </div>
        ) : (
          <div className="results-card">
            <h2>Результаты теста</h2>
            {tests.map((test) => {
              const correctAnswers = calculateResults(test.id);
              const resultDescription = getResultDescription(test, correctAnswers);
              return (
                <div key={test.id} className="result-block">
                  <h3 style={{ color: test.color }}>{test.title}</h3>
                  <p>
                    Набрано правильных ответов: {correctAnswers} из {test.questions.length}.
                  </p>
                  <p>{resultDescription}</p>
                </div>
              );
            })}
            <button className="restart-button" onClick={resetTests}>
              Пройти заново
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderExtracurricularTab = () => {
    return (
      <div className="extracurricular">
        <h2>Внешкольная деятельность</h2>
        {Object.keys(activities).map((activity) => (
          <div key={activity} className="activity-section">
            <h3>{activity}</h3>
            {Object.keys(activities[activity]).map((criteria) => (
              <div key={criteria} className="form-group">
                <label>{criteria}</label>
                <select
                  value={selectedCriteria[activity]?.[criteria] || ""}
                  onChange={(event) => handleCriteriaChange(activity, criteria, event)}
                >
                  <option value="">Выберите {criteria}</option>
                  {activities[activity][criteria].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
        <p>Заполните всю информацию о ваших активностях, наградах, конкурсах и достижениях.</p>
      </div>
    );
  };

  const renderEducationPaymentTab = () => {
    return (
      <div>
        <h2>Поступление</h2>
        {/* <p>Здесь будет информация о необходимых документах, сроках подачи заявок, эссе, мотивационных письмах и прочих аспектах поступления.</p> */}
      </div>
    );
  };

  const renderFinanceTab = () => {
    return (
      <div className="finance-tab-content">
        {!showResults && (
          <>
            <h2>Финансовый калькулятор</h2>
            <div className="financial-form">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Выберите страну поступления</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="">Выберите формат обучения</option>
                {formats.map((format, index) => (
                  <option key={index} value={format}>
                    {format}
                  </option>
                ))}
              </select>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                disabled={!availableBudgets.length}
              >
                <option value="">Средний бюджет на обучение</option>
                {availableBudgets.map((budget, index) => (
                  <option key={index} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
              <select
                value={selectedLivingCost}
                onChange={(e) => setSelectedLivingCost(e.target.value)}
                disabled={!availableLivingCosts.length}
              >
                <option value="">Месячные затраты на проживание</option>
                {availableLivingCosts.map((cost, index) => (
                  <option key={index} value={cost}>
                    {cost}
                  </option>
                ))}
              </select>
            </div>

            <div className="financial-aid">
              <p>Требуется ли финансовая помощь</p>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="financialAid"
                    value="Грант"
                    checked={selectedFinancialAid === "Грант"}
                    onChange={(e) => setSelectedFinancialAid(e.target.value)}
                  />
                  Грант
                </label>
                <label>
                  <input
                    type="radio"
                    name="financialAid"
                    value="Не требуется"
                    checked={selectedFinancialAid === "Не требуется"}
                    onChange={(e) => setSelectedFinancialAid(e.target.value)}
                  />
                  Не требуется
                </label>
              </div>
            </div>

            <div className="career-calculator">
              <h3>Карьерный калькулятор</h3>
              <div className="career-form">
                <select
                  value={selectedDirection}
                  onChange={(e) => {
                    setSelectedDirection(e.target.value);
                    setSelectedProfession("");
                  }}
                >
                  <option value="">Выберите направление</option>
                  {Object.keys(directionProfessionMapping).map((direction, index) => (
                    <option key={index} value={direction}>
                      {direction}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  disabled={!professions.length}
                >
                  <option value="">Выберите профессию</option>
                  {professions.map((profession, index) => (
                    <option key={index} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="generate-button" onClick={handleGenerateResult}>
              Генерировать результат
            </button>
          </>
        )}

        {showResults && (
          <div className="budget-analysis-container">
            <h1 className="budget-analysis-title">Ваш персональный расчет бюджета!</h1>

            {/* Блок 01 */}
            <div className="budget-block">
              <h2 className="block-title">
                <span>01</span> Финансовый анализ затрат
              </h2>
              <div className="block-wrapper">
                <p className="block-description">
                  Детальный расчет расходов на обучение и проживание.
                </p>
                <div className="block-content">
                  {countryCityData[selectedCountry] && countryCityData[selectedCountry].length > 0 ? (
                    countryCityData[selectedCountry].map((cityObj, index) => {
                      const { city, apartmentCost, dormCost, foodCost, gymCost, transportCost, medicalCost } = cityObj;
                      const totalWithDorm = dormCost + foodCost + gymCost + transportCost + medicalCost;
                      const totalWithApartment = apartmentCost + foodCost + gymCost + transportCost + medicalCost;
                      const averageCost = (totalWithDorm + totalWithApartment) / 2;

                      return (
                        <div key={index} className="block-text">
                          <p><strong>Город:</strong> {city}</p>
                          <p><strong>Проживание в квартире:</strong> ${apartmentCost}</p>
                          <p><strong>Проживание в общежитии:</strong> ${dormCost}</p>
                          <p><strong>Питание:</strong> ${foodCost}</p>
                          <p><strong>Спортзал:</strong> ${gymCost}</p>
                          <p><strong>Транспорт:</strong> ${transportCost}</p>
                          <p><strong>Медицина:</strong> ${medicalCost}</p>
                          <p><strong>Сумма с общежитием:</strong> ${totalWithDorm}</p>
                          <p><strong>Сумма с квартирой:</strong> ${totalWithApartment}</p>
                          <p><strong>Средняя стоимость:</strong> ${averageCost}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p>Нет данных для выбранной страны.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Блок 02 */}
            <div className="budget-block">
              <h2 className="block-title">
                <span>02</span> Уровень зарплаты
              </h2>
              <div className="block-wrapper">
                <p className="block-description">Средние зарплаты для выбранной профессии.</p>
                <div className="block-content">
                  {salaryData[selectedCountry] && salaryData[selectedCountry].length > 0 ? (
                    <table className="salary-table">
                      <thead>
                        <tr>
                          <th>Город</th>
                          <th>Junior</th>
                          <th>Middle</th>
                          <th>Senior</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salaryData[selectedCountry].map((item, index) => (
                          <tr key={index}>
                            <td>{item.city}</td>
                            <td>{item.junior}</td>
                            <td>{item.middle}</td>
                            <td>{item.senior}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Нет данных для выбранной страны.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Блок 03 */}
            <div className="budget-block">
              <h2 className="block-title">
                <span>03</span> Срок окупаемости
              </h2>
              <div className="block-wrapper">
                <p className="block-description">Срок окупаемости инвестиций.</p>
                <div className="block-content">
                  <div className="block-text">
                    {educationData[selectedCountry] &&
                      educationData[selectedCountry][selectedDirection] &&
                      educationData[selectedCountry][selectedDirection][selectedProfession] ? (
                      <>
                        <p><strong>Профессия:</strong> {selectedProfession}</p>
                        <p><strong>Стоимость обучения:</strong> {
                          educationData[selectedCountry][selectedDirection][selectedProfession].tuition
                        } USD</p>
                        <p><strong>Зарплата Junior:</strong> {
                          educationData[selectedCountry][selectedDirection][selectedProfession].salary
                        } USD/год</p>
                        <p><strong>Траты на жизнь:</strong> {
                          educationData[selectedCountry][selectedDirection][selectedProfession].livingCost
                        } USD</p>
                        <p><strong>Окупаемость (лет):</strong> {
                          educationData[selectedCountry][selectedDirection][selectedProfession].roi
                        }</p>
                      </>
                    ) : (
                      <p>Нет данных для выбранной страны, направления и профессии.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Блок 04 */}
            <div className="budget-block">
              <h2 className="block-title">
                <span>04</span> Востребованность
              </h2>
              <div className="block-wrapper">
                <p className="block-description">Уровень востребованности профессии.</p>
                <div className="block-content">
                  {demandData[selectedCountry] && demandData[selectedCountry][selectedProfession] ? (
                    <div className="block-text">
                      <p><strong>Assistant:</strong> {demandData[selectedCountry][selectedProfession].assistant || "Нет данных"}</p>
                      <p><strong>Junior:</strong> {demandData[selectedCountry][selectedProfession].junior || "Нет данных"}</p>
                      <p><strong>Middle:</strong> {demandData[selectedCountry][selectedProfession].middle || "Нет данных"}</p>
                    </div>
                  ) : (
                    <p>Нет данных о востребованности.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Блок 05 */}
            <div className="budget-block">
              <h2 className="block-title">
                <span>05</span> Скорость трудоустройства
              </h2>
              <div className="block-wrapper">
                <p className="block-description">Скорость нахождения работы после выпуска.</p>
                <div className="block-content">
                  {employmentSpeedData[selectedCountry] && employmentSpeedData[selectedCountry][selectedProfession] ? (
                    <div className="block-text">
                      <p><strong>Assistant:</strong> {employmentSpeedData[selectedCountry][selectedProfession].assistant}</p>
                      <p><strong>Junior:</strong> {employmentSpeedData[selectedCountry][selectedProfession].junior}</p>
                      <p><strong>Middle:</strong> {employmentSpeedData[selectedCountry][selectedProfession].middle}</p>
                    </div>
                  ) : (
                    <p>Нет данных о скорости трудоустройства.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === "profile") {
      return renderProfileTab();
    } else if (activeTab === "cashLoan") {
      return renderAcademicsTab();
    } else if (activeTab === "extracurricular") {
      return renderExtracurricularTab();
    } else if (activeTab === "collateralLoan") {
      return renderFinanceTab();
    } else if (activeTab === "educationPayment") {
      return renderEducationPaymentTab();
    } else {
      return <div>Нет данных</div>;
    }
  };

  return (
    <div className="calculator">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Профиль
        </button>
        <button
          className={`tab ${activeTab === "cashLoan" ? "active" : ""}`}
          onClick={() => setActiveTab("cashLoan")}
        >
          Академическая успеваемость
        </button>
        <button
          className={`tab ${activeTab === "extracurricular" ? "active" : ""}`}
          onClick={() => setActiveTab("extracurricular")}
        >
          Внешкольная деятельность
        </button>
        <button
          className={`tab ${activeTab === "collateralLoan" ? "active" : ""}`}
          onClick={() => setActiveTab("collateralLoan")}
        >
          Финансы
        </button>
        <button
          className={`tab ${activeTab === "educationPayment" ? "active" : ""}`}
          onClick={() => setActiveTab("educationPayment")}
        >
          Поступление
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}
