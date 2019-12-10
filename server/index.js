const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);

let port  = 3001;

Socketio.on('connection',(socket)=>{
    console.log('A new user just connected ' +socket.id)
    socket.on('move',(position)=>{
      console.log(`New position requested is: ${position}`)
    })
    socket.on('placeWall',(position)=>{
        if(position.match(/\w\d\w/)){
            console.log(socket.id +':'+position)
            socket.emit('placeWall',position)
        }else{
            socket.emit('info',{msg:"wrong move"})
            console.log('wrong position')
        }

    })
    socket.on("disconnect", () => console.log("Client disconnected"));
})


Http.listen(port, ()=>{
    console.log(`Server running on port:${port}`)
})
