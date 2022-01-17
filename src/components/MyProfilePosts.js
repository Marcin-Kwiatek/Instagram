import React, { Component } from 'react';
import './ProfilePosts.css';


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
                this.setState({ posts: posts })
            })
    }
    render() {
        return (
            <div className='postsContainer'>
                {this.state.posts.map(posts =>
                    <div className='onePost' key={posts.id}>
                        <img className='postImage' src={`http://localhost:5000/${posts.imageUrl}`} />
                    </div>
                )}
            </div>
        )
    }

}

export default MyProfilePosts;