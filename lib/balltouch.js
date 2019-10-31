const table = require('table');
const board = require('./board');
const data = require('../index');

const palya = board.boardSelect();

const minX = 0;
const maxX = 19;
const minY = 0;
const maxY = 14;

const move = (source) => {
  palya[data.context.ballX][data.context.ballY] = ' ';

  data.context.ballY += data.context.ballYdir;
  data.context.ballX += data.context.ballXdir;

  if (data.context.ballX > maxX) {
    data.context.ballX = maxX - 1;
    data.context.ballXdir *= -1;
  }
  if (data.context.ballX < minX) {
    data.context.ballX = minX + 1;
    data.context.ballXdir *= -1;
  }

  if (data.context.ballY > maxY) {
    data.context.ballY = maxY - 1;
    data.context.ballYdir *= -1;
  }
  if (data.context.ballY < minY) {
    data.context.ballY = minY + 1;
    data.context.ballYdir *= -1;
  }
  console.clear();
  console.log(table.table(palya));

  //  console.log('Labda iránya:', data.context.ballYdir, data.context.ballXdir);
  //  console.log('Aktuális: oszlop, sor =', data.context.ballY, data.context.ballX);

  let nextX = data.context.ballX + data.context.ballXdir;
  let nextY = data.context.ballY + data.context.ballYdir;

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

  if (palya[nextX][nextY] === 'B') {
    data.context.ballXdir *= -1;
    palya[nextX][nextY] = ' ';
  }
  if (palya[nextX][nextY] === 'C') {
    data.context.ballXdir *= -1;
  }
  palya[data.context.ballX][data.context.ballY] = 'O';
  console.log(table.table(palya));
};
setInterval(move, 500, data.context);
