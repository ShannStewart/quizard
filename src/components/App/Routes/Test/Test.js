import { Component } from 'react';
import './Test.css'

import Exam from './Exam/Exam'

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
            console.log('you got ' + this.props.points + ' right');
        }
        
    }

    

    render(){

        var quiz = '';
        var questions = [];

        
        quiz = this.props.testTitle;
        questions = this.props.testQuestions;

        if (this.checkQuiz(questions) == 0){
            this.props.history.push('/missing')
        }

      //  console.log(questions);

        var newQuestions = questions
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)

       // console.log(newQuestions);

        var total = newQuestions.length;
        //console.log(total);

        var answers = newQuestions[this.props.current].choices;
        var correct = newQuestions[this.props.current].answer;

        answers = answers.concat(newQuestions[this.props.current].answer);
        answers = answers
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)


     //   console.log(answers);

        return(
            <div className='test'>
                <h3>{newQuestions[this.props.current].question}</h3>
                {answers.map((answer, index) => <Exam key={index} choice={answer} correct={correct} checkAnswer={this.checkAnswer}/>)}
                <p>The correct answer is {this.props.correct}</p>
            </div>
        )
    }   
}

export default Test