import React from 'react'

export default class Wall extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className={this.props.class} style={this.props.style}>

            </div>
        )
    }

}
