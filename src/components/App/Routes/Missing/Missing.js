import './Missing.css'
import { Component } from 'react';

class Missing extends Component{
    render(){
        return(
            <div>
                <header>
                    <div className='sansButton'>
                        <h1 className='siteTitle'>Quizard</h1>
                    </div>
                </header>
                <main>
                <section className='fullSection'>
                    <div className='missingPage'>
                    <h3>Sorry, the page you were looking for doesn't not exist.</h3>
                    <button onClick={this.props.history.push('/')}>Return</button>
                    </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Missing;