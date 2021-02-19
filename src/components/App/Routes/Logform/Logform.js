import { Component } from 'react';
import './Logform.css'
import TokenService from '../../../../services/token-service'

class Logform extends Component{

    static defaultProps = {
        onLoginSuccess: () => {}
      }
    
      state = { error: null }
    
      handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
    
        AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
          .then(res => {
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }

    render(){
        return(
            <div className='Logform'>
                 <header>
                <button class='backButton' onClick={() => this.props.history.goBack()}>
                    Return
                </button>
                    <h1 class='siteTitle'>Quizard</h1>
                </header>
                    <div class='profileBack'>
                    <form action="submit" class='profileForm' onSubmit={this.handleSubmitJwtAuth}>
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
            </div>
        )
    }
}

export default Logform