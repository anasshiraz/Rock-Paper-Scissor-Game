// taking three variables for counting the score
let userscore = 0;
let compscore = 0;
let drawscore = 0;

let round = 0; // taking variable for deciding final winner
let gameover = false; // taking variable for stoping further cliks after final winner is choosed

// accessig  elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscorep = document.querySelector("#user-score");
const compscorep = document.querySelector("#comp-score");
const resetbtn = document.querySelector("#reset");
const roundcount = document.querySelector("#round");
const drawcount = document.querySelector("#draw");

// reset button (reseting everything)
resetbtn.addEventListener("click", () => {
  round = 0;
  gameover = false;
  userscore = 0;
  compscore = 0;
  drawscore = 0;
  roundcount.innerText = "Round: 0";
  userscorep.innerText = 0;
  compscorep.innerText = 0;
  drawcount.innerText = 0;
  msg.innerText = "Play Your Game!";
  msg.style.backgroundColor = "rgb(4, 4, 39)";
});

// function for generating computer choices
const gencompchoice = () => {
  // creating an array which has the choices
  let options = ["Rock", "Paper", "Scissor"];
  // method for generating an index no. from 0-2 so that a choice is made by the computer
  const ranidx = Math.floor(Math.random(options) * 3);
  // returnig the index to the array
  return options[ranidx];
};

// function for a draw game
const drawgame = () => {
  drawscore++;
  drawcount.innerText = drawscore;
  msg.innerText = "It's a Draw! Play Again.";
  msg.style.backgroundColor = "rgb(4, 4, 39)";
};

// function for displaying winner
const showwinner = (userwin, userchoice, compchoice) => {
  if (userwin) {
    userscore++; // incrementing user score
    userscorep.innerText = userscore;
    msg.innerText = `You Win! Your ${userchoice} Beats ${compchoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compscore++; // incrementing computer score
    compscorep.innerText = compscore;
    msg.innerText = `You Lost! ${compchoice} Beats Your ${userchoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playgame = (userchoice) => {
  // generate computer choice
  const compchoice = gencompchoice(); // calling choic made by computer

  if (userchoice === compchoice) {
    // draw game if both user and computer choices are same
    drawgame();
  } else {
    let userwin = true;
    if (userchoice === "Rock") {
      // computer can generate paper, scissors
      userwin = compchoice === "Paper" ? false : true;
    } else if (userchoice === "Paper") {
      // computer can generate rock, scissors
      userwin = compchoice === "Scissor" ? false : true;
    } else {
      // computer can generate rock, paper
      userwin = compchoice === "Rock" ? false : true;
    }
    showwinner(userwin, userchoice, compchoice); // calling function that displays winner
  }
  round++; // counting rounds
  roundcount.innerText = `Round: ${round}`;
  if (round === 5) {
    gameover = true;
    if (userscore > compscore) {
      msg.innerText = `You are the Final Winner!(to start a new game tap on 'Reset Game')`;
      msg.style.backgroundColor = "#00B894";
    } else if (compscore > userscore) {
      msg.innerText = `Computer is the Final Winner!(to start a new game tap on 'Reset Game')`;
      msg.style.backgroundColor = "#D63031";
    } else {
      msg.innerText =
        "It's a Final Draw!(to start a new game tap on 'Reset Game')";
      msg.style.backgroundColor = "#6C5CE7";
    }
  }
};

// adding click functoin on each choice and putting it in a foreach loop method so that game never ends
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (gameover) return;
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
  });
});
