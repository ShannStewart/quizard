import { React, Component } from 'react'

export default class QuestionToggle extends Component {

    handleRemove = (a,b) =>{
        console.log('handleRemove ran ' + a + ' ' + b);

        this.props.giftUserQuestion(a,b);
    }

    handleAdd = (a,b) =>{
        console.log('handleAdd ran ' + a + ' ' + b);

        this.props.giftQuizQuestion(a,b);
    }


    render(){
        return(
         <div>
            <h4>{this.props.question}</h4>
            <p>Answer:{this.props.answer}</p>
            {(this.props.in == 0)
             ?<button onClick={()=>this.handleRemove(this.props.quizID, this.props.id)}>Remove</button>
             :<button onClick={()=>this.handleAdd(this.props.quizID, this.props.id)}>Add</button>}
         </div>
        )
    }
}
