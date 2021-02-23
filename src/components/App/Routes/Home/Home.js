import './Home.css';
import { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

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
  takeQuiz = (c) => {
   // console.log('takeQuiz ran' + c);

    this.props.startQuiz(c);

    this.props.history.push('/test')


  }
  
  render(){ 
    
    return (
      <div className="Home">
        <Route render={routeProps => (<Header {...routeProps}/>)}/>
        {TokenService.hasAuthToken()
                ? <HomeLogin quizList={this.props.quizList} userList={this.props.userList} publishQuiz={this.props.publishQuiz} unPublishQuiz={this.props.unPublishQuiz} takeQuiz={this.takeQuiz}/>
                : <HomeLogout quizList={this.props.quizList} userList={this.props.userList} takeQuiz={this.takeQuiz}/>}
      </div>
    );
  }
}

export default Home;
