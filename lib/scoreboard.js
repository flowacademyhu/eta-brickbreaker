const table = require('table');
const fs = require('fs');

let readScore = fs.readFileSync('../score.json'); 
let Score = JSON.parse(readScore);
console.log(table.table([['Scoreboard'], [Score]]));
