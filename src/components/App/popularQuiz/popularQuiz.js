
import React, { Component } from 'react';
import './popularQuiz.css'

import QuizPanel from '../quizPanel/quizPanel'

//import dummyStore from '../../../dummy-store'

class PopularQuiz extends Component{

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
          //console.log('popularQuiz ran');
            const quizList = this.getPublishedItems(this.props.quizList);

            //console.log('quizList: ' + quizList)

            const sortedQuiz = quizList.sort((a,b) => b.count - a.count)

            //console.log('sortedQuiz: ' + JSON.stringify(sortedQuiz));

        return(
             <div className='popularQuizzes'>
                <h2 className='sectionTitle'>Popular Quizzes</h2>
                <div className='quizList'>
                    {sortedQuiz.map(quiz =>
                        <QuizPanel key={quiz.id} quizID={quiz.id} title={quiz.name} views={quiz.count} author={this.getUserList(quiz.id)} takeQuiz={this.props.takeQuiz}/>
                    )}
                </div>
             </div>
        )
    }
}

export default PopularQuiz;