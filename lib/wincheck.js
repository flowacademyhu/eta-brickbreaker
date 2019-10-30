const board = require('./board');

const palya = board.boardSelect();

const winCheck = (palya) => {
  for (let i = 0; i < palya.length; i++) {
    for (let j = 0; j < palya[i].length; j++) {
      if (palya[i][j] === 'B') {
        return palya;
      }
    }
  } return 'You win the Game!';
};
