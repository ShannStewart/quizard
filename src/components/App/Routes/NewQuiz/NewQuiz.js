import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import TokenService from '../../../../services/token-service';
import { Button, Input, Required } from '../../../Utils/Utils';


class NewQuiz extends Component{

    handleSubmit = ev => {
        ev.preventDefault()
        console.log('newQuiz handlesubmit ran');
    
        var quizTitle = ev.target.quizname.value;

        var quizMiss = document.getElementById("quizTitleMissing");
        quizMiss.classList.add("hidden");

        if (!quizTitle){
            quizMiss.classList.remove("hidden");
              return console.log("no title"); 
          }

          this.props.addNewQuiz(quizTitle);

          this.props.history.goBack();
    
    }

  render(){ 
    return (
      <div>
        <header>
        <button className='backButton' onClick={() => this.props.history.goBack()}>
                        Return
                    </button>
          <h1 className='siteTitle'>Quizard</h1>
        </header>
        <section className='user'>
                <p>New Quiz</p>
                <form action='submit' onSubmit={this.handleSubmit}>
                    <label>Quiz Title <Required /></label>
                    <input name='quizname' type='text' id='quizName'></input>
                    <button className='submitter' type='submit'>Make Quiz</button>
                </form>
            </section>
            <div className='errorSpace hidden' id='passwordError'>
            <p className="hidden" id="quizTitleMissing">Quiz title is required</p>
                </div>
      </div>
    );
  }
}

export default NewQuiz;
