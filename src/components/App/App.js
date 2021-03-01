  //import './App.css';
  import { Redirect, Route, Switch } from 'react-router-dom';
  import React, { Component } from 'react';

  import Home from './Routes/Home/Home';
  import Logform from './Routes/Logform/Logform';
  import Register from './Routes/Register/Register';
  import Missing from './Routes/Missing/Missing';
  import Test from './Routes/Test/Test';
  import Results from './Routes/Results/Results';

  import CreateQuiz from './Routes/CreateQuiz/CreateQuiz';

  import EditQuiz from './Routes/EditQuiz/EditQuiz';
  import NewQuiz from './Routes/NewQuiz/NewQuiz';

  import NewQuestion from './Routes/NewQuestion/NewQuestion';

  import dummyStore from '../../dummy-store';
  import { findUser, findQuiz, findQuestion, getQuizzesForUsers, getQuestionsForUsers, getQuestionsforQuizzes, countQuizzesForUser, countQuestionsForUser, countQuestionsForQuiz} from '../../helper';

  import TokenService from '../../services/token-service';
  import config from '../../config';

  class App extends Component{
    state = {
      users: [],
      quizzes: [],
      questions: [],
     // userID: 0,
     // quizID: 0,
      questionID: 0,
      testTitle: '',
      test: [],
      current: 0,
      total: 0,
      points: 0,
  };

  componentDidMount() {
    // fake date loading from API call
    //setTimeout(() => this.setState(dummyStore), 600);

    Promise.all([
      fetch(`${config.API_ENDPOINT}/auth`),
      fetch(`${config.API_ENDPOINT}/quizzes`),
      fetch(`${config.API_ENDPOINT}/questions`)
    ])
      .then(([userRes, quizRes, questionRes]) => {
        if (!userRes.ok)
          return userRes.json().then(e => Promise.reject(e))
        if (!quizRes.ok)
          return quizRes.json().then(e => Promise.reject(e))
        if (!questionRes.ok)
          return questionRes.json().then(e => Promise.reject(e))
        return Promise.all([
          userRes.json(),
          quizRes.json(),
          questionRes.json(),
        ])
      })
      .then(([users, quizzes, questions]) => {
        this.setState({ users, quizzes, questions })
      })
      .catch(error => {
        console.error({ error })
      })
}

deleteReload = (id) =>{
  var quizList = this.state.quizzes;
  var newList = quizList.filter(quiz => quiz.id !== id);

  this.setState({ quizzes : newList }, () => {
    //  console.log(this.state.quizzes)
    }  
    );
}

deleteQuiz = (id) =>{
  
  console.log('deleteQuiz ran ' + id);

  var deleteQuiz = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(id)
  }

  fetch(`${config.API_ENDPOINT}/quizzes/${id}`, deleteQuiz)
        .then(this.deleteReload(id))

}

    takeQuizQuestion = (a,b) =>{
     // console.log('questionGiftUser ran');
     // console.log('quiz ' + a);
     // console.log('question ' + b);

      var question = findQuestion(this.state.questions, b);

      var questionList = this.state.questions;
      var newQuestionList = questionList.filter(question => question.id !== b);
      
      question.test = null;
      question.used = false;
      newQuestionList = newQuestionList.concat(question);

      this.setState({ questions : newQuestionList });

    }

    giftQuizQuestion = (a,b) => {
      console.log('quizGiftUser ran');
      console.log('quiz ' + a);
      console.log('question ' + b);  

      var question = findQuestion(this.state.questions, b);

      var questionList = this.state.questions;
      var newQuestionList = questionList.filter(question => question.id !== b);

      question.test = a;
      question.used = true;
      newQuestionList = newQuestionList.concat(question);

      this.setState({ questions : newQuestionList });
	
    }

    userReload = (data) =>{

      var newUserItem = { "id": data.id, "name": data.name, "password": data.password };
      var newUserList = this.state.users.concat(newUserItem);
      this.setState({ users: newUserList });

    }

    userSubmit = (u, p) => {
      var newUser = { "name": u, "password": p };

      var postUser = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }

      var ider = newUser.id;

      TokenService.saveAuthToken(ider);
          
      fetch(`${config.API_ENDPOINT}/auth`, postUser)  
      .then(response => response.json())
      .then(data => this.userReload(data))

    }

    questionReload = (data) => {
      var newQuestionItem = { "id": data.id, "question": data.question, "answer": data.answer, "choices": data.choices, "test": data.test, "userid": data.userid, "used": data.used };

      var newQuestionList = this.state.questions.concat(newQuestionItem);

      this.setState({ questions: newQuestionList });

    }

    questionSubmit = (q, t, pi) => {
     // console.log('questionSubmit ran');

     var userToken = TokenService.getAuthToken();

     var choices = [];
      choices = pi;

     var newQuestion = { "question": q, "answer": t, "choices": choices, "test": null, "userid": userToken, "used": false };

     var postQuestion = {
       method: 'POST',
       headers: {
         'content-type': 'application/json'
       },
       body: JSON.stringify(newQuestion)
     }
         
     fetch(`${config.API_ENDPOINT}/questions`, postQuestion)  
     .then(response => response.json())
     .then(data => this.questionReload(data))

    }

    quizReload = (data) =>{

      var newQuizItem = { "id": data.id, "name": data.name, "modified": data.modified, "count": data.count, "published": data.published, "userid": data.userid };
      var newQuizList = this.state.quizzes.concat(newQuizItem);
      this.setState({ quizzes: newQuizList });

    }

    quizSubmit = (x) => {
     // console.log('quizSubmit ran');

      var date = new Date();

      var userToken = TokenService.getAuthToken();

      var newQuiz = { "name": x, "modified": date, "count": 0, "published": false, "userid": userToken };
    //  console.log(newQuiz);

      var postQuiz = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newQuiz)
      }
          
      fetch(`${config.API_ENDPOINT}/quizzes`, postQuiz)  
      .then(response => response.json())
      .then(data => this.quizReload(data))

    }

    deleteQuestionReload = (id) =>{
      var questionList = this.state.questions;
      var newList = questionList.filter(question => question.id !== id);
    
      this.setState({ questions : newList }, () => {
        //  console.log(this.state.quizzes)
        }  
        );
    }

    deleteQuestion = (id) =>{

      var deleteQuestion = {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(id)
      }

      fetch(`${config.API_ENDPOINT}/questions/${id}`, deleteQuestion)
            .then(this.deleteQuestionReload(id))
      
    }

    publishReload = (a, rebuildQuiz) =>{
      const list = this.state.quizzes;
      var newList = list.filter(quiz => quiz.id !== a);
      newList = newList.concat(rebuildQuiz);
   
      this.setState({ quizzes : newList });
    }

    publishQuiz = (a) => {
  //    console.log('publishedQuiz ran');
    var rebuildQuiz = findQuiz(this.state.quizzes, a);
    var date = new Date();

    rebuildQuiz.published = true;
    rebuildQuiz.modified = date;

  console.log('rebuildQuiz: ' + JSON.stringify(rebuildQuiz));

      var patchQuiz = {
        method: 'Quiz',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(rebuildQuiz)
      }

      fetch(`${config.API_ENDPOINT}/quizzes/${a}`, patchQuiz)
      .then(this.publishReload(a, rebuildQuiz))

    }

    unPublishQuiz = (b) => {
    //  console.log('unpublishedQuiz ran' + b);

      var rebuildQuiz = findQuiz(this.state.quizzes, b);
     // console.log(rebuildQuiz);

      rebuildQuiz.published = false;
      rebuildQuiz.count= 0;

    //  console.log(rebuildQuiz);

      const list = this.state.quizzes;
   //   console.log(list);

        var newList = list.filter(quiz => quiz.id !== b);
     //   console.log(newList);
        
        newList = newList.concat(rebuildQuiz);
      //  console.log(newList);

        this.setState({ quizzes : newList });

    }

    startQuiz = (c) => {
      //console.log('startQuiz ran ' + c);
      var chosenQuiz= findQuiz(this.state.quizzes, c);

     // console.log(chosenQuiz.name);

      this.setState({ testTitle : ''});
      this.setState({ test : [] });
      this.setState({ current : 0});
      this.setState({ points : 0});
      this.setState({ total : 0 });

      var chosenQuestions = getQuestionsforQuizzes(this.state.questions, c);

      var newQuestions = chosenQuestions
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value) 

      var totalQuestions = newQuestions.length

     // console.log(chosenQuestions);

      this.setState({ testTitle : chosenQuiz.name });
      this.setState({ test : newQuestions });
      this.setState({ current : 0});
      this.setState({ points : 0});
      this.setState({ total : totalQuestions });


      chosenQuiz.count= chosenQuiz.count + 1;
      const list = this.state.quizzes;
      var newList = list.filter(quiz => quiz.id !== c);
      newList = newList.concat(chosenQuiz);
      this.setState({ quizzes : newList });

    }

    gainPoint = () =>{
      console.log('gainPoint ran');
      var point = this.state.points;
      point = point + 1;
      this.setState({ points : point});
      
      var newCurrent = this.state.current + 1;
      this.setState({ current : newCurrent })          
      
    }

    noPoint = () =>{
      console.log('noPoint ran');
      
      var newCurrent = this.state.current + 1;
      this.setState({ current : newCurrent })   
      
    }
    
    render(){ 
      return (
          <div className="App">
            <Switch>
              <Route
                exact
                path={'/'}
                render={routeProps => (
                  <Home
                    {...routeProps}
                    userList={this.state.users}
                    quizList={this.state.quizzes}
                    questionList={this.state.questions}
                    publishQuiz ={this.publishQuiz}
                    unPublishQuiz = {this.unPublishQuiz}
                    startQuiz = {this.startQuiz}
                    deleteQuiz={this.deleteQuiz}
                />
                  )}
                />
                 <Route path={'/test'} render={routeProps => (
                  <Test
                    {...routeProps}
                    testTitle={this.state.testTitle}
                    testQuestions={this.state.test}
                    current={this.state.current}
                    total={this.state.total}
                    points={this.state.points}
                    gainPoint={this.gainPoint}
                    noPoint={this.noPoint}
                    questionList = {this.state.questions}
                    /> 
                )}
                  />
                <Route
                  path='/results'
                  render={routeProps => (
                    <Results
                    {...routeProps}
                    total={this.state.total}
                    points={this.state.points}/>
                  )}
                />
                <Route
                  path={'/login'}
                  render={routeProps => (
                    <Logform
                      {...routeProps}
                      existUser={this.state.users}
                    />
                    )}
                  />
                  <Route
                    path={'/signup'}
                    render={routeProps => (
                      <Register
                      {...routeProps}
                      existUser={this.state.users}
                      addNewUser={this.userSubmit}
                      />
                      )} 
                    />
                  <Route
                    exact
                    path='/create'
                    render={routeProps => (
                      <CreateQuiz
                        {...routeProps}
                        userList={this.state.users}
                        quizList={this.state.quizzes}
                        questionList={this.state.questions}
                        publishQuiz ={this.publishQuiz}
                        unPublishQuiz = {this.unPublishQuiz}
                        deleteQuestion = {this.deleteQuestion}
                        deleteQuiz={this.deleteQuiz}
                        />
                    )}
                    />
                     <Route
                    exact
                    path='/create/newQuiz'
                    render={routeProps => (
                      <NewQuiz
                        {...routeProps}
                        userList={this.state.users}
                        quizList={this.state.quizzes}
                        questionList={this.state.questions}
                        addNewQuiz={this.quizSubmit}
                        />
                    )}
                    />
                  <Route
                    path='/create/newQuestion'
                    render={routeProps => (
                      <NewQuestion
                        {...routeProps}
                        userList={this.state.users}
                        quizList={this.state.quizzes}
                        questionList={this.state.questions}
                        publishQuiz ={this.publishQuiz}
                        unPublishQuiz = {this.unPublishQuiz}
                        addNewQuestion = {this.questionSubmit}
                        />
                    )}
                    />
                <Route
                path='/create/quiz/:quizId'
                render={routeProps => {
                  const {quizId} = routeProps.match.params;
                  const quiz = findQuiz(this.state.quizzes, quizId);
                  //console.log(quiz);
                  return <EditQuiz 
                  {...routeProps} 
                  quiz={quiz}
                  userList={this.state.users}
                  quizList={this.state.quizzes}
                  questionList={this.state.questions}
                  giftUserQuestion={this.takeQuizQuestion}
                  giftQuizQuestion={this.giftQuizQuestion}
                  />
                }}
                />
               <Route
               path='/missing'
                render={routeProps => (
                  <Missing
                  {...routeProps}/>
                  )}
              />
                <Route
                render={routeProps => (
                  <Missing
                  {...routeProps}/>
                  )}
              />
            </Switch>
          </div>
      );
    }
  }

  export default App;
