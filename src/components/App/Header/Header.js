import './Header.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import Log from '../Log/Log';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import PrivateRoute from '../../Utils/PrivateRoute';

class Header extends Component{

  render(){ 
    return (
      <div className="Header">
        <header>
          <h1 className='siteTitle'>Quizard</h1>
          <section className='user'>
          <Switch>
            <PublicOnlyRoute>
                <Log/>
                <Link to='/signup'>
                      Register
                  </Link>
            </PublicOnlyRoute>
            <PrivateRoute>
              <p>My Profile</p>
                  <Log/>
                  <Link to='/signup'>
                        Register
                    </Link>
            </PrivateRoute>
          </Switch>
            </section>
        </header>
      </div>
    );
  }
}

export default Header;
