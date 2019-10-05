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
    var funImages =[
        "./assets/images/giphy.gif",
        "./assets/images/giphy(1).gif",
        "./assets/images/giphy(2).gif",
        
    ];
    var sadImages =[
        "./assets/images/giphy(3).gif",
        "./assets/images/giphy(4).gif",
        "./assets/images/giphy(5).gif",
   
    ];

    function nextQuestion(){
        console.log("nextQuestion");
        clockRunning = false;
        isQuestionOver = false;
        console.log("currentQuestion = " + currentQuestion);
        
        if ((quizQuestions.length-1) === currentQuestion) {
            isQuestionOver = true;
            console.log("game is over!")
        }
        if (isQuestionOver){
            console.log("isQuestionOver " + isQuestionOver);
          displayResult();
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
    clearInterval(timer);
    if (!clockRunning) {
        clockRunning = true;
    }
   const selectedAnswer = $(this).attr('data-answer');
   console.log("clicked")
   const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
   if (correctAnswer === selectedAnswer){
       score++;
     //  preloadImage('win');
       nextQuestion();
       console.log("wins")
   } else{
       lost++;
      // preloadImage('lost')
       nextQuestion();
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

function displayResult(){
    var result =
 '<p> You get'  +  score  + 'questions right</p>'
 '<p> You missed'  +  lost  + 'questions right</p>'
 '<p> Total questions'  +  quizQuestions.length  + 'questions right</p>'
 '<button btn btn-success>Reset Game</button>';

 $("#game").html(result);
}
$(document).on('click', '.btn',function(){
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null; 
    loadQuestion();
});
function randomImage(images){
    var random = Math.floor(Math.random() *images.length);
    var radomImage  = images[random];
    return randomImage;
}
function preloadImage(){
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status ===win){
    $("#game").html(randomImage(funImages));
    }else{
$("#game").html(randomImage(sadImages));
    }
}

})