const boards = require('./boards');
const fs = require('fs');
const game = require('./balltouchnew');
const newboard = boards.gameboard;

const overCheck = () => {
  if (boards.playerObj.life < 1) {
    console.clear();
    const jsonScore = JSON.stringify(boards.playerObj.name + '\'s score ' + boards.playerObj.score);
    fs.writeFileSync('./score.json', jsonScore);
    console.log(jsonScore);
    const CFonts = require('cfonts');
    CFonts.say('GAME OVER', {
      font: 'block',
      align: 'left',
      colors: ['red'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0'
    });
  //  setInterval(game.main, 150, newboard);
  }
};

module.exports = {
  overCheck: overCheck
};
