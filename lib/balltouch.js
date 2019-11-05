const table = require('table');
const boards = require('./boards');
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

const board = boards.gameboard;

const maxX = board.length - 1;
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
    boards.clubLeft1Obj.posY--;
    if (boards.clubLeft1Obj.posY < 0) {
      boards.clubLeft1Obj.posY = 0;
    } else {
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY] = boards.clubLeft1Obj;
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY + 1] = boards.clubLeft2Obj;
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY + 2] = boards.clubCenterObj;
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY + 3] = boards.clubRight2Obj;
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY + 4] = boards.clubRight1Obj;
      board[boards.clubLeft1Obj.posX][boards.clubLeft1Obj.posY + 5] = null;
      boards.clubLeft2Obj.posY--;
      boards.clubCenterObj.posY--;
      boards.clubRight2Obj.posY--;
      boards.clubRight1Obj.posY--;
    }
  }
  if (key === 'd') {
    boards.clubRight1Obj.posY++;
    if (boards.clubRight1Obj.posY > maxY) {
      boards.clubRight1Obj.posY = maxY;
    } else {
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY - 4] = boards.clubLeft1Obj;
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY - 3] = boards.clubLeft2Obj;
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY - 2] = boards.clubCenterObj;
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY - 1] = boards.clubRight2Obj;
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY] = boards.clubRight1Obj;
      board[boards.clubRight1Obj.posX][boards.clubRight1Obj.posY - 5] = null;
      boards.clubLeft2Obj.posY++;
      boards.clubCenterObj.posY++;
      boards.clubRight2Obj.posY++;
      boards.clubLeft1Obj.posY++;
    }
  }
})
;

let nextball = {};
const move = (matrix) => {
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      if (matrix[i][j].type === 'ball') {
        console.log('Akt x:', boards.ballObj.posX, 'y:', boards.ballObj.posY);
        matrix[i][j] = 'O';
        matrix[i - boards.ballObj.dirX][j - boards.ballObj.dirY] = ' ';
        if (boards.ballObj.posX >= maxX) {
          boards.ballObj.posX = maxX;
          boards.ballObj.dirX *= -1;
        }
        if (boards.ballObj.posY >= maxY) {
          boards.ballObj.posY = maxY;
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
      }
      const nextx = boards.ballObj.posX + boards.ballObj.dirX;
      const nexty = boards.ballObj.posY + boards.ballObj.dirY;
      console.log('Next x:', nextx, 'next y:', nexty);
      console.log('Lef1 x:', boards.clubLeft1Obj.posX, 'y:', boards.clubLeft1Obj.posY);

      if (matrix[nextx][nexty] === boards.clubLeft1Obj) {
        console.log('Left 1');
        boards.ballObj.dirX = boards.clubLeft1Obj.dirXmod;
        boards.ballObj.dirY = boards.clubLeft1Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === boards.clubLeft2Obj) {
        console.log('Left 2');
        boards.ballObj.dirX = boards.clubLeft2Obj.dirXmod;
        boards.ballObj.dirY = boards.clubLeft2Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === boards.clubCenterObj) {
        console.log('Center');
        boards.ballObj.dirX = boards.clubCenterObj.dirXmod;
        boards.ballObj.dirY = boards.clubCenterObj.dirYmod;
      }
      if (matrix[nextx][nexty] === boards.clubRight2Obj) {
        console.log('Right2');
        boards.ballObj.dirX = boards.clubRight2Obj.dirXmod;
        boards.ballObj.dirY = boards.clubRight2Obj.dirYmod;
      }
      if (matrix[nextx][nexty] === boards.clubRight1Obj) {
        console.log('Right 1');
        boards.ballObj.dirX = boards.clubRight1Obj.dirXmod;
        boards.ballObj.dirY = boards.clubRight1Obj.dirYmod;
      }
      boards.ballObj.posX += boards.ballObj.dirX;
      boards.ballObj.posY += boards.ballObj.dirY;
      nextball = boards.ballObj;

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
      if (matrix[i][j] === boards.clubLeft1Obj) {
        matrix[i][j] = 'Cl1';
      }
      if (matrix[i][j] === boards.clubLeft2Obj) {
        matrix[i][j] = 'Cl2';
      }
      if (matrix[i][j] === boards.clubCenterObj) {
        matrix[i][j] = 'Cc';
      }
      if (matrix[i][j] === boards.clubRight2Obj) {
        matrix[i][j] = 'Cr2';
      }
      if (matrix[i][j] === boards.clubRight1Obj) {
        matrix[i][j] = 'Cr1';
      }
      if (matrix[i][j].type === 'lifebrick') {
        matrix[i][j] = 'L';
      }
    }
  }
  console.log(table.table(matrix));
  matrix[nextball.posX][nextball.posY] = boards.ballObj;
};
// console.log(matrixToObj(board));
// console.clear();

// boards.ballObj = nextball;

const game = () => {
  setInterval(move, 500, board);
};
module.exports = {
  game: game
};
game();
// console.log(matrixToObj(board));
