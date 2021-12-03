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
        shipArr.push(newShip);
    }
    //takes a pair of cords and detemines if it hits a ships, if yes it will mark it as hit. it will find the array of before the hit check and after it and then 
    //compare them, if they are equal it will add them to the array of missed shots. 
    //it also checks if all the ships has sunk, if they do it will make the var ifAllShipSunkTrue = true; 
    this.receiveAttack = (cordsPair) => {
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
//creates board
const playerCon = document.querySelector('.playerContainer');
const computerCon = document.querySelector('.computerContainer');
function createBoardPaC(){
    const playerBoard = document.createElement('div');
    const computerBoard = document.createElement('div');
    playerBoard.classList.add("playerBoard");
    computerBoard.classList.add("computerBoard");
    for(let i = 0; i < 100; i++){
        let newSqP = document.createElement('div');
        newSqP.classList.add('playerSq');
        const idForSqP = "playerSq" + i;
        newSqP.id = idForSqP;
        playerBoard.appendChild(newSqP);
        let newSqC = document.createElement('div');
        newSqC.classList.add("computerSq");
        const idForSqC = "computerSq" + i;
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
    if(Turns() == 1 && inputCords.value != null &&
     ( typeof inputCords.value == Number || Array.isArray(inputCords.value) || typeof inputCords.value == Array)){
        gameboardPlayer.receiveAttack(inputCords.value);
        inputCords.textContent = '';
        render();
    }
});
//btn input placeship shit
const inputPlaceShip = document.querySelector('.placeShipInput');
const inputPlaceBtn = document.querySelector('.placeShipBtn');
let possibleShipsPlaceLength = [1,1,1,2,2,3];
inputPlaceBtn.addEventListener('click', () => {
    for(let i = 0; i < possibleShipsPlaceLength.length; i++){
        if(gameboardPlayer.shipArr.length < 6 && inputPlaceShip.value.length == possibleShipsPlaceLength[i]){
            gameboardPlayer.placeShip(inputPlaceShip.value);
            inputPlaceShip.textContent = '';
            render();
        }
    }
});
function main(){
    
}
main();