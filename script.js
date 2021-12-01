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
        let beforeHitShips = []
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].hitYN){
                beforeHitShips.push(1)
            }
        }
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].positions == cordsPair){
                shipArr[i].hit(cordsPair);
            }
        } 
        let afterHitShips = []
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].hitYN){
                afterHitShips.push(1)
            }
        }
        if(beforeHitShips == afterHitShips){
            missedShotsCord.push(cordsPair)
        }
        let allSunkShips = []
        for(let i = 0; i < shipArr.length; i++){
            if(shipArr[i].isSunk){
                allSunkShips.push(shipArr[i]);
            }
        }
        if(allSunkShips == shipArr){
            ifAllShipSunkTrue = true;
        }
    };
}
