const readLine = require('readline-sync');
const table = require('table');
const boards = require('./boards/index');
const fs = require('fs');

const name = readLine.question('Player name: ');
console.clear();
console.log('Player: ', name);

const points = 0;
const result = points + boards.brickObj.score;

const resultObj = {
  Name: name,
  Point: result
};

const jsonScore = JSON.stringify(resultObj.Name + '\'\s score: ' + resultObj.Point);                   
fs.writeFileSync('./score.json', jsonScore);

const readScore = fs.readFileSync('./score.json', 'utf8');       
const scoretable = [['Scoreboard'], [readScore]];
console.log(table.table(scoretable));

