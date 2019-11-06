const fs = require('fs');
const clone = require('clone');
const colors = require('colors');
const boards = fs
  .readdirSync(__dirname)
  .filter(file => file.includes('.json'))
  .map(file => require(`./${file}`));

let mainboard = [];
const boardSelect = () => {
  const a = Math.floor(Math.random() * 5);
  mainboard = boards[a];
  // mainboard[13][5] = 'O';
  mainboard[17][5] = 'Cl1';
  mainboard[17][6] = 'Cl2';
  mainboard[17][7] = 'Cc';
  mainboard[17][8] = 'Cr2';
  mainboard[17][9] = 'Cr1';

  return mainboard;
};
boardSelect();

const playerObj = {
  name: '',
  life: 4,
  score: 0,
  bricknum: 0
};

const ballObj = {
  type: 'ball',
  posX: 16,
  posY: 6,
  dirX: -1,
  dirY: 1,
  color: 'O'.white
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

const matrixToObj = (matrix) => {
  for (let i = 0; i <= matrix.length - 1; i++) {
    for (let j = 0; j <= matrix[0].length - 1; j++) {
      if (matrix[i][j] === ' ') {
        matrix[i][j] = clone(nullObj);
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

const gameboard = matrixToObj(boardSelect());
module.exports = {
  gameboard: gameboard,
  playerObj: playerObj,
  ballObj: ballObj,
  brickObj: brickObj,
  extraBrickObj: extraBrickObj,
  extraBallObj: extraBallObj,
  clubLeft1Obj: clubLeft1Obj,
  clubLeft2Obj: clubLeft2Obj,
  clubCenterObj: clubCenterObj,
  clubRight1Obj: clubRight1Obj,
  clubRight2Obj: clubRight2Obj,
  lifeBrick: lifeBrick,
  nullObj: nullObj
};
