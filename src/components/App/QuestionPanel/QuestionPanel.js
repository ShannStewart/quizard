import { React, Component } from 'react'

export default class QuestionPanel extends Component {

    handleDelete = (id) => {
        console.log('question handleDelete ran ' + id);

        this.props.deleteQuestion(id);
    }

    render(){
        return(
         <div>
            <h4>{this.props.question}</h4>
            <p>Answer:{this.props.answer}</p>
            <button onClick={() => this.handleDelete(this.props.id)}>Delete</button>
         </div>
        )
    }
}