import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import OneMyProfilePost from './OneMyProfilePosts';


function MyProfilePosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/user/${currentUserId}/posts`, {})
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
    }, [])
    return (
        <div className='postsContainer'>
            {posts.map(post =>
                <OneMyProfilePost key={post.id} imageUrl={post.imageUrl} id={post.id}>
                </OneMyProfilePost>
            )}
        </div>
    )
}

export default MyProfilePosts;