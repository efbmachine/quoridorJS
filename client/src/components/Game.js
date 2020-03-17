import React from 'react';

import Board from './Board';
import Controls from './Controls'
import {posToObj, objToPos} from '../helper';

export default class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            walls:[],
            roomName:'',
            message:'Waiting for another player',
            playersPos:['e9','e1'],
            wallNumber:[10,10]
        }

    }
    componentDidMount() {
        this.getRoom()
        //Gets the message from the server and sets it in the state
        this.props.socket.on('message',(data)=>{
    //        console.log(data.message)
            this.setState({message:data.message})
        })
        this.waitForWall()
        this.waitForMove()
        this.getWallNumber()

    }
    renderBoard() {
        return(
            <div className="game-area">

                <Board width='500px' height='500px' playersPos={this.state.playersPos}/>

            </div>
        )
    }
    componentDidUpdate() {

    }

    placeWall = (position) =>{
        // console.log('sending this wall to server: '+position)
        let room = this.state.roomName
        // console.log('this is the room we\'re in: '+ room)
        let player1 = this.props.player1
        this.props.socket.emit('placeWall?',{position:position,room:room,player1:player1})
        //Wait for the opponent to send a wall

    }
    waitForWall =()=>{
        //Wait for the opponent to send a wall
        this.props.socket.on('placeWall',(data)=>{
            // console.log('this is the wall sent to us' +data.position)
            if(!this.state.walls.includes(data.position)){
                this.setState({
                    walls: this.state.walls.concat([data.position])
                })                
            }
            //this.state.walls.push(wall)
            // console.log('server said: ' + data.position)
        })
    }
    getRoom =() =>{
        // console.log('getting  the room')
        this.props.socket.emit('getRoom')
        this.props.socket.on('sendRoom',(data)=>{
            // console.log('getRoom gave us' + data.room)
            this.setState({roomName:data.room})
        })
    }
    waitForMove =() =>{
        this.props.socket.on('move',(data)=>{
            if(data.player1){
                let otherPlayer = this.state.playersPos[1]
                let playersPos = []
                playersPos.push(data.position)
                playersPos.push(otherPlayer)
                this.setState({playersPos:playersPos})
            }else{
                let otherPlayer = this.state.playersPos[0]
                let playersPos = []
                playersPos.push(otherPlayer)
                playersPos.push(data.position)
                this.setState({playersPos:playersPos})
            }
        })
    }
    getWallNumber =() =>{
        this.props.socket.on('wallNumber',(data)=>{
            // console.log(data.wallNumber)
            this.setState({wallNumber:data.wallNumber})
        })
    }



    move=(direction)=>{
        let player1 = this.props.player1
        let room = this.state.roomName
        let position = player1? this.state.playersPos[0] : this.state.playersPos[1]
        let newPosition=''
        let temp=null
        switch (direction) {
            case 'up':
                temp = posToObj(position)
                temp.col-=1
                console.log('value of temp')
                console.log(temp)
                console.log('value of newPosition')
                newPosition = objToPos(temp)
                console.log(newPosition)
                this.props.socket.emit('move',{player1:player1,
                                        room:room,
                                        position:newPosition})
                break;
            case 'down':
                temp = posToObj(position)
                temp.col+=1
                newPosition = objToPos(temp)
                this.props.socket.emit('move',{player1:player1,
                                        room:room,
                                        position:newPosition})
                break;
            case 'left':
                temp = posToObj(position)
                temp.row-=1
                newPosition = objToPos(temp)
                this.props.socket.emit('move',{player1:player1,
                                        room:room,
                                        position:newPosition})
                break;
            case 'right':
                temp = posToObj(position)
                temp.row+=1
                newPosition = objToPos(temp)
                this.props.socket.emit('move',{player1:player1,
                                        room:room,
                                        position:newPosition})
                break;
            default:
                console.log('Choose option')
                break;
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
                    <Controls move={this.move}/>
                    <p>
                        Black:{this.state.wallNumber[0]}walls
                        White:{this.state.wallNumber[1]}walls
                    </p>

                </div>
                <br/>

            </section>
        )
    }
}
