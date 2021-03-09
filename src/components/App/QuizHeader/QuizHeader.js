import './Header.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import TokenService from '../../../services/token-service'

class QuizHeader extends Component{

  render(){ 
    return (
        <header>
          <h1 className='siteTitle'>Quizard</h1>
          <section className='headerBar'>
            <Link to='/'>Return</Link>
            <Link to='create/newQuiz'>Create Quiz</Link>
            <Link to='create/newQuestion'>Create Question</Link>
            </section>
        </header>
    );
  }
}

export default QuizHeader;
