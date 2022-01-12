import React, { Component } from 'react';
import './WatchedUsersPosts.css';



class WatchedUsersPosts extends Component {
    state = {
        posts: [],
        limitWatchedPosts: 20
    }
    showMoreObservedPosts = () => {
        let newLimitWatchedPosts = this.state.limitWatchedPosts + 10
        this.setState({limitWatchedPosts: newLimitWatchedPosts})
        fetch(`http://localhost:5000/currentUser/observedUsers/posts?limit=${this.state.limitWatchedPosts}`, {
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
                    this.setState({ posts: result.posts })
                }
            })
    }
    componentDidMount() {
        fetch(`http://localhost:5000/currentUser/observedUsers/posts?limit=10`, {
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
                    this.setState({ posts: result.posts })
                }
            })
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