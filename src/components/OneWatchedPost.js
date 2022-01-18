import React, { Component } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import './WatchedUsersPosts.css';


class OneWatchedPost extends Component {
    state = {
        visibilityLikeIcon: 'inline',
        visibilityUnlikeIcon: 'none'
    }
    unlikePhoto = () => {
        this.setState({ visibilityLikeIcon: 'inline' })
        this.setState({ visibilityUnlikeIcon: 'none' })
    }
    likePhoto = (postId) => {
        this.setState({ visibilityLikeIcon: 'none' })
        this.setState({ visibilityUnlikeIcon: 'inline' })
        fetch(`http://localhost:5000/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ likedPostId: postId })
        })
            .catch((err) => { console.error(err) })
    }
    render() {
        return (
            <>
                <div className={'watchedUsersPost'}>
                    <div className='watchedPostNick'>{this.props.login}</div>
                    <img className='watchedPostImage' src={`http://localhost:5000/${this.props.imageUrl}`} />
                    <div className='watchedPostIcons'>
                        <div className='oneWatchedPostIcon' onClick={this.unlikePhoto}
                            style={{ display: this.state.visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                        <div className='oneWatchedPostIcon' onClick={() => this.likePhoto(this.props.id)}
                            style={{ display: this.state.visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                        <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                    </div>
                </div>
            </>
        )
    }
}

export default OneWatchedPost;
