
const table = require('table');
const colors = require('colors');
const boards = require('./boards');

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

const visual = (matrix) => {
  const consolematrix = [];
  for (let i = 0; i < matrix.length; i++) {
    const sor = [];
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'null') {
        sor[j] = ' ';
      }
      if (matrix[i][j].type === 'ball') {
        sor[j] = 'O'.zebra;
        if (boards.ballObj.dirY === 0) {
          sor[j - 1] = ' ';
        } else {
          sor[j - boards.ballObj.dirY] = ' ';
        }
      }

      if (matrix[i][j].type === 'brick') {
        sor[j] = ' '.bgRed;
      }

      //    if (matrix[i][j].type === 'extrabrick') {
      //      matrix[i][j] = 'EBr';
      //    }
      //    if (matrix[i][j].type === 'extraball') {
      //      matrix[i][j] = 'EBa';
      //    }

      if (matrix[i][j] === boards.clubLeft1Obj) {
        sor[j] = ' '.bgBlue;
      }
      if (matrix[i][j] === boards.clubLeft2Obj) {
        sor[j] = ' '.bgBlue;
      }
      if (matrix[i][j] === boards.clubCenterObj) {
        sor[j] = ' '.bgBlue;
      }
      if (matrix[i][j] === boards.clubRight2Obj) {
        sor[j] = ' '.bgBlue;
      }
      if (matrix[i][j] === boards.clubRight1Obj) {
        sor[j] = ' '.bgBlue;
      }

      //  if (matrix[i][j].type === 'lifebrick') {
      //   matrix[i][j] = 'L';
      //  }
    }
    consolematrix.push(sor);
    console.clear();
  } console.log(table.table(consolematrix, config));
  return consolematrix;
};

module.exports = {
  visual: visual
};
