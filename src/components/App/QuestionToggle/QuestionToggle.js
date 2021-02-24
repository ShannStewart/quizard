import { React, Component } from 'react'

export default class QuestionToggle extends Component {

    handleRemove = () =>{
        console.log('handleRemove ran')
    }

    handleAdd = () =>{
        console.log('handleAdd ran')
    }


    render(){
        return(
         <div>
            <h4>{this.props.question}</h4>
            <p>Answer:{this.props.answer}</p>
            {(this.props.in == 0)
             ?<button onClick={()=>this.handleRemove()}>Remove</button>
             :<button onClick={()=>this.handleAdd()}>Add</button>}
         </div>
        )
    }
}
