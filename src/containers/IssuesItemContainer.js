import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../AC';
import Loader from '../components/LoadingIndicator';

class IssueContainer extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { login, repository, page } = this.props.match.params;
        
        
    }

    render(){


        return ;
    }
}

export default connect(
    state => ({

    }),
    {  }
)(IssueContainer);

