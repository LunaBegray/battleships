function createShipCords(){
    let finalChoice = [];
    let choicesPoss = []
    for(let i = 0; i < 100; i++){
        choicesPoss.push(i);
    }
    for(let i = 0; i < 3; i++){
        let num1to100 = Math.floor(Math.random()*choicesPoss.length)
        finalChoice.push(num1to100);
        choicesPoss.splice(num1to100,1);
    }
    for(let i = 0; i < 2; i++){
      let store2 = [];
      let num1to100 = Math.floor(Math.random()*choicesPoss.length)
      store2.push(num1to100);
      choicesPoss.splice(num1to100,1);
      store2.push(num1to100 + 1);
      choicesPoss.splice(num1to100+1, 1);
      finalChoice.push(store2);
    }
      for(let i = 0; i < 1; i++){
        let store3 = [];
        let num1to100 = Math.floor(Math.random()*choicesPoss.length)
        store3.push(num1to100);
        choicesPoss.splice(num1to100,1);
        store3.push(num1to100 + 1);
        choicesPoss.splice(num1to100+1, 1);
        store3.push(num1to100 + 2);
        choicesPoss.splice(num1to100+2, 1)
        finalChoice.push(store3);
    }
    return finalChoice
}

let count;
const body = document.querySelector("body");
Turns = () => {
    if(count == null){
        count = 2;
    } else {
        count += 1;
    }
    let dividedCount = count/2
    let whoseTurn;
    let player = 1;
    let computer = 2;
    if(Number.isInteger(dividedCount) == true){
        whoseTurn = 1;
    } else{
        whoseTurn = 2;
    }
    return whoseTurn
}
function Ship (length, hitYN, sunkYN, positions, positionsYN){
    this.length = length;
    this.hitYN = hitYN;
    this.sunkYN = sunkYN;
    this.positions = positions;
    this.positionsYN =  positionsYN;
    //takes cords as a number and if the cords match this ship it marks it as hit in the positionYN array
    this.hit = (num) => {
        let valueArr = [];
        for(let i = 0; i < this.positionsYN.length; i++){
            if(typeof this.positions != 'number'){
                valueArr = this.positions;
            }
            if(typeof this.positions == 'number'){
                valueArr.push(this.positions);
            }
        }
        for(let i = 0; i < this.length; i++){
            if(num == valueArr[i]){
                this.positionsYN[i] = 1;
                this.hitYN = true;
            }
        }
    }  
    //checks if the ship is sunk by making an array that get pushed all the hitted positions then if the hitted positions 
    //are as long as all the positions then it returns true because all the positions has been hit,
    //if not it will return false since not all positions has been hit
    this.isSunk = () => {
        let hittedPositions = [];
        for(let i = 0; i < this.positionsYN.length; i++){
            if(this.positionsYN[i] == 1){
                console.log(this.positions + " is sunk");
                hittedPositions.push(this.positions);
            }
        }
        let lengthPos = [];
        for(let i = 0; i < this.positionsYN.length; i++){
            if(typeof this.positions != 'number'){
                lengthPos = this.positions;
            }
            if(typeof this.positions == 'number'){
                lengthPos.push(this.positions);
            }
        }
        console.log("hitted positions: " + hittedPositions.length);
        console.log("this.positions.length: " + lengthPos.length);
        if(hittedPositions.length == lengthPos.length){
            this.sunkYN = true;
                return true
        }
        hittedPositions = [];
        this.sunkYN = false;
        return false
    }
}
//creates the board
function Gameboard(){
    //places ship in cords specified when calling the function, it does not prevent the ship from begin places on another ship.
    let shipArr = [];
    let ifAllShipSunkTrue = false;
    let missedShotsCord = [];
    let allSunkShips = [];
    let allSunkShipsComp = [];
    let shipArrComp = [];
    this.placeShip = (cords) => {
        let cordsYN = []
        for(let i = 0; i < cords.length; i++){
            cordsYN.push(0);
        }
        let newShip = new Ship (cords.length, false, false, cords, cordsYN)
        shipArr.push(newShip);
        for(let i = 0; i < cords.length; i++){
            let whichSq = parseInt(newShip.positions[0], 10);
            let whichSqI = parseInt(whichSq + i);
            let sq = document.querySelector('#playerSq' + whichSqI);
            sq.classList.add('ship');

        } 
    }
    
    this.placeShipComputer = () => {
      let choices = createShipCords();
      for(let i = 0; i < choices.length; i++){
            let lengthArr = [];
            let cordsYNcomp = [];
            if(typeof choices[i] == 'number'){
                lengthArr.push(choices[i]);
            } else {
                lengthArr = choices[i];
            }
            for(let j = 0; j < lengthArr.length; j++){
                cordsYNcomp.push(0)
            }
            let newShip = new Ship (lengthArr.length, false, false, choices[i], cordsYNcomp);
            shipArrComp.push(newShip);
      }
      console.log(shipArrComp);
    } 
    
    
    //takes a pair of cords and detemines if it hits a ships, if yes it will mark it as hit. it will find the array of before the hit check and after it and then 
    //compare them, if they are equal it will add them to the array of missed shots. 
    //it also checks if all the ships has sunk, if they do it will make the var ifAllShipSunkTrue = true; 
    this.receiveAttack = (cordsPair, turn) => {
        cords = cordsPair.toString();
        splitInput = cords.split(' ');
        for(let i = 0; i < splitInput.length; i++){
            let whichSq = parseInt(splitInput[i], 10);
            let whichSqI = parseInt(whichSq + i);
            let sq;
            let whoseTurn = Turns();
            if(whoseTurn == 1){
                sq = document.querySelector('#computerSq' + whichSqI);
            } else {
                sq = document.querySelector('#playerSq' + whichSqI);
            }
            let hitCircle = document.createElement('button');
            hitCircle.classList.add('hit');
            sq.appendChild(hitCircle);
            sq.style.backgroundColor = 'red';
        }
        //hit check, if it does hit then call the hit function of the ship that has been hit.
        if(turn == 1){
            for(let i = 0; i < shipArr.length; i++){
                if(shipArr[i].positions == cordsPair){
                    shipArr[i].hit(cordsPair);
                }
            } 
        }
        if(turn == 2){
            for(let i = 0; i < shipArrComp.length; i++){
                if(shipArrComp[i].positions == cordsPair){
                    shipArrComp[i].hit(cordsPair);
                }
            }
        }
    };
    //checks if all ships are sunk in either side
    this.checkIfSunk = (turn) => {
        console.log("which turn: " + turn);
        if(turn == 1){
            console.log("shipArr.length: " + shipArr.length);
            //loops through all the ships and checks if they have been sunk, if they do, push them to the sunk ships array.
            for(let i = 0; i < shipArr.length; i++){
                if(shipArr[i].isSunk() == true){
                    allSunkShips.push(1);
                }
            }
            console.log("allSunkShips.length: " + allSunkShips.length);
                //if all the ships that exist are sunk then the ifAllShipSUnkTrue varaible is true.
            if(allSunkShips.length == shipArr.length){
                ifAllShipSunkTrue = true;
                return true
            }
        }
        if(turn == 2){
            console.log("shipArrComp.length: " + shipArrComp.length);
            for(let i = 0; i < shipArrComp.length; i++){
                if(shipArrComp[i].isSunk() == true){
                    console.log("if statement lunched - ship is sunk");
                    allSunkShipsComp.push(1);
                }
            }
            console.log("allSunkShipsComp.length: " + allSunkShipsComp.length);
            //if all the ships that exist are sunk then the ifAllShipSUnkTrue varaible is true.
            if(allSunkShipsComp.length-21 == shipArrComp.length){
                ifAllShipSunkTrue = true;
                  return true
            }
        }
  }
}

