import React from 'react'


export default class Player extends React.Component{
    constructor(props){
        super(props)
        this.player1= props.player1;
        this.iconUrl=  (!this.player1 ?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
                                        : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg");
        this.state={
            position: props.position || (this.player1 ? 'e9' : 'e1'),
            wallNumber: props.wallNumber || 10,
        }
    }
    render(){
        return(
            <img src={this.iconUrl}
                className='player'
                style={this.props.style} alt='player'/>
        )
    }

//     static isMovePossible = (src,dst,walls,otherPlayer) => {
//         //Returns false if there is a wall in the way;
//         //        Also checks if enemy at destination to offset destination by 1
//         var path = []
//         path.push(posToArr(src))
//         path.push(posToArr(dst))
//         let checkWall = ()=>{
//
//             walls.forEatch((wall)=>{
//                 wall.blockedWays().forEatch((path)=>{
// //                    if()
//                 })
//             })
//         }
//         return true;
//     }

}
