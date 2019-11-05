const table = require('table');
const boards = require('./board');
const ctx = require('axel');
const clone = require('clone');

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

const board = [
  ['B', 'L', 'B', 'B', 'B', 'B', 'B', 'EBa', 'B', 'B', 'B', 'B', 'L', 'B', 'B'],
  ['B', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', 'B'],
  ['B', 'EBr', 'B', 'B', ' ', ' ', 'B', 'L', 'B', ' ', ' ', 'B', 'EBr', 'B', 'B'],
  ['B', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', 'B'],
  ['B', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', ' ', ' ', 'B', 'B', 'B', 'B'],
  [' ', ' ', ' ', ' ', ' ', ' ', 'B', 'B', 'B', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'Cl1', 'Cl2', 'Cc', 'Cr2', 'Cr1', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
];
const ballObj = {
  type: 'ball',
  posX: 0,
  posY: 0,
  dirX: 1,
  dirY: 1
};

const brickObj = {
  type: 'brick',
  posX: 1,
  posY: 1,
  score: 1
};

const extraBrickObj = {
  type: 'extrabrick',
  posX: 1,
  posY: 1,
  score: 3
};

const extraBallObj = {
  type: 'extraball',
  posX: 0,
  posY: 0,
  dirX: 1,
  dirY: 1
};
const clubLeft1Obj = {
  type: 'left1club',
  posX: 0,
  posY: 1,
  dirXmod: -1,
  dirYmod: -2

};

const clubLeft2Obj = {
  type: 'left2club',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: -1

};

const clubCenterObj = {
  type: 'centerclub',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: 0
};

const clubRight2Obj = {
  type: 'righ2club',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: 1
};

const clubRight1Obj = {
  type: 'right1club',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: 2
};

const lifeBrick = {
  type: 'lifebrick',
  posX: 0,
  posY: 0
};

const nullObj = {
  type: 'null',
  posX: 0,
  posY: 0
};

const minX = 0;
const maxX = board.length - 1;
const minY = 0;
const maxY = board[0].length - 1;

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'a') {
    clubLeft1Obj.posY--;
    if (clubLeft1Obj.posY < 0) {
      clubLeft1Obj.posY = 0;
    } else {
      board[clubLeft1Obj.posX][clubLeft1Obj.posY] = clubLeft1Obj;
      board[clubLeft1Obj.posX][clubLeft1Obj.posY + 1] = clubLeft2Obj;
      board[clubLeft1Obj.posX][clubLeft1Obj.posY + 2] = clubCenterObj;
      board[clubLeft1Obj.posX][clubLeft1Obj.posY + 3] = clubRight2Obj;
      board[clubLeft1Obj.posX][clubLeft1Obj.posY + 4] = clubRight1Obj;
      board[clubLeft1Obj.posX][clubLeft1Obj.posY + 5] = null;
      clubLeft2Obj.posY--;
      clubCenterObj.posY--;
      clubRight2Obj.posY--;
      clubRight1Obj.posY--;
    }
  }
  if (key === 'd') {
    clubRight1Obj.posY++;
    if (clubRight1Obj.posY > maxY) {
      clubRight1Obj.posY = maxY;
    } else {
      board[clubRight1Obj.posX][clubRight1Obj.posY - 4] = clubLeft1Obj;
      board[clubRight1Obj.posX][clubRight1Obj.posY - 3] = clubLeft2Obj;
      board[clubRight1Obj.posX][clubRight1Obj.posY - 2] = clubCenterObj;
      board[clubRight1Obj.posX][clubRight1Obj.posY - 1] = clubRight2Obj;
      board[clubRight1Obj.posX][clubRight1Obj.posY] = clubRight1Obj;
      board[clubRight1Obj.posX][clubRight1Obj.posY - 5] = null;
      clubLeft2Obj.posY++;
      clubCenterObj.posY++;
      clubRight2Obj.posY++;
      clubLeft1Obj.posY++;
    }
  }
})
;

let nextball = {};
const move = (matrix) => {
  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      if (matrix[i][j].type === 'ball') {
        console.log('Akt x:', ballObj.posX, 'y:', ballObj.posY);
        matrix[i][j] = 'O';
        matrix[i - ballObj.dirX][j - ballObj.dirY] = ' ';
        if (ballObj.posX >= maxX) {
          ballObj.posX = maxX;
          ballObj.dirX *= -1;
        }
        if (ballObj.posY >= maxY) {
          ballObj.posY = maxY;
          ballObj.dirY *= -1;
        }
        if (ballObj.posX <= 0) {
          ballObj.posX = 0;
          ballObj.dirX *= -1;
        }
        if (ballObj.posY <= 0) {
          ballObj.posY = 0;
          ballObj.dirY *= -1;
        }
      }
      const nextx = ballObj.posX + ballObj.dirX;
      const nexty = ballObj.posY + ballObj.dirY;
      console.log('Next x:', nextx, 'next y:', nexty);
      console.log('Lef1 x:', clubLeft1Obj.posX, 'y:', clubLeft1Obj.posY);

      if (matrix[nextx][nexty] === clubLeft1Obj) {
        console.log('Left 1');
        ballObj.dirX = clubLeft1Obj.dirXmod;
        ballObj.dirY = clubLeft1Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === clubLeft2Obj) {
        console.log('Left 2');
        ballObj.dirX = clubLeft2Obj.dirXmod;
        ballObj.dirY = clubLeft2Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === clubCenterObj) {
        console.log('Center');
        ballObj.dirX = clubCenterObj.dirXmod;
        ballObj.dirY = clubCenterObj.dirYmod;
      }
      if (matrix[nextx][nexty] === clubRight2Obj) {
        console.log('Right2');
        ballObj.dirX = clubRight2Obj.dirXmod;
        ballObj.dirY = clubRight2Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === clubRight1Obj) {
        console.log('Right 1');
        ballObj.dirX = clubRight1Obj.dirXmod;
        ballObj.dirY = clubRight1Obj.dirYmod;
      }
      ballObj.posX += ballObj.dirX;
      ballObj.posY += ballObj.dirY;
      nextball = ballObj;

      if (matrix[i][j].type === 'null') {
        matrix[i][j] = ' ';
      }

      if (matrix[i][j].type === 'brick') {
        matrix[i][j] = 'B';
      }
      if (matrix[i][j].type === 'extrabrick') {
        matrix[i][j] = 'EBr';
      }
      if (matrix[i][j].type === 'extraball') {
        matrix[i][j] = 'EBa';
      }
      if (matrix[i][j] === clubLeft1Obj) {
        matrix[i][j] = 'Cl1';
      }
      if (matrix[i][j] === clubLeft2Obj) {
        matrix[i][j] = 'Cl2';
      }
      if (matrix[i][j] === clubCenterObj) {
        matrix[i][j] = 'Cc';
      }
      if (matrix[i][j] === clubRight2Obj) {
        matrix[i][j] = 'Cr2';
      }
      if (matrix[i][j] === clubRight1Obj) {
        matrix[i][j] = 'Cr1';
      }
      if (matrix[i][j].type === 'lifebrick') {
        matrix[i][j] = 'L';
      }
    }
  }
  console.log(table.table(matrix));
  matrix[nextball.posX][nextball.posY] = ballObj;
};
// console.log(matrixToObj(board));
// console.clear();

