const table = require('table');
const board = require('./board');

const palya = board.boardSelect();

const minX = 0;
const maxX = 19;
const minY = 0;
const maxY = 14;

const context = {
  ballY: 7,
  ballX: 15,
  ballYdir: 1,
  ballXdir: -1,
  brick: false
};

const move = (context) => {
  palya[context.ballX][context.ballY] = ' ';

  context.ballY += context.ballYdir;
  context.ballX += context.ballXdir;

  if (context.ballX > maxX) {
    context.ballX = maxX - 1;
    context.ballXdir *= -1;
  } else {
    if (context.ballX < minX) {
      context.ballX = minX + 1;
      context.ballXdir *= -1;
    }
  }
  if (context.ballY > maxY) {
    context.ballY = maxY - 1;
    context.ballYdir *= -1;
  } else {
    if (context.ballY < minY + 1) {
      context.ballY = minY;
      context.ballYdir *= -1;
    }
  }

  console.log('Labda iránya:', context.ballYdir, context.ballXdir);
  console.log('Aktuális: oszlop, sor =', context.ballY, context.ballX);

  let nextX = context.ballX + context.ballXdir;
  let nextY = context.ballY + context.ballYdir;

  if (nextX > maxX) {
    nextX = maxX;
  }
  if (nextX < minX) {
    nextX = minX;
  }

  if (nextY > maxY) {
    nextY = maxY;
  }
  if (nextY < minY) {
    nextY = minY;
  }

  console.log('Következő pozíció (oszlop, sor):', nextY, nextX);
  if (palya[nextX][nextY] === 'B') {
    console.log('Tégla jön!');
    context.brick = true;
    context.ballXdir *= -1;
    palya[nextX][nextY] = ' ';
  } else {
    context.brick = false;
  }
  palya[context.ballX][context.ballY] = 'O';
  if (context.brick) {

  }
  console.log(table.table(palya));
};
setInterval(move, 500, context);
