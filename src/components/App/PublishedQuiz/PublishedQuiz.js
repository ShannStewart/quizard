import {React, Component} from 'react';
import './PublishedQuiz.css'

import TokenService from '../../../services/token-service';
import { findUser, findQuiz, getQuizzesForUsers } from '../../../helper';


class PublishedQuiz extends Component{

    findKey = () => {
       // console.log('findUser ran ');

        var userToken = TokenService.getAuthToken();
        // getAuthToken() {
        //    return window.sessionStorage.getItem(config.TOKEN_KEY)
        //  },

       console.log('userKey: ' + userToken)
        //userKey: {"userName":"turtlesoup","password":"password","userID":"Z100"}
        console.log(userToken.userName);
        console.log(userToken.password);
       console.log(userToken.userID);
        //undefined

        console.log(sessionStorage.getItem("userID"));

        return userToken.userID

    }

    getAllQuizzes = () =>{
        //console.log('getAllQuizzes ran');
        const userKey = this.findKey();

        //console.log( getQuizzesForUsers(this.props.quizList, this.props.userList, userKey) );
        //console.log(findUser(userKey));
    }

    render(){

        this.getAllQuizzes();
        
        return(
            <div className='published'>
                <h2 className='sectionTitle'>Your Quizzes</h2>
                Friday
            </div>
        )
    }
}

export default PublishedQuiz