const readLine = require('readline-sync');
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
  console.log(menu);
  const s = readLine.keyIn();

  if (s === 'w') {
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

  if (s === 's') {
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
      case 1: console.log('SCORE BOARD:');
        break;
      case 2: console.log('ABOUT US:');
        CFonts.say('Welcome to the classic brick breaker game made by Nori, Laci es Jozsi. Flow Academy Eta team 2019', {
          font: 'block',
          align: 'center',
          colors: ['Blue'],
          background: 'transparent',
          letterSpacing: 1,
          lineHeight: 1,
          space: true,
          maxLength: '0'
        });
        break;
      case 3: console.log('Good Bye!');
        break;
    }
  }
};

// const game = require('./balltouchnew');
/* const selectMenu = (start) => {
  console.clear();
  const CFonts = require('cfonts');
  CFonts.say('Eta Brick Breaker', {
    font: 'block',
    align: 'left',
    colors: ['red'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'
  });

  var Menu = require('terminal-menu');
  var menu = Menu({ width: 33, x: 47, y: 15 });
  // menu.reset();
  menu.write('MAIN MENU\n');
  menu.write('\n');
  menu.write('---------------------------------\n');

  menu.add('1. START NEW GAME');
  menu.add('2. SCORE BOARD');
  menu.add('3. ABOUT US');
  menu.add('4. EXIT');
  menu.write('---------------------------------\n');

  menu.on('select', function (label) {
    menu.close();
    switch (label) {
      case '1. START NEW GAME':
        process.stdin.removeAllListeners('data');
        start();
        break;
      case '2. SCORE BOARD': console.log(2);
        break;
      case '3. ABOUT US':
        menu.reset();
        aboutUS();
        break;
      case '4. EXIT':
        console.log('Good Bye!');
        menu.close();
        break;
    }
  });
  process.stdin.pipe(menu.createStream()).pipe(process.stdout);

  process.stdin.setRawMode(true);
  menu.on('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
  });

  const aboutUS = () => {
    console.log('Welcome to the classic brick breaker game remade by Nóri, Laci és Józsi');
    console.log('Flow Academy - Eta team 2019');
  };
}; */

module.exports = {
  selectMenu: selectMenu
}
;
