import React, {Component} from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';

export default class SearchContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: this.props.match.params.login || '',
            repository: '',
        }
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    render(){
        return <div>
            <Search
                login={this.state.login}
                repository={this.state.repository}
                handleChange={this.handleChange.bind(this)}
            />
        </div>
        ;
    }
}

// export default connect(
//     state => ({

//     }),
//     {  }
// )(SearchContainer);

