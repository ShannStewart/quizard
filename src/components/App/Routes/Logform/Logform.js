import { Component } from 'react';
import './Logform.css'
import TokenService from '../../../../services/token-service'
//import AuthApiService from '../../../../services/auth-api-service'

import dummyStore from '../../../../dummy-store';

//import userContext from '../../../context/userContext';

class Logform extends Component{

    static defaultProps = {
        onLoginSuccess: () => {}
      }
    
      state = { error: null }
    
      handleLogIn = ev => {
        ev.preventDefault()
        //console.log("handleLogIn ran");

        var userName = ev.target.user_name.value;
        var password = ev.target.password.value;

        console.log("checking username: " + userName);
        console.log("checking password: " + password);

        var userMiss = document.getElementById("usernameMissing");
        var passMiss = document.getElementById("passwordMissing");
        var userWrong = document.getElementById("usernameWrong");
        var passWrong = document.getElementById("passwordWrong");

        userMiss.classList.add("hidden");
        passMiss.classList.add("hidden");
        userWrong.classList.add("hidden");
        passWrong.classList.add("hidden");

        if (!userName){
            userMiss.classList.remove("hidden");
              return console.log("no name"); 
          }

          const userCheck = dummyStore.users.find(user => user.user_name == userName);
          const passCheck = dummyStore.users.find(user => user.password == password);

          if (userCheck == null){
            userMiss.classList.remove("hidden");
              return console.log("username is not in our database");
          }

          if (!password){
            passMiss.classList.remove("hidden");
              return console.log("no password");
          }

          if (passCheck == null){
            userMiss.classList.remove("hidden");
              return console.log("password is wrong");
          }

          const userID = userCheck.id;
          //console.log('userID is: ' + userID);

          console.log("Sending token");

          TokenService.saveAuthToken( JSON.stringify({ userName, password, userID }) );

          this.props.history.goBack();
      }

    render(){
        return(
            <div className='Logform'>
                 <header>
                <button className='backButton' onClick={() => this.props.history.goBack()}>
                    Return
                </button>
                    <h1 className='siteTitle'>Quizard</h1>
                </header>
                    <div className='profileBack'>
                    <form action="submit" className='profileForm' onSubmit={this.handleLogIn}>
                        <label>
                            Username
                            </label>
                        <input type='text' name='user_name' id='loginName'/>
                        <label>
                            Password  
                            </label>
                        <input type='text' name='password' id='loginPassword'/>
                        <button type="submit" class='submitter'>
                            Log in
                        </button>
                        </form>
                    </div>
                    <div className="errorSpace">
                        <p className="hidden" id="usernameMissing">Username is required</p>
                        <p className="hidden" id="passwordMissing">Password is required</p>
                        <p className="hidden" id="usernameWrong">Username is wrong</p>
                        <p className="hidden" id="passwordWrong">Password is wrong</p>
                    </div>
            </div>
        )
    }
}

export default Logform