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

        console.log(questions);

        var newQuestions = questions
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)

        console.log(newQuestions);

        var current = 0;

        var answers = newQuestions[current].choices;

        answers = answers.concat(newQuestions[current].answer);
        answers = answers
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)


        console.log(answers);

        answers = answers.keys();

        console.log(answers);

        return(
            <div className='test'>
                <h3>{newQuestions[current].question}</h3>

            </div>
        )
    }   
}

export default Test