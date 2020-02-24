import Tile from './tile.js'
export default class Board {
    constructor(){
        this.Tiles = []
        this.walls = []
        this.blockedWays = [
                            // ['a1','a2'],['b1','b2'],
                            // ['c1','c2'],['d1','d2'],
                            // ['e1','e2'],['f1','f2'],
                            // ['g1','g2'],['h1','h2'],
                            //
                            // ['b8','b9'],['c8','c9'],
                            // ['d8','d9'],['e8','e9'],
                            // ['f8','f9'],['g8','g9'],
                            // ['i8','i9'],['h8','h9']

                        ]
    }
    wallToBlockedWays(wallCoord){
        let rtn = []
        console.log(wallCoord)
        console.log(0)
        if(wallCoord[2]=='h' || wallCoord[2]=='H'){
            let tmp = wallCoord.slice(0,-1)
            console.log(1)
            let x1 = tmp,
                y1 = Tile.posPlusMoves(tmp, 0,+1),
                x2 = Tile.posPlusMoves(tmp, 1,0),
                y2 = Tile.posPlusMoves(tmp, 1,+1)
            rtn.push([x1,y1])
            rtn.push([x2,y2])
            console.log(rtn)

        }else if (wallCoord[2]=='v'|| wallCoord[2]=='V') {
            let tmp = wallCoord.slice(0,-1)
            console.log(2)
            let x1 = tmp,
                y1 = Tile.posPlusMoves(tmp, 1,0),
                x2 = Tile.posPlusMoves(tmp, 0,-1),
                y2 = Tile.posPlusMoves(tmp, 1,-1)
            rtn.push([x1,y1])
            rtn.push([x2,y2])
            console.log(rtn)

        }
        console.log(3)
        let temp = this.blockedWays.concat(rtn)
        this.blockedWays = temp
    }
    createBoard(){
        for(let x=9;x>=1;x--){
            for(let y=1;y<=9;y++){
                var letter = String.fromCharCode(96 + y)
                var coord = letter +x
                this.Tiles.push(new Tile(coord))
            }
        }
    }
    render(ctx){
        let count = 0;
        const tileSize = 20;
        const wallSize =6;
        let x,y;
        for(let i = 0;i<9;i++){
            x = (i*tileSize)+ (i*wallSize)
            for(let  j= 0;j<9;j++){
                y = (j*tileSize)+ (j*wallSize)
                ctx.fillRect(y,x,tileSize,tileSize)
            }
        }
    }
    position2Tile(position){
        let num = this.position2Number(position)
        return this.Tiles[num]
    }
    position2Number(position){
        // console.log('-------------------------------')
        // console.log(position)
        // return the number in the arr of a given position
        let x = position[0].charCodeAt(0) - 96
        let y = Number(position[1])
        return (x+9*(9-y))-1
    }
    isMovePossible(current, next){
        var rtn = true
        this.blockedWays.forEach(block=>{
            if((block[1]==current && block[0]==next)
            || (block[0]==current && block[1]==next)){
                    rtn = false
            }
        })
        return rtn


    }
    backtrackPath(tile,acc){
        if(tile.previous == undefined || tile.previous== null){
            return acc;
        }
        let parrent = this.position2Tile(tile.previous)
        acc.push(parrent)
        this.backtrackPath(parrent,acc)

    }


}
