import { React, Component } from 'react';

class UserPanel extends Component{

    handlePublish = (id) => {
       // console.log('handlePublish ran ' + id);

        this.props.publishButton(id);
    }

    render(){

        const quizID = this.props.quizID;

        return(
            <div>
                <div><h3>{this.props.title}</h3></div>
                <div>
                    <div><h4>By {this.props.author}</h4><h4>Taken: {this.props.views}</h4></div>
                    <div>
                        {!this.props.published 
                         ?<button onClick={() => this.props.history.push(`/create/quiz/${this.props.quizID}`)}>Edit</button>
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