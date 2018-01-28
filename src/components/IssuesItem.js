import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../resource/IssuesItem.css';


export default class IssuesItem extends Component {
    constructor(props){
        super(props);
    }

    dateParser(date){
        return date.split('T').join(' ').slice(0, -1);
    }

    handleClick(){
        console.log(this.props.number);
        this.props.handleClick(this.props.number);
    }

    render(){
        const { title, number, date, login, url, labels, comments_amount, handleClick } = this.props; 
        

        const labels_block = labels.map((elem) => {
            return <div class='issue-item__label' style={{backgroundColor: '#' + elem.color}}>
                {elem.name}
            </div>
        })

        return <div class='issue-item'>
            <Link class='issue-item__link' to='/issue'>
                <div class='issue-item__button' onClick={this.handleClick.bind(this)}>
                    <h4 class='issue-item__header'>{title}</h4>
                    <div class='issue-item__meta'>
                        <div class='issue-item__number'>#{number}</div>
                        <div class='issue-item__date'>{this.dateParser(date)}</div>
                        <a class='issue-item__login' href={url}>{login}</a>
                        <div class='issue-item__comments'>{comments_amount}</div>
                    </div>
                    <div class='issue-item__labels'>
                        {labels_block}
                    </div>
                </div>
            </Link>
        </div>
    }
}