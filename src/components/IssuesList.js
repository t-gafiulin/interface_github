import React, { Component } from 'react';
import IssuesItem from './IssuesItem';

const IssuesList = ({issues, login, repository}) => {
    const issuesList = issues.map((child, index) => {
        return <IssuesItem 
            title={child.title}
            number={child.number}
            date={child.created_at}
            author_login={child.user.login}
            login={login}
            repository={repository}
            url={child.user.html_url}
            labels={child.labels}
            comments_amount={child.comments}
        />
    }
    )

    return <div>{issuesList}</div>;
}

export default IssuesList;