const boards = require('./boards');
const fs = require('fs');

const overCheck = () => {
  if (boards.playerObj.life < 1) {
    console.clear();
    const jsonScore = JSON.stringify(boards.playerObj.name + '\'s score ' + boards.playerObj.score);
    fs.writeFileSync('./score.json', jsonScore);
    console.log('Result: ' + jsonScore);
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
  }
};

module.exports = {
  overCheck: overCheck
};
