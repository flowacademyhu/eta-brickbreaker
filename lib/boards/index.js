const fs = require('fs');
const boards = fs
  .readdirSync(__dirname)
  .filter(file => file.includes('.json'))
  .map(file => require(`./${file}`));

let mainboard = [];
const boardSelect = () => {
  const a = Math.floor(Math.random() * 5);
  mainboard = boards[a];
  mainboard[17][5] = 'C';
  mainboard[17][6] = 'C';
  mainboard[17][7] = 'C';
  mainboard[17][8] = 'C';
  mainboard[17][9] = 'C';

  return mainboard;
};
boardSelect();
console.log(mainboard);

module.exports = {
  boardSelect: boardSelect
};
