import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import './WatchedUsersPosts.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';
import EmojiInput from './EmojiInput'



function OneWatchedPost(props) {

    const [visibilityLikeIcon, setVisibilityLikeIcon] = useState('');
    const [visibilityUnlikeIcon, setVisibilityUnlikeIcon] = useState('');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [modalPostComments, setModalPostComments] = useState([]);
    const [visibilityPostModal, setVisibilityPostModal] = useState('none');

    const unlikePhoto = (postId) => {
        setVisibilityLikeIcon('inline')
        setVisibilityUnlikeIcon('none')
        fetch(`http://localhost:5000/likes?id=${postId}`, {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem("accessToken")
            },
        })
            .then(function (response) { return response.json() })
    }
    const likePhoto = (postId) => {
        setVisibilityLikeIcon('none')
        setVisibilityUnlikeIcon('inline')
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
    useEffect(async () => {
        try {
            let response = await fetch(`http://localhost:5000/likes?likedPostId=${props.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("accessToken")
                },
            })
            if (response.status === 404) {
                setVisibilityLikeIcon('inline')
                setVisibilityUnlikeIcon('none')
            } else {
                setVisibilityLikeIcon('none')
                setVisibilityUnlikeIcon('inline')
            }
        }
        catch (error) {
            console.error(error)
        }
        fetch(`http://localhost:5000/comments?id=${props.id}&limit=3`, {})
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.data === null) {
                    setComments([])
                }
                else {
                    setComments(result.data)
                }
            })
    }, [])
    const changeNewComment = (inputValue) => {
        setNewComment(inputValue)
    }
    const addComment = (postId) => {
        if (newComment !== "") {
            fetch(`http://localhost:5000/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ postId: postId, commentContent: newComment, id: generateId(), date: currentDate() })
            }).then(() => {
                setNewComment('')
            })
                .catch((err) => { console.error(err) })
        }
    }
    const modalPostShow = () => {
        fetch(`http://localhost:5000/comments?id=${props.id}&limit=100`, {})
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.data === null) {
                    setModalPostComments([])
                    setVisibilityPostModal('inline')
                }
                else {
                    setModalPostComments(result.data)
                    setVisibilityPostModal('inline')
                }
            })
    }
    return (
        <>
            <div className={'watchedUsersPost'}>
                <div className='watchedPostNick'>{props.login}</div>
                <img className='watchedPostImage' src={`http://localhost:5000/${props.imageUrl}`} />
                <div className='watchedPostIcons'>
                    <div className='oneWatchedPostIcon' onClick={() => unlikePhoto(props.id)}
                        style={{ display: visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                    <div className='oneWatchedPostIcon' onClick={() => likePhoto(props.id)}
                        style={{ display: visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                    <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                </div>
                <div className='likesText'>{props.likesNr} users like this</div>
                <div className='viewAllCommentsText' onClick={modalPostShow}>View all comments</div>
                <div className='obscureBackground' style={{ display: visibilityPostModal }}></div>
                <div className='modalPost' style={{ display: visibilityPostModal }}>
                    <img className='modalImage' src={`http://localhost:5000/${props.imageUrl}`}></img>
                    <div className='modalCommentContainer'>
                        <div className='modalPostNick'>{props.login}</div>
                        <div className='comments' id='modalPostComments'>
                            {modalPostComments.map(comment =>
                                <div key={comment.id} className='comment' id='modalPostComment'>
                                    <div className='commentLogin'>{comment.login}</div>
                                    <div className='commentContent'>{comment.commentContent}</div>
                                </div>
                            )}
                        </div>
                        <div className='lowerPartOfModal'>
                            <div className='watchedPostIcons' id='modalWatchedPostIcons'>
                                <div className='oneWatchedPostIcon' onClick={() => unlikePhoto(props.id)}
                                    style={{ display: visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                                <div className='oneWatchedPostIcon' onClick={() => likePhoto(props.id)}
                                    style={{ display: visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                                <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                            </div>
                            <div className='likesText' id='modalLikesText'>{props.likesNr} users like this</div>
                            <div className='addComment' id='modalPostAddComment'>
                                <div className='addCommentInput' id='addCommentModalInput'>
                                    <EmojiInput onChange={changeNewComment} inputValue={newComment}></EmojiInput>
                                </div>
                                <button className='addCommentButton' onClick={() => addComment(props.id)}>Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hideModalPost' style={{ display: visibilityPostModal }}
                    onClick={() => setVisibilityPostModal('none')}>x
                </div>
                <div className='comments'>
                    {comments.map(comment =>
                        <div className='comment' key={comment.id}>
                            <div className='commentLogin'>{comment.login}</div>
                            <div className='commentContent'>{comment.commentContent}</div>
                        </div>
                    )}
                </div>
                <div className='addComment'>
                    <div className='addCommentInput'>
                        <EmojiInput onChange={changeNewComment} inputValue={newComment}></EmojiInput>
                    </div>
                    <button className='addCommentButton' onClick={() => addComment(props.id)}>Publish</button>
                </div>
            </div>
        </>
    )

}

export default OneWatchedPost;
