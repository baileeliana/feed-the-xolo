//-----------------BASIC GAME STRUCTURE------------------//
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timerDisplay');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//------------BASIC GAME FUNCTIONALITY: RANDOMNESS--------//

//1.create random integers for length of mole airtime
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//2. setting the delay based on user's preferred difficulty
function setDelay(difficulty) {
  if(difficulty === hard) {
    randomInteger(600, 1200);
  if (difficulty === normal) {
    return 1000;
  } if (difficulty === easy) {
    return 1500;
  } 
}}

//3. selecting a random hole
function chooseHole(holes) {
  const index = randomInteger(0, 2);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

//------------------------GAME FLOW---------------------//
//4. determine if game should continue/stop
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId
  }
  else {
    gameStopped = stopGame();
  }
  return gameStopped;
}

//3. call showAndHide function
function showUp() {
  let delay = setDelay();
  const hole = chooseHole();
  return showAndHide(hole, delay);
}

//2. show/hide mole given delay time/hole where mole is at
function showAndHide(hole, delay) {
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

//1. adds/removes 'show' class from style.css & return hole
function toggleVisibility(hole) {
  hole.classList.toggle('show'); 
  return hole;
}

showUp();

//--------------------------WHACK!-----------------------//
//--------------------------TIMER------------------------//

//WHACK: 1. increment global points variable/update scoreboard
function updateScore() {
  points ++;
  score.textContent = points;
  return points;
}

//WHACK: 2. resets scoreboard to 0 so player can play again
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

//TIMER: 2. updates the control board with the timer if time > 0
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}
 
//TIMER: 1. starts timer
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}


//WHACK: 3. event handler that calls updateScore() to increment score if mole was clicked by player
function whack(event) {
  mole.addEventListener('click', whack);
  updateScore();
  return points;
}

//WHACK: 4. event handler gets called when player clicks a mole
function setEventListeners() {
  moles.forEach(mole =>
    mole.addEventListener('click', whack));
  return moles;
}

setEventListeners();

//TIMER: 3. sets time limit in seconds of game
function setDuration(duration) {
  time = duration;
  return time;
}

//TIMER: 4. when game is stopped the timer gets cleared
function stopGame(){
  stopAudio(song); 
  clearInterval(timer);
  return "game stopped";
}

//----------------------START GAME-----------------------//
function startGame(){
  clearScore();
  stopGame();  
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  whack();
  updateTimer();
  updateScore();
  toggleVisibility();
  showAndHide();
  gameOver();
  chooseHole();
  randomInteger();
  setDelay();
  return "game started";
}

startButton.addEventListener("click", startGame);


//Please do not modify the code below.
//Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;