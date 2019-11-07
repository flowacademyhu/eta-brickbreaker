const game = require('./lib/balltouchnew');
const boards = require('./lib/boards');
const menu = require('./lib/menu');

const games = () => {
  game.addListener();
  setInterval(game.main, 150, boards.gameboard)
  ;
};

menu.selectMenu(games);
