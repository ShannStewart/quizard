import { Component } from 'react';
import './Test.css'

class Test extends Component{
    state = {
        quiz: '',
        questions: [],
        mark: 0,
    }

    setQuiz = (title, questionaire) =>{
        console.log('setQuiz ran');

        this.setState({ quiz : title });
        this.setState({ questions : questionaire });

    }

    render(){

        this.setQuiz(this.props.testTitle, this.props.testQuestions)

        return(
            <div className='test'>
                <h3>{this.state.quiz}</h3>
            </div>
        )
    }   
}

export default Test