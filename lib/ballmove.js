const boards = require('./boards');

const ballToWall = (matrix) => {
  if (boards.ballObj.posX >= matrix.length - 1) {
    boards.ballObj.posX = matrix.length - 1;
    boards.ballObj.dirX *= -1;
    boards.ballObj.posX = 16;
    boards.ballObj.posY = 6;
    boards.playerObj.life -= 1;
  }
  if ((boards.ballObj.posY >= matrix[0].length - 2 && boards.ballObj.dirY === 2) || (boards.ballObj.posY >= matrix[0].length - 1 && boards.ballObj.dirY === 1)) {
    boards.ballObj.posY = matrix[0].length - 1;
    boards.ballObj.dirY *= -1;
  }
  if ((boards.ballObj.posX <= 0 && boards.ballObj.dirX === -1) || (boards.ballObj.posX <= 1 && boards.ballObj.dirX === -2)) {
    boards.ballObj.posX = 0;
    boards.ballObj.dirX *= -1;
  }
  if ((boards.ballObj.posY <= 0 && boards.ballObj.dirY === -1) || (boards.ballObj.posY <= 1 && boards.ballObj.dirY === -2)) {
    boards.ballObj.posY = 0;
    boards.ballObj.dirY *= -1;
  }
  return boards.ballObj;
};

const ballToClub = (matrix) => {
  let nextx = boards.ballObj.posX + boards.ballObj.dirX;
  let nexty = boards.ballObj.posY + boards.ballObj.dirY;
  if (nextx < 0) { nextx = 0; }
  if (nexty < 0) { nexty = 0; }
  if (nextx > matrix.length - 1) { nextx = matrix.length - 1; }
  if (nexty > matrix[0].length - 1) { nexty = matrix[0].length - 1; }

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

const ballToBrick = (matrix) => {
  let nextx = boards.ballObj.posX + boards.ballObj.dirX;
  let nexty = boards.ballObj.posY + boards.ballObj.dirY;

  if (nextx < 0) { nextx = 0; }
  if (nexty < 0) { nexty = 0; }
  if (nextx > matrix.length - 1) { nextx = matrix.length - 1; }
  if (nexty > matrix[0].length - 1) { nexty = matrix[0].length - 1; }
  if (boards.ballObj.dirY === -2 && matrix[nextx][boards.ballObj.posY + boards.ballObj.dirY + 1].type === 'brick') {
    matrix[nextx][boards.ballObj.posY + boards.ballObj.dirY + 1] = boards.nullObj;
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    nextx = boards.ballObj.posX + boards.ballObj.dirX;
    nexty = boards.ballObj.posY + boards.ballObj.dirY;
  }
  if (boards.ballObj.dirY === 2 && matrix[nextx][boards.ballObj.posY + boards.ballObj.dirY - 1].type === 'brick') {
    matrix[nextx][boards.ballObj.posY + boards.ballObj.dirY - 1] = boards.nullObj;
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    nextx = boards.ballObj.posX + boards.ballObj.dirX;
    nexty = boards.ballObj.posY + boards.ballObj.dirY;
  }

  if (matrix[nextx][nexty].type === 'brick') {
    boards.ballObj.dirX = boards.ballObj.dirX * -1;
    matrix[nextx][nexty] = boards.nullObj;
    nextx = boards.ballObj.posX + boards.ballObj.dirX;
    nexty = boards.ballObj.posY + boards.ballObj.dirY;
    boards.brickObj.score = boards.brickObj.score + 3;
  }

  if (nextx < 0) { nextx = 0; }
  if (nexty < 0) { nexty = 0; }
  if (nextx > matrix.length - 1) { nextx = matrix.length - 1; }
  if (nexty > matrix[0].length - 1) { nexty = matrix[0].length - 1; }

}

module.exports = {
  ballToWall: ballToWall,
  ballToClub: ballToClub,
  ballToBrick: ballToBrick
};
