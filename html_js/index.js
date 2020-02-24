//import io from 'socket.io-client';

//let socket = io(127.0.0.1:3001)


let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext('2d');
let render = (ctx) => {
    let count = 0;
    const tileSize = 40;
    const wallSize =6;
    let x,y;
    for(let i = 0;i<9;i++){
        y = (i*tileSize)+ (i*wallSize)
        for(let  j= 0;j<9;j++){
            x = (j*tileSize)+ (j*wallSize)
            ctx.fillRect(x,y,tileSize,tileSize)
        }
    }
}
render(ctx)
