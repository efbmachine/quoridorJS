import React from 'react'


export default class Rooms extends React.Component {


    render(){
        console.log(this.props.rooms)
        return (
            <div className='rooms'>
            {
                ((this.props.rooms[0]!=null)?
                    this.props.rooms.map((room)=>{
                        return (
                            <p className='' onClick={()=> this.props.joinRoom(room.name)}>
                                {room.name}
                            </p>
                        )
                    }) : <p className='rooms'> No rooms available now </p>)
            }
            </div>
        )
    }
}
