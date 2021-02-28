import './newQuiz.css'
import React, { Component } from 'react';

import QuizPanel from '../quizPanel/quizPanel'

import { findUser } from '../../../helper'

class NewQuiz extends Component{

    getUserList = (id) => {

        var author = findUser(this.props.userList, id);

        return author.name;
        
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
        //console.log('newQuiz ran');
        const quizList = this.getPublishedItems(this.props.quizList);


        //console.log('quizList: ' + quizList)

        const sortedQuiz = quizList.sort((a,b) => a.modified - b.modified)

        //console.log(this.getUserList("Q100"));

        //console.log("author: " + author);

        return(
            <div className='newQuizzes'>
                <h2 className='sectionTitle'>New Quizzes</h2>
                <div className='quizList'>
                    {sortedQuiz.slice(0,5).map(quiz =>
                        <QuizPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} author={this.getUserList(quiz.userId)} takeQuiz={this.props.takeQuiz}/>
                    )}
                </div>
            </div>
        )
    }
}

export default NewQuiz;