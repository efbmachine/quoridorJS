class AI {
    constructor(){
        let board = new Board()
    }
}
class Board {
    constructor(){
        this.board = []
        this.walls = []
        this.createBoard()
        console.log(this.position2Number('a8'))
        //this.renderBoard()
    }
    position2Number(position){
        let x = position[0].charCodeAt(0) - 96
        console.log(x)
        let y = Number(position[1])
        console.log(10-y)
        return (x+9*(9-y))
    }
    createBoard(){
        //
        for(let x=9;x>=1;x--){
            for(let y=1;y<=9;y++){
                var letter = String.fromCharCode(96 + y)
                var coord = letter +x
                // process.stdout.write(coord+" ");
                this.board.push(new Tile(coord, true, x-1))
            }
            //console.log()
        }
    }
    renderBoard(){
        let count = 0;
        this.board.forEach((Tile,i) => {
            process.stdout.write(Tile.position+' ');
            count++
            if(count%9==0){
                console.log()
            }
        });

    }

}
class Tile {
        constructor(position,sl=true,proximity){
            this.position = position
            this.sl = sl
            this.proximity = proximity
            //Up, Down, Left, Right
            this.neightbour = { up:null,
                                down:null,
                                left:null,
                                right:null}
        }

}
let ai = new AI()
