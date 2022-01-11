import React, { Component } from 'react';
import './WatchedUsersPosts.css';



class WatchedUsersPosts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        fetch(`http://localhost:5000/currentUser/observedUsers/posts`, {
            headers: {
                'authorization': localStorage.getItem("accessToken")
            },
        })
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                this.setState({ posts: result.posts })
            })
    }
    render() {
        return (
            <div className={'containerWatchedUsersPosts'}>
                {this.state.posts.map(post =>
                    <div className={'watchedUsersPost'} key={post.id}>{post.text}</div>
                )}
            </div>
        )
    }
}

export default WatchedUsersPosts