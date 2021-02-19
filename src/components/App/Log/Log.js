import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import TokenService from '../../../services/token-service'

class Log extends Component{
    handleLogoutClick = () => {
             TokenService.clearAuthToken()
            }   

    render(){
        return(
            <div className='Log'>
                <Switch>
                    <PublicOnlyRoute>
                    <Link to='/login'>
                        Log in
                        </Link>
                    </PublicOnlyRoute>
                    <PrivateRoute>
                        <button onClick={() => this.handleLogoutClick}>Log Out</button>
                    </PrivateRoute>
                </Switch>
            </div>
        )
    }
}

export default Log;