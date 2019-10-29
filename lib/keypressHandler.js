const read = require('readline-sync');
const table = require('table');

const board = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'C', 'C', 'C', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
];

const minX = 0;
const maxX = board.length[0] - 1;
const context = {
  ballX: 7,
  ballY: 3,
  ballXdir: 1,
  ballYdir: 1,
  clubY: 15,
  clubX: 5
}
;

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'a') {
    context.clubX--;
    if (context.clubX < 0) {
      context.clubX = minX;
    }
    board[context.clubY][context.clubX - 1] = 'C';
    if (context.clubX !== minX) {
      board[context.clubY][context.clubX + 2] = ' ';
    }
  }
  if (key === 'd') {
    context.clubX++;
    if (context.clubX > maxX - 2) {
      context.clubX = maxX;
    }
    board[context.clubY][context.clubX + 1] = 'C';
    if (context.clubX !== maxX) {
      board[context.clubY][context.clubX - 2] = ' ';
    }
  }
})
;

const boardRow = (board) => {
  console.log(table.table(board));
  console.log(context.clubX);
}
;

setInterval(boardRow, 100, board);
