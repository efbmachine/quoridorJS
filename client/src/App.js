import React from 'react';
import io from'socket.io-client';

// import logo from './logo.svg';
import './css/App.css';
import Board from './components/Board';
import Index from './components/Index';
import Game from './components/Game';

class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = io('localhost:3001')
        this.state= {
            gameStart: false,
            rooms:[]
        }

    }


    componentDidMount(){
        this.getRooms()


    }
    getRooms = ()=>{
        this.socket.emit('getRooms');
        this.socket.on('sendRooms',(data)=>{
            this.setState({rooms:data.rooms})
        })
    }
    createGame =(roomName)=>{
        //Create room
        this.socket.emit('createRoom',{roomName:roomName})
        console.log('Created Room')
        //add room to roomList: Done in server
        this.setState({gameStart:true})
        //wait for player
        //start the game
    }
    joinRoom = (roomName)=>{
        this.socket.emit('joinRoom',{roomName})
        this.socket.on('joinedRoom',()=>{
            this.setState({gameStart:true})
        })
    }
    render(){
        return (
            <div>
                { this.state.gameStart?
                    <Game/> :
                    <Index createGame={this.createGame}
                            rooms={this.state.rooms}
                            joinRoom ={this.joinRoom}/>}
            </div>
        )
    }
}

export default App;
