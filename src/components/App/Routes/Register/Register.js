import { Component } from 'react';
import './Register.css';

import { Button, Input, Required } from '../../../Utils/Utils'
import AuthApiService from '../../../../services/auth-api-service'

class Register extends Component{
    static defaultProps = {
        onRegistrationSuccess: () => {}
      }
    
      state = { error: null }
    
      handleSubmit = ev => {
        ev.preventDefault()
        const { signupName, signupPassword } = ev.target
    
        console.log('registration form submitted')
        console.log({ signupName, signupPassword })
    
        signupName.value = ''
        signupPassword.value = ''
        this.props.onRegistrationSuccess()
      }

    render(){
        return(
            <div className='Signup'>
                 <header>
                    <button class='backButton' onClick={() => this.props.history.goBack()}>
                        Return
                    </button>
                    <h1 class='siteTitle'>Quizard</h1>
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
            <div className='error hidden' id='passwordError'>
                <p>Passwords do not match.</p>
            </div>
            </div>
        )
    }
}

export default Register