import React from 'react'

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        position:this.props.position,
    };
  }

  render() {
    return (
      <button
        className={"square "}
        onClick={() => this.props.onClick()}>
        
      </button>
    );
  }
}
