import React, { Component } from 'react';
import './ProfilePosts.css';
import OneMyProfilePost from './OneMyProfilePosts';


class MyProfilePosts extends Component {

    state = {
        posts: []
    }
    componentDidMount() {
        const currentUserId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/user/${currentUserId}/posts`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let posts = data.data
                if (posts === undefined) {
                    this.setState({ posts: [] })
                }
                else {
                    this.setState({ posts: posts })
                }
            })
    }
    render() {
        return (
            <div className='postsContainer'>
                {this.state.posts.map(post =>
                    <OneMyProfilePost key={post.id} imageUrl={post.imageUrl} id={post.id}>
                    </OneMyProfilePost>
                )}
            </div>
        )
    }

}

export default MyProfilePosts;