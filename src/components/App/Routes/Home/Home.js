import './Home.css';
import { Component } from 'react';

import Header from '../../Header/Header';
import TokenService from '../../../../services/token-service';

import NewQuiz from '../../newQuiz/newQuiz';
import PopularQuiz from '../../popularQuiz/popularQuiz';

//import dummyStore from '../../../../dummy-store';

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
              <NewQuiz quizList={this.props.quizList} userList={this.props.userList}/>
              <PopularQuiz quizList={this.props.quizList} userList={this.props.userList}/>
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
            <NewQuiz quizList={this.props.quizList} userList={this.props.userList}/>
            <PopularQuiz quizList={this.props.quizList} userList={this.props.userList}/>
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
                ? <HomeLogin quizList={this.props.quizList} userList={this.props.userList}/>
                : <HomeLogout quizList={this.props.quizList} userList={this.props.userList}/>}
      </div>
    );
  }
}

export default Home;
