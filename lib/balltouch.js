const table = require('table');
const board = require('./board');
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

    palya[clubdata.clubY][clubdata.clubX - 1] = 'C'.blue.bgBlue;
    if (clubdata.clubX !== minX) {
      palya[clubdata.clubY][clubdata.clubX + 2] = ' '.black.bgBlack;
    }
  }
  if (key === 'd') {
    clubdata.clubX++;
    if (clubdata.clubX > maxY) {
      clubdata.clubX = maxY;
    }
    palya[clubdata.clubY][clubdata.clubX + 1] = 'C'.blue.bgBlue;
    if (clubdata.clubX !== maxX + 1) {
      palya[clubdata.clubY][clubdata.clubX - 2] = ' '.black.bgBlack;
    }
  }
})
;

const move = (source) => {
  palya[source.ballX][source.ballY] = ' '.black.bgBlack;

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

  if (palya[nextX][nextY] === 'B'.red.bgRed) {
    source.ballXdir *= -1;
    palya[nextX][nextY] = ' '.black.bgBlack;
  }
  if (palya[nextX][nextY] === 'C'.blue.bgBlue) {
    source.ballXdir *= -1;
  }
  palya[source.ballX][source.ballY] = 'O'.green.bgGreen;
  // console.clear();
  console.log(table.table(palya, config));
  console.log(clubdata.clubX);
};

const game = (data) => {
  clubdata = data;
  setInterval(move, 200, data);
};
module.exports = {
  ballMove: game
};
