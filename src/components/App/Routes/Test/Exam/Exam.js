import { React, Component } from 'react';
import './Exam.css'

class Exam extends Component{

    pickAnswer = (a, b) => {
        console.log('pickAnswer ran' + a + ' ' + b);

        this.props.checkAnswer(a, b);
    }

    render(){
        return(
            <button onClick={() => this.pickAnswer(this.props.choice, this.props.correct)}>{this.props.choice}</button>
        )
    }
}

export default Exam;