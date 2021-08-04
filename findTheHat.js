const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    this._field = field;
    this._fieldHeight = field.length;
    this._fieldWidth = field[0].length;
  }

  print () {
    // for each row, join into a string then log it
    for (let i = 0; i < this._field.length; i++) {
      let fieldStr = this._field[i].join('');
      console.log(fieldStr);
    }
  }

  playGame () {
    // print the field for players to see
    this.print(this._field);

    let x = 0; // rows (left/right/e/w)
    let y = 0; // columns (up/down/n/s)

    // while the location of y,x is a fieldCharacter or a pathCharacter
    while (this._field[y][x] === fieldCharacter || this._field[y][x] === pathCharacter) {
      const move = prompt('Which direction do you want to go?  Pick one of N, S, E, or W.');

      if (move.toUpperCase() === 'N') {
        if (y === 0) {
          console.log('You can\'t go that way');
        } else {
          y--;
        }
      } else if (move.toUpperCase() === 'S') {
        if (y === this._fieldHeight) {
          console.log('You can\'t go that way');
        } else {
          y++;
        }
      } else if (move.toUpperCase() === 'W') {
        if (x === 0) {
          console.log('You can\'t go that way');
        } else {
          x--;
        }
      } else if (move.toUpperCase() === 'E') {
        if (x === this._fieldWidth) {
          console.log('You can\'t go that way');
        } else {
          x++;
        }
      } else {
        console.log('Invalid entry. Please select one of N, S, E, or W');
      }

      // if the y,x location is hat, player wins
      // if the y,x location is hole, player loses
      // if the y,x location is neither, change it to pathCharacter
      if (this._field[y][x] === hat) {
        console.log('You found the hat! You win!');
      } else if (this._field[y][x] === hole) {
        console.log('Oh no! You fell down a hole! Game over!');
      } else {
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    }
  }

  static generateField (height, width, holes) {
    let myField = [];
    
    for (let h = 0; h < height; h++) {
      // for each row/height, add an empty array
      myField.push([]);
      for (let w = 0; w < width; w++) {
        // within each empty array/row, add a field character WIDTH times
        myField[h].push(fieldCharacter);
      }
    };

    // the player starts in the upper left, which is 0,0
    myField[0][0] = pathCharacter;

    // randomize the hat location
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    // make sure the hat doesn't land on our starting location 0,0
    while (hatX === 0 && hatY === 0) {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    };

    // stick the hat onto the array/field
    myField[hatY][hatX] = hat;

    // randomize the hole locations
    for (let holeCount = holes; holeCount > 0; holeCount--) {
      let holeX = hatX;
      let holeY = hatY;

      // don't want holes on top of the hat
      while (holeX === hatX && holeY === hatY) {
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      };
      // don't want holes on our starting location either
      while (holeX === 0 && holeY === 0){
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      };

      myField[holeY][holeX] = hole;
    }
    return myField;
  }
}

const gameField = Field.generateField(10,10,5);
const playField = new Field(gameField);

playField.playGame();

//Tests below
/*
const thisField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

console.log(thisField.print());
*/
