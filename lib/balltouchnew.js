const table = require('table');
const boards = require('./boards');
const club = require('./clubmove');
const ball = require('./ballmove');
const colors = require('colors');
const visualm = require('./visuallayer');

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
;

const main = (matrix) => {
  boards.ballObj.posX += boards.ballObj.dirX;
  boards.ballObj.posY += boards.ballObj.dirY;

  // wall
  if (boards.ballObj.posX >= matrix.length - 1) {
    boards.ballObj.posX = matrix.length - 1;
    boards.ballObj.dirX *= -1;
  }
  if (boards.ballObj.posY >= matrix[0].length - 1) {
    boards.ballObj.posY = matrix[0].length - 1;
    boards.ballObj.dirY *= -1;
  }
  if (boards.ballObj.posX <= 0) {
    boards.ballObj.posX = 0;
    boards.ballObj.dirX *= -1;
  }
  if (boards.ballObj.posY <= 0) {
    boards.ballObj.posY = 0;
    boards.ballObj.dirY *= -1;
  }

  // club
  const nextx = boards.ballObj.posX + boards.ballObj.dirX;
  const nexty = boards.ballObj.posY + boards.ballObj.dirY;
  if (matrix[nextx][nexty] === boards.clubLeft1Obj) {
    boards.ballObj.dirX = boards.clubLeft1Obj.dirXmod;
    boards.ballObj.dirY = boards.clubLeft1Obj.dirYmod;
  }
  if (matrix[nextx][nexty] === boards.clubLeft2Obj) {
    boards.ballObj.dirX = boards.clubLeft2Obj.dirXmod;
    boards.ballObj.dirY = boards.clubLeft2Obj.dirYmod;
  }
  if (matrix[nextx][nexty] === boards.clubCenterObj) {
    boards.ballObj.dirX = boards.clubCenterObj.dirXmod;
    boards.ballObj.dirY = boards.clubCenterObj.dirYmod;
  }
  if (matrix[nextx][nexty] === boards.clubRight2Obj) {
    boards.ballObj.dirX = boards.clubRight2Obj.dirXmod;
    boards.ballObj.dirY = boards.clubRight2Obj.dirYmod;
  }
  if (matrix[nextx][nexty] === boards.clubRight1Obj) {
    boards.ballObj.dirX = boards.clubRight1Obj.dirXmod;
    boards.ballObj.dirY = boards.clubRight1Obj.dirYmod;
  }
  // brick
  if (matrix[nextx][nexty].type === 'brick') {
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    matrix[nextx][nexty] = boards.nullObj;
  }

  matrix[boards.ballObj.posX][boards.ballObj.posY] = boards.nullObj;
  matrix[boards.ballObj.posX + boards.ballObj.dirX][boards.ballObj.posY + boards.ballObj.dirY] = boards.ballObj;
  visualm.visual(matrix);
};

const game = () => {
  setInterval(main, 200, board);
};
module.exports = {
  game: game
};
game();
