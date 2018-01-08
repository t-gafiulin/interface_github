import React, {Component} from 'react';
import { connect } from 'react-redux';


class Issue extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.issue)
        return <div>
                Hello, Issue!
            </div>
    }
}

export default connect(
    state => ({
        issue: state.issue.issue,
    })  
)(Issue);