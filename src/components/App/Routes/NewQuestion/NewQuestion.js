import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import TokenService from '../../../../services/token-service';

class NewQuestion extends Component{

    handleSubmit = ev => {
        ev.preventDefault()
        console.log('newQuestion handlesubmit ran');
    
        var rightAnswer = ev.target.answer.value;
        var wrongChoices = [];
        var currentQuestion = ev.target.question.value;

        if(ev.target.choice1.value){
            wrongChoices = wrongChoices.concat(ev.target.choice1.value)
        }

        if(ev.target.choice2.value){
            wrongChoices = wrongChoices.concat(ev.target.choice2.value)
        }

        if(ev.target.choice3.value){
            wrongChoices = wrongChoices.concat(ev.target.choice3.value)
        }

        var questionMiss = document.getElementById("noQuestion");
        var answerMiss = document.getElementById("noRightAnswer");
        var choiceMiss = document.getElementById("noWrongAnswer");

        questionMiss.classList.add("hidden");
        answerMiss.classList.add("hidden");
        choiceMiss.classList.add("hidden");

        if (!currentQuestion){
            questionMiss.classList.remove("hidden");
              return console.log("no right answer"); 
          }

        if (!rightAnswer){
            answerMiss.classList.remove("hidden");
              return console.log("no right answer"); 
          }

          if (wrongChoices.length <= 0){
            choiceMiss.classList.remove("hidden");
              return console.log("no wrong answer"); 
          }

          this.props.addNewQuestion(rightAnswer);

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
                <p>New Question</p>
                <form action='submit' onSubmit={this.handleSubmit}>
                    <label>Question <Required /></label>
                    <input name='question' type='text' id='questionText'></input>
                    <label>Answer <Required /></label>
                    <input name='answer' type='text' id='correctAnswer'></input>
                    <label>Choice 1 </label>
                    <input name='choice1' type='text' id='wrong1'></input>
                    <label>Choice 2 </label>
                    <input name='choice2' type='text' id='wrong2'></input>
                    <label>Choice 3 </label>
                    <input name='choice3' type='text' id='wrong3'></input>
                    <button className='submitter' type='submit'>Make Question</button>
                </form>
            </section>
            <div className='errorSpace hidden' id='passwordError'>
            <p className="hidden" id="noQuestion">A question is required</p>
            <p className="hidden" id="noRightAnswer">A right answer is required</p>
            <p className="hidden" id="noWrongAnswer">A wrong answer is required</p>
                </div>
      </div>
    );
  }
}

export default NewQuestion;
