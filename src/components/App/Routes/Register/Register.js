import { Component } from 'react';
import './Register.css';

import { Button, Input, Required } from '../../../Utils/Utils'
import AuthApiService from '../../../../services/auth-api-service'

import TokenService from '../../../../services/token-service'

class Register extends Component{
    static defaultProps = {
        onRegistrationSuccess: () => {}
      }
    
      state = { error: null }
    
      handleSubmit = ev => {
        ev.preventDefault()
        console.log('register handlesubmit ran');
        var userName = ev.target.username.value;
        var password = ev.target.password.value;
        var confirm = ev.target.confirm.value;

        var userMiss = document.getElementById("usernameMissing");
        var passMiss = document.getElementById("passwordMissing");
        var confirmMiss = document.getElementById("confirmMissing");
        var takenUser = document.getElementById("alreadyThere")

        userMiss.classList.add("hidden");
        passMiss.classList.add("hidden");
        confirmMiss.classList.add("hidden");
    
        if (!userName){
            userMiss.classList.remove("hidden");
              return console.log("no name"); 
          }

          if (!password){
            passMiss.classList.remove("hidden");
              return console.log("no password"); 
          }

          if (confirm !== password){
            confirmMiss.classList.remove("hidden");
              return console.log("passwords aren't the same"); 
          }

          //console.log("existUser: " + this.props.existUser);

         var userCheck = this.props.existUser.find(user => user.name == userName);

          //console.log("userCheck: " + JSON.stringify(userCheck));

          if (typeof userCheck !== "undefined"){
              console.log("userCheck isnt undefined")
            takenUser.classList.remove("hidden");
                return console.log("username taken")
          }

        //console.log('registration form submitted')
        //console.log({ userName, password })
    
        TokenService.clearAuthToken();
       this.props.addNewUser(userName, password);

       this.props.history.goBack();
      }

    render(){
        return(
            <div className='Signup'>
                 <header>
                    <button className='backButton' onClick={() => this.props.history.goBack()}>
                        Return
                    </button>
                    <h1 className='siteTitle'>Quizard</h1>
                </header>
            <div className='profileLog'>
                <div className='profileBack'>
                <form action="submit" className='profileForm' onSubmit={this.handleSubmit}>
                    <label>
                        Username <Required />
                        </label>
                    <input name='username' type='text' id='signupName'/>
                    <label>
                        Password <Required />   
                        </label>
                    <input name='password' type='text' id='signupPassword'/>
                    <label>
                        Confirm Password <Required /> 
                        </label>
                    <input name='confirm' type='text' id='signupConfirm'/>
                    <button className= 'logButton submitter' type="submit">
                        Sign Up
                    </button>
                    </form>
                </div>
                </div>
            <div className='errorSpace' id='passwordError'>
                        <p className="hidden" id="usernameMissing">Username is required</p>
                        <p className="hidden" id="passwordMissing">Password is required</p>
                        <p className="hidden" id="confirmMissing">Passwords aren't the same</p>
                        <p className="hidden" id="alreadyThere">That username is already taken</p>
            </div>
            </div>
        )
    }
}

export default Register