import { React, Component } from 'react'
import './CreateQuiz.css'
import { Redirect, Route, Switch } from 'react-router-dom';


import TokenService from '../../../../services/token-service';
import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../../../helper';

import QuizHeader from '../../QuizHeader/QuizHeader';
import UserPanel from '../../UserPanel/UserPanel';
import QuestionPanel from '../../QuestionPanel/QuestionPanel';

class CreateQuiz extends Component{

    getAllQuizzes = () =>{
        //console.log('getAllQuizzes ran');
        var userToken = TokenService.getAuthToken();
        //console.log('userKey: ' + userToken);

        var quizzer = findUser(this.props.userList, userToken);
        //console.log(quizzer);

        var quizzerQuiz = [];

        if (quizzer == undefined){
         quizzerQuiz = [];
        }
        else{
         quizzerQuiz = Array.from(quizzer.test);
        }

        return quizzerQuiz
    }

    getAllQuestions = () =>{
        //console.log('getAllQuizzes ran');
        var userToken = TokenService.getAuthToken();
        //console.log('userKey: ' + userToken);

        var quizzer = findUser(this.props.userList, userToken);
        //console.log(quizzer);

        var quizzerQuestion = [];

        if (quizzer == undefined){
             quizzerQuestion = [];
        }
        else {
            var quizzerQuestion = Array.from(quizzer.questions);

        }
        
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


    quizUnpublished = () =>{
        //console.log('quizDetails ran');

        var userQuiz = this.getAllQuizzes()
        //console.log(userQuiz);

        var newQuizList = [];

        var foundQuiz;
        var publishCheck;

        var i;
        for (i = 0; i < userQuiz.length; i++){
            //console.log(findQuiz(this.props.quizList, userQuiz[i]));
            foundQuiz = findQuiz(this.props.quizList, userQuiz[i])
            publishCheck = foundQuiz.published;
            //console.log('published: ' + publishCheck);
            if (publishCheck == false){
                newQuizList = newQuizList.concat(findQuiz(this.props.quizList, userQuiz[i]));
            }   
        }
        
        return newQuizList
    }
    quizPublished = () =>{
        //console.log('quizDetails ran');

        var userQuiz = this.getAllQuizzes()
        //console.log(userQuiz);

        var newQuizList = [];

        var foundQuiz;
        var publishCheck;

        var i;
        for (i = 0; i < userQuiz.length; i++){
            //console.log(findQuiz(this.props.quizList, userQuiz[i]));
            foundQuiz = findQuiz(this.props.quizList, userQuiz[i])
            publishCheck = foundQuiz.published;
            //console.log('published: ' + publishCheck);
            if (publishCheck == true){
                newQuizList = newQuizList.concat(findQuiz(this.props.quizList, userQuiz[i]));
            }   
        }
        
        return newQuizList
    }

    getUser = () =>{
        //console.log('getUser ran');
        var userToken = TokenService.getAuthToken();
        
        var quizzer = findUser(this.props.userList, userToken);

        var quizzerUser = quizzer.user_name;

        return quizzerUser
    }

    render(){

        const unpublishedList = this.quizUnpublished();

        const sortedQuiz = unpublishedList.sort((a,b) => b.modified - a.modified)

        const publishedList = this.quizPublished();

        const otherSortedQuiz = publishedList.sort((a,b) => b.modified - a.modified)
        
        var yourQuestions = this.getAllQuestions();
        

        //console.log(yourQuestions);

        return(
            <div className='createQuiz'>
                <Route render={routeProps=> (<QuizHeader {...routeProps}/>)}/>
                    <div className='unpublished'>
                        <h2 className='sectionTitle'>Quizzes In Progress</h2>
                        <div className='createQuizList'>
                        {sortedQuiz.map((quiz, index) =>
                              <Route key={index} render={routeProps => ( <UserPanel {...routeProps} key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} quizList={this.props.quizList} author={this.getUser()} publishButton={this.props.publishQuiz} deleteQuiz={this.props.deleteQuiz}/> )}/>
                        )}
                    </div>
                </div>
                <div className='published'>
                    <h2 className='sectionTitle'>Your Quizzes</h2>
                    <div className='createQuizList'>
                        {otherSortedQuiz.map((quiz, index) =>
                              <Route key={index} render={routeProps => ( <UserPanel {...routeProps} key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} quizList={this.props.quizList} author={this.getUser()} publishButton={this.props.publishQuiz} deleteQuiz={this.props.deleteQuiz}/> )}/>
                        )}
                    </div>
                </div>
                <div className='questions'>
                        <h2 className='sectionTitle'>Questions</h2>
                        <div className='createQuizList'>
                            {yourQuestions.map(question =>
                                <QuestionPanel key={question.id} id={question.id} question={question.question} answer={question.answer} choices={question.choices} used={question.used} deleteQuestion={this.props.deleteQuestion}/>
                                )}
                            </div>
                </div>
            </div>
        )
    }
}

export default CreateQuiz;