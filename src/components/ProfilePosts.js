import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import { useLocation } from "react-router-dom"
import OneProfilePost from './OneProfilePost';

function ProfilePosts() {

    const [posts, setPosts] = useState([]);
    const [nickName, setNickName] = useState([]);

    const location = useLocation()

    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('id')
        fetch(`http://localhost:5000/user/${userId}/posts`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let posts = data.data
                if (posts === undefined) {
                    setPosts([])
                }
                else {
                    setPosts(posts)
                }
            })
            fetch(`http://localhost:5000/personIntro?id=${userId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let nick = data.data
                setNickName(nick)
            })
            .catch((error) => console.error(error))
    }, [])
    return (
        <div className='postsContainer'>
            {posts.map(post =>
                <OneProfilePost key={post.id} imageUrl={post.imageUrl} id={post.id} nickName={nickName}>
                </OneProfilePost>
            )}
        </div>
    )
}

export default ProfilePosts;