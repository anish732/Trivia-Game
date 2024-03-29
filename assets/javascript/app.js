$(document).ready(function() {
  // $("#new").hide();
  // var counter = 10;
  // var currentQuestion =0;
  // var score = 0;
  // var lost = 0;
  // var timer;
  // var clockRunning = false
  // var isQuestionOver = false;

  var quizQuestions = [
    {
      question: "Which is the highest mountain in Europe?",
      choices: ["Mount Ararat", "Mont Blanc", "Monte Bianco", "Mount Elbrus"],
      correctAnswer: "Mount Elbrus"
    },
    {
      question:
        "Which ancient Roman city was buried under volcanic ash following the eruption of Mount Vesuvius in AD 79?",
      choices: ["Tarroco", "Salernum", "Herculoneum", "Pompeii"],
      correctAnswer: "Pompeii"
    },
    {
      question: "Who was the first man to  walk on space? ",
      choices: ["Neil Armstrong", "Alexei Leonov", "Buzz Aldrin", "Ed white"],
      correctAnswer: "Alexei Leonov"
    },
    {
      question: "Who bacame the 40th president of United States?",
      choices: [
        "Ronald Reagen",
        "Jimmy Carter",
        "Gorge H.W.Bush",
        "Gerald Ford"
      ],
      correctAnswer: "Ronald Reagen"
    },
    {
      question: "What is the name of the dog in Garfield?",
      choices: ["Oliver", "Odie", "John", "Jack"],
      correctAnswer: "Odie"
    }
  ];
  var funImages = [
    "./assets/images/happy.gif",
    "./assets/images/award.gif",
    "./assets/images/fireworks.gif"
  ];
  var sadImages = [
    "./assets/images/nogood.gif",
    "./assets/images/wrong.gif",
    "./assets/images/sorry.gif"
  ];

  let counter = 20;
  let currentQuestion = 0;
  let score = 0;
  let lost = 0;
  let timer;
  let miss = 0;

  // If the timer is over, then go to the next question
  function nextQuestion() {
    const isQuestionOver = quizQuestions.length - 1 === currentQuestion;
    if (isQuestionOver) {
      // TODO
      console.log("Game is over!!!!!");
      displayResult();
    } else {
      currentQuestion++;
      loadQuestion();
    }
  }

  // Start a 30 seconds timer for user to respond or choose an answer to each question
  function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage("lost");
    setTimeout(nextQuestion, 3 * 1000);
  }

  function countDown() {
    counter--;

    $("#time").html("Timer: " + counter);

    if (counter === 0) {
      timeUp();
    }
  }

  // Display the question and the choices to the browser
  function loadQuestion() {
    counter = 20;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    $("#time").html("Timer: " + counter);
    $("#game").html(`
            <h4>${question}</h4>
            ${loadChoices(choices)}
            ${loadRemainingQuestion()}
        `);
  }

  function loadChoices(choices) {
    let result = "";

    for (let i = 0; i < choices.length; i++) {
      result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
  }

  // Either correct/wrong choice selected, go to the next question
  // Event Delegation
  $(document).on("click", ".choice", function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    const isAnswer = false;

    if (selectedAnswer === correctAnswer) {
      score++;
      console.log("Winsss!!!!");
      preloadImage("win");
      setTimeout(nextQuestion, 3 * 1000);
    } else {
      lost++;
      preloadImage("lost");
      setTimeout(nextQuestion, 3 * 1000);
    }
  });

  function displayResult() {
    const result = `
            <p>You get ${score} questions right out of ${quizQuestions.length}</p>
            <p>You get ${lost} incorrect answer.</p>
            <button class="btn btn-primary" id="reset">Reset Game</button>
        `;

    $("#game").html(result);
  }

  $(document).on("click", "#reset", function() {
    counter = 20;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
  });

  function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
  }

  function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
  }

  // Display a funny giphy for correct and wrong answers
  function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
      $("#game").html(`
                <p class="preload-image">Congratulations, you pick the corrrect answer</p>
                <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
                <img src="${randomImage(funImages)}" />
            `);
    } else {
      $("#game").html(`
      <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
      <p class="preload-image">You lost pretty bad</p>
      <img src="${randomImage(sadImages)}" />
      `);
    }
  }

  $("#start").click(function() {
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
  });
});
