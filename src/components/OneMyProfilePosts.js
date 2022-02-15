import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";


function OneMyProfilePost(props) {

    const [visibilityLikeIcon, setVisibilityLikeIcon] = useState('');
    const [visibilityUnlikeIcon, setVisibilityUnlikeIcon] = useState('');
    const [likesNumber, setLikesNumber] = useState(0);

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
                setVisibilityLikeIcon('none')
                setVisibilityUnlikeIcon('inline')
            } else {
                setVisibilityLikeIcon('inline')
                setVisibilityUnlikeIcon('none')
            }
        }
        catch (error) {
            console.error(error)
        }
        fetch(`http://localhost:5000/likesNumber?likedPostId=${props.id}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                setLikesNumber(data.data)
            })
            .catch((error) => console.error(error))
    }, [])
    return (
        <div className='onePost'>
            <img className='postImage' src={`http://localhost:5000/${props.imageUrl}`} />
            <div className='profilePostIcons'>
                <div className='profilePostIcon' onClick={() => unlikePhoto(props.id)}
                    style={{ display: visibilityUnlikeIcon, color: 'red' }}><AiFillHeart></AiFillHeart></div>
                <div className='profilePostIcon' onClick={() => likePhoto(props.id)}
                    style={{ display: visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
                <div className='profileLikesNumber'>{likesNumber}</div>
                <div className='profilePostIcon'><AiOutlineMessage></AiOutlineMessage></div>
            </div>
        </div>
    )
}

export default OneMyProfilePost;