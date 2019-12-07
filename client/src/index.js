import React from 'react';
import ReactDOM from 'react-dom';
//import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



class Player {
    constructor(player1){
        this.player1 = player1;
        this.position = player1 ? 'e9' : 'e1';
        this.wallNumber = 10;
        let iconUrl = (player1 ?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg");
        this.style = {backgroundImage: "url('"+iconUrl+"')"};
    }

    static isMovePossible = (src,dst,walls,otherPlayer) => {
        //Returns false if there is a wall in the way;
        //        Also checks if enemy at destination to offset destination by 1
        var path = []
        path.push(posToArr(src))
        path.push(posToArr(dst))
        let checkWall = ()=>{

            walls.forEatch((wall)=>{
                wall.blockedWays().forEatch((path)=>{
//                    if()
                })
            })
        }
        return true;
    }

}

const posToArr = (position)=>{
    let regex = /(\w)(\d)(\w?)/
    let positions = position.match(regex)
    let row = positions[1].charCodeAt(0) - 97
    return ({'row':row,'col':Number(positions[2])-1,'orr':positions[3]})
}
const arrToPos = (arr)=>{
    let regex = /(\d)(\d)(\w?)/
    let arrs = arr.match(regex)
    let row = String.fromCharCode(97 + arrs[1])
    return (row+''+(Number(arrs[2])+1)+arrs[3])
}


class Wall{
    constructor(position){
        this.position = position;
    }

    blockedWays = () =>{
        let pos = posToArr(this.position)
        if(pos.orr=='h'){
            // example:  f3h: f3-f2; g3-g2
            // means the offset is -1 for col and then +1 for row
            let path = {};
            //  TO SEE THE KEYS OF path USE Object.entries(path)
            let p1 = pos.row+''+pos.col,
                p2 = pos.row +''+(pos.col-1);
            let p3 = (pos.row+1) + '' +pos.col,
                p4 = (pos.row+1) + '' +(pos.col-1);
            path[p1]= p2
            path[p3]= p4
            return Object.entries(path)
        }
        else{
            // example: f3v: f3-g3:f4-g4
            //means the offset is +1 for row and then +1 for col
            let path = {};
            let p1 = pos.row     + '' + pos.col,//f3
                p2 = (pos.row+1) + '' + pos.col;//g3
            let p3 = (pos.row)   + '' + pos.col+1,//f4
                p4 = (pos.row+1) + '' + (pos.col+1);//g4
            path[p1]= p2;
            path[p3]= p4;
            return Object.entries(path)
        }
    }

    static isPlaceable = (wall, walls) =>{
        walls.forEatch((item)=>{
            if(item.position == wall.position)
                return false;
            return true;
        })
    }
}







ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
