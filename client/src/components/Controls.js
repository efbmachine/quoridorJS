import React from 'react'

export default class Controls extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div className='controls'>
                        <p className='left-arrow'
                            onClick=this.props.move('left')>
                        </p>

                        <p className='down-arrow'
                            onClick=this.props.move('down')>
                        </p>
                        <p className='up-arrow'
                            onClick=this.props.move('up')>
                        </p>
                        <p className='right-arrow'
                            onClick=this.props.move('right')>
                        </p>
                </div>
        )
    }
}
