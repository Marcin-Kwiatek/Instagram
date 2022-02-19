import React, { useState, useEffect } from 'react';
import './WatchedUsersPosts.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import OneWatchedPost from './OneWatchedPost';
import { getMorePosts} from '../utils/Api';


function WatchedUsersPosts() {

    const [posts, setPosts] = useState([])

    const showMoreObservedPosts = () => {
        getMorePosts(posts.length)
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.posts === undefined) {
                    setPosts([])
                }
                else {
                    setPosts([...posts, ...result.posts])
                }
            })
    }
    useEffect(() => {
        showMoreObservedPosts()
    }, [])
    return (
        <div className={'containerWatchedUsersPosts'}>
            <InfiniteScroll
                dataLength={posts.length}
                next={showMoreObservedPosts}
                hasMore={true}
            >
                {posts.map(post =>
                    <OneWatchedPost key={post.id} imageUrl={post.imageUrl} login={post.login}
                        id={post.id} likesNr={post.likesNr} commentsNr={post.commentsNr}>
                    </OneWatchedPost>
                )}
            </InfiniteScroll>
        </div>
    )
}

export default WatchedUsersPosts