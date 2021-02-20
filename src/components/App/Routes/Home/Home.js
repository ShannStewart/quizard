import './Home.css';
import { Component } from 'react';

import Header from '../../Header/Header';
import TokenService from '../../../../services/token-service';

import NewQuiz from '../../newQuiz/newQuiz';
import PopularQuiz from '../../popularQuiz/popularQuiz';

import dummyStore from '../../../../dummy-store';


class HomeLogin extends Component{

  render(){
    return(
      <main>
           <section className='halfSection userQuiz'>
                <div>
                    <h2 className='sectionTitle'>Quizzes In Progress</h2>
                    <div className='unpublished'>
                      </div>
                  </div>
                <div className='published'>
                    <h2 className='sectionTitle'>Your Published Quizzes</h2>
                  </div>
              </section>
            <section className='halfSection otherQuiz'>
                <div className='newQuizzes'>
                    <h2 className='sectionTitle'>New Quizzes</h2>
                  </div>
                <div className= 'popularQuizzes'>
                    <h2 className='sectionTitle'>Popular Quizzes</h2>
                  </div>
              </section>
      </main>
    )
  }
}

class HomeLogout extends Component{

  render(){
    return(
      <main>
      <section className='fullSection otherQuiz'>
          <NewQuiz/>
          <PopularQuiz/>
        </section>
      </main>
    )
  }
}
  

class Home extends Component{
  
  render(){ 
    return (
      <div className="Home">
        <Header/>
        {TokenService.hasAuthToken()
                ? <HomeLogin/>
                : <HomeLogout/>}
      </div>
    );
  }
}

export default Home;
