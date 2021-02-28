import {React, Component} from 'react';
import './EditQuiz.css'

import QuestionToggle from '../../QuestionToggle/QuestionToggle';

import TokenService from '../../../../services/token-service';
import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../../../helper'



class EditQuiz extends Component{

    getAllQuestions = () =>{
        var userToken = TokenService.getAuthToken();

        var quizzerQuestion = getQuestionsForUsers(this.props.questionList, userToken)
       // console.log(this.props.questionList);
       // console.log(quizzerQuestion);
        
        var newQuestionList = [];

        var usedCheck;

        var i;
        for (i = 0; i < quizzerQuestion.length; i++){
          //  console.log(quizzerQuestion[i]);
            usedCheck = quizzerQuestion[i].used;
            if (usedCheck == false){
                newQuestionList = newQuestionList.concat(quizzerQuestion[i]);
            }   
        }

     //   console.log(newQuestionList);

        return newQuestionList;
    }

    getQuizQuestions = (id) => {
        //console.log('getQuizQuestions ran ' + id);
        //console.log(this.props.questionList);

        var quiz = getQuestionsforQuizzes(this.props.questionList, id);

        return quiz;
    }

    render(){

        var yourQuestions = this.getAllQuestions();

        //console.log(this.props.quiz);

        if (this.props.quiz == undefined){
            this.props.history.goBack();
        }
        else{
            var quizQuestions = this.getQuizQuestions(this.props.quiz.id);
        }

        const inQuiz = 0;
        const outQuiz = 1;

        return(
            <div className='editQuiz'>
                <header>
                    <button className='backButton' onClick={() => this.props.history.goBack()}>
                        Return
                    </button>
                </header>
                <main>
                    <div><h2>{this.props.quiz.name}</h2></div>
                    <h3>Quiz Questions</h3>
                    <div className='questionList'> {quizQuestions.map(question =>
                                <QuestionToggle key={question.id} in={inQuiz} quizID={this.props.quiz.id} id={question.id} question={question.question} answer={question.answer} choices={question.choices} used={question.used} giftUserQuestion={this.props.giftUserQuestion} giftQuizQuestion={this.props.giftQuizQuestion}/>
                                )}</div>
                    <h3>Your Questions</h3>
                    <div className='questionList'> {yourQuestions.map(question =>
                                <QuestionToggle key={question.id} in={outQuiz} quizID={this.props.quiz.id} id={question.id} question={question.question} answer={question.answer} choices={question.choices} used={question.used} giftUserQuestion={this.props.giftUserQuestion} giftQuizQuestion={this.props.giftQuizQuestion}/>
                                )}</div>
                </main>
            </div>
        )
    }
}

export default EditQuiz;