var http = require('http').createServer(require('./app.js'));
var io = require('socket.io')(http);
var AI = require('./AI.js');


const PORT  = 3001;

let roomsJoinable = []
let rooms =[]
let players = []
let AIS = []

io.on('connection',(socket)=>{
    console.log('A new user connected: '+socket.id)
    socket.on('getRooms',(data)=>{
            socket.emit('sendRooms',{rooms:roomsJoinable})
            console.log('sentRooms:' +roomsJoinable.map(map=> map.name))
    })

    socket.on('createRoom',(data)=>{
        let room = new Room(data.roomName)
        if(roomsJoinable.includes(room)){
            socket.emit('message',{msg:'Room already exists'})
        }
        else{
            socket.join(room.name)
            console.log(socket.id +' just joined room: '+data.roomName)
            // Create a player element and add it to the room
            let player = new Player('e1',true)
            room.addPlayer(player)
            players.push(player) // needs to be modified
            roomsJoinable.push(room)
            console.log(room.name +' was added to roomsJoinable')
        }
    })

    socket.on('createRoomAI',(data)=>{
        let room = new Room('AI'+AIS.length)
        socket.join(room.name)
        console.log(socket.id +' just joined room: '+room.name)
        // Create a player element and add it to the room
        let player = new Player('e1',true)
        room.addPlayer(player)
        players.push(player) // needs to be modified
        //CREATE THE AI OVER HERE
        let ai = new AI('e9','e1')
        AIS.push(ai)
        socket.emit('wakeUp',{roomName:room.name})
        console.log(room.name +' was added to ai list')

    })

    socket.on('joinRoom',(data)=>{
        //Make player join the room
        socket.join(data.roomName)
        console.log(socket.id +' just joined room: '+data.roomName)
        //Add player2 to room and create a player2
        //Remove the room from roomsJoinable since there is two players already
        //and put it in rooms
        roomsJoinable.map((room,index)=>{
            if(room.name==data.roomName){
                let player = new Player('e9',false)
                room.addPlayer(player)
                rooms.push(room)
                roomsJoinable.splice(index,1)

                console.log('Removed room: '+data.roomName)
            }
        })
        io.to(data.roomName).emit('joinedRoom')
        io.to(data.roomName).emit('message',{message:'Room is full game can start'})
    })

    socket.on('getRoom',()=>{
        console.log('user trying to get which room he\'s in')
        let roomName = Object.keys(socket.rooms)[1]
        let found = false;
        roomsJoinable.map(room=>{
            if(room.name===roomName){
                found = true;
                socket.emit('sendRoom',{room:roomName})
            }
        })
        if(!found){
            rooms.map(room=>{
                if(room.name===roomName){
                    console.log(room)
                    socket.emit('sendRoom',{room:roomName})
                }
            })}
    })

    socket.on('getPlayers',(data)=>{
        let found = false
        roomsJoinable.map(room=>{
        //    console.log(`${room.name}: ${room.players}`)
            if(room.name==data.room){
                found = true
                console.log('these are the players:' + room.players)
                socket.emit('getPlayers',{players:room.players})
            }
        })
        if (!found){
            rooms.map(room=>{
                if(room.name==data.room){
                    found = true
                    console.log('these are the players:' + room.players)
                    socket.emit('getPlayers',{players:room.players})
                }
            })
        }
    })
    socket.on('getPosition',(data)=>{
        console.log('sending player postion')

    })

    socket.on('placeWall?',(data)=>{
        var player = data.player1? 'Black' : 'White'
        console.log(player+"("+data.room+"): "+data.position)
        player = data.player1 ? 0 : 1
        rooms.map(room=>{
            if(room.name==data.room){
                if(room.turn1==data.player1){
                    if(room.players[player].placeWall()){
                        room.addWall(data.position)
                        io.to(data.room).emit('wallNumber',{wallNumber:room.getPlayerWallNumber()})
                        io.to(data.room).emit('placeWall',{position:data.position})
                        room.toogleTurn()
                        let turn = room.turn1? 'Black':'White'
                        io.to(data.room).emit('message',{message:`It is now ${turn}'s turn`})
                    }else {
                        socket.emit('message',{message:'You don\'t have anymore walls'})
                    }
                }else{
                    socket.emit('message',{message:'It is not your turn'})
                }
            }
        })
    })

    socket.on('move',(data)=>{
        var player = data.player1? 'Black' : 'White'
        rooms.map(room=>{
            if(room.name==data.room){
                // console.log('room.turn1='+room.turn1)
                // console.log('data.player1='+data.player1)
                if(room.turn1==data.player1){
                    var oldPosition = data.player1? room.players[0].position
                                                    :room.players[1].position
                    console.log(`${player}(${data.room}):${oldPosition}-->${data.position}`)

                    //TODO: Check if move is posible
                    var possible = true;
                    console.log(room.blockedPaths)
                    room.blockedPaths.map(block=>{
                        console.log(block)
                        if( (block[1]==oldPosition && block[0]==data.position)||
                            (block[0]==oldPosition && block[1]==data.position)){
                                possible=false;
                            }
                    })
                    if(possible){
                        io.to(data.room).emit('move',{player1:data.player1,
                                                        position:data.position})
                        room.toogleTurn()
                        //changes player position in the room
                        if(data.player1){
                            room.players[0].changePosition(data.position)
                        }else{
                            room.players[1].changePosition(data.position)
                        }
                        let turn = room.turn1? 'Black':'White'
                        io.to(data.room).emit('message',{message:`It is now ${turn}'s turn`})
                    }else{
                        socket.emit('message',{message:'Move is not posible'})
                    }
                }else{
                    socket.emit('message',{message:'It is not your turn'})
                }
            }
        })
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})
http.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})

