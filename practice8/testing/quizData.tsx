export type tTasks = {
    "question": string;
    "answer": string;
}[];

export type tQuizzes = {
    "id": number;
    "type": "M" | "S" | "O" | "W";
    "title": string;
    "tasks"?: tTasks;
    "options"?: { 
        id: number; 
        text: string; 
        answer: string; 
    }[];
}[];

export const quiz: tQuizzes = [
    {
        "id": 1,
        "type": "M",
        "title": "Сопоставьте известного персонажа и его технику",
        "tasks": [
            { 
                "question": "Наруто Узумаки", 
                "answer": "Множественное теневое клонирование" 
            },
            { 
                "question": "Саске Учиха", 
                "answer": "Чидори" 
            },
            { 
                "question": "Какаши Хатаке", 
                "answer": "Тысячилетие боли" 
            },
            { 
                "question": "Итачи Учиха", 
                "answer": "Цукуёми" 
            },
            { 
                "question": "Шисуи Учиха", 
                "answer": "Котоамацуками" 
            }
        ]
    },
    {
        "id": 2,
        "type": "M",
        "title": "Сопоставьте персонажа и его титул",
        "tasks": [
            { 
                "question": "Минато Намиказе", 
                "answer": "Желтая Молния Конохи" 
            },
            { 
                "question": "Гаара", 
                "answer": "Песчаный Демон" 
            },
            { 
                "question": "Джирайя", 
                "answer": "Извращенный Отшельник" 
            },
            { 
                "question": "Цунаде", 
                "answer": "Легендарная Неудачница" 
            },
            { 
                "question": "Фугаку Учиха", 
                "answer": "Свирепый глаз" 
            }
        ]
    },
    {
        "id": 3,
        "type": "S",
        "title": "Отсортируйте Хокаге от 1 до 7",
        "tasks": [
            { 
                "question": "Хаширама Сенджу", 
                "answer": "1" 
            },
            { 
                "question": "Тобирама Сенджу", 
                "answer": "2" 
            },
            { 
                "question": "Хирузен Сарутоби", 
                "answer": "3" 
            },
            { 
                "question": "Минато Намиказе", 
                "answer": "4" 
            },
            { 
                "question": "Цунаде Сэнджу", 
                "answer": "5" 
            },
            { 
                "question": "Какаши Хатаке", 
                "answer": "6" 
            },
            { 
                "question": "Наруто Удзумаки", 
                "answer": "7" 
            }
        ]
    },
    {
        "id": 4,
        "type": "S",
        "title": "Отсортируйте хвостатых зверей от 1 до 9",
        "tasks": [
            { 
                "question": "Шукаку", 
                "answer": "1" 
            },
            { 
                "question": "Мататаби", 
                "answer": "2" 
            },
            { 
                "question": "Исобу", 
                "answer": "3" 
            },
            { 
                "question": "Сон Гоку", 
                "answer": "4" 
            },
            { 
                "question": "Кокуоу", 
                "answer": "5" 
            },
            { 
                "question": "Сайкен", 
                "answer": "6" 
            },
            { 
                "question": "Чоумей", 
                "answer": "7" 
            },
            { 
                "question": "Гьюки", 
                "answer": "8" 
            },
            { 
                "question": "Курама", 
                "answer": "9" 
            }
        ]
    },
    {
        "id": 5,
        "type": "O",
        "title": "Кто был назначен четвертым Мизукаге (страна Воды)?",
        "options": [
            { 
                "id": 1, 
                "text": "Бьякурен", 
                "answer": "0" 
            },
            { 
                "id": 2, 
                "text": "Чоуджуро", 
                "answer": "0" 
            },
            { 
                "id": 3, 
                "text": "Хошикаге Кисаме", 
                "answer": "0" 
            },
            { 
                "id": 4, 
                "text": "Генгецу Хозуки", 
                "answer": "0" 
            },
            { 
                "id": 5, 
                "text": "Мей Теруми", 
                "answer": "0" 
            },
            { 
                "id": 6, 
                "text": "Ягура Каратачи", 
                "answer": "1" 
            },
        ]
    },
    {
        "id": 6,
        "type": "W",
        "title": "Выберите всех персонажей, которые являлись или являются членами Акацуки:",
        "options": [
            { 
                "id": 1, 
                "text": "Итачи Учиха", 
                "answer": "1" 
            },
            { 
                "id": 2, 
                "text": "Дейдара", 
                "answer": "1" 
            },
            { 
                "id": 3, 
                "text": "Асума Сорутоби", 
                "answer": "0" 
            },
            { 
                "id": 4, 
                "text": "Кинемон", 
                "answer": "0" 
            },
            { 
                "id": 5, 
                "text": "Шикамару Нара", 
                "answer": "0" 
            },
            { 
                "id": 6, 
                "text": "Орочимару", 
                "answer": "1" 
            },
            { 
                "id": 7, 
                "text": "Эй", 
                "answer": "0" 
            },
            { 
                "id": 8, 
                "text": "Тобирама Сэнджу", 
                "answer": "0" 
            },
            { 
                "id": 9, 
                "text": "Кисаме Хошигаки", 
                "answer": "1" 
            },
        ]
    },
];