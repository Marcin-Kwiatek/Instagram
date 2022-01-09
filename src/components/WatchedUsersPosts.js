import React, { Component } from 'react';


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
            <div>
                {this.state.posts.map(post =>
                    <div key={post.id}>{post.text}</div>
                )}
            </div>
        )
    }
}

export default WatchedUsersPosts