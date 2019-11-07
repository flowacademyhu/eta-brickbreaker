const boards = require('./boards');

const overCheck = () => {
  if (boards.playerObj.life < 1) {
    console.clear();
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
}
;
