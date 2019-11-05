const table = require('table');
const boards = require('./board');
const ctx = require('axel');

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
  [' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
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

const minX = 0;
const maxX = board.length - 1;
const minY = 0;
const maxY = board[0].length - 1;
console.log('MaxX:', maxX, 'MaxY:', maxY);
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'a') {
    clubdata.clubX--;
    if (clubdata.clubX < 1) {
      clubdata.clubX = minX + 1;
    }

    palya[clubdata.clubY][clubdata.clubX - 1] = 'C';
    if (clubdata.clubX !== minX) {
      palya[clubdata.clubY][clubdata.clubX + 2] = ' ';
    }
  }
  if (key === 'd') {
    clubdata.clubX++;
    if (clubdata.clubX > maxY - 1) {
      clubdata.clubX = maxY - 1;
    }
    palya[clubdata.clubY][clubdata.clubX + 1] = 'C';
    if (clubdata.clubX !== maxX + 1) {
      palya[clubdata.clubY][clubdata.clubX - 2] = ' ';
    }
  }
})
;

const matrixToObj = (matrix) => {
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (matrix[i][j] === 'O') {
        ballObj.posX = i;
        ballObj.posY = j;
        matrix[i][j] = ballObj;
      }
      if (matrix[i][j] === 'B') {
        brickObj.posX = j;
        brickObj.posY = i;
        matrix[i][j] = brickObj;
      }
      if (matrix[i][j] === 'EBr') {
        extraBrickObj.posX = j;
        extraBrickObj.posY = i;
        matrix[i][j] = extraBrickObj;
      }
      if (matrix[i][j] === 'EBa') {
        extraBallObj.posX = j;
        extraBallObj.posY = i;
        matrix[i][j] = extraBallObj;
      }
      if (matrix[i][j] === 'L') {
        lifeBrick.posX = j;
        lifeBrick.posY = j;
        matrix[i][j] = lifeBrick;
      }
      if (matrix[i][j] === 'Cl1') {
        clubLeft1Obj.posX = j;
        clubLeft1Obj.posY = i;
        matrix[i][j] = clubLeft1Obj;
      }
      if (matrix[i][j] === 'Cl2') {
        clubLeft2Obj.posX = j;
        clubLeft2Obj.posY = i;
        matrix[i][j] = clubLeft2Obj;
      }
      if (matrix[i][j] === 'Cc') {
        clubCenterObj.posX = j;
        clubCenterObj.posY = i;
        matrix[i][j] = clubCenterObj;
      }
      if (matrix[i][j] === 'Cr2') {
        clubRight2Obj.posX = j;
        clubRight2Obj.posY = i;
        matrix[i][j] = clubRight2Obj;
      }
      if (matrix[i][j] === 'Cr1') {
        clubRight1Obj.posX = j;
        clubRight1Obj.posY = i;
        matrix[i][j] = clubRight1Obj;
      }
    }
  }
  return matrix;
};
let nextball = {};
const move = (matrix) => {
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (matrix[i][j] === ballObj) {
        matrix[i][j] = 'O';
        if (j === 0 || j === maxY) {
          ballObj.dirY *= -1;
        }
        if (i === 0 || i === maxX) {
          ballObj.dirX *= -1;
        }
        ballObj.posX += ballObj.dirX;
        ballObj.posY += ballObj.dirY;

        nextball = ballObj;
      }
      if (matrix[i][j] === brickObj) {
        matrix[i][j] = 'B';
      }
      if (matrix[i][j] === extraBrickObj) {
        matrix[i][j] = 'EBr';
      }
      if (matrix[i][j] === extraBallObj) {
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
      if (matrix[i][j] === lifeBrick) {
        matrix[i][j] = 'L';
      }
    }
  }

  // console.log(matrixToObj(board));
  console.log(table.table(matrix));
  matrix[ballObj.posX][ballObj.posY] = ballObj;
  // ballObj = nextball;
  console.log(ballObj);
};

const game = () => {
  setInterval(move, 500, matrixToObj(board));
};
module.exports = {
  ballMove: game
};
// console.log(matrixToObj(board));
game();

/* move(matrixToObj(board)); */
