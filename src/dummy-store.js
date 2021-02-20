export default {
    "users": [

        {
            "id": "Z100",
            "user_name": "turtlesoup",
            "password": "password",
            "quizzes": ["Q100", "Q102"],
            "questions": ["Y105"],
        },
        {
            "id": "Z101",
            "user_name": "boba",
            "password": "tea",
            "quizzes": ["Q101"],
            "questions": [],
        }

    ],

    "quizzes":[

        {
            "id": "Q100",
            "name": "Marvel",
            "questions": ["Y100", "Y101", "Y102"],
            "count": 0,
            "modified": "2020-02-05T00:00:00.000Z",
        },
        {
            "id": "Q101",
            "name": "Math",
            "questions": ["Y103", "Y104"],
            "count": 100,
            "modified": "2018-12-01T00:00:00.000Z",
        },
        {
            "id": "Q102",
            "name": "Data Structures",
            "questions": ["Y106, Y107"],
            "count": 25,
            "modified": "2019-11-01T00:00:00.000Z"
        }
    
    ],

    "questions":[

        {
            "id": "Y100",
            "question": "What is Captain America's alter ego",
            "answer": "Steve Rogers",
            "choices": ["Tony Stark", "Clint Barton"]
        },
        {
            "id": "Y101",
            "question": "What was the Beast original color?",
            "answer": "Gray",
            "choices": ["Blue", "Yellow", "Red"]
        },
        {
            "id": "Y102",
            "question": "Are Spiderman's webs in the comic currently-",
            "answer": "Mechanical",
            "choices": ["Organic"]
        },
        {
            "id": "Y103",
            "question": "1+1=",
            "answer": "2",
            "choices": ["11", "22", "-1"]
        },
        {
            "id": "Y104",
            "question": "5x0=",
            "answer": "0",
            "choices": ["50", "5"]
        },
        
        {
            "id": "Y105",
            "question": "What soda is the best?",
            "answer": "Dr Pepper",
            "choices": ["Coke", "Sprite"]
        },
        {
            "id": "Y106",
            "question": "What data strucutre follows FIFO rules?",
            "answer": "Queue",
            "choices": ["Stack", "LinkedList"]
        },
        {
            "id": "Y107",
            "question": "What data strucutre follows LILO rules?",
            "answer": "Stack",
            "choices": ["Queue", "Arrays"]
        },
    ]

    
}