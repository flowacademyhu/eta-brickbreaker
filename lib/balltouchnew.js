const table = require('table');
const boards = require('./boards');
const clone = require('clone');
const club = require('./clubmove');
const ball = require('./ballmove');

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

const nextball = {};
const main = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === boards.ballObj) {
        console.log('Akt x:', boards.ballObj.posX, 'y:', boards.ballObj.posY);
        matrix[i][j] = boards.ballObj;
        matrix[i - boards.ballObj.dirX][j - boards.ballObj.dirY] = boards.nullObj;
        ball.ballToWall(matrix);
      }

      const nextx = boards.ballObj.posX + boards.ballObj.dirX;
      const nexty = boards.ballObj.posY + boards.ballObj.dirY;
      console.log('Next x:', nextx, 'next y:', nexty);
      console.log('Lef1 x:', boards.clubLeft1Obj.posX, 'y:', boards.clubLeft1Obj.posY);
      ball.ballToClub(matrix);

      // -------- fordebugonly part start ---------
      if (matrix[i][j] === boards.nullObjnull) {
        matrix[i][j] = ' ';
      }

      if (matrix[i][j] === boards.brickObj) {
        matrix[i][j] = 'B';
      }
      // if (matrix[i][j].type === 'extrabrick') {
      //   matrix[i][j] = 'EBr';
      // }
      // if (matrix[i][j].type === 'extraball') {
      //   matrix[i][j] = 'EBa';
      // }
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
      // if (matrix[i][j].type === 'lifebrick') {
      //  matrix[i][j] = 'L';
      // }
      // --------- fordebugonly part end ---------
    }
  }
  console.log(table.table(matrix));
  // matrix[boards.ballObj.posX][boards.ballObj.posY] = boards.ballObj;
};

// console.log(matrixToObj(board));
// console.clear();

const game = () => {
  setInterval(main, 500, board);
};
module.exports = {
  game: game
};
game();
