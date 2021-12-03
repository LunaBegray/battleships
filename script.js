function Ship (length, hitYN, sunkYN, positions, positionsYN){
    this.length = length;
    this.hitYN = hitYN;
    this.sunkYN = sunkYN;
    this.positions = positions;
    this.positionsYN =  positionsYN;
    //takes cords as a number and if the cords match this ship it marks it as hit in the positionYN array
    this.hit = (num) => {
        for(let i = 0; i < this.positionst.length; i++){
            if(num == this.positions[i]){
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
                hittedPositions.push(this.positions[i]);
            }
        }
        if(hittedPositions.length == this.positions.length){
            hittedPositions = [];
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
    let allSunkShips = []
    this.placeShip = (cords) => {
        let cordsYN = []
        for(let i = 0; i < cords.length; i++){
            cordsYN.push(0);
        }
        let newShip = new Ship (cords.length, false, false, cords, cordsYN)
        console.log(newShip);
        shipArr.push(newShip);
        for(let i = 0; i < cords.length; i++){
            let whichSq = parseInt(newShip.positions[0], 10);
            let whichSqI = parseInt(whichSq + i);
            let sq = document.querySelector('#playerSq' + whichSqI);
            sq.classList.add('ship');
        } 
    }
    //takes a pair of cords and detemines if it hits a ships, if yes it will mark it as hit. it will find the array of before the hit check and after it and then 
    //compare them, if they are equal it will add them to the array of missed shots. 
    //it also checks if all the ships has sunk, if they do it will make the var ifAllShipSunkTrue = true; 
    this.receiveAttack = (cordsPair) => {
        let splitInput = cordsPair.split(" ");
        for(let i = 0; i < splitInput.length; i++){
            let whichSq = parseInt(splitInput[i], 10);
            let whichSqI = parseInt(whichSq + i);
            let sq = document.querySelector('#playerSq' + whichSqI);
            let hitCircle = document.createElement('div');
            hitCircle.classList.add('hit');
            sq.appendChild(hitCircle);
        }
        //takes ship before the hit check into array
        let beforeHitShips = []
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].hitYN){
                beforeHitShips.push(1)
            }
        }
        //hit check, if it does hit then call the hit function of the ship that has been hit.
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].positions == cordsPair){
                shipArr[i].hit(cordsPair);
            }
        } 
        //take ship after the hit check into array
        let afterHitShips = []
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].hitYN){
                afterHitShips.push(1)
            }
        }
        //if hit ship array is the same before and after check it will deteramine that the shot was missed and add it to the missed shots array
        if(beforeHitShips == afterHitShips){
            missedShotsCord.push(cordsPair)
        }

        //loops through all the ships and checks if they have been sunk, if they do, push them to the sunk ships array.
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].isSunk){
                allSunkShips.push(shipArr[i]);
            }
        }
        //if all the ships that exist are sunk then the ifAllShipSUnkTrue varaible is true.
        if(allSunkShips == shipArr){
            ifAllShipSunkTrue = true;
        }
        
    };
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
let count;
Turns = () => {
    if(count == null){
        count = 2;
    } else {
        count += 1;
    }
    console.log(count + " count");
    let dividedCount = count/2
    let whoseTurn;
    let player = 1;
    let computer = 2;
    if(Number.isInteger(dividedCount) == true){
        console.log("player chosen");
        whoseTurn = player;
    } else{
        console.log("computer chosen");
        whoseTurn = computer;
    }
    return whoseTurn
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
function render(){

}
const gameboardPlayer = new Gameboard();
const gameboardComputer = new Gameboard();
createBoardPaC();
//btn input attack cords shit
const inputCords = document.querySelector('.cordsInput');
const inputCordsBtn = document.querySelector('.cordsBtn');
inputCordsBtn.addEventListener('click', () => {
    if(inputCords.value != null){
        gameboardPlayer.receiveAttack(computerChoice());
        gameboardComputer.receiveAttack(inputCords.value);
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
                console.log("ship check passed!");
                console.log(possibleShipsPlaceLength);
                gameboardPlayer.placeShip(splitInput);
                possibleShipsPlaceLength.splice(i,1);
                inputPlaceShip.value = '';
                render();
                console.log(possibleShipsPlaceLength);
                return
            }
        }
    }
});
function main(){
    
}
main();