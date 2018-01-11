import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Comments extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const comments = this.props.comments.map((elem, index) => {
            return <div>{index} {elem.body}</div>
        })
        return <div>
            {comments}
        </div>
    }
}

export default connect(
    state => ({
        comments: state.issue.comments,
    })  
)(Comments);