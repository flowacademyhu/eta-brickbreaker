const table = require('table');
const boards = require('./boards');
const fs = require('fs');

// const jsonScore = JSON.stringify(proba.nev);
// fs.writeFileSync('./score.json', jsonScore);

let readScore = fs.readFileSync('score.json'); 
let Score = JSON.parse(readScore);
console.log(Score);

//console.log(table.table([['Scoreboard'], [Score]]));
