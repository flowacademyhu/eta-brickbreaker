const boards = require('./boards');

const ballToWall = (matrix) => {
  if (boards.ballObj.posX >= matrix.length) {
    boards.ballObj.posX = matrix.length;
    boards.ballObj.dirX *= -1;
  }
  if (boards.ballObj.posY >= matrix[0].length) {
    boards.ballObj.posY = matrix[0].length;
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
};

let nextx = boards.ballObj.posX + boards.ballObj.dirX;
let nexty = boards.ballObj.posY + boards.ballObj.dirY;
const ballToClub = (matrix) => {
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
};
module.exports = {
  ballToWall: ballToWall,
  ballToClub: ballToClub
};
