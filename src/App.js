import React, {Component} from 'react';
import Search from './components/Search';
import Issue from './components/Issue';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component{

    render(){
        return <Router>
            <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path="/:login/:repository" component={Search} />
                <Route path="/:login/:repository/issue/:number" component={Issue} />
            </Switch>
        </Router> 
    }
}