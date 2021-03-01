import {React, Component} from 'react';
import './UnpublishedQuiz.css'
import { Redirect, Route, Switch } from 'react-router-dom';


import TokenService from '../../../services/token-service';
import { findUser, findQuiz, getQuizzesForUsers } from '../../../helper';

import UserPanel from '../UserPanel/UserPanel'


class PublishedQuiz extends Component{

    getAllQuizzes = () =>{
        //console.log('getAllQuizzes ran');
        var userToken = TokenService.getAuthToken();

      var quizzerQuiz = getQuizzesForUsers(this.props.quizList, userToken)

        return quizzerQuiz
    }

    quizDetail = () =>{
        //console.log('quizDetails ran');

        var userQuiz = this.getAllQuizzes()
        //console.log(userQuiz);

        var newQuizList = [];

        var publishCheck;

        var i;
        for (i = 0; i < userQuiz.length; i++){
            //console.log(findQuiz(this.props.quizList, userQuiz[i]));
            publishCheck = userQuiz[i].published;
            //console.log('published: ' + publishCheck);
            if (publishCheck == false){
                newQuizList = newQuizList.concat(userQuiz[i]);
            }   
        }

      //  console.log(newQuizList);
        
        return newQuizList
    }

    getUser = () =>{
        //console.log('getUser ran');
        var userToken = TokenService.getAuthToken();
        
        var quizzer = findUser(this.props.userList, userToken);

        var quizzerUser = '';

        if(quizzer == undefined){
            return quizzerUser;
        }   
        else{
            quizzerUser = quizzer.name;

            return quizzerUser
        }
    }

    render(){

        const publishedList = this.quizDetail();

        const sortedQuiz = publishedList.sort((a,b) => b.modified - a.modified)


        return(
            <div className='unpublished'>
                <h2 className='sectionTitle'>Quizzes In Progress</h2>
                <div className='quizList'>
                    {sortedQuiz.slice(0,5).map((quiz, index) =>
                        <Route key={index} render={routeProps => ( <UserPanel {...routeProps} key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} quizList={this.props.quizList} questionList={this.props.questionList} author={this.getUser()} publishButton={this.props.publishQuiz} deleteQuiz={this.props.deleteQuiz}/> )}/>
                    )}
                </div>
            </div>
        )
    }
}

export default PublishedQuiz