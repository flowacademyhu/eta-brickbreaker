const ballMove = require('./lib/balltouch');

const context = {
  ballY: 3,
  ballX: 13,
  ballYdir: 1,
  ballXdir: 1,
  clubY: 17,
  clubX: 7
};

module.exports = {
  context: context
};

ballMove.ballMove()
;