// Class definition
class Room{
    constructor(name){
        this.name = name,
        this.game = null
        this.players =[]
        this.walls = []
        this.blockedPaths = []
        this.turn1 = true
    }
    getPlayerWallNumber(){
        let arr =[]
        arr.push(this.players[0].wallNumber)
        arr.push(this.players[1].wallNumber)
        return arr
    }
    addPlayer(player){
        this.players.push(player)
    }
    toogleTurn(){
        this.turn1 = !this.turn1
    }
    getPlayerPositions(){
        let arr =[]
        arr.push(this.players[0].position)
        arr.push(this.players[1].position)
        return arr
    }
    blockedWays(wall){
        let pos = posToObj(wall)
        if(pos.orr=='h'){
            // example:  f3h: f3-f2; g3-g2
            // means the offset is -1 for col and then +1 for row
            let path = {};
            //  TO SEE THE KEYS OF path USE Object.entries(path)
            let p1 = numToTxt(pos.row)+ (pos.col+1),
                p2 = numToTxt(pos.row) +(pos.col);
            let p3 = numToTxt(pos.row+1) + (pos.col+1),
                p4 = numToTxt(pos.row+1) +(pos.col);
            path[p1]= p2
            path[p3]= p4
            let rtn = []
            Object.entries(path).map(entries=>{
                rtn.push(entries)
            })
            return rtn
        }
        else{
            // example: f3v: f3-g3:f4-g4
            //means the offset is +1 for row and then +1 for col
            let path = {};
            let p1 = numToTxt(pos.row)     +  (pos.col+1),//f3
                p2 = numToTxt(pos.row+1) + (pos.col+1);//g3
            let p3 = numToTxt(pos.row)   + (pos.col+2),//f4
                p4 = numToTxt(pos.row+1) + (pos.col+2);//g4
            path[p1]= p2;
            path[p3]= p4;
            let rtn = []
            Object.entries(path).map(entries=>{
                rtn.push(entries)
            })
            console.log(rtn)
            return rtn
        }
    }
    addWall(wall){
            this.walls.push(wall)
            let path = this.blockedWays(wall)
            let temp =this.blockedPaths.concat(path)
            this.blockedPaths = temp
            console.log('here are all the forbidden moves: '+this.blockedPaths)
    }
    // ---------------------- INCOMPLETE -------------------
    openPath(brockedPaths){
        // Function to check whether there is still a way toward the enemy line
        // example:  f3h: f3-f2; g3-g2
    }
}

class Player{
    constructor(position, player1, wallNumber=10){
        this.position = position,
        this.player1 = player1
        this.wallNumber = wallNumber
    }
    placeWall(){
        if(this.wallNumber>0){
            this.wallNumber -= 1
            return true
        }else
            return false
    }
    changePosition(newPos){
        this.position=newPos
    }
}

// const isPlaceable = (wall, walls) =>{
//     walls.forEatch((item)=>{
//         if(item.position == wall.position)
//             return false;
//         return true;
//     })
// }

const posToObj = (position)=>{
    let regex = /(\w)(\d)(\w?)/
    let positions = position.match(regex)
    let row = positions[1].charCodeAt(0) - 96
    return ({'row':row,'col':Number(positions[2])-1,'orr':positions[3].toLowerCase()})
}
const numToTxt =(num)=>{
    return String.fromCharCode(96 + Number(num))
}
const objToPos =(obj)=>{
    let r = numToTxt(obj.row),
        c = obj.col+1,
        o = obj.orr;
    return (r+''+c+''+o)
}
