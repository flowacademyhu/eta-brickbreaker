const readLine = require ('readline-sync');
const term = require( 'terminal-kit' ).terminal;
const CFonts = require('cfonts');

const name = readLine.question('Player name: ');
console.clear();
console.log('Player: ', name);


const brickObj = {
  type: 'brick',
  posX: 1,
  posY: 1,
  score: 1
};

const resultObj = {
  name: '',
  points: 0
};

const Scoreboard = (resultObj) => {
  let points = 0;
  let result = points + brickObj.score;
  return result;
}
Scoreboard(resultObj.name + resultObj.points);
console.log();
term.italic.underline('Scores:');
console.log();
console.log(name + ' ' + Scoreboard(resultObj.name + resultObj.points) + ' ' + 'points');

