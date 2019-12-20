var http = require('http').createServer(require('./app.js'));
var io = require('socket.io')(http)


const PORT  = 3001;

let roomsJoinable = []
let rooms =[]
let players = []

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
                    socket.emit('sendRoom',{room:roomName})
                }
            })}
    })

    socket.on('getPlayers',()=>{

    })
    //To edit
    socket.on('placeWall?',(data)=>{
        console.log(socket.id+"("+data.room+"): "+data.position)
        rooms.map(room=>{
            if(room.name==data.room){
                console.log('room.turn1='+room.turn1)
                console.log('data.player1='+data.player1)
                if(room.turn1==data.player1){
                    io.to(data.room).emit('placeWall',{position:data.position})
                    room.toogleTurn()
                    let turn = room.turn1? 'Black':'White'
                    io.to(data.room).emit('message',{message:`It is now ${turn}'s turn`})
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
        this.wall = []
        this.turn1 = true
    }
    createGame(){

    }
    addPlayer(player){
        this.players.push(player)
    }
    toogleTurn(){
        this.turn1 = !this.turn1
    }

}




class Player{
    constructor(position, player1, wallNumber=10){
        this.position = position,
        this.player1 = player1
        this.wallNumber = wallNumber
        this.justPlayed = false;
    }
    placeWall(){
        if(wallNumber>0)
            this.wallNumber -= 1
        this.justPlayed =true
    }
}
