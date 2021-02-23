import { Component } from 'react';
import './Test.css'

import { Link } from 'react-router-dom'

class Test extends Component{

    checkQuiz = (q) => {
      //  console.log('checkQuiz ran');

        if (q.length <= 0){
            return 0;
        }

      //  console.log('Quiz is populated');
        return 1;
    }


    checkAnswer = (a, b) => {
        console.log('checkAnswer ran');
        console.log('current right answers: ' + this.props.points);

        if (a == b){
            console.log('you got that one right!');
            this.props.gainPoint();
        }

        if (a !== b){
            console.log('you got that wrong');
            this.props.noPoint();
        }
    }

    quizResults = () =>{
        console.log('quizResults ran');

        this.props.history.push('/results')
    }

    render(){

        var quiz = '';
        var questions = [];

        
        quiz = this.props.testTitle;
        questions = this.props.testQuestions;
        
        var total = this.props.total
        if (this.props.current >= total){
            this.quizResults();
        }

        if (this.checkQuiz(questions) == 0){
            this.props.history.push('/missing')
        }

      //  console.log(questions);

        var answers = questions[this.props.current].choices;
        var correct = questions[this.props.current].answer;

        answers = answers.concat(questions[this.props.current].answer);
        answers = answers
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)


     //   console.log(answers);

        return(
            <div className='test'>
                <h3>{questions[this.props.current].question}</h3>
                {answers.map((answer, index) => <button key={index} onClick={() => this.checkAnswer(answer, correct)}>{answer}</button>)}
                <p>The correct answer is {questions[this.props.current].answer}</p>
            </div>
        )
    }   
}

export default Test