// la computer makes a choice
function computerChoice(){
    let finalChoice;
    let choicesPoss = []
    for(let i = 0; i < 100; i++){
        choicesPoss.push(i);
    }
    let num1to100 = Math.floor(Math.random()*choicesPoss.length)
    choicesPoss.splice(num1to100,1);
    finalChoice = num1to100
    return finalChoice
}

//dom section
//this function creates two boards for the player and the computer, both composed out of 100 squares.
const playerCon = document.querySelector('.playerContainer');
const computerCon = document.querySelector('.computerContainer');
function createBoardPaC(){
    let playerBoard = document.createElement('div');
    let computerBoard = document.createElement('div');
    playerBoard.classList.add("playerBoard");
    computerBoard.classList.add("computerBoard");
    for(let i = 0; i < 100; i++){
        let newSqP = document.createElement('div');
        newSqP.classList.add('playerSq');
        let idForSqP = "playerSq" + i;
        newSqP.id = idForSqP;
        playerBoard.appendChild(newSqP);
        let newSqC = document.createElement('div');
        newSqC.classList.add("computerSq");
        let idForSqC = "computerSq" + i;
        newSqC.id = idForSqC;
        computerBoard.appendChild(newSqC);
    }
    playerCon.appendChild(playerBoard);
    computerCon.appendChild(computerBoard);
}

