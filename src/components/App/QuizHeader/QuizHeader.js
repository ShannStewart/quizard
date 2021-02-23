import './Header.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import TokenService from '../../../services/token-service'

class QuizHeader extends Component{

  render(){ 
    return (
      <div>
        <header>
          <h1 className='siteTitle'>Quizard</h1>
          <section className='user'>
            <Link to='/'>Return</Link>
            <Link to='create/newQuiz'>Create Quiz</Link>
            </section>
        </header>
      </div>
    );
  }
}

export default QuizHeader;
