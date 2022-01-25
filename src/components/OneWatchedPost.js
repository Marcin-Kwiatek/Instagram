import React, { Component } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import './WatchedUsersPosts.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';



class OneWatchedPost extends Component {
    state = {
        visibilityLikeIcon: '',
        visibilityUnlikeIcon: '',
        newComment: ''
    }
    unlikePhoto = (postId) => {
        this.setState({ visibilityLikeIcon: 'inline' })
        this.setState({ visibilityUnlikeIcon: 'none' })
        fetch(`http://localhost:5000/likes?id=${postId}`, {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem("accessToken")
            },
        })
            .then(function (response) { return response.json() })
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
    async componentDidMount() {
        try {
            let response = await fetch(`http://localhost:5000/likes?likedPostId=${this.props.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("accessToken")
                },
            })
            if (response.status === 404) {
                this.setState({ visibilityLikeIcon: 'inline' })
                this.setState({ visibilityUnlikeIcon: 'none' })
            } else {
                this.setState({ visibilityLikeIcon: 'none' })
                this.setState({ visibilityUnlikeIcon: 'inline' })
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    changeNewComment = (e) => {
        this.setState({ newComment: e.target.value })
    }
    addComment = (postId) => {
        if(this.state.newComment!==""){
            fetch(`http://localhost:5000/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ postId: postId, commentContent: this.state.newComment, id: generateId(), date: currentDate()})
        }).then(()=>{
            this.setState({newComment: ''})
        })
            .catch((err) => { console.error(err) })  
        }
    }
    render() {
        return (
            <>
                <div className={'watchedUsersPost'}>
                    <div className='watchedPostNick'>{this.props.login}</div>
                    <img className='watchedPostImage' src={`http://localhost:5000/${this.props.imageUrl}`} />
                    <div className='watchedPostIcons'>
                        <div className='oneWatchedPostIcon' onClick={() => this.unlikePhoto(this.props.id)}
                            style={{ display: this.state.visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                        <div className='oneWatchedPostIcon' onClick={() => this.likePhoto(this.props.id)}
                            style={{ display: this.state.visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                        <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                    </div>
                    <div className='likesText'>{this.props.likesNr} users like this</div>
                    <div className='addComment'>
                        <input
                            type='text' 
                            className='addCommentInput' 
                            placeholder='Add comment...' 
                            onChange={this.changeNewComment} 
                            value={this.state.newComment}>
                        </input>
                        <button className='addCommentButton' onClick={() => this.addComment(this.props.id)}>Publish</button>
                    </div>
                </div>
            </>
        )
    }
}

export default OneWatchedPost;
