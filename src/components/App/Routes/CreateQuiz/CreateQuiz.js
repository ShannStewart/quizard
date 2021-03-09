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
        var userToken = TokenService.getAuthToken();

        var quizzerQuiz = getQuizzesForUsers(this.props.quizList, userToken)

        return quizzerQuiz
    }

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


    quizUnpublished = () =>{
         //console.log('quizUnpublished ran');

         var userQuiz = this.getAllQuizzes()
         //console.log(userQuiz);
 
         var newQuizList = [];
 
         var publishCheck;
 
         var i;
         for (i = 0; i < userQuiz.length; i++){
             publishCheck = userQuiz[i].published;
             if (publishCheck == false){
                 newQuizList = newQuizList.concat(userQuiz[i]);
             }   
         }
         
         return newQuizList
    }
    quizPublished = () =>{
          //console.log('quizPublished ran');

          var userQuiz = this.getAllQuizzes()
          //console.log(userQuiz);
  
          var newQuizList = [];
  
          var publishCheck;
  
          var i;
          for (i = 0; i < userQuiz.length; i++){
              publishCheck = userQuiz[i].published;
              if (publishCheck == true){
                  newQuizList = newQuizList.concat(userQuiz[i]);
              }   
          }
          
          return newQuizList
    }

    getUser = () =>{
        //console.log('getUser ran');
        var userToken = TokenService.getAuthToken();
        
        var quizzer = findUser(this.props.userList, userToken);

        var quizzerUser = quizzer.name;

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
                <main>
                    <section className='unpublished'>
                        <h2 className='sectionTitle'>Quizzes In Progress</h2>
                        <div className='createQuizList'>
                        {sortedQuiz.map((quiz, index) =>
                              <Route key={index} render={routeProps => ( <UserPanel {...routeProps} key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} quizList={this.props.quizList} questionList={this.props.questionList} author={this.getUser()} publishButton={this.props.publishQuiz} deleteQuiz={this.props.deleteQuiz}/> )}/>
                        )}
                    </div>
                </section>
                <section className='published'>
                    <h2 className='sectionTitle'>Your Quizzes</h2>
                    <div className='createQuizList'>
                        {otherSortedQuiz.map((quiz, index) =>
                              <Route key={index} render={routeProps => ( <UserPanel {...routeProps} key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} quizList={this.props.quizList} questionList={this.props.questionList} author={this.getUser()} publishButton={this.props.unPublishQuiz} deleteQuiz={this.props.deleteQuiz}/> )}/>
                        )}
                    </div>
                </section>
                <section className='questions'>
                        <h2 className='sectionTitle'>Questions</h2>
                        <div className='createQuizList'>
                            {yourQuestions.map(question =>
                                <QuestionPanel key={question.id} id={question.id} question={question.question} answer={question.answer} choices={question.choices} used={question.used} deleteQuestion={this.props.deleteQuestion}/>
                                )}
                            </div>
                </section>
                </main>
            </div>
        )
    }
}

export default CreateQuiz;