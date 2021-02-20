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
                if (this.findAuthor(id, this.props.userList[i].quizzes) == true){
                    return this.props.userList[i].user_name;
                }
        }
    }

    render(){
        //console.log('newQuiz ran');
        const quizList = this.props.quizList;

        //console.log('quizList: ' + quizList)

        const sortedQuiz = quizList.sort((a,b) => b.modified - a.modified)

        //console.log(this.getUserList("Q100"));

        //console.log("author: " + author);

        return(
            <div className='newQuizzes'>
                <h2 className='sectionTitle'>New Quizzes</h2>
                <div className='quizList'>
                    {sortedQuiz.map(quiz =>
                        <QuizPanel key={quiz.id} title={quiz.name} views={quiz.count} author={this.getUserList(quiz.id)}/>
                    )}
                </div>
            </div>
        )
    }
}

export default NewQuiz;