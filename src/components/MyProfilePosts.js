import React, { Component } from 'react';
import './ProfilePosts.css';


class MyProfilePosts extends Component {

    state = {
        posts: []
    }
    componentDidMount() {
        const currentUserId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/userId?id=${currentUserId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let posts = data.data
                this.setState({ posts: posts })
                console.log(this.state.posts)
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

export default MyProfilePosts;