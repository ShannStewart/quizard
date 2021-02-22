import './Home.css';
import { Component } from 'react';

import Header from '../../Header/Header';
import TokenService from '../../../../services/token-service';

import NewQuiz from '../../newQuiz/newQuiz';
import PopularQuiz from '../../popularQuiz/popularQuiz';
import PublishedQuiz from '../../PublishedQuiz/PublishedQuiz';
import UnpublishedQuiz from '../../UnpublishedQuiz/UnpublishedQuiz';

//import dummyStore from '../../../../dummy-store';

class HomeLogin extends Component{

  render(){
    return(
      <main>
           <section className='halfSection userQuiz'>
                <div>
                   <UnpublishedQuiz quizList={this.props.quizList} userList={this.props.userList} publishQuiz={this.props.publishQuiz}/>
                  </div>
                <PublishedQuiz quizList={this.props.quizList} userList={this.props.userList} unPublishQuiz={this.props.unPublishQuiz}/>
              </section>
            <section className='halfSection otherQuiz'>
              <NewQuiz quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.props.takeQuiz}/>
              <PopularQuiz quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.props.takeQuiz}/>
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
            <NewQuiz quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.props.takeQuiz}/>
            <PopularQuiz quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.props.takeQuiz}/>
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
                ? <HomeLogin quizList={this.props.quizList} userList={this.props.userList} publishQuiz={this.props.publishQuiz} unPublishQuiz={this.props.unPublishQuiz} takeQuiz={this.props.takeQuiz}/>
                : <HomeLogout quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.props.takeQuiz}/>}
      </div>
    );
  }
}

export default Home;
