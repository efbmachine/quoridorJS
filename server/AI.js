

 class AI {

    constructor(startNode, endNode){
        this.position=0;
        this.walls =[]
        this.board = new Board(this.walls)
        this.path = this.shortestPath(startNode,endNode)
        }

    tileInArr(arr, tile){
        let rtn = [false]
        arr.forEach((item, i) => {
            if(item.position == tile.position){
                rtn.pop()
                rtn.push(true)
                rtn.push(i)
                return rtn
            }
        })
        return rtn
    }
    lowerFCost(arr, tile){
        let rtn;
        arr.forEach((item, i) => {
            if(item.position == tile.position && item.fCost > tile.fCost){
                // console.log(item)
                // console.log('------------------------------')
                // console.log(tile)
                return true
            }else
                return false
        });
    }
    shortestPath(startNode, endNode){
        //get starting point neightbours
        // calculate all their f cost
        // pick the one with the lowest fCost
        // if fCost are equal pick one with lowest hCost

        var open = []
        var closed = []
        let a = this.board.position2Tile(startNode)
        console.log(a)
        a.setFCost(startNode,endNode)
        open.push(a)

            var path = [],
                path_length = 999;
        let i =0
        while(open.length>0){
            i++
            var current = {fCost:999},
                current_pos = 0
                // console.log('closed:')
                // console.log(closed)
                // console.log('open:')
                // console.log(open)
            // Find one in open with lowest fCost
            open.forEach((tile,i) => {
                if(current.fCost > tile.fCost ){
                    // set that one tile to current
                    current = tile
                    current_pos = i
                }
                else if((current.fCost=tile.fCost)
                &&(current.hCost>tile.hCost)){
                        current = tile
                        current_pos = i
                    }

            });
            open.splice(current_pos,1)
            closed.push(current.position)
            // check if current is target
            if(current.position==endNode){
                console.log('path has been found')
                this.board.renderBoard()
                console.log(`found in ${i} tries`)
                //console.log(current)
                let path = []
                this.board.backtrackPath(current,path)
                path.reverse()
                console.log(`can be done in ${path.length} moves`)
                console.log(path)
                return path
            }

            //For each neightbour if not atteinable or in closed skip to next one
            for(let item in current.neightbours){
                let temp = current.neightbours[item]
                let nTile = this.board.position2Tile(temp)
                if(!this.board.isMovePossible(current.position,temp) || closed.includes(temp)){
                        continue
                    }

                let tia = this.tileInArr(open,nTile)
                // console.log(!tia[0])
                if(!tia[0] || this.lowerFCost(open,nTile)){
                    nTile.setFCost(startNode,endNode)
                    nTile.previous=current.position
                    if(this.lowerFCost(open,nTile))
                        {open.splice(tia[1],1)}
                    open.push(nTile)
                }
                // console.log("nTile")
                // console.log(nTile)
            }
            // console.log(`------------------${i}------------------------------------------`)
            // this.board.renderBoard()
            // console.log(open)
        }
        console.log(false)
        return false
    }


}

class Board {
    constructor(walls){
        this.Tiles = []
        this.walls = walls
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
        walls.forEach((item, i) => {
            this.wallToBlockedWays(item)
        });
        this.createBoard()
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
        for(let x=1;x>=9;x++){
            for(let y=1;y<=9;y++){
                var letter = String.fromCharCode(96 + y)
                var coord = letter +x
                console.log(coord)
                this.Tiles.push(new Tile(coord))
            }
        }
    }
    renderBoard(){
        let count = 0;
        this.Tiles.forEach((Tile,i) => {
            // if(Tile.fCost<999 && Tile.previous!=null){
            //     process.stdout.write(' '+Tile.previous+' ')
            //
            // }else{

                // let char = 3 - Tile.fCost.length
                // let str = ''
                //
                // while(char<3){
                //     char++
                //     str+=' '

                //}
                process.stdout.write(' '+Tile.position+' ');
            //}
            count++
            if(count%9==0){
                console.log()
            }
        })
    }
    position2Tile(position){
        let num = this.position2Number(position)
        console.log(this.Tiles)
        return this.Tiles[num]
    }
    position2Number(position){
        console.log('-------------------------------')
        console.log(position)
        // return the number in the arr of a given position
        let x = position[0].charCodeAt(0) - 96
        console.log(x)
        let y = Number(position[1])
        console.log(y)
        console.log('------------')
        console.log(x+9*(y-1))

        return (x+9*(y-1))
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
        acc.push(tile.position)
        this.backtrackPath(parrent,acc)

    }


}
class Tile {
        constructor(position){
            this.position = position
            this.previous = null
            this.gCost = 999
            this.hCost = Number(position[1])-1
            this.fCost = 999
            this.enemy = false
            this.neightbours = {}
            this.setNeightbours()
        }
        move(){
            return true
        }
        setNeightbours() {
            this.neightbours.up = Tile.posPlusMoves(this.position, 0, -1)
            if(this.neightbours.up == null) delete this.neightbours.up
            this.neightbours.down = Tile.posPlusMoves(this.position, 0, 1)
            if(this.neightbours.down == null) delete this.neightbours.down
            this.neightbours.left = Tile.posPlusMoves(this.position, -1, 0)
            if(this.neightbours.left == null) delete this.neightbours.left
            this.neightbours.right = Tile.posPlusMoves(this.position, 1, 0)
            if(this.neightbours.right == null) delete this.neightbours.right

        }
        setGCost(startNode){
            this.gCost = Tile.distance(startNode, this.position)
        }
        setHCost(endNode){
            this.hCost = Tile.distance(this.position, endNode)
        }
        setFCost(startNode, endNode){
            this.setGCost(startNode)
            this.setHCost(endNode)
            this.fCost = this.gCost + this.hCost
        }
        static posPlusMoves(coord, x_offset, y_offset) {
            let x = (coord[0].charCodeAt(0) - 96 + x_offset)
            let y = (Number(coord[1]) + y_offset)
            let rtn = String.fromCharCode(96 + x)
                rtn += y
            // Check wether x or y is <1 && >9
            if(x<1 || x>9 ||y<1 ||y>9){
                return null
            }
            return rtn
        }
        static distance(startNode, endNode){
            let x1 = startNode[0].charCodeAt(0) - 96,
                x2 = endNode[0].charCodeAt(0) - 96,
                y1 = Number(startNode[1]),
                y2 = Number(endNode[1])
            let x_ofset = Math.abs(x1-x2),
                y_ofset = Math.abs(y1-y2)
            let distance = x_ofset + y_ofset
            return distance
        }

}
// let ai = new AI('a1','e1')
