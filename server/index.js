var http = require('http').createServer(require('./app.js'));
var io = require('socket.io')(http)


const PORT  = 3001;

let rooms = []

io.on('connection',(socket)=>{
    console.log('A new user connected: '+socket.id)

    socket.on('createGame',(data)=>{
        console.log('data:'+data.name +' '+data.room)
        let room = new Room(data.room,data.name)
        socket.join(room.name)
        rooms.push(room)
        socket.emit('newGame',{name:data.name, room:data.room})
    })

    socket.on('joinGame',(data)=>{
        console.log(socket+'just joined room: '+data.room)
        socket.join(data.room)
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
    constructor(name, creator){
        this.name = name,
        this.creator = creator
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
