import React, { Component } from 'react';
import './ProfilePosts.css';
import { useLocation } from "react-router-dom"
import OneProfilePost from './OneProfilePost';


function EnhanceProfilePostsWithLocation(props) {
    const location = useLocation()
    return <ProfilePosts location={location} {...props}></ProfilePosts>
}
class ProfilePosts extends Component {

    state = {
        posts: []
    }
    componentDidMount() {
        const userId = new URLSearchParams(this.props.location.search).get('id')
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
                {this.state.posts.map(post =>
                    <OneProfilePost key={post.id} imageUrl={post.imageUrl} id={post.id}>
                    </OneProfilePost>
                )}
            </div>
        )
    }

}

export default EnhanceProfilePostsWithLocation;