export default {
    "users": [

        {
            "id": "Z100",
            "name": "turtlesoup",
            "password": "password",
        },
        {
            "id": "Z101",
            "name": "boba",
            "password": "tea",
        }

    ],

    "quizzes":[

        {
            "id": "Q100",
            "name": "Marvel",
            "count": 0,
            "modified": "2020-02-05T00:00:00.000Z",
            "published": true,
            "userId": "Z100"
        },
        {
            "id": "Q101",
            "name": "Math",
            "count": 100,
            "modified": "2018-12-01T00:00:00.000Z",
            "published": true,
            "userId": "Z101"


        },
        {
            "id": "Q102",
            "name": "Data Structures",
            "count": 25,
            "modified": "2019-11-01T00:00:00.000Z",
            "published": false,
            "userId": "Z100"

        }
    
    ],

    "questions":[

        {
            "id": "Y100",
            "question": "What is Captain America's alter ego",
            "answer": "Steve Rogers",
            "choices": ["Tony Stark", "Clint Barton"],
            "test": "Q100",
            "user": "Z100",
            "used": true
        },
        {
            "id": "Y101",
            "question": "What was the Beast original color?",
            "answer": "Gray",
            "choices": ["Blue", "Yellow", "Red"],
            "test": "Q100",
            "user": "Z100",
            "used": true
        },
        {
            "id": "Y102",
            "question": "Are Spiderman's webs in the comic currently-",
            "answer": "Mechanical",
            "choices": ["Organic"],
            "test": "Q100",
            "user": "Z100",
            "used": true
        },
        {
            "id": "Y103",
            "question": "1+1=",
            "answer": "2",
            "choices": ["11", "22", "-1"],
            "test": "Q101",
            "user": "Z101",
            "used": true
        },
        {
            "id": "Y104",
            "question": "5x0=",
            "answer": "0",
            "choices": ["50", "5"],
            "test": "Q101",
            "user": "Z101",
            "used": true
        },
        
        {
            "id": "Y105",
            "question": "What soda is the best?",
            "answer": "Dr Pepper",
            "choices": ["Coke", "Sprite"],
            "test": null,
            "user": "Z100",
            "used": false
        },
        {
            "id": "Y106",
            "question": "What data strucutre follows FIFO rules?",
            "answer": "Queue",
            "choices": ["Stack", "LinkedList"],
            "test": "Q102",
            "user": "Z100",
            "used": true
        },
        {
            "id": "Y107",
            "question": "What data strucutre follows LILO rules?",
            "answer": "Stack",
            "choices": ["Queue", "Arrays"],
            "test": "Q102",
            "user": "Z100",
            "used": true
        },
    ]

    
}