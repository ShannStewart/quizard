  //import './App.css';
  import { Route, Switch } from 'react-router-dom';
  import { Component } from 'react';

  import Home from './Routes/Home/Home';
  import Logform from './Routes/Logform/Logform';
  import Register from './Routes/Register/Register';
  import Missing from './Routes/Missing/Missing';

  import dummyStore from '../../dummy-store';




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
      console.log('userSubmit ran');
      console.log('running userSubmit with: ' + u + ' and ' + p);

      var newUser = {"id": "newUser" + this.state.userID, "user_name": u, "password": p};

      console.log('new user: ' + newUser);

      var newUserID = this.state.userID + 1;
      this.setState({userID: newUserID});

      console.log('check1');

      var newUserList = this.state.users.concat(JSON.stringify(newUser));
      this.setState({ users: newUserList });

      console.log('check2');

    }

    questionSubmit = (q) => {
      console.log('questionSubmit ran');
    }

    quizSubmit = (x, y) => {
      console.log('quizSubmit ran');
      console.log('username ' + x + ' password: ' + y);
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
