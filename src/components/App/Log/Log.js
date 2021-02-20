import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

//import PrivateRoute from '../../Utils/PrivateRoute'
//import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import TokenService from '../../../services/token-service'

class Log extends Component{

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        window.location.reload();
       }   

    render(){
        return(
            <div className='Log'>
            {TokenService.hasAuthToken()
                ?  <button onClick={this.handleLogoutClick}>Log Out</button>
                :  <Link to='/login'> Log in </Link>}
            </div>
        )
    }
}



export default Log;