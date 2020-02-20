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

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }    
                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".startButton").text("Restart?");
                    quizOver = true;
                }
            }
        } else { 
            quizOver = false;
            $(document).find(".startButton").text("Start");
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
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);

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
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}