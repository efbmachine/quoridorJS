import React from 'react';
import io from'socket.io-client';

// import logo from './logo.svg';
import './css/App.css';
import Board from './components/Board';
import Index from './components/Index';

class App extends React.Component {
    constructor(props){
        super(props)
        this.socket = io('localhost:3001')
        this.state= {
            gameStart: false,
            rooms:[]
        }

    }

    renderBoard() {
        return(
            <div className="game-area">

                <Board width='500px' height='500px' playersPos={['e9','e1']}/>

            </div>
        )
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
    render(){
        return (
            <div>
                { this.state.gameStart?
                    this.renderBoard() :
                    <Index createGame={this.createGame}
                            rooms={this.state.rooms}/>}
            </div>
        )
    }
}

export default App;
