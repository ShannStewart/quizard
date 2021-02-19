import './Home.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import Header from '../../Header/Header';

import PublicOnlyRoute from '../../../Utils/PublicOnlyRoute';
import PrivateRoute from '../../../Utils/PrivateRoute';

class Home extends Component{
  state = {
    Users: [],
    Quizzes: [],
    Questions: [],
    UsersID: 0,
    QuizID: 0,
    QuestionID: 0
};
  
  render(){ 
    return (
      <div className="Home">
        <Header/>
      <main>
        <Switch>
          <PublicOnlyRoute>
          <section className='fullSection otherQuiz'>
                <div className='newQuizzes'>
                    <h2 className='sectionTitle'>New Quizzes</h2>
                  </div>
                <div className= 'popularQuizzes'>
                    <h2 className='sectionTitle'>Popular Quizzes</h2>
                  </div>
              </section>
          </PublicOnlyRoute>
          <PrivateRoute>
            <section className='halfSection userQuiz'>
                <div>
                    <h2 className='sectionTitle'>Quizzes In Progress</h2>
                    <div className='unpublished'>
                      </div>
                  </div>
                <div className='published'>
                    <h2 className='sectionTitle'>Your Published Quizzes</h2>
                  </div>
              </section>
            <section className='halfSection otherQuiz'>
                <div className='newQuizzes'>
                    <h2 className='sectionTitle'>New Quizzes</h2>
                  </div>
                <div className= 'popularQuizzes'>
                    <h2 className='sectionTitle'>Popular Quizzes</h2>
                  </div>
              </section>
              </PrivateRoute>
            </Switch>
        </main>
      </div>
    );
  }
}

export default Home;
