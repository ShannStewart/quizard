import { React, Component } from 'react'
import './Results.css'

class Results extends Component {
    render(){

       var total = this.props.total
       var points = this.props.points

        return(
            <div className='results'>
                <p>You got {points} out of {total} right</p>
                <button onClick={() => this.props.history.push('/')}>Return</button>
            </div>
        )
    }
}

export default Results