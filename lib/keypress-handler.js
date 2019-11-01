
const table = require('table');
const board1 = require('./board');

const board = board1.boardSelect();
const data = require('../index');

const minX = 0;
const maxX = board[0].length - 2;

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'a') {
    data.context.clubX--;
    if (data.context.clubX < 1) {
      data.context.clubX = minX + 1;
    }

    board[data.context.clubY][data.context.clubX - 1] = 'C';
    if (data.context.clubX !== minX) {
      board[data.context.clubY][data.context.clubX + 2] = ' ';
    }
  }
  if (key === 'd') {
    data.context.clubX++;
    if (data.context.clubX > maxX) {
      data.context.clubX = maxX;
    }
    board[data.context.clubY][data.context.clubX + 1] = 'C';
    if (data.context.clubX !== maxX + 1) {
      board[data.context.clubY][data.context.clubX - 2] = ' ';
    }
  }
})
;

const boardRow = (board) => {
  console.log(table.table(board));
};

setInterval(boardRow, 100, board);
