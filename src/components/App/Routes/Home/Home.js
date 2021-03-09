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
           <section className='fourSection'>
                   <UnpublishedQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} publishQuiz={this.props.publishQuiz} deleteQuiz={this.props.deleteQuiz}/>
                  </section>
              <section className='fourSection'>
                <PublishedQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} unPublishQuiz={this.props.unPublishQuiz} deleteQuiz={this.props.deleteQuiz}/> 
              </section>
            <section className='fourSection'>
              <NewQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} takeQuiz={this.props.takeQuiz}/>
              </section>
              <section className='fourSection'>
              <PopularQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} takeQuiz={this.props.takeQuiz}/>
              </section>
      </main>
    )
  }
}

class HomeLogout extends Component{

  render(){
    return(
      <main>
      <section className='twoSection'>     
            <NewQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} takeQuiz={this.props.takeQuiz}/>
        </section>
        <section className='twoSection'>
            <PopularQuiz quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} takeQuiz={this.props.takeQuiz}/>
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
                ? <HomeLogin quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} publishQuiz={this.props.publishQuiz} unPublishQuiz={this.props.unPublishQuiz} takeQuiz={this.takeQuiz} deleteQuiz={this.props.deleteQuiz}/>
                : <HomeLogout quizList={this.props.quizList} userList={this.props.userList} questionList={this.props.questionList} takeQuiz={this.takeQuiz}/>}
      </div>
    );
  }
}

export default Home;
