const table = require('table');
const readLine = require('readline-sync');
const boards = require('./boards/index');
const fs = require('fs');


// const points = 0;
// const result = points + boards.brickObj.score;

const readScore = fs.readFileSync('./score.json', 'utf8');       
const scoretable = [['Scoreboard'], [readScore]];
console.log(table.table(scoretable));

const name = readLine.question('Player name: ');
const player = name;
const jsonScore = JSON.stringify(PlayerObj.Name + '\'s score: ' + PlayerObj.Point);                   
fs.writeFileSync('./score.json', jsonScore);