var questions = [
    {
    question: "Which of the following is an advantage of using JavaScript?",
    choices: ["Less server interaction", "All the above", "Immediate feedback to the visitors", "Increased interactivity"],
    correctAnswer: 1
}, 
{
    question: "How can you get the type of arguments passed to a function?",
    choices: ["Using an array", "Using getType function", "Using typeof operator", "None of the above"],
    correctAnswer: 2
}, 
{
    question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
    choices: ["concat()", "search()", "match()", "replace()"],
    correctAnswer: 1
}, 
{
    question: "How do you create a function in JavaScript?",
    choices: ["function myFunction()", "function=myFunction()", "()function", "function:myFunction()"],
    correctAnswer: 0
}, 
{
    question: "How do you call a function named myFunction?",
    choices: ["myFunction()", "call myFunction()", "call function myFunction", "function"],
    correctAnswer: 0
}
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {
console.log(window.location.href)
    if (window.location.href.indexOf("start.html") >-1){
        startQuiz();
    } 
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(document).find(".startButton").hide();

    // On clicking next, display the next question
    $(this).on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    $(document).find(".answer").text("Correct");
                }    
                else{
                    console.log("incorrect");
                    $(document).find(".answer").text("Incorrect");
                }
                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    setTimeout(function(){ displayCurrentQuestion(); }, 4000);
                } else {
                    displayScore();
                    $(document).find(".startButton").show();
                    quizOver = true;
                }
            }
        } else { 
            quizOver = false;
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
    
});

function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var answerClass = $(document).find(".quizContainer > .answer");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);

    $(answerClass).text("");

    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    $(document).find(".startButton").hide();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function startQuiz() {
    console.log("startQuiz");
    var duration = 60 * 3,
        display = $("#time");
    startTimer(duration, display);
}
