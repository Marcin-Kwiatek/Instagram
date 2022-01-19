import React, { Component } from 'react';
import './ProfilePosts.css';


class OneProfilePost extends Component {

    render() {
        return (
            <div className='onePost'>
                <img className='postImage' src={`http://localhost:5000/${this.props.imageUrl}`} />
            </div>
        )
    }
}

export default OneProfilePost;