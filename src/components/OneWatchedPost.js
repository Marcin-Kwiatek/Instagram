import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import './WatchedUsersPosts.css';
import EmojiInput from './EmojiInput'
import Modal from 'react-modal';
import { getPostComments, addingComment, deleteLike, addLike, isPostLiking, getThreePostComments } from '../utils/Api';


Modal.setAppElement('#root');
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '90%',
        height: '90%',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
    },
};

function OneWatchedPost(props) {

    const [visibilityLikeIcon, setVisibilityLikeIcon] = useState(false);
    const [visibilityUnlikeIcon, setVisibilityUnlikeIcon] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalPostComments, setModalPostComments] = useState([]);


    const unlikePhoto = (postId) => {
        setVisibilityLikeIcon(true)
        setVisibilityUnlikeIcon(false)
        deleteLike(postId)
            .then(function (response) { return response.json() })
    }
    const likePhoto = (postId) => {
        setVisibilityLikeIcon(false)
        setVisibilityUnlikeIcon(true)
        addLike(postId)
            .catch((err) => { console.error(err) })
    }
    const openModal = () => {
        getPostComments(props.id)
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.data === null) {
                    setModalPostComments([])
                }
                else {
                    setModalPostComments(result.data)
                }
            })
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(async () => {
        try {
            let response = await isPostLiking(props.id)
            if (response.status === 404) {
                setVisibilityLikeIcon(true)
                setVisibilityUnlikeIcon(false)
            } else {
                setVisibilityLikeIcon(false)
                setVisibilityUnlikeIcon(true)
            }
        }
        catch (error) {
            console.error(error)
        }
        getThreePostComments(props.id)
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
            addingComment(postId, newComment)
                .then(() => {
                    setNewComment('')
                })
                .catch((err) => { console.error(err) })
        }
    }

    return (
        <>
            <div className={'watchedUsersPost'}>
                <div className='watchedPostNick'>{props.login}</div>
                <img className='watchedPostImage' src={`${process.env.REACT_APP_API_URL}/${props.imageUrl}`} />
                <div className='watchedPostIcons'>
                    {visibilityUnlikeIcon &&
                        <div className='oneWatchedPostIcon' onClick={() => unlikePhoto(props.id)}
                            style={{ color: 'red' }}><AiFillHeart></AiFillHeart></div>
                    }
                    {visibilityLikeIcon &&
                        <div className='oneWatchedPostIcon' onClick={() => likePhoto(props.id)}>
                            <AiOutlineHeart></AiOutlineHeart>
                        </div>
                    }
                    <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                </div>
                <div className='likesText'>{props.likesNr} users like this</div>
                <div className='viewAllCommentsText' onClick={openModal}>View all comments: {props.commentsNr}</div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <button className={'hideModalPost'} onClick={closeModal}>x</button>
                    <img className='modalImage' src={`${process.env.REACT_APP_API_URL}/${props.imageUrl}`}></img>
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
                                {visibilityUnlikeIcon &&
                                    <div className='oneWatchedPostIcon' onClick={() => unlikePhoto(props.id)}
                                        style={{ color: 'red' }}><AiFillHeart></AiFillHeart></div>
                                }
                                {visibilityUnlikeIcon &&
                                    <div className='oneWatchedPostIcon' onClick={() => likePhoto(props.id)}>
                                        <AiOutlineHeart></AiOutlineHeart>
                                    </div>
                                }
                                <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                            </div>
                            <div className='likesText' id='modalLikesText'>{props.likesNr} users like this</div>
                            <div className='addComment' id='modalPostAddComment'>
                                <div className='addCommentInput' id='addCommentModalInput'>
                                    <EmojiInput onChange={changeNewComment} inputValue={newComment}></EmojiInput>
                                </div>
                                <button
                                    className='addCommentButton'
                                    id='modalAddCommentButton'
                                    onClick={() => addComment(props.id)}>Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
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
