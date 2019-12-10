import React from 'react'

export default class Wall extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            position : this.props.position
        }

    }

    componentDidMount() {

    }

    render(){
        return(
            <div className={this.props.class} style={this.props.style}>

            </div>
        )
    }

/**    display(canvas) {
        //Parses data so that it can be used for positioning
        let pos = this.posToCoord()
        let regex = /(\d)(\d)(\w)/
        let coord = pos.match(regex)
        let r = Number(coord[1])
        let c = Number(coord[2])-1
        let dir = coord[3]
        console.log(`r:${r};c:${c};dir:${dir}`)

        //Sets up the size of the wall based on direction
        let width ='',
            height='';
        if(dir=='h'){
             width = 119;
             height =5;
        }else if(dir =='v'){
             height = 119;
             width =5;
        }
        //
        let blockSize = 54;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(
            //(54*r)+3,
            11.4+blockSize*r+11.4*r,
            11.4+blockSize*c+11.4*c,
            width,height)
    }

    posToCoord(){
        //TURN 'a1v' to '01v'
        let regex = /(\w)(\d)(\w)/
        let coord = this.position.match(regex)
        let r = coord[1].charCodeAt(0) - 96
        let c = coord[2]
        let dir = coord[3]
        return (r+''+c+dir)


    }
**/

}
