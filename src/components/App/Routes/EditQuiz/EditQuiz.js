import {React, Component} from 'react';
import './EditQuiz.css'

import QuestionToggle from '../../QuestionToggle/QuestionToggle';

import TokenService from '../../../../services/token-service';
import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../../../helper'



class EditQuiz extends Component{

    getAllQuestions = () =>{
        //console.log('getAllQuizzes ran');
        var userToken = TokenService.getAuthToken();
        //console.log('userKey: ' + userToken);

        var quizzer = findUser(this.props.userList, userToken);
        //console.log(quizzer);

        var quizzerQuestion = Array.from(quizzer.questions);
        
        var newQuestionList = [];

        var foundQuestion;

        var i;
        for (i = 0; i < quizzerQuestion.length; i++){
         //   console.log(findQuestion(this.props.questionList, quizzerQuestion[i]));
            foundQuestion = findQuestion(this.props.questionList, quizzerQuestion[i])
            newQuestionList = newQuestionList.concat(findQuestion(this.props.questionList, quizzerQuestion[i]));
        }

     //   console.log(newQuestionList);

        return newQuestionList;
    }

    getQuizQuestions = (id) => {
      //  console.log('getQuizQuestions ran ' + id);

        var quiz = findQuiz(this.props.quizList, id);

        var quizQuestion = Array.from(quiz.questions);

        var newQuestionList = [];

        var foundQuestion;

        var i;
        for (i = 0; i < quizQuestion.length; i++){
         //   console.log(findQuestion(this.props.questionList, quizzerQuestion[i]));
            foundQuestion = findQuestion(this.props.questionList, quizQuestion[i])
            newQuestionList = newQuestionList.concat(findQuestion(this.props.questionList, quizQuestion[i]));
        }
        return newQuestionList;
    }

    render(){

        var yourQuestions = this.getAllQuestions();

        var quizQuestions = this.getQuizQuestions(this.props.quiz.id);

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