import { React, Component } from 'react'
import './CreateQuiz.css'

import TokenService from '../../../../services/token-service';
import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../../../helper';

import UserPanel from '../../UserPanel/UserPanel';

class CreateQuiz extends Component{

    getAllQuizzes = () =>{
        //console.log('getAllQuizzes ran');
        var userToken = TokenService.getAuthToken();
        //console.log('userKey: ' + userToken);

        var quizzer = findUser(this.props.userList, userToken);
        //console.log(quizzer);

        var quizzerQuiz = Array.from(quizzer.test);
        //console.log(quizzerQuiz);

        var quizzerUser = quizzer.user_name;
        //console.log(quizzerUser);

        return quizzerQuiz
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

        return(
            <div className='createQuiz'>
                    <div className='unpublished'>
                        <h2 className='sectionTitle'>Quizzes In Progress</h2>
                        <div className='quizList'>
                        {sortedQuiz.map(quiz =>
                            <UserPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} author={this.getUser()} publishButton={this.props.publishQuiz}/>
                        )}
                    </div>
                </div>
                <div className='published'>
                    <h2 className='sectionTitle'>Your Quizzes</h2>
                    <div className='quizList'>
                        {otherSortedQuiz.map(quiz =>
                            <UserPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} published={quiz.published} author={this.getUser()} publishButton={this.props.unPublishQuiz}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateQuiz;