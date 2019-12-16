var http = require('http').createServer(require('./app.js'));
var io = require('socket.io')(http)


const PORT  = 3001;

let rooms = []

io.on('connection',(socket)=>{
    console.log('A new user connected: '+socket.id)
    socket.on('getRooms',(data)=>{
            socket.emit('sendRooms',{rooms:rooms})
            console.log('sentRooms:' +rooms.map(map=> map.name))
    })

    socket.on('createRoom',(data)=>{
        console.log('data:'+data.roomName)
        let room = new Room(data.roomName)
        if(rooms.includes(room))
        socket.join(room.name)
        rooms.push(room)
        console.log(rooms)
    })

    socket.on('joinRoom',(data)=>{
        //Make player join the room
        socket.join(data.roomName)
        console.log(socket+'just joined room: '+data.roomName)
        //Remove the room from Rooms since there is two players already
        rooms.map((room,index)=>{
            if(room.name==data.roomName){
                rooms.slice(index,1)
                console.log('Removed room: '+data.roomName)
            }
        })
        socket.emit('joinedRoom')
    })

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
        if(this.players.length < 1){
            this.players.push(player)}
        else{
            res.json({data:{message:'There are already two users in this room'}})
        }

    }
}
class Game {
    constructor(player1,player2,walls){
        this.p1 = player1
        this.p2 = player2
        this.walls = walls
    }
}
class Player{
    constructor(name,position, player1, wallNumber){
        this.name =name,
        this.position = position,
        this.player1 = player1
        this.wallNumber = wallNumber
    }
    placeWall(){
        if(wallNumber>0)
            this.wallNumber -= 1
    }
}
