import './Header.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import Log from '../Log/Log';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import PrivateRoute from '../../Utils/PrivateRoute';

import TokenService from '../../../services/token-service'

export class HeaderOut extends Component{

  render(){
    return(
      <div className='headerBar'>
           <Log/>
           <div>
                <Link to='/signup'>
                      Register
                  </Link>
              </div>
      </div>
    )
  }
}

export class HeaderIn extends Component{

  render(){
    return(
      <div className='headerBar'>
             <div> <Link to='/create'>
                      My Profile
                  </Link></div>
                  <Log/>
      </div>
    )
  }
}

class Header extends Component{

  render(){ 
    return (
      <div>
        <header>
          <h1 className='siteTitle'>Quizard</h1>
          <section className='user'>
          {TokenService.hasAuthToken()
                ? <Route render={routeProps => (<HeaderIn {...routeProps}/>)}/>
                : <Route render={routeProps => (<HeaderOut {...routeProps}/>)}/>}
            </section>
        </header>
      </div>
    );
  }
}

export default Header;
