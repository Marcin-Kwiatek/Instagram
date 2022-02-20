import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Modal from 'react-modal';
import EmojiInput from './EmojiInput'
import { getPostComments, addingComment, deleteLike, addLike, isPostLiking, getNumberLikes, getNumberComments } from '../utils/Api';



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


function OneProfilePost(props) {

    const [isPostLikedByCurrentUser, setIsPostLikedByCurrentUser] = useState(false);
    const [likesNumber, setLikesNumber] = useState(0);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalPostComments, setModalPostComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const changeNewComment = (inputValue) => {
        setNewComment(inputValue)
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
                    console.log(result.data)
                }
            })
        setIsOpen(true)
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
    const closeModal = () => {
        setIsOpen(false)
    }
    const unlikePhoto = (postId) => {
        setIsPostLikedByCurrentUser(false)
        deleteLike(postId)
            .then(function (response) { return response.json() })
    }
    const likePhoto = (postId) => {
        setIsPostLikedByCurrentUser(true)
        addLike(postId)
            .catch((err) => { console.error(err) })
    }
    useEffect(async () => {
        try {
            let response = await isPostLiking(props.id)
            if (response.status === 404) {
                setIsPostLikedByCurrentUser(false)
            } else {
                setIsPostLikedByCurrentUser(true)
            }
        }
        catch (error) {
            console.error(error)
        }
        getNumberLikes(props.id)
            .then(function (response) { return response.json() })
            .then((data) => {
                setLikesNumber(data.data[0].likesNr)
            })
            .catch((error) => console.error(error))
        getNumberComments(props.id)
            .then(function (response) { return response.json() })
            .then((data) => {
                setCommentsNumber(data.data[0].commentsNr)
            })
            .catch((error) => console.error(error))
    }, [])
    return (
        <>
            <div className='onePost' onClick={openModal}>
                <img className='postImage' src={`${process.env.REACT_APP_API_URL}/${props.imageUrl}`} />
                <div className='profilePostIcons'>
                    {isPostLikedByCurrentUser ?
                        <div className='profilePostIcon' onClick={() => unlikePhoto(props.id)}
                            style={{ color: 'red' }}><AiFillHeart></AiFillHeart></div>
                        : <div className='profilePostIcon' onClick={() => likePhoto(props.id)}>
                            <AiOutlineHeart></AiOutlineHeart>
                        </div>
                    }
                    <div className='profileLikesNumber'>{likesNumber}</div>
                    <div className='profilePostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                    <div >{commentsNumber}</div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <button className={'hideModalPost'} onClick={closeModal}>x</button>
                <img className='modalImage' src={`${process.env.REACT_APP_API_URL}/${props.imageUrl}`}></img>
                <div className='modalCommentContainer'>
                    <div className='modalPostNick'>{props.nickName}</div>
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
                            {isPostLikedByCurrentUser ?
                                <div className='profilePostIcon' onClick={() => unlikePhoto(props.id)}
                                    style={{ color: 'red' }}><AiFillHeart></AiFillHeart></div>
                                : <div className='profilePostIcon' onClick={() => likePhoto(props.id)}>
                                    <AiOutlineHeart></AiOutlineHeart>
                                </div>
                            }
                            <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                        </div>
                        <div className='likesText' id='modalLikesText'>{likesNumber} users like this</div>
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
        </>
    )
}

export default OneProfilePost;