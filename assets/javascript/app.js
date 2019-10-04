$(document).ready(function(){
    $("#new").hide();
    var counter = 10;
    var currentQuestion =0;
    var score = 0;
    var lost = 0;
    var timer;
    var clockRunning = false
    var isQuestionOver = false;
  
    var quizQuestions = [
        {
            question : "Which is the highest mountain in Europe?",
            choices : ["Mount Ararat" ,"Mont Blanc","Monte Bianco","Mount Elbrus"],
            correctAnswer:"Mount Elbrus"
        },
        {
            question : "Which ancient Roman city was buried under volcanic ash following the eruption of Mount Vesuvius in AD 79?",
            choices : ["Tarroco","Salernum","Herculoneum","Pompeii"],
            correctAnswer :"Pompeii"
    
        },
        {
            question :"Who was the first man to  walk on space? ",
            choices :["Neil Armstrong", "Alexei Leonov", "Buzz Aldrin", "Ed white"],
            correctAnswer : "Alexei Leonov"
        },
        {
            question : "Who bacame the 40th president of United States?",
            choices :["Ronald Reagen","Jimmy Carter","Gorge H.W.Bush","Gerald Ford"],
            correctAnswer : "Ronald Reagen"

        },
        {
            question : "What is the name of the dog in Garfield?",
            choices :["Oliver","Odie","John","Jack"],
            correctAnswer : "Odie"
        }
    ];
    function nextQuestion(){
        console.log("nextQuestion");
        clockRunning = false;
        isQuestionOver = false;
        console.log("currentQuestion = " + currentQuestion);
        
        if ((quizQuestions.length-1) === currentQuestion) {
            isQuestionOver = true;
        }
        if (isQuestionOver){
            console.log("isQuestionOver " + isQuestionOver);
         // displayResult();
            timeUp();
        }
        else {
            isQuestionOver = false;
            currentQuestion++;
            loadQuestion();
        }
    }
    function timeUp(){
    console.log("timeUp");
;       clearInterval(timer);
        lost++;
        timer = setInterval(decrement, 1000);
       lost++;
       nextQuestion();
    }
    function decrement(){
       counter--;
       
       $("#time").html("Timer:" + counter);
       if (counter === 0){
           timeUp();
       }
    }

function loadQuestion(){
    console.log("loadQuestion");
    counter = 10;
    clearInterval(timer);
    timer = setInterval(decrement,1000);
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
    $("#time").html("Timer "+ counter);
    $("#game").html("<h4>" + question + "</h4>");
    loadChoices(choices);
    //nextQuestion();
}

function loadChoices(choices){
    console.log("loadChoices");

    var result = '';
    for (var i = 0; i<choices.length; i++){
        var choice = choices[i];
        console.log (choice);
        $("#game").append('<p class="choice" data-answer="' + choice + '">' + choice + '</p>')
        result += ('<p class ="choice" data-answer="' + choice + '">' + choice +'</p>');

    }
    return result;
}

$(document).on('click','.choice',function(){
    console.log("document on click");

    if (!clockRunning) {
        clockRunning = true;
    }
   var selectedAnswer = $(this).attr('data-answer');
   
   const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
   if (correctAnswer === selectedAnswer){
       score++;
       console.log(wins)
   } else{
       lost++;
   }
    loadQuestion();
});
//loadQuestion();

$("#start").click(function(){
    console.log("start click");
    currentQuestion = 0;
    $('#start').remove();
    $("#time").html(counter);
    loadQuestion();

});
$("#submit").click(function(){
    console.log("submit click");

    timeUp();
    gameOver();
    
})
function gameOver(){
    var lastQuestion= question.length;


}

})