import React, { Component } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import './WatchedUsersPosts.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';



class OneWatchedPost extends Component {
    state = {
        visibilityLikeIcon: '',
        visibilityUnlikeIcon: '',
        newComment: '',
        comments: [],
        modalPostComments: [],
        visibilityPostModal: 'none',
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
        fetch(`http://localhost:5000/comments?id=${this.props.id}&limit=3`, {})
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.data === null) {
                    this.setState({ comments: [] })
                }
                else {
                    this.setState({ comments: result.data })
                }
            })
    }
    changeNewComment = (e) => {
        this.setState({ newComment: e.target.value })
    }
    addComment = (postId) => {
        if (this.state.newComment !== "") {
            fetch(`http://localhost:5000/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ postId: postId, commentContent: this.state.newComment, id: generateId(), date: currentDate() })
            }).then(() => {
                this.setState({ newComment: '' })
            })
                .catch((err) => { console.error(err) })
        }
    }
    modalPostShow = () => {
        fetch(`http://localhost:5000/comments?id=${this.props.id}&limit=10`, {})
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.data === null) {
                    this.setState({ modalPostComments: [] })
                    this.setState({ visibilityPostModal: 'inline' })
                }
                else {
                    this.setState({ modalPostComments: result.data })
                    this.setState({ visibilityPostModal: 'inline' })
                }
            })
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
                    <div className='viewAllCommentsText' onClick={this.modalPostShow}>View all comments</div>
                    <div className='obscureBackground' style={{ display: this.state.visibilityPostModal }}></div>
                    <div className='modalPost' style={{ display: this.state.visibilityPostModal }}>
                        <img className='modalImage' src={`http://localhost:5000/${this.props.imageUrl}`}></img>
                        <div className='modalCommentContainer'>
                            <div className='modalPostNick'>{this.props.login}</div>
                            <div className='comments' id='modalPostComments'>
                                {this.state.modalPostComments.map(comment =>
                                    <div className='comment' id='modalPostComment'>
                                        <div className='commentLogin'>{comment.login}</div>
                                        <div className='commentContent'>{comment.commentContent}</div>
                                    </div>
                                )}
                            </div>
                            <div className='lowerPartOfModal'>
                                <div className='watchedPostIcons' id='modalWatchedPostIcons'>
                                    <div className='oneWatchedPostIcon' onClick={() => this.unlikePhoto(this.props.id)}
                                        style={{ display: this.state.visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                                    <div className='oneWatchedPostIcon' onClick={() => this.likePhoto(this.props.id)}
                                        style={{ display: this.state.visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                                    <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                                </div>
                                <div className='likesText' id='modalLikesText'>{this.props.likesNr} users like this</div>
                                <div className='addComment' id='modalPostAddComment'>
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
                        </div>
                    </div>
                    <div className='hideModalPost' style={{ display: this.state.visibilityPostModal }}
                        onClick={() => this.setState({ visibilityPostModal: 'none' })}>x
                    </div>
                    <div className='comments'>
                        {this.state.comments.map(comment =>
                            <div className='comment'>
                                <div className='commentLogin'>{comment.login}</div>
                                <div className='commentContent'>{comment.commentContent}</div>
                            </div>
                        )}
                    </div>
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
