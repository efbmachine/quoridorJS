import React from 'react'

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    let value = this.props.value
    this.state = {
        position:this.props.position,
    };
  }

  render() {
    return (
      <button
        className={"square "}
        onClick={() => this.props.handleClick}
        /**  let dir = prompt('H or V','V')
          if(dir != null && dir.toUpperCase()=='V')
            this.setState({wallV: true})
          else if(dir != null && dir.toUpperCase()=='H')
            this.setState({wallH:true}) **/


      >
        {this.state.walls}
      </button>
    );
  }
}
