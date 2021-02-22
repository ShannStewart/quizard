import './newQuiz.css'
import React, { Component } from 'react';

import QuizPanel from '../quizPanel/quizPanel'

//import { findAuthor } from '../../../helper';

class NewQuiz extends Component{

    findAuthor = (id, q=[]) =>{
       //console.log('id: ' + id);
       //console.log('q: ' + q);
       var i;
       for(i=0; i < q.length; i++){
           if (q[i] == id){
               return true
           }
       }
    }

    getUserList = (id) => {
        //console.log('id: ' + id);
        var i;
        for (i = 0; i < this.props.userList.length; i++){
                //console.log('truth: ' + this.findAuthor(id, this.props.userList[i].quizzes))
                if (this.findAuthor(id, this.props.userList[i].test) == true){
                    return this.props.userList[i].user_name;
                }
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
                    {sortedQuiz.map(quiz =>
                        <QuizPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} author={this.getUserList(quiz.id)} takeQuiz={this.props.takeQuiz}/>
                    )}
                </div>
            </div>
        )
    }
}

export default NewQuiz;