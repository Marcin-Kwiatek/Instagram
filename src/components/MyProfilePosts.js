import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import OneMyProfilePost from './OneMyProfilePosts';
import { getUserPost, getPersonIntro } from '../utils/Api';


function MyProfilePosts() {

    const [posts, setPosts] = useState([]);
    const [nickName, setNickName] = useState([]);


    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")
        getUserPost(currentUserId)
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
        getPersonIntro(currentUserId)
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
            <OneMyProfilePost key={post.id} imageUrl={post.imageUrl} id={post.id} nickName={nickName}>
            </OneMyProfilePost>
        )}
    </div>
)
}

export default MyProfilePosts;