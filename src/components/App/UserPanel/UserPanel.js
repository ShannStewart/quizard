import { React, Component } from 'react';

class UserPanel extends Component{
    render(){
        return(
            <div>
                <div><h3>{this.props.title}</h3></div>
                <div>
                    <div><h4>By {this.props.author}</h4><h4>Taken: {this.props.views}</h4></div>
                    <div><button>Take Test</button></div>
                </div>
            </div>
        )
    }
}

export default UserPanel