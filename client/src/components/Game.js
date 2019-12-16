import React from 'react';
import io from 'socket.io-client';

import Board from './Board';


export default class Game extends React.Component{
    constructor(props){
        super()
        this.socket = io('localhost:3001')
        this.state={
            walls:[],
            players:[],
            message:''
        }

    }
    componentDidMount() {

    }
    renderBoard() {
        return(
            <div className="game-area">

                <Board width='500px' height='500px' playersPos={['e9','e1']}/>

            </div>
        )
    }

    placeWall = (position) =>{
        console.log(position)
        this.socket.emit('placeWall',position)
        this.socket.on('placeWall',(wall)=>{
            if(!this.state.walls.includes(wall)){
                this.setState({
                    walls: this.state.walls.concat([wall])
                })
            }
            //this.state.walls.push(wall)
            console.log('server said: ' + wall)
        })
    }
    render(){
        return(
            <section>
                <div>
                    <Board width={600} height={600} walls={this.state.walls} room=/>
                </div>
                Enter wall coordonates
                <input className="wall" defaultValue="a2v"
                        onChange={(e)=>this.placeWall(e.target.value.toLowerCase())}/>
                <br/>

            </section>
        )
    }
}
