import React, { Component } from 'react';
import './ProfilePosts.css';


class ProfilePosts extends Component {

    state = {
        posts: []
    }
    componentDidMount() {
        const userId = localStorage.getItem("focusUserId")
        fetch(`http://localhost:5000/user/${userId}/posts`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let posts = data.data
                this.setState({ posts: posts })
            })
    }
    render() {
        return (
            <div className='postsContainer'>
                {this.state.posts.map(posts =>
                    <div className='onePost' key={posts.id}>
                        {posts.text}
                    </div>
                )}
            </div>
        )
    }

}

export default ProfilePosts;