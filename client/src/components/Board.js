import React from 'react';

import Wall from './Wall';
import Square from './Square';
import Player from './Player';
import {posToObj, arrToPos} from '../helper';
export default class Board extends React.Component{

    componentDidMount(){

    }
    handleClick(i,j){
        let position = arrToPos([j,i])
        let walls = this.props.walls.slice();
        let dir = prompt('H or V','V')
        //Sets wall position, is it horizontal or vertical
        if(dir != null && dir.toUpperCase()==='V'){
            position += dir

        }
        else if(dir != null && dir.toUpperCase()==='H'){
            position += dir


        }
        else {
            alert('enter a valid value')
            return null
        }
        //Check if the wall is already placed
        if(walls.includes(position)){
            alert('wall alredy exists')
            return null
        }
        //Check if the coordonates are correct

        //Add the wall to the board
        else {
            this.props.placeWall(position)
            // console.log('wall should be placed')
        }
    }
    renderSquare(i,j) {
        return <Square position={[i,j]}
                        onClick={()=>this.handleClick(i,j)}
                        key={'sq'+(j)+((i-1)*9)}/>;
    }

    render(){
        const status = this.props.message;
        let row = []

        //Creates the board (9*9)
        for(let i=0;i<9;i++){
            row.push(
                <div className='board-row' key={'rw'+i}>
                </div>)
            for(let j=0;j<9;j++){
                row.push(this.renderSquare((i+1),(j+1)))

            }
        }
        return (

            <div className='board'>

                <div className="status">{status}</div>

                {this.props.playersPos.map((player,index)=>{
                    let p = posToObj(player),
                        r = p.row,
                        c = p.col,
                        style = {
                            left:`${70+34*(r-1) -1*r}px`,
                            top :`${70+34*c -1*c}px`,
                        },
                        player1 = null

                        if(index===0)
                            player1 = true
                        else {
                            player1 = false
                        }
                        return <Player style={style} player1={player1} />


                })}

                {this.props.walls.map((wall)=>{
                    // console.log('this is the wall: '+wall)
                    let w = posToObj(wall),
                        r = w.row,
                        c = w.col,
                        className = 'wall-'+w.orr,
                        style = null;
                    if(w.orr==='v'){
                        style = {
                            left:`${70+34*r -1*r}px`,
                            top :`${70+34*c -1*c}px`,
                        }
                    }
                    else if(w.orr==='h'){
                        style = {
                            left:`${70+34*(r-1) -1*r}px`,
                            top :`${70+34*c -1*c}px`,
                        }
                    }
                    return <Wall  class={className}
                                    style={style}
                                    key={wall}/>
                    })}

                {row}

            </div>
        );
    }
}
