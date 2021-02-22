import { React, Component } from 'react';

class QuizPanel extends Component{
    handleQuizTaking = (id) =>{
        console.log('handleQuizTaking ' + id);

        this.props.takeQuiz(id);
    }

    render(){

        const quizID = this.props.quizID;

        return(
            <div>
                <div><h3>{this.props.title}</h3></div>
                <div>
                    <div><h4>By {this.props.author}</h4><h4>Taken: {this.props.views}</h4></div>
                    <div><button onClick={() => this.handleQuizTaking(quizID)}>Take Test</button></div>
                </div>
            </div>
        )
    }
}

export default QuizPanel