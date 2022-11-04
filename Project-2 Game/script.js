
//  elements
const displayStatus = document.getElementById("displayStatus");
const displayLevel = document.getElementById("displayLevel");
const btnSoundOnOff = document.getElementById("soundOn");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");
const color5 = document.getElementById("color5");
const btnCheck = document.getElementById("btnCheck");
const btnNewGame = document.getElementById("btnNewGame");
const btnStart = document.getElementById("btnStart");
const timeCount = document.getElementById("timeCount");
const colors = ["blue","red","green","midnightblue","orange","gray"];
const btnEasy = document.getElementById("btnEasy");
const btnNormal = document.getElementById("btnNormal");
const btnHard = document.getElementById("btnHard");

// intro
var intro;
const audio = new Audio();
audio.src = "audio/game_intro.mp3";
audio.play();
audio.loop = true;
intro = setInterval(function() {
    color1.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color2.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color3.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color4.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color5.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
}, 250);
// stop intro
const stopIntro = function(){
  clearInterval(intro);
    color2.style.backgroundColor = "white";
    color3.style.backgroundColor = "white";
    color4.style.backgroundColor = "white";
    color5.style.backgroundColor = "white";
}

// start game, timer
btnCheck.disabled = true;
btnNewGame.disabled = true;
btnStart.disabled = true;
let x;
const startGame = function(){
  soundButton();
  btnNormal.disabled = true;
  btnHard.disabled = true;
  btnEasy.disabled = true;
  const randomColor = colors[Math.floor(Math.random() * 6)];
  color1.style.backgroundColor = randomColor;
  color1.style.border = "white double 5px";
  btnStart.disabled = true;
  btnCheck.disabled = false;
  btnNewGame.disabled = false;
  const clock = setInterval(updateCountdown,1000);
  let time = x;
function updateCountdown(){
  let seconds = time % (1000 * 60);
  timeCount.textContent =  +seconds+"s";
  time--;
  if(seconds == 0){
    gameOver();
    clearInterval(clock);
    timeCount.textContent = " You ran out of time!";
  } else if (result == true){
    timeCount.textContent = " Colors Matched!";
    clearInterval(clock);
  }
}
  colorGenerator();
  stopIntro();
}

//  game over
const gameOver = function(){
  const audio = new Audio();
  audio.src = "audio/game_over.mp3";
  audio.play();
  displayStatus.textContent = "Game Over";
  btnCheck.disabled = true;
  setInterval(function() {
    color2.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color3.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color4.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    color5.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
}, 250);
// game winner
}
const gameWinner = function(){
const audio = new Audio();
audio.src = "audio/sfa3_you_win.mp3";
audio.play();
  const phrases = ["You're a Winner!","Perfect!","Like a Pro!","Savage!","Amazing!"]
    displayStatus.textContent = phrases[Math.floor(Math.random()*5)];
    btnCheck.disabled = true;
    setInterval(function() {
      color1.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
      color2.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
      color3.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
      color4.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
      color5.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
  }, 500);   
}

//  color generator
const colorGenerator = function(){
const audio = new Audio();
audio.src = "audio/pop.mp3";
color2.addEventListener('click', function onClick() {
  color2.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
  audio.play();
});
color3.addEventListener('click', function onClick() {
    color3.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    audio.play();
  });
  color4.addEventListener('click', function onClick() {
    color4.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    audio.play();
  });
  color5.addEventListener('click', function onClick() {
    color5.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    audio.play();
  });
}

// check color , result
let result = Boolean;
let checkColor = function(){
  soundButton();
  result = (color1.style.backgroundColor === color2.style.backgroundColor && color1.style.backgroundColor === color3.style.backgroundColor && color1.style.backgroundColor === color4.style.backgroundColor && color1.style.backgroundColor === color5.style.backgroundColor );
  if(result === true){
    gameWinner();
  } else {
    const audio = new Audio();
    audio.src = "audio/warn.mp3";
    audio.play();
    const phrases = ["You can do it!","Try again","Look again","Nice try","mmm ... "]
    displayStatus.textContent = phrases[Math.floor(Math.random()*5)];
  }
}

// new game
let newGame = function(){
  location.reload();
}

// buttons
  btnCheck.addEventListener("click",checkColor);
  btnNewGame.addEventListener("click",newGame);
  btnStart.addEventListener("click",startGame);
  btnEasy.addEventListener("click",
  function(){
    soundButton();
    x=30;
    btnNormal.disabled = true;
    btnHard.disabled = true;
    btnStart.disabled = false;
    btnNewGame.disabled = false;
    displayLevel.textContent = "Easy Round";
  });
  btnNormal.addEventListener("click",
  function(){
    soundButton();
    x=20;
    btnEasy.disabled = true;
    btnHard.disabled = true;
    btnStart.disabled = false;
    btnNewGame.disabled = false;
    displayLevel.textContent = "Normal Round";
  });
  btnHard.addEventListener("click",
  function(){
    soundButton();
    x=15;
    btnNormal.disabled = true;
    btnEasy.disabled = true;
    btnStart.disabled = false;
    btnNewGame.disabled = false;
    displayLevel.textContent = "Hard Round";
  });

// sound on/off
function soundButton() {
  const audio = new Audio();
  audio.src = "audio/click_s7.mp3";
  audio.play();
}
var soundStatus = true;
btnSoundOnOff.addEventListener("click",function(){
soundStatus ? btnSoundOnOff.setAttribute("src","img/Picture2.png") : btnSoundOnOff.setAttribute("src","img/Picture1.png");
if(soundStatus == true){

  btnSoundOnOff.setAttribute("src","img/Picture2.png")
  audio.pause();
  soundStatus = false;
  }else if(soundStatus == false){
    btnSoundOnOff.setAttribute("src","img/Picture1.png")
    audio.play();
    soundStatus = true;
  }
})
