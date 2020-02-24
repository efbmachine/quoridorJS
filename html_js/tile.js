export default class Tile {
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
            this.neightbours.up = Tile.posPlusMoves(this.position, 0, 1)
            if(this.neightbours.up == null) delete this.neightbours.up
            this.neightbours.down = Tile.posPlusMoves(this.position, 0, -1)
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
