  //import './App.css';
  import { Route, Switch } from 'react-router-dom';
  import { Component } from 'react';

  import Home from './Routes/Home/Home';
  import Logform from './Routes/Logform/Logform';
  import Register from './Routes/Register/Register';
  import Missing from './Routes/Missing/Missing';


  class App extends Component{
    constructor(){
      
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
              component={Missing}
            />
          </Switch>
        </div>
      );
    }
  }

  export default App;
