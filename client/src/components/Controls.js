import React from 'react'

export default class Controls extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div className='controls'>
                        <p className='left-arrow'>
                        </p>

                        <p className='down-arrow'>
                        </p>
                        <p className='up-arrow'>
                        </p>
                        <p className='right-arrow'>
                        </p>
                </div>
        )
    }
}
