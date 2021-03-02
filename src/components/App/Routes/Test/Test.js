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

    quizResults = (a, b) =>{
        console.log('quizResults ran');

        console.log('current right answers: ' + this.props.points);

        if (a == b){
            console.log('you got that one right!');
            this.props.gainPoint();
        }

        if (a !== b){
            console.log('you got that wrong');
            this.props.noPoint();
        }

        this.props.history.push('/results')
    }

    render(){

        var quiz = '';
        var questions = [];

        
        quiz = this.props.testTitle;
        questions = this.props.testQuestions;
        
        var results = false;

        var total = this.props.total
        if (this.props.current == total -1){
            results = true;
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
        <div>
            <div className='test'>
                {(results == true)
                ?<div><h3>{questions[this.props.current].question}</h3>
                {answers.map((answer, index) => <button key={index} onClick={() => this.quizResults(answer, correct)}>{answer}</button>)}
                </div>

                :<div><h3>{questions[this.props.current].question}</h3>
                {answers.map((answer, index) => <button key={index} onClick={() => this.checkAnswer(answer, correct)}>{answer}</button>)}
             </div>}
            </div>
            <button onClick={() => this.props.history.push('/')}>Return</button>
        </div>
        )
    }   
}

export default Test

