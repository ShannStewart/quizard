  //import './App.css';
  import { Route, Switch } from 'react-router-dom';
  import React, { Component } from 'react';

  import Home from './Routes/Home/Home';
  import Logform from './Routes/Logform/Logform';
  import Register from './Routes/Register/Register';
  import Missing from './Routes/Missing/Missing';

  import dummyStore from '../../dummy-store';
  import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../helper';



  class App extends Component{
    state = {
      users: [],
      quizzes: [],
      questions: [],
      userID: 0,
      quizID: 0,
      questionID: 0
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
}

    userSubmit = (u, p) => {
      //console.log('userSubmit ran');
      //console.log('running userSubmit with: ' + u + ' and ' + p);

      var newUser = {"id": "newUser" + this.state.userID, "user_name": u, "password": p};

      //console.log('new user: ' + newUser);

      var newUserID = this.state.userID + 1;
      this.setState({userID: newUserID});

      //console.log('check1');

      var newUserList = this.state.users.concat(newUser);
      this.setState({ users: newUserList });

      //console.log('check2');

    }

    questionSubmit = (q, t, pi) => {
      console.log('questionSubmit ran');

      var newQuestion = {"id": "newQuestion" + this.state.questionID, "question": q, "answer": t};

      var newQuestionID = this.state.questionID + 1;
      this.setState({questionID: newQuestionID});

      
      var newQuestionList = this.state.questions.concat(newQuestion);
      this.setState({ questions: newQuestionList });

    }

    quizSubmit = (x, y, z) => {
      console.log('quizSubmit ran');

      var date = new Date();

      var newQuiz = {"id": "newQuiz" + this.state.quizID, "name": x, "questions": y, "modified": date,};

      var newQuizID = this.state.quizID + 1;
      this.setState({quizID: newQuizID});

      
      var newQuizList = this.state.quizzes.concat(newQuiz);
      this.setState({ quizzes: newQuizList });
      
    }
    
    render(){ 
      return (

          <div className="App">
            <Switch>
              <Route
                exact
                path={'/'}
                component={Home}
                />
                <Route
                path={'/login'}
                render={routeProps => (
                  <Logform
                    {...routeProps}
                  />
                  )}
                />
              <Route
              path={'/signup'}
              render={routeProps => (
                <Register
                {...routeProps}
                addNewUser={this.userSubmit}
                />
              )} 
              />
              <Route
                render={routeProps => (
                  <Missing
                  {...routeProps}/>
                  )}
              />
            </Switch>
          </div>
      );
    }
  }

  export default App;
