const table = require('table');
const readLine = require('readline-sync');
const fs = require('fs');
const readScore = fs.readFileSync('score.json');
const score = JSON.parse(readScore);
let i = 0;
const menu = [['X', 'NEW GAME'],
  [' ', 'SCORE BOARD'],
  [' ', 'ABOUT US'],
  [' ', 'QUIT']
];
const selectMenu = (game) => {
  console.clear();
  const CFonts = require('cfonts');
  CFonts.say('Eta Brick Breaker', {
    font: 'block',
    align: 'center',
    colors: ['red'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'
  });
  CFonts.say('Main menu', {
    font: '3d',
    align: 'center',
    colors: ['Blue'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'
  });
  console.log();
  console.log('Press space to select an option: (w - up, s - down)');
  console.log();
  console.log(table.table(menu));
  const s = readLine.keyIn();

  if (s === 'w' || s === '[A') {
    console.log(s);
    if (i === 0) {
      menu[0][0] = 'X';
      menu[1][0] = ' ';
      selectMenu(game);
    } else {
      menu[i - 1][0] = 'X';
      menu[i][0] = ' ';
      i--;
      selectMenu(game);
    }
  }

  if (s === 's' || s === '[B') {
    if (i === menu.length - 1) {
      menu[menu.length - 1][0] = 'X';
      menu[menu.length - 2][0] = ' ';
      selectMenu(game);
    } else {
      menu[i + 1][0] = 'X';
      menu[i][0] = ' ';
      i++;
      selectMenu(game);
    }
  }

  if (s === ' ') {
    switch (i) {
      case 0: console.clear();
        game();
        break;
      case 1: console.clear();
        CFonts.say('Score Board', {
          font: 'block',
          align: 'center',
          colors: ['Blue'],
          background: 'transparent',
          letterSpacing: 1,
          lineHeight: 1,
          space: true,
          maxLength: '0'
        });
        console.log();
        console.log(table.table([['Scoreboard'], [score]]));
        console.log();
        console.log('Press q to go back to main menu.');
        const f = readLine.keyIn();
        if (f === 'q') { selectMenu(game); }

        break;
      case 2: console.clear();
        console.log('ABOUT US:');
        CFonts.say('Welcome to the classic brick breaker game made by Nori, Laci & Jozsi. Flow Academy Eta team 2019', {
          font: 'block',
          align: 'center',
          colors: ['Blue'],
          background: 'transparent',
          letterSpacing: 1,
          lineHeight: 1,
          space: true,
          maxLength: '0'
        });
        console.log('Press q to go back to main menu.');
        const q = readLine.keyIn();
        if (q === 'q') { selectMenu(game); }
        break;
      case 3: console.log('Good Bye!');
        break;
    }
  }
};

module.exports = {
  selectMenu: selectMenu
}
;
