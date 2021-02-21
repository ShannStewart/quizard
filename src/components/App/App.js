  //import './App.css';
  import { Route, Switch } from 'react-router-dom';
  import React, { Component } from 'react';

  import Home from './Routes/Home/Home';
  import Logform from './Routes/Logform/Logform';
  import Register from './Routes/Register/Register';
  import Missing from './Routes/Missing/Missing';

  import dummyStore from '../../dummy-store';
  import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../helper';

  import TokenService from '../../services/token-service';

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

    questionGiftUser = (a) =>{
      console.log('questionGiftUser ran');

      var giftedUser = findUser();


    }

    quizGiftUser = (b) => {
      console.log('quizGiftUser ran');

      var giftedUser = findUser();
    }

    userSubmit = (u, p) => {
      //console.log('userSubmit ran');
      //console.log('running userSubmit with: ' + u + ' and ' + p);

      var newUser = {"id": "newUser" + this.state.userID, "user_name": u, "password": p, "quizzes": [], "questions": []};

      //console.log('new user: ' + newUser);

      var newUserID = this.state.userID + 1;
      this.setState({userID: newUserID});

      //console.log('check1');

      var newUserList = this.state.users.concat(newUser);
      this.setState({ users: newUserList });

      var ider = newUser.id;

      TokenService.saveAuthToken(ider);

      //console.log('check2');

    }

    questionSubmit = (q, t, pi) => {
      console.log('questionSubmit ran');

      var newQuestion = {"id": "newQuestion" + this.state.questionID, "question": q, "answer": t, "choices": [] };

      var newQuestionID = this.state.questionID + 1;
      this.setState({questionID: newQuestionID});

      
      var newQuestionList = this.state.questions.concat(newQuestion);
      this.setState({ questions: newQuestionList });

    }

    quizSubmit = (x, y, z) => {
      console.log('quizSubmit ran');

      var date = new Date();

      var newQuiz = {"id": "newQuiz" + this.state.quizID, "name": x, "questions": y, "modified": date, "count": 0};

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
                render={routeProps => (
                  <Home
                    {...routeProps}
                    userList={this.state.users}
                    quizList={this.state.quizzes}
                />
                  )}
                />
                <Route
                path={'/login'}
                render={routeProps => (
                  <Logform
                    {...routeProps}
                    existUser={this.state.users}
                  />
                  )}
                />
              <Route
              path={'/signup'}
              render={routeProps => (
                <Register
                {...routeProps}
                existUser={this.state.users}
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