const gameboardPlayer = new Gameboard();
const gameboardComputer = new Gameboard();
gameboardComputer.placeShipComputer();
createBoardPaC();
//btn input attack cords shit here I put the place where you enter input and it shots the enemy and the enemy shoots back
const inputCords = document.querySelector('.cordsInput');
const inputCordsBtn = document.querySelector('.cordsBtn');
inputCordsBtn.addEventListener('click', () => {
    if(inputCords.value != null){
        gameboardComputer.receiveAttack(inputCords.value, 2);
        gameboardPlayer.receiveAttack(computerChoice(), 1);
        if(gameboardComputer.checkIfSunk(2) == true){
            let message = document.createElement('div');
            message.textContent = "the game has ended! all the ships sunk! you won!";
            body.appendChild(message);
        } 
        if(gameboardPlayer.checkIfSunk(1) == true){
            let message = document.createElement('div');
            message.textContent = "the game has ended! all the ships sunk! you lost!";
            body.appendChild(message);
        }
        inputCords.value = '';
    } 
});


//checks if the ship goes from right to left and connected
function checkGoUp(splitInput){
    let startNum = parseInt(splitInput[0], 10);
    for(let i = 0; i < splitInput.length; i++){
        if(startNum != splitInput[i]){
            return false
        }
        startNum += 1;
    }
    return true
}
//checks if the ship goes from left to right and connected
function checkGoDown(splitInput){
    let endNum = parseInt(splitInput[splitInput.length - 1], 10);
    for(let i = 0; i < splitInput.length; i++){
        if(endNum != splitInput[splitInput.length - 1 - i]){
            return false
        }
        endNum += 1
    }
    return true
}
//btn input placeship shit.
//it can take a set of numbers with spaces then split them into an array. then it checks if it its not some random number,
//but the ships are connected, if they are connected, it will create a new ship and will display it.
const inputPlaceShip = document.querySelector('.placeShipInput');
const inputPlaceBtn = document.querySelector('.placeShipBtn');
let possibleShipsPlaceLength = [1,1,1,2,2,3];
inputPlaceBtn.addEventListener('click', () => {
    let splitInput = inputPlaceShip.value.split(' ');
    if(checkGoUp(splitInput) || checkGoDown(splitInput)){
        for(let i = 0; i < possibleShipsPlaceLength.length; i++){
            if(splitInput.length == possibleShipsPlaceLength[i]){
                gameboardPlayer.placeShip(splitInput);
                possibleShipsPlaceLength.splice(i,1);
                inputPlaceShip.value = '';
                return
            }
        }
    }
});

/*
let shipArrComp = [];
//creates invisible ships for the computer lol epiclly trolled 
function placeShipsComp(cordsPair){
      let cords = cordsPair.toString();
      let splitCords = cords.split(' ');
      let cordsYNcomp = [];
      for(let i = 0; i < splitCords.length; i++){
        console.log("for loops starts")
        cordsYNcomp.push(0);
      }
      let newShip = new Ship (splitCords.length, false, false, splitCords , cordsYNcomp)
      console.log(newShip);
      shipArrComp.push(newShip);

      for(let i = 0; i < cords.length; i++){
        let whichSq = parseInt(newShip.positions[0], 10);
        let whichSqI = parseInt(whichSq + i);
        let sq = document.querySelector('#computerSq' + whichSqI);
        sq.classList.add('ship');
      } 
   }
placeShipsComp(36, 37, 38);
placeShipsComp(12);
*/