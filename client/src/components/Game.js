import React from 'react';
import io from 'socket.io-client';

import Board from './Board';
import Controls from './Controls'
import {posToArr, arrToPos} from '../helper';

export default class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            walls:[],
            roomName:'',
            message:'Waiting for another player',
            playersPos:[]
        }

    }
    componentDidMount() {
        this.getRoom()
        this.props.socket.on('message',(data)=>{
            console.log(data.message)
            this.setState({message:data.message})
        })
        this.waitForWall()
        this.getPositions()

    }
    renderBoard() {
        return(
            <div className="game-area">

                <Board width='500px' height='500px' playersPos={['e9','e1']}/>

            </div>
        )
    }
    componentDidUpdate() {

    }

    placeWall = (position) =>{
        console.log('sending this wall to server: '+position)
        let room = this.state.roomName
        console.log('this is the room we\'re in: '+ room)
        let player1 = this.props.player1
        this.props.socket.emit('placeWall?',{position:position,room:room,player1:player1})
        //Wait for the opponent to send a wall

    }
    waitForWall =()=>{
        //Wait for the opponent to send a wall
        this.props.socket.on('placeWall',(data)=>{
            console.log('this is the wall sent to us' +data.position)
            if(!this.state.walls.includes(data.position)){
                this.setState({
                    walls: this.state.walls.concat([data.position])
                })
            }
            //this.state.walls.push(wall)
            console.log('server said: ' + data.position)
        })
    }
    getRoom =() =>{
        console.log('getting  the room')
        this.props.socket.emit('getRoom')
        this.props.socket.on('sendRoom',(data)=>{
            console.log('getRoom gave us' + data.room)
            this.setState({roomName:data.room})
        })
    }
    getPositions=()=>{
        console.log('getting players position')
        let playersPos = []
        let roomName = this.state.roomName
        this.props.socket.emit('getPlayers',{room:roomName})
        this.props.socket.on('getPlayers',(data)=>{
            data.players.map(player=>{
                console.log('this is the player position'+player.position)
                playersPos.push(player.position)
            })
        })
        this.setState({playersPos:playersPos})
    }



    move=(direction)=>{
        let player1 = this.props.player1
        let room = this.props.room
        let position =this.props.socket.getPositions;
        let newPosition=''
        switch (direction) {
            case 'up':
                this.socket.emit('move',{player1:player1,
                                        room:room,
                                        position:newPosition})
                break;
            case 'down':

                break;
            case 'left':

                break;
            case 'right':

                break;
            default:

        }
    }


    render(){

        return(
            <section>
                <div className='game-area'>
                    <Board
                        walls={this.state.walls}
                        playersPos ={this.state.playersPos}
                        message={'In room:'+this.state.roomName + '. ' + this.state.message}
                        placeWall={this.placeWall}
                        />
                    <Controls />
                </div>
                <br/>

            </section>
        )
    }
}
