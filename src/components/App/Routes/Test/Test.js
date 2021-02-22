import { Component } from 'react';
import './Test.css'

class Test extends Component{
    state = {
        quiz: '',
        questions: [],
        mark: 0,
    }

    checkQuiz = (q) => {
        console.log('checkQuiz ran');

        if (q.length <= 0){
            return 0;
        }

        console.log('Quiz is populated');
        return 1;
    }


    render(){

        var quiz = '';
        var questions = [];
        
        quiz = this.props.testTitle;
        questions = this.props.testQuestions;

        if (this.checkQuiz(questions) == 0){
            this.props.history.push('/missing')
        }

        return(
            <div className='test'>
                <h3>{quiz}</h3>
            </div>
        )
    }   
}

export default Test