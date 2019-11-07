const table = require('table');
const boards = require('./boards');
const fs = require('fs');

const jsonScore = JSON.stringify(boards.playerObj.name + '\'s score: ' + boards.playerObj.score);
fs.writeFileSync('./score.json', jsonScore);

const readScore = fs.readFileSync('./score.json', 'utf8');       
const scoretable = [['Scoreboard'], [readScore]];
console.log(table.table(scoretable));
