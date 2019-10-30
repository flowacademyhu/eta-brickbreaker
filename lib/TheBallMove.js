const table = require('table');
const MeetWithWall = require('./CollideWithWall');
const board = require('./board');

const palya = board.boardSelect();

const minX = 0;
const maxX = palya[0].length - 1;
const minY = 0;
const maxY = palya.length - 1;
const context = {
  ballX: 7,
  ballY: 3,
  ballXdir: 1,
  ballYdir: 1
};

const move = (context) => {
  palya[context.ballY][context.ballX] = ' ';
  context.ballX += context.ballXdir;
  context.ballY += context.ballYdir;
  if (context.ballY > maxY) {
    context.ballY = maxY;
    context.ballYdir *= -1;
  } else {
    if (context.ballY < minY) {
      context.ballY = minY;
      context.ballYdir *= -1;
    }
  }

  if (context.ballX > maxX) {
    context.ballX = maxX;
    context.ballXdir *= -1;
  } else {
    if (context.ballX < minX) {
      context.ballX = minX;
      context.ballXdir *= -1;
    }
  }

  palya[context.ballY][context.ballX] = 'O';
  console.clear();
  console.log(table.table(palya));
};

setInterval(move, 100, context);
