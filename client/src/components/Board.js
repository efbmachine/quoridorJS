import React from 'react';

import Wall from './Wall';
import Square from './Square';
import Player from './Player';
import {posToArr, arrToPos} from '../helper';
export default class Board extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }
    handleClick(i,j){
        let position = arrToPos([j,i])
        let walls = this.props.walls.slice();
        let dir = prompt('H or V','V')
        //Sets wall position, is it horizontal or vertical
        if(dir != null && dir.toUpperCase()==='V'){
            position += dir
            console.log(position)
            // socket.emit('placeWall?',{position:position})
            // socket.on('placeWall',(data)=>{
            //     walls.push(data.position)
            //     this.setState({walls:walls})
            // })
        }
        else if(dir != null && dir.toUpperCase()==='H'){
            position += dir
            console.log(position)
            // socket.emit('placeWall?',{position:position})
            // socket.on('placeWall',(data)=>{
            //     walls.push(data.position)
            //     this.setState({walls:walls})
            // })

        }
        else {
            alert('enter a valid value')
        }
        //Check if the wall is already placed
        if(walls.includes(position)){
            alert('wall alredy exists')
        }
        //Check if the coordonates are correct

        //Add the wall to the board
        else {
            this.props.placeWall(position)
            console.log('wall should be placed')
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
                    let p = posToArr(player),
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
                    console.log('this is the wall: '+wall)
                    let w = posToArr(wall),
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
/*
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
}; */
