
const boards = require('./boards');

const clubLeft = (board) => {
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
};

const clubRight = (board) => {
  boards.clubRight1Obj.posY++;
  if (boards.clubRight1Obj.posY > board.length) {
    boards.clubRight1Obj.posY = board[0].length;
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
};

module.exports = {
  clubLeft: clubLeft,
  clubRight: clubRight
};
