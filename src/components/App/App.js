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
      questions: 0,
      userID: 0,
      quizID: 0,
      questionID: 0
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
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
