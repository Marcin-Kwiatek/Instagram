import React, { Component } from 'react';

class ProfilePosts extends Component {
    
    state = {
        posts: []
    }
    componentDidMount() {
        const currentUserId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/userId?id=${currentUserId}`, {})
            .then(function (response) { return response.json() })
            .then( (data) => {
                let posts = data.data
                this.setState({ posts: posts })
                console.log(this.state.posts)
            })
    }
    render() {
        return (
            <div>
                {this.state.posts.map(posts => 
                    <div key={posts.id}>
                        {posts.text}
                    </div>
                )}
            </div>
        )
    }

}

export default ProfilePosts;