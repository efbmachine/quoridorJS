import React from 'react';
import io from'socket.io-client';

import Wall from './Wall';
import Square from './Square';
import {posToArr, arrToPos} from '../helper';

export default class Board extends React.Component{
    constructor(props){
      super(props)
      const margin = 70
      const squareSize = 34

      this.state={
        walls:props.walls || []

      }
    }

    handleClick(i,j){
        let position = arrToPos([j,i])
        let walls = this.state.walls.slice();
        let dir = prompt('H or V','V')
        if(dir != null && dir.toUpperCase()=='V'){
            position += dir
            console.log(position)
            walls.push(position)
            this.setState({walls:walls})
        }
        else if(dir != null && dir.toUpperCase()=='H'){
            position += dir
            console.log(position)
            walls.push(position)
            this.setState({walls:walls})

        }
        else {
            alert('enter a valid value')
        }
    }
    renderSquare(i,j) {
        return <Square position={[i,j]}
                        onClick={()=>this.handleClick(i,j)}
                        key={'sq'+(j)+((i-1)*9)}/>;
    }

    render(){
        const status = 'Next player: White';
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
        console.log(row)
        return (

            <div className='board'>
                <div className="status">{status}</div>

                {this.state.walls.map((wall)=>{
                    let w = posToArr(wall),
                        r = w.row,
                        c = w.col,
                        className = 'wall-'+w.orr,
                        style = null;
                    if(w.orr=='v'){
                        style = {
                            left:`${70+34*r -1*r}px`,
                            top :`${70+34*c -1*c}px`,
                        }
                    }
                    else if(w.orr=='h'){
                        style = {
                            left:`${70+34*(r-1) -1*r}px`,
                            top :`${70+34*c -1*c}px`,
                        }
                    }
                    return <Wall  class={className}
                                    style={style}
                                    key={wall}/>
                    }
                )}

                {row}

            </div>
        );
    }
}
/**
    constructor(props){
        super(props)
        this.state = {
            walls: props.walls
        }
    }
    componentDidMount() {
        this.createBoard();
        this.displayWalls();
    }
    createBoard() {
        const ctx = this.refs.game.getContext('2d');
        ctx.fillStyle = 'orange'
        for (let i =0 ; i<9 ;i++){
            for(let j=0; j <9;j++){
                //working version of displaying board:
                //             ctx.fillRect(j*54+(j*11.4),i*54+(i*11.4),50,50)
                ctx.fillRect(
                    (11.4)+(54*j)+(11.4*j),
                    (11.4)+(54*i)+(11.4*i),
                    54,54)
            }
        }
    }

    displayWalls(){
        if(this.state.walls != []){
            console.log(this.state.walls)
            this.props.walls.forEach((data)=>{
                let wall = new Wall(data)
                wall.display(this.refs.game)
            })
        }
    }

    render(){
        //    board.push(<div className="row">{squareRows}</div>)
        return(
            <div className='container'>
                <div className=''>
                    <canvas ref='game' width={this.props.width} height={this.props.height}
                        style={{border: '1px solid black'}}>

                    </canvas>

                </div>
            </div>

        );
    }
}; **/
