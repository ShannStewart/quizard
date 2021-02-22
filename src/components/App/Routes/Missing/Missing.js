import './Missing.css'
import { Component } from 'react';

class Missing extends Component{
    render(){
        return(
            <div>
                <header>
                    <div class='sansButton'>
                        <h1 class='siteTitle'>Quizard</h1>
                    </div>
                </header>
                <main>
                <section class='fullSection'>
                    <div class='missingPage'>
                    <h3>Sorry, the page you were looking for doesn't not exist.</h3>
                    </div>>
                    </section>
                </main>
            </div>
        )
    }
}

export default Missing;