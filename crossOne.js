const table = require('table');

const context = { x: 0, y: 0 };

const matrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

const main = () => {
  console.clear();
  matrix[context.y][context.x] = 0;

  if (context.x < matrix.length - 1) {
    context.x++;
    context.y++;
    matrix[context.y][context.x] = 1;
    console.log(table.table(matrix));
  } else {
    process.exit();
  }
};

setInterval(main, 1000);
