const table = require('table');
const board = require('./boards/index');
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
const palya = board.boardSelect();

const minX = 0;
const maxX = 19;
const minY = 0;
const maxY = 14;
let life = 3;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'a') {
    clubdata.clubX--;
    if (clubdata.clubX < 1) {
      clubdata.clubX = minX + 1;
    }

    palya[clubdata.clubY][clubdata.clubX - 1] = 'C';
    if (clubdata.clubX !== minX) {
      palya[clubdata.clubY][clubdata.clubX + 2] = ' ';
    }
  }
  if (key === 'd') {
    clubdata.clubX++;
    if (clubdata.clubX > maxY - 1) {
      clubdata.clubX = maxY - 1;
    }
    palya[clubdata.clubY][clubdata.clubX + 1] = 'C';
    if (clubdata.clubX !== maxX + 1) {
      palya[clubdata.clubY][clubdata.clubX - 2] = ' ';
    }
  }
})
;

const move = (source) => {
  palya[source.ballX][source.ballY] = ' ';

  source.ballY += source.ballYdir;
  source.ballX += source.ballXdir;

  if (source.ballX > maxX) {
    source.ballX = maxX;
    source.ballXdir *= -1;
  }
  if (source.ballX < minX) {
    source.ballX = minX + 1;
    source.ballXdir *= -1;
  }

  if (source.ballY > maxY) {
    source.ballY = maxY;
    source.ballYdir *= -1;
  }
  if (source.ballY < minY) {
    source.ballY = minY + 1;
    source.ballYdir *= -1;
  }

  let nextX = source.ballX + source.ballXdir;
  let nextY = source.ballY + source.ballYdir;

  if (nextX > maxX) {
    console.log('Élet: ', life--);
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
    source.ballXdir *= -1;
    palya[nextX][nextY] = ' ';
  }
  if (palya[nextX][nextY] === 'C') {
    source.ballXdir *= -1;
  }
  palya[source.ballX][source.ballY] = 'O';
  console.clear();
  console.log(table.table(palya, config));
};

const game = (data) => {
  clubdata = data;
  setInterval(move, 100, data);
};
module.exports = {
  ballMove: game
};
