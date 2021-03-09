import { React, Component } from 'react';

import { findQuiz, countQuestionsForQuiz } from '../../../helper';

class UserPanel extends Component{

    handlePublish = (id) => {
       // console.log('handlePublish ran ' + id);

       var questionNumber = countQuestionsForQuiz(this.props.questionList, id);
       
        if (questionNumber > 0){
            this.props.publishButton(id);
        }
        else{
            console.log('A quiz needs at least one question before you can publish it')
        }

    }

    handleDelete = (id) =>{
        console.log('quiz handleDelete ran ' + id)

        this.props.deleteQuiz(id);
        
    }

    render(){

        const quizID = this.props.quizID;

        return(
            <div className='panel'>
                <div><h3>{this.props.title}</h3></div>
                <div>
                    <div><h4>By {this.props.author}</h4><h4>Taken: {this.props.views}</h4></div>
                    <div>
                        {!this.props.published 
                         ?<button onClick={() => this.props.history.push(`/create/quiz/${this.props.quizID}`)}>Edit</button>
                         :<div></div>}
                        </div>
                        <div>
                            {!this.props.published 
                            ?<button onClick={() => this.handleDelete(this.props.quizID)}>Delete</button>
                            :<div></div>}
                        </div>
                        <div>
                            {this.props.published 
                            ? <button onClick={() => this.handlePublish(quizID)}>Unpublish</button>
                            : <button onClick={() => this.handlePublish(quizID)}>Publish</button>}
                        </div>
                </div>
            </div>
        )
    }
}

export default UserPanel