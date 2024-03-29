const readLine = require('readline-sync');
const fs = require('fs');
const clone = require('clone');
const CFonts = require('cfonts');
const boards = fs
  .readdirSync(__dirname)
  .filter(file => file.includes('.json'))
  .map(file => require(`./${file}`));

console.clear();
CFonts.say('Welcome to the ETA Brick Breaker Game!', {
  font: 'block',
  align: 'left',
  colors: ['system'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0'
});
// console.log('Welcome to the ETA Brick Breaker Game!');
console.log();
const name = readLine.question('Player name: ');

let mainboard = [];
const boardSelect = () => {
  const a = Math.floor(Math.random() * 5);
  mainboard = boards[a];
  mainboard[17][5] = 'Cl1';
  mainboard[17][6] = 'Cl2';
  mainboard[17][7] = 'Cc';
  mainboard[17][8] = 'Cr2';
  mainboard[17][9] = 'Cr1';

  return mainboard;
};
boardSelect();

const playerObj = {
  name: name,
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
  color: 'O'
};

const brickObj = {
  type: 'brick',
  posX: 1,
  posY: 1,
  score: 3
};

const clubLeft1Obj = {
  type: 'left1club',
  posX: 0,
  posY: 1,
  dirXmod: -1,
  dirYmod: 2

};

const clubLeft2Obj = {
  type: 'left2club',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: 1

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
  dirYmod: -1
};

const clubRight1Obj = {
  type: 'right1club',
  posX: 0,
  posY: 0,
  dirXmod: -1,
  dirYmod: -2
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
  clubLeft1Obj: clubLeft1Obj,
  clubLeft2Obj: clubLeft2Obj,
  clubCenterObj: clubCenterObj,
  clubRight1Obj: clubRight1Obj,
  clubRight2Obj: clubRight2Obj,
  nullObj: nullObj
};
