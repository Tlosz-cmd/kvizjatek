const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const resultContainerElement = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;
let wrongAnswers = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    questionContainerElement.classList.remove('hide');
    resultContainerElement.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(selectedButton, correct);
    if (correct) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    correctCountElement.innerText = correctAnswers;
    wrongCountElement.innerText = wrongAnswers;
}

const questions = [
    {
        question: 'Mi Magyarország fővárosa?',
        answers: [
            { text: 'Budapest', correct: true },
            { text: 'Pécs', correct: false },
            { text: 'Szeged', correct: false },
            { text: 'Debrecen', correct: false }
        ]
    },
    {
        question: 'Melyik évben lett Magyarország EU tag?',
        answers: [
            { text: '2001', correct: false },
            { text: '2004', correct: true },
            { text: '2010', correct: false },
            { text: '1999', correct: false }
        ]
    },
    {
        question: 'Mi a legnagyobb bolygó a Naprendszerben?',
        answers: [
            { text: 'Föld', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Vénusz', correct: false }
        ]
    },
    {
        question: 'Ki festette a Mona Lisát?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Michelangelo', correct: false },
            { text: 'Pablo Picasso', correct: false }
        ]
    },
    {
        question : 'Ki a legnagyobb néger az osztalyban?',
        answers : [
            {text: 'Csala Mankó', correct : true},
            { text : 'Ábrahám Misike', correct: false},
            {text : 'Patkos Zsolti', correct:false},
            {text : 'Ssik Tlosz',correct:false}
        ]
    },
    {
        question: 'Manko tényleg egy néger?',
        answers : [
            {text: 'Igen',correct : true},
            {text : 'Nem' ,correct : false},
            {text : 'Talán',correct:false},
            {text : 'Nem biztos', correct : false}
        ]
    },
    {
        question: 'Misike és Tlosz alkololsiták?',
        answers : [
            {text : 'Igen',correct: false},
            {text : 'Fhuuu de még mennyire',correct:false},
            {text : 'Annyira mint a jó büdös kurvaélet',correct : false},
            {text : 'Annyira mint Pesten a Blaha téren a csövesek', correct : true}
        ]
    },
    {
        question:'Mankó meleg?',
        answers:[
            { text:'Igen',correct:false},
            {text:'Annyira mint Whisperton',correct:true},
            {text:'Annyira mint Tlosz',correct:false},
            {text:'Nem',correct:false}
                ]
    },
   {
            question : 'Mikor ment csődbe a McDonalds?',
            answers:[
                {text:'10. évfolyamban pluszb tesin mikor a Enikő elesett',correct:true},
                {text:'Karantén alatt',correct:false},
                {text:'Két hete',correct:false},
                {text:'Még nem csődölt be',correct:false}
    ]
   },
   {
        question : 'Mekkora Misike fasz mérete?',
        answers:[
            {text: 'Ultra kicsi',correct:false},
            {text:'10cm',correct:false},
            {text:'18cm',correct:true},
            {text:'10mm',correct:false}
    ]
   },
   {
        question : 'Hány % Magyarország cigánysága?',
        answers:[
            {text : '3,15%',correct:true},
            {text:'Mindenki cigány',correct:false},
            { text:'Nincs cigány Magyarországon',correct:false},
            {text:'100%',correct:false}

    ]
   },
   {
        question :'Hány alkoholista jár a 12.D-be?',
        answers:[
            {text:'12',correct:true},
            {text:'Mindenki alkoholista',correct:false},
            {text:'Nincs ilyen',correct:false},
            {text:'Csak Tuba Tanár úr',correct:false}
    ]
   },
   {
        question:'A Five Nights and Fuzz Boobsban hanyadék éjszakától dughat meg Foxi?',
        answers:[
            {text:'A második éjszakától',correct:true},
            {text:'Már az első éjszakától',correct:false},
            {text:'Sosem tud',correct:false},
            {text:'Már így kezdődik a játék',correct:false}
    ]
   },
 
  
];