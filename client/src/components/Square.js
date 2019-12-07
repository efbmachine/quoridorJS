import React from 'react'


export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        position:this.props.position,
        walls: {
            h:null,
            v:null
        },
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({walls: 'H'})}
      >
        {this.state.walls}
      </button>
    );
  }
}