// ballObj = nextball;

const matrixToObj = (matrix) => {
  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      if (matrix[i][j] === ' ') {
        matrix[i][j] = nullObj;
      }
      if (matrix[i][j] === 'O') {
        ballObj.posX = i;
        ballObj.posY = j;
        matrix[i][j] = ballObj;
      }
      if (matrix[i][j] === 'B') {
        brickObj.posX = i;
        brickObj.posY = j;
        matrix[i][j] = clone(brickObj);
      }
      if (matrix[i][j] === 'EBr') {
        extraBrickObj.posX = i;
        extraBrickObj.posY = j;
        matrix[i][j] = clone(extraBrickObj);
      }
      if (matrix[i][j] === 'EBa') {
        extraBallObj.posX = i;
        extraBallObj.posY = j;
        matrix[i][j] = clone(extraBallObj);
      }
      if (matrix[i][j] === 'L') {
        lifeBrick.posX = i;
        lifeBrick.posY = j;
        matrix[i][j] = clone(lifeBrick);
      }
      if (matrix[i][j] === 'Cl1') {
        clubLeft1Obj.posX = i;
        clubLeft1Obj.posY = j;
        matrix[i][j] = clubLeft1Obj;
      }
      if (matrix[i][j] === 'Cl2') {
        clubLeft2Obj.posX = i;
        clubLeft2Obj.posY = j;
        matrix[i][j] = clubLeft2Obj;
      }
      if (matrix[i][j] === 'Cc') {
        clubCenterObj.posX = i;
        clubCenterObj.posY = j;
        matrix[i][j] = clubCenterObj;
      }
      if (matrix[i][j] === 'Cr2') {
        clubRight2Obj.posX = i;
        clubRight2Obj.posY = j;
        matrix[i][j] = clubRight2Obj;
      }
      if (matrix[i][j] === 'Cr1') {
        clubRight1Obj.posX = i;
        clubRight1Obj.posY = j;
        matrix[i][j] = clubRight1Obj;
      }
    }
  }
  return matrix;
};

const game = () => {
  setInterval(move, 500, matrixToObj(board));
};
module.exports = {
  game: game
};
game();
// console.log(matrixToObj(board));
