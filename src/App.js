import React, {Component} from 'react';
import Search from './components/Search';
import IssueContainer from './containers/IssueContainer';
import IssuesListContainer from './containers/IssuesListContainer';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component{

    render(){
        return <Router>
            <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path="/:login/:repository" component={IssuesListContainer} />
                <Route exact path="/:login/:repository/:page" component={IssuesListContainer} />
                <Route path="/:login/:repository/issue/:number" component={IssueContainer} />
            </Switch>
        </Router> 
    }
}