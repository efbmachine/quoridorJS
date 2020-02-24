import React from 'react';
import io from 'socket.io-client';

// import logo from './logo.svg';
import './css/App.css';
import Index from './components/Index';
import AI from './components/AI.js'
import Game from './components/Game';

class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = io('127.0.0.1:3001')
        this.state= {
            gameStart: false,
            rooms:[],
            player1:null,
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
        //add room to roomList: Done in server
        this.setState({gameStart:true})
        this.setState({player1:true})
        //wait for player
        //start the game
    }
    joinRoom = (roomName)=>{
        this.socket.emit('joinRoom',{roomName:roomName})
        this.socket.on('joinedRoom',()=>{
            this.setState({gameStart:true})
            this.setState({player1:false})

        })
    }
    createGamevsAi =() =>{
        //create AI
        var ai = new AI('e1','e9')
        //Create room
        this.socket.emit('createRoomAI')
        //add room to roomList: Done in server
        this.setState({gameStart:true})
        this.setState({player1:true})

        //wait for player
        //start the game
    }
    render(){
        return (
            <div>
                { this.state.gameStart?
                    <Game socket={this.socket}
                            player1={this.state.player1}/> :
                    <Index createGame={this.createGame}
                            createGamevsAi={this.createGamevsAi}
                            rooms={this.state.rooms}
                            joinRoom ={this.joinRoom}/>}
            </div>
        )
    }
}

export default App;
