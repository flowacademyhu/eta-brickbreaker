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
  })
}
const main = (matrix) => {
  
 boards.ballObj.posX += boards.ballObj.dirX;
  boards.ballObj.posY += boards.ballObj.dirY;

  // wall + club handling
  ball.ballToWall(matrix);
  ball.ballToClub(matrix);

  const nextx = boards.ballObj.posX + boards.ballObj.dirX;
  const nexty = boards.ballObj.posY + boards.ballObj.dirY;

  // brick
  if (matrix[nextx][nexty].type === 'brick') {
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    matrix[nextx][nexty] = boards.nullObj;
  }

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
