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
        console.log('data:'+data.roomName)
        let room = new Room(data.roomName)
        if(roomsJoinable.includes(room))
        socket.join(room.name)
        // Create a player element and add it to the room
        let player = new Player('e1',true)
        room.addPlayer(player)
        players.push(player)
        roomsJoinable.push(room)
        console.log(roomsJoinable)
    })

    socket.on('joinRoom',(data)=>{
        //Make player join the room
        socket.join(data.roomName)
        console.log(socket+'just joined room: '+data.roomName)
        //Add player2 to room and create a player2
        //Remove the room from roomsJoinable since there is two players already
        //and put it in rooms
        roomsJoinable.map((room,index)=>{
            if(room.name==data.roomName){
                let player = new Player('e9',false)
                room.addPlayer(player)
                rooms.push(room)
                roomsJoinable.slice(index,1)
                console.log('Removed room: '+data.roomName)
            }
        })
        socket.emit('joinedRoom')
    })
    //To edit
    socket.on('placeWall?',(data)=>{
        console.log(socket.id+": "+data.position)
        io.to('blah').emit('placeWall',{position:data.position})
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
    }
    createGame(){
        let game = new Game(players[0],player[1],[])
    }
    addPlayer(player){
        this.players.push(player)}

    }

class Game {
    constructor(player1,player2,walls){
        this.p1 = player1
        this.p2 = player2
        this.walls = walls
    }
}
class Player{
    constructor(position, player1, wallNumber=10){
        this.position = position,
        this.player1 = player1
        this.wallNumber = wallNumber
    }
    placeWall(){
        if(wallNumber>0)
            this.wallNumber -= 1
    }
}
