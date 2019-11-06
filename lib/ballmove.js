const boards = require('./boards');

const ballToWall = (matrix) => {
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
  return boards.ballObj;
};

const ballToClub = (matrix) => {
  let nextx = boards.ballObj.posX + boards.ballObj.dirX;
  let nexty = boards.ballObj.posY + boards.ballObj.dirY;
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
  return boards.ballObj;
};
module.exports = {
  ballToWall: ballToWall,
  ballToClub: ballToClub
};
