const questions = [
    {
        question: "Who plays Iron Man in Avengers?",
        answers: [
            { text : "Jim carrey", correct : false},
            { text : "Mark Ruffalo", correct : false},
            { text : "Robert Downey Jr", correct : true},
            { text : "Jeremy Renner", correct : false},
        ]
    },
    {
        question: "Who plays Hawk Eye in Avengers?",
        answers: [
            { text : "Stan Lee", correct : false},
            { text : "Chris Evans", correct : false},
            { text : "Samuel L. Jackson", correct : false},
            { text : "Jeremy Renner", correct : true},
        ]
    },
    {
        question: "Who plays Thor in Avengers?",
        answers: [
            { text : "Anothony Mackie", correct : false},
            { text : "Chris Hemsworth", correct : true},
            { text : "Don Cheadle", correct : false},
            { text : "Scarlett Johansson", correct : false},
        ]
    },
    {
        question: "Who plays Captain America in Avengers?",
        answers: [
            { text : "ELizabeth Olsen", correct : false},
            { text : "Tom Hiddleston", correct : false},
            { text : "Robert Downey Jr", correct : false},
            { text : "Chris Evans", correct : true},
        ]
    },
    {
        question: "Who plays Black Widow in Avengers?",
        answers: [
            { text : "Chris Pratt", correct : false},
            { text : "Scarlett Johansson", correct : true},
            { text : "Dave Bautista", correct : false},
            { text : "Jeremy Renner", correct : false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

/*this function resets the currentQuestionindex and score to 0. Also changes the text inside the button to next  */

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/*This function choose which question is displayed from the array of 
 objects depending on what the currentQuestionIndex is, Also modifys
content of the h2 depending on the value of the questionNo. */

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

      /*This will call function depending on the value currentQuestion   */

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

/* Removes previous answers  */

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

/*This function checks whether isCorrect is equal to true, 
if it is equal it will be given the class correct and if it is
 not it will be given the class incorrect  */

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add("correct")
        score++;
    } else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

/*This function  displays your score and the next button 
will display Play again instead of next */

function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/*This function checks whether currentQuestionIndex is
 less than questions.length. If this is true it will 
 execute the showQuestion function or else it will execute 
 it will the showScore function */

function handNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

/*This function checks whether the currentQuestionIndex
 is less than the question length. If true it will execute 
 the handleNextButton function, or else it will execute the 
 startQuiz function  */

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();