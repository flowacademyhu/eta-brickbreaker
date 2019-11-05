/* const readLine = require('readline-sync');

const menu = [['X', 'NEW GAME'],
  [' ', 'SCORE BOARD'],
  [' ', 'ABOUT US'],
  [' ', 'QUIT']
];

let i = 0;
const selectMenu = (menu) => {
  console.clear();
  console.log('WELCOME TO ETA BRICK BREAKER GAME');
  console.log();
  console.log('MAIN MENU');
  console.log();
  console.log('Press space to select an option: (w - up, s - down)');
  console.log();
  console.log(menu);
  const s = readLine.keyIn();

  if (s === 'w') {
    if (i === 0) {
      menu[0][0] = 'X';
      menu[1][0] = ' ';
      selectMenu(menu);
    } else {
      menu[i - 1][0] = 'X';
      menu[i][0] = ' ';
      i--;
      selectMenu(menu);
    }
  }

  if (s === 's') {
    if (i === menu.length - 1) {
      menu[menu.length - 1][0] = 'X';
      menu[menu.length - 2][0] = ' ';
      selectMenu(menu);
    } else {
      menu[i + 1][0] = 'X';
      menu[i][0] = ' ';
      i++;
      selectMenu(menu);
    }
  }

  if (s === ' ') {
    switch (i) {
      case 0: console.log('Működik NEW GAME');
        break;
      case 1: console.log('Működik SCORE BOARD');
        break;
      case 2: console.log('Működik ABOUT US');
        break;
      case 3: console.log('Működik QUIT');
        break;
    }
  }
};

selectMenu(menu); */

console.clear();
const CFonts = require('cfonts')
CFonts.say('Eta Brick Breaker', {
  font: 'block',
  align: 'left',
  colors: ['red'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,           
  space: true,              
  maxLength: '0',
});

var Menu = require('terminal-menu');
var menu = Menu({ width: 33, x: 47, y: 15 });
//menu.reset();
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
  console.log('SELECTED: ' + label);
});
process.stdin.pipe(menu.createStream()).pipe(process.stdout);

process.stdin.setRawMode(true);
menu.on('close', function () {
  process.stdin.setRawMode(false);
  process.stdin.end();
});
