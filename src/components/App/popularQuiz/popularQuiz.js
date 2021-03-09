
import React, { Component } from 'react';
import './quizList.css'

import QuizPanel from '../quizPanel/quizPanel'

import { findUser } from '../../../helper'
    
class PopularQuiz extends Component{

    getUserList = (id) => {

        var userName = '';

        var author = findUser(this.props.userList, id);

        if(author == undefined){
            return userName;
        }
        else{
            userName = author.name;
            return userName;
        }
        
    }

     getPublishedItems = (list) =>{
         const initalList = list;

         var i;
         var newList = [];

         for (i = 0; i < initalList.length; i++){
             if (initalList[i].published == true){
                newList = newList.concat(initalList[i]);
             }
         }

        return newList
     }
 

    render(){
          //console.log('popularQuiz ran');
            const quizList = this.getPublishedItems(this.props.quizList);

            //console.log('quizList: ' + quizList)

            const sortedQuiz = quizList.sort((a,b) => b.count - a.count)


            //console.log('sortedQuiz: ' + JSON.stringify(sortedQuiz));

        return(
             <div className='popularQuizzes'>
                <h2 className='sectionTitle'>Popular Quizzes</h2>
                <div className='quizList'>
                    {sortedQuiz.slice(0,5).map(quiz =>
                        <QuizPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} author={this.getUserList(quiz.userid)} takeQuiz={this.props.takeQuiz}/>
                    )}
                </div>
             </div>
        )
    }
}

export default PopularQuiz;