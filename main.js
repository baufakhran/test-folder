window.addEventListener('load', init);

let time = 4;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
var modeButton = document.querySelectorAll(".mode");

const data ={
  Easy    : ["selection","activitiy","expert","code","dancing",
               "zannuno", "spartan","opportunity","fraction","crown",
               "exodus","chocolatos","tupperware", "shinhan", "wework"],
  Medium  : ["grow up", "hello yummy", "best buddy","clever you", "back drop", 
               "heavy metals","free coin", "big room","heart rate", "attack rinso",
               "exit door", "danger drugs", "think big", "crispy chicken", "hot daddy"],
  Hard    : ["hactiv8 the best","its a wrap", "go get dinner", "love your self", "xie jing ping",
                   "dream come true","no more mercy","be the champion", "mizu shima shiba","adam jaya levin",
                   "ping pong group", "when you smile", "believe in you", "push the door", "i am alone"]
            }

let words = data.Medium;

//select level
function setupModeButton(){
	for (var i = 0; i < modeButton.length; i++) {
	  	modeButton[i].addEventListener("click", function(){
			modeButton[0].classList.remove("selected");
      modeButton[1].classList.remove("selected");
      modeButton[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "EASY"){
        words = data.Easy;
      } else if (this.textContent === "MEDIUM"){
        words = data.Medium;
      } else {
        words = data.Hard;
      }
      showWord(words);
    });
  }
}

// Initialize Game
function init() {
  setupModeButton()
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown,1000);
  setInterval(checkStatus, 50);
  // res();
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = 4;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}