import React, {Component} from 'react';
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
        this.props.handleClick(this.props.number);
    }

    render(){
        const { 
            title, number, date, author_login, url, labels, comments_amount, handleClick,
            login, repository,
        } = this.props;   

        const labels_block = labels.map((elem) => {
            return <div className='issue-item__label' style={{backgroundColor: '#' + elem.color}}>
                {elem.name}
            </div>
        })

        return <div className='issue-item'>
            <div className='issue-item__text'>
                <div className='issue-item__header'>
                    <div className='issue-item__button' onClick={this.handleClick.bind(this)}>
                        <Link className='issue-item__link' to={`/${login}/${repository}/issue/${number}`}>{title}</Link>  
                    </div>
                    <div className='issue-item__labels'>
                        {labels_block}
                    </div>
                </div>
                <div className='issue-item__meta'>
                    <div className='issue-item__number'>#{number}</div>
                    <div className='issue-item__date'>opened {this.dateParser(date)} by</div>
                    <a className='issue-item__login' href={url}>{author_login}</a>
                </div>
            </div>
            <div className='issue-item__comments'>{comments_amount}</div>
        </div>
    }
}