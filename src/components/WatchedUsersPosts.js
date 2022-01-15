import React, { Component } from 'react';
import './WatchedUsersPosts.css';



class WatchedUsersPosts extends Component {
    state = {
        posts: []
    }
    showMoreObservedPosts = () => {
        fetch(`http://localhost:5000/currentUser/observedUsers/posts?offset=${this.state.posts.length}&limit=10`, {
            headers: {
                'authorization': localStorage.getItem("accessToken")
            },
        })
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.posts === undefined) {
                    this.setState({ posts: [] })
                }
                else {
                    this.setState({ posts: [...this.state.posts, ...result.posts] })
                }
            })
    }
    componentDidMount() {
        this.showMoreObservedPosts()
    }
    render() {
        return (
            <div className={'containerWatchedUsersPosts'}>
                {this.state.posts.map(post =>
                    <div className={'watchedUsersPost'} key={post.id}>{post.text}</div>
                )}
                <button onClick={this.showMoreObservedPosts}>Show more posts</button>
            </div>
        )
    }
}

export default WatchedUsersPosts