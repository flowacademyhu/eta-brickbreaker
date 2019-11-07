const boards = require('./boards');

const bricknumCheck = (matrix) => {
  let bricks = 1;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'brick') { bricks += 1; }
    }
  } boards.playerObj.bricknum = bricks - 1;
  console.log('Player: ' + boards.playerObj.name);
  console.log('Number of bricks: ' + boards.playerObj.bricknum);
  console.log('Life: ' + boards.playerObj.life);
  return boards.playerObj.bricknum;
};

const winCheck = () => {
  if (boards.playerObj.bricknum === 0) {
    const CFonts = require('cfonts');
    CFonts.say('Next level!', {
      font: 'block',
      align: 'left',
      colors: ['red'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0'
    });
    return true;
  }
  return false;
};

module.exports = {
  bricknumCheck: bricknumCheck,
  winCheck: winCheck
}
;
