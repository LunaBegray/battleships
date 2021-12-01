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
function Gameboard(){
    let gameboard = []
    for(let i = 0; i < 100; i++){
        gameboard.push(0);
    }
    this.placeShip = (cords) => {
        
    }
    
    this.receiveAttack = () => {

    };
}
