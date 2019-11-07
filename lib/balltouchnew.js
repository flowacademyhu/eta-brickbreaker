const table = require('table');
const boards = require('./boards');
const club = require('./clubmove');
const ball = require('./ballmove');
const colors = require('colors');
const visualm = require('./visuallayer');
const wincheck = require('./wincheck');
const gameover = require('./gameover');

const config = {
  border: {
    topBody: '─',
    topJoin: '',
    topLeft: '┌',
    topRight: '┐',

    bottomBody: '─',
    bottomJoin: '',
    bottomLeft: '└',
    bottomRight: '┘',

    bodyLeft: '│',
    bodyRight: '│',
    bodyJoin: '',

    joinBody: '',
    joinLeft: '',
    joinRight: '',
    joinJoin: ''
  }
};

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

  let nextx = boards.ballObj.posX + boards.ballObj.dirX;
  let nexty = boards.ballObj.posY + boards.ballObj.dirY;
  if (nextx < 0) { nextx = 0; }
  if (nexty < 0) { nexty = 0; }
  if (nextx > matrix.length - 1) { nextx = matrix.length - 1; }
  if (nexty > matrix[0].length - 1) { nexty = matrix[0].length - 1; }
  // brick
  if (matrix[nextx][nexty].type === 'brick') {
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    matrix[nextx][nexty] = boards.nullObj;
  }

  if (nextx < 0) { nextx = 0; }
  if (nexty < 0) { nexty = 0; }
  if (nextx > matrix.length - 1) { nextx = matrix.length - 1; }
  if (nexty > matrix[0].length - 1) { nexty = matrix[0].length - 1; }

  matrix[boards.ballObj.posX][boards.ballObj.posY] = boards.nullObj;
  matrix[boards.ballObj.posX + boards.ballObj.dirX][boards.ballObj.posY + boards.ballObj.dirY] = boards.ballObj;
  visualm.visual(matrix);
  wincheck.bricknumCheck(matrix);
  wincheck.winCheck();
  gameover.overCheck();
};

// const game = () => {
//  setInterval(main, 150, board);
// };

module.exports = {
  main: main,
  addListener: addListener
};
// game();
