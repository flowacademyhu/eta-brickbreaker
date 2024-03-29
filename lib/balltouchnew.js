const boards = require('./boards');
const club = require('./clubmove');
const ball = require('./ballmove');
const visualm = require('./visuallayer');
const wincheck = require('./wincheck');
const gameover = require('./gameover');

const board = boards.gameboard;

const addListener = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', (key) => {
    if (key === 'q') {
      process.exit();
    }
    if (key === 'a') {
      club.clubLeft(board);
    }
    if (key === 'd') {
      club.clubRight(board);
    }
  });
};
const main = (matrix) => {
  boards.ballObj.posX += boards.ballObj.dirX;
  boards.ballObj.posY += boards.ballObj.dirY;

  // wall + club handling
  ball.ballToWall(matrix);
  ball.ballToClub(matrix);
  ball.ballToBrick(matrix);

  matrix[boards.ballObj.posX][boards.ballObj.posY] = boards.nullObj;
  matrix[boards.ballObj.posX + boards.ballObj.dirX][boards.ballObj.posY + boards.ballObj.dirY] = boards.ballObj;
  visualm.visual(matrix);
  wincheck.bricknumCheck(matrix);
  if (wincheck.winCheck()) {
    const CFonts = require('cfonts');
    CFonts.say('Next level coming soon!', {
      font: 'block',
      align: 'left',
      colors: ['red'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0'
    });
    const newboard = boards.gameboard;
    clearInterval(global.goGame);
    boards.playerObj.bricknum = 60;
    global.goGame = setInterval(main, 150, newboard);
    return;
  }
  gameover.overCheck();
};

module.exports = {
  main: main,
  addListener: addListener
};
