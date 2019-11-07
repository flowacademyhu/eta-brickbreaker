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
  wincheck.winCheck();
  gameover.overCheck();
};

module.exports = {
  main: main,
  addListener: addListener
};
