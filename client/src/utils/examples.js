export const EXAMPLE_LESSON = {
    "name": "test all",
    "shuffle": false,
    "showInterstitials": true,
    "showPercentCorrect": true,
    "tasks": [
        {
            "taskID": "1",
            "text": "text no audio - Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.",
            "type": "TextOnly",
            "audioFilename": "",
            "audio": {
                "name": ""
            }
        },
        {
            "taskID": "2",
            "text": "text audio",
            "type": "TextOnly",
            "audioFilename": "Logging_Send_For_Review.mp3",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Logging_Send_For_Review.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=17f41e036a29fda368e30228b8431ed74600b363996a19326afb15ddb5b59987&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "3",
            "text": "Test 1",
            "type": "MultipleChoice",
            "audioFilename": "Error.mp3",
            "possibleAnswers": [
                {
                    "middleText": "1",
                    "bottomText": ""
                },
                {
                    "middleText": "2",
                    "bottomText": ""
                },
                {
                    "middleText": "3",
                    "bottomText": ""
                },
                {
                    "middleText": "4",
                    "bottomText": ""
                }
            ],
            "correctAnswerIndex": "0",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Error.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=aee43d7f292407483c201b0f615acfb1275e896b76e13d99c1dd429d3193e906&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "interstitial-0",
            "text": "",
            "type": "Interstitial"
        },
        {
            "taskID": "4",
            "text": "gggggggggg",
            "type": "MultipleChoice",
            "audioFilename": "",
            "audio": {
                "name": ""
            },
            "possibleAnswers": [
                {
                    "middleText": "1",
                    "bottomText": ""
                },
                {
                    "middleText": "2",
                    "bottomText": ""
                },
                {
                    "middleText": "3",
                    "bottomText": ""
                },
                {
                    "middleText": "4",
                    "bottomText": ""
                }
            ],
            "correctAnswerIndex": "0"
        },
        {
            "taskID": "5",
            "text": "1234524",
            "type": "SpecifiedOrder",
            "audioFilename": "",
            "audio": {
                "name": ""
            },
            "possibleAnswers": [
                {
                    "text": "1",
                    "id": "a-0"
                },
                {
                    "text": "2",
                    "id": "a-1"
                },
                {
                    "text": "4",
                    "id": "a-2"
                },
                {
                    "text": "3",
                    "id": "a-3"
                },
                {
                    "text": "2",
                    "id": "a-4"
                },
                {
                    "text": "4",
                    "id": "a-5"
                },
                {
                    "text": "5",
                    "id": "a-6"
                }
            ],
            "correctAnswer": "1234524"
        },
        {
            "taskID": "6",
            "text": "qwerty",
            "type": "SpecifiedOrder",
            "audioFilename": "Logging_Send_For_Review.mp3",
            "possibleAnswers": [
                {
                    "text": "y",
                    "id": "a-0"
                },
                {
                    "text": "t",
                    "id": "a-1"
                },
                {
                    "text": "r",
                    "id": "a-2"
                },
                {
                    "text": "e",
                    "id": "a-3"
                },
                {
                    "text": "w",
                    "id": "a-4"
                },
                {
                    "text": "q",
                    "id": "a-5"
                }
            ],
            "correctAnswer": "qwerty",
            "audioLink": "https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/Logging_Send_For_Review.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUEUMUPDURSWX3FMX%2F20220602%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T120818Z&X-Amz-Expires=600000&X-Amz-Signature=17f41e036a29fda368e30228b8431ed74600b363996a19326afb15ddb5b59987&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "taskID": "end",
            "text": "Congrats! You've finished the lesson! Now sign up for more :)",
            "type": "End",
            "showPercentCorrect": true,
            "hideButton": true
        }
    ],
    "id": "lesson-test all",
    "requiredCompletions": 75,
    "noToSample": 0,
}