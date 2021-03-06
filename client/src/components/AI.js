const io = require('socket.io-client');

export default class AI {
    ///
    ///
    ///             NEED TO FIX THE BOARD POSITIONING PROBLEM
    ///             WORKING ONLY ON STRAIGHT LINE RIGHT NOW
    ///

    constructor(startNode,roomName,url){
        this.position=startNode;
        this.walls =[]
        this.socket = io(url)
        this.roomName = roomName
        this.socket.emit('joinRoom',{roomName:this.roomName})
        this.board = new Board(this.walls)
        this.path = this.shortestPath(startNode)

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
    shortestPath(startNode){
        //get starting point neightbours
        // calculate all their f cost
        // pick the one with the lowest fCost
        // if fCost are equal pick one with lowest hCost
        let endNode = ''
        endNode += startNode[0]+'9'
        console.log(startNode, endNode);
        var open = []
        var closed = []
        let a = this.board.position2Tile(startNode)
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
                console.log(`path found in ${i} attempt`)
                //console.log(current)
                let path = []
                this.board.backtrackPath(current,path)
                // console.log(`Path is ${path.length} move long`)
                // console.log(path)
                console.log('this is the new path: ' + path)
                console.log('Ai is at'+ startNode);
                var currentNode = path.indexOf(startNode)
                if(currentNode!= -1)
                    path.splice(currentNode)
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

            // console.log(open)
        }
        return false
    }
    goTo(position){
        this.position = position
        this.socket.emit('move',{player1:false,
                                    room:this.roomName,
                                    position:position})
        console.log('Ai moved to:' + this.position)


    }
    placeWall(wall){
        this.socket.emit('placeWall?',{position:wall,
                                        room:this.roomName,
                                        player1:false})
    }
    update(enemyMove){
        if(enemyMove.length==3){
            //add the new wall to the board
            this.board.addWall(enemyMove)
            //check the new best path to objective
            //console.log('Ai position: ' + this.position)

            // console.log('new path by update:+'+this.path)
        }
        // If the enemy is simply moving then set the currPos to false
        // and the next one to tru
        else{
            this.opponent = enemyMove
        }
        this.path = this.shortestPath(this.position)
    }
    play(){
        var newPos = this.path.pop()
        this.goTo(newPos)
        console.log('remaining path:'+ this.path)
        console.log('-------------------------------------------')
    }
    waitTurn(){
        // console.log('AI is waiting for U')
        this.socket.on('turn',(data)=>{
            // console.log('It is my turn xD')
            this.update(data.move)
            this.play()

        })
    }
}

class Board {
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

        this.createBoard()
    }
    wallToBlockedWays(wallCoord){
        let rtn = []
        if(wallCoord[2]=='h' || wallCoord[2]=='H'){
            let tmp = wallCoord.slice(0,-1)
            let x1 = tmp,
                y1 = Tile.posPlusMoves(tmp, 0,-1),
                x2 = Tile.posPlusMoves(tmp, 1,0),
                y2 = Tile.posPlusMoves(tmp, 1,-1)
            rtn.push([x1,y1])
            rtn.push([x2,y2])

        }else if (wallCoord[2]=='v'|| wallCoord[2]=='V') {
            let tmp = wallCoord.slice(0,-1)
            console.log(2)
            let x1 = tmp,
                y1 = Tile.posPlusMoves(tmp, 1,0),
                x2 = Tile.posPlusMoves(tmp, 0,+1),
                y2 = Tile.posPlusMoves(tmp, 1,+1)
            rtn.push([x1,y1])
            rtn.push([x2,y2])
            //console.log(rtn)

        }
        let temp = this.blockedWays.concat(rtn)
        this.blockedWays = temp
    }

    createBoard(){
        for(let x=1;x<=9;x++){
            for(let y=1;y<=9;y++){
                var letter = String.fromCharCode(96 + y)
                var coord = letter +x
                this.Tiles.push(new Tile(coord))
            }
        }
    }
    addWall(wall){
        this.wallToBlockedWays(wall)
        this.walls.push(wall)
    }
    position2Tile(position){
        let num = Board.position2Number(position)
        return this.Tiles[num]
    }
    static position2Number(position){
        // console.log('----------p2N---------------------')
        // return the number in the arr of a given position
        let x = position[0].charCodeAt(0) - 96
        let y = Number(position[1])
        return ((x+9*(y-1))-1)
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
        if(tile.previous == undefined || tile.previous== null|| acc.includes(tile.position)){
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
