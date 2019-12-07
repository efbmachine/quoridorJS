import React from 'react';
import io from'socket.io-client';

//import Wall from './Wall';
import Square from './Square';

export default class Board extends React.Component{
    renderSquare(i,j) {
        return <Square position=[i,j]/>;
    }
    render(){
        const status = 'Next player: X';
        let row = []
        for(let i=0;i<9;i++){
            row.push(
                <div className='board-row'>
                </div>)
            for(let j=0;j<9;j++){
                row.push(this.renderSquare((i+1),(j+1)))

            }
        }
        return (

            <div>
                <div className="status">{status}</div>

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
