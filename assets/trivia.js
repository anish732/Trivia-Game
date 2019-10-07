var win = 0;
var lost = 0;
var timer = 90;
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
$("#start").click(function(){
    console.log("start click");
    // currentQuestion = 0;
    // $('#start').remove();
    // $("#time").html(counter);
    setInterval(function () {
        timer--;
        console.log("timer")
        $("#time").html("Time remaining: " + timer + " seconds");
        if (time == 0) {
            tallyScore();
        }
    }, 1000)
    
    loadQuestion();
});
function loadQuestion() {
    console.log("loadQuestion");
    for (i = 0; i < quizQuestions.length; i++) {
        $("#game").append(quizQuestions[i].question + '<br>');
        let choices = quizQuestions[i].choices;
        //for loop is inside the other for loop
        for (j = 0; j < choices.length; j++) {
            $("#game").append('<input type="radio" class="choice" name="question' + i + '" value="' + choices[j] + '">' + choices[j] + '</input><br>')
        }
        // loadChoices(choices)
    }
}
$("#submit").on("click", function (){
   tallyScore()
})
function tallyScore(){
    for (i = 0; i < quizQuestions.length; i++) {
        answerValue = $('input[name="question' + i + '"]:checked').val();
        console.log(answerValue);
        if (answerValue == quizQuestions[i].correctAnswer) {
            win++
        }
        else {
            lost++
        }
    }
    console.log('wins: ' + win);
    console.log('lost: ' + lost);
    loadScore();
}
function loadScore() {
    var winsString = "<h4>Correct guesses: ";
    var lostString = "<h4>Incorrect guesses: ";
    var giphy = "<img src='";
    // <img src='../assets/images/image.gif'> 
    
    winsString += win;
    winsString += "</h4>";
    lostString += lost;
    lostString += "</h4>";
    if (win / quizQuestions.length >= 0.8) {
        console.log("great job");
        var tempImage = funImages[Math.floor(Math.random() * funImages.length)];
        giphy += tempImage;
        giphy += "'>"
    }
    else {
        console.log("try harder next time");
        var tempImage = sadImages[Math.floor(Math.random() * sadImages.length)];
        giphy += tempImage;
        giphy += "'>"
    }
    $("#game").html(winsString);
    $("#game").append(lostString); 
    $("#game").append(giphy);  
}
Collapse

