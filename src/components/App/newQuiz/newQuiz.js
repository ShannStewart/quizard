import './newQuiz.css'
import React, { Component } from 'react';

import dummyStore from '../../../dummy-store'

class NewQuiz extends Component{

    

    render(){
        console.log('newQuiz ran');
        const quizList = dummyStore.quizzes;

        const sortedQuiz = quizList.sort((a,b) => b.modified - a.modified)

        console.log('sortedQuiz: ' + JSON.stringify(sortedQuiz));

        return(
            <div className='newQuizzes'>
                <h2 className='sectionTitle'>New Quizzes</h2>
            </div>
        )
    }
}

export default NewQuiz;