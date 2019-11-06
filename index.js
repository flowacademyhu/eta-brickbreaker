const game = require('./lib/balltouchnew');
const boards = require('./lib/boards');

setInterval(game.main, 150, boards.gameboard)
;
