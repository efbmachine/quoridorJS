import React from 'react';

import Rooms from './Rooms';

export default class Index extends React.Component {
    constructor(props){
        super(props)
        this.state={
            roomName:this.randomRoomGenerator(),
        }
    }
    randomRoomGenerator(){
        let r = Math.random().toString(36).substring(7);
        console.log("random", r);
        return r
    }

    render(){
        return(
            <div className='index'>
                <div>
                    Rooms:
                    <Rooms rooms={this.props.rooms} joinRoom={this.props.joinRoom} />
                </div>

                <div>
                    Pick a room name:
                    <input
                        defaultValue ={this.state.roomName}
                        onChange={(e)=>{
                            console.log(e.target.value)
                            this.setState({roomName:e.target.value})
                        }} />

                    <button
                        className='button'
                        onClick={()=>{
                            this.props.createGame(this.state.roomName)
                            }}>
                        Create Room to play against player
                    </button>
                </div>

                <button
                    className='button'
                    onClick={()=>this.props.createGamevsAi(this.state.roomName)}>
                    Play against AI
                </button>
            </div>
        )
    }
}
