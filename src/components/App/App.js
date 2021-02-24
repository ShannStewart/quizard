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

  class App extends Component{
    state = {
      users: [],
      quizzes: [],
      questions: [],
      userID: 0,
      quizID: 0,
      questionID: 0,
      testTitle: '',
      test: [],
      current: 0,
      total: 0,
      points: 0,
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
}

    questionGiftUser = (a) =>{
      console.log('questionGiftUser ran');

      var giftedUser = findUser();


    }

    giftQuizUser = (b) => {
      console.log('quizGiftUser ran');

      var giftedUser = findUser();
    }

    userSubmit = (u, p) => {
      //console.log('userSubmit ran');
      //console.log('running userSubmit with: ' + u + ' and ' + p);

      var newUser = {"id": "newUser" + this.state.userID, "user_name": u, "password": p, "quizzes": [], "questions": []};

      //console.log('new user: ' + newUser);

      var newUserID = this.state.userID + 1;
      this.setState({userID: newUserID});

      //console.log('check1');

      var newUserList = this.state.users.concat(newUser);
      this.setState({ users: newUserList });

      var ider = newUser.id;

      TokenService.saveAuthToken(ider);

      //console.log('check2');

    }

    questionSubmit = (q, t, pi) => {
     // console.log('questionSubmit ran');

      var newID = "newQuestion" + this.state.quizID;

      var choices = [];
      choices = pi;

      var newQuestion = {"id": newID, "question": q, "answer": t, "choices": choices };

      var newQuestionID = this.state.questionID + 1;

      var newQuestionList = this.state.questions.concat(newQuestion);

      var userToken = TokenService.getAuthToken();
          var quizzer = findUser(this.state.users, userToken);
         quizzer.questions = quizzer.questions.concat(newID);
    
        var list = this.state.users;
    
         var newList = list.filter(user => user.id !== userToken)
         newList = newList.concat(quizzer);


      this.setState({ questionID: newQuestionID, questions: newQuestionList, users: newList });

    }

    quizSubmit = (x) => {
      console.log('quizSubmit ran');

      var date = new Date();

      var newID = "newQuiz" + this.state.quizID;

      var newQuiz = {"id": newID, "name": x, "questions": [], "modified": date, "count": 0, "published": false};
    //  console.log(newQuiz);

      var newQuizID = this.state.quizID + 1;
      
      var newQuizList = this.state.quizzes.concat(newQuiz);
      
     // console.log(newQuizList);

      var userToken = TokenService.getAuthToken();
  //   console.log(userToken)

      var quizzer = findUser(this.state.users, userToken);
   //   console.log(quizzer);
     quizzer.test = quizzer.test.concat(newID);

    var list = this.state.users;

     var newList = list.filter(user => user.id !== userToken)
     newList = newList.concat(quizzer);
     this.setState({ quizID: newQuizID, quizzes : newQuizList, users: newList }, () => {
       //console.log(this.state.quizzes);
     }
     );
    }

    deleteQuestion = (id) =>{
      console.log('deleteQuestion ran ' + id);

      var questionList = this.state.questions;
      console.log(questionList);
      var newList = questionList.filter(question => question.id !== id);
      console.log(newList);

        var userToken = TokenService.getAuthToken();
  
      var quizzer = findUser(this.state.users, userToken);

      var userQuestion = quizzer.questions;
      var newUserQuestion = userQuestion.filter(question => question !== id);

      quizzer.questions = newUserQuestion;

      var userList = this.state.users;

      var newUserList = userList.filter(user => user.id !== userToken)
      newUserList = newUserList.concat(quizzer);

      this.setState({ questions : newList, users: newUserList }, () => {
        console.log(this.state.questions)
      }  
      );
      
    }

    publishQuiz = (a) => {
  //    console.log('publishedQuiz ran');

      var rebuildQuiz = findQuiz(this.state.quizzes, a);

      var date = new Date();

      rebuildQuiz.published = true;
      rebuildQuiz.modified = date;

      const list = this.state.quizzes;
      //console.log(list);

        var newList = list.filter(quiz => quiz.id !== a);
      //  console.log(newList);
        
        newList = newList.concat(rebuildQuiz);
      //  console.log(newList);

        this.setState({ quizzes : newList });

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
      //console.log('startQuiz ran' + c);
      var chosenQuiz= findQuiz(this.state.quizzes, c);

     // console.log(chosenQuiz.name);

      this.setState({ testTitle : ''});
      this.setState({ test : [] });
      this.setState({ current : 0});
      this.setState({ points : 0});
      this.setState({ total : 0 });

      var chosenQuestions = [];
    
      var i;
      for (i=0; i < chosenQuiz.questions.length; i++){
        chosenQuestions = chosenQuestions.concat(findQuestion(this.state.questions, chosenQuiz.questions[i]));
        //console.log(chosenQuestions);
      }

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
                    publishQuiz ={this.publishQuiz}
                    unPublishQuiz = {this.unPublishQuiz}
                    startQuiz = {this.startQuiz}
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
                  return <EditQuiz {...routeProps} quiz={quiz}/>
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
