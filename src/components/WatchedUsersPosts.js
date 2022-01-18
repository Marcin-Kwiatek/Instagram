import React, { Component } from 'react';
import './WatchedUsersPosts.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";




class WatchedUsersPosts extends Component {
    state = {
        posts: []
    }
    showMoreObservedPosts = () => {
        fetch(`http://localhost:5000/currentUser/observedUsers/posts?offset=${this.state.posts.length}&limit=10`, {
            headers: {
                'authorization': localStorage.getItem("accessToken")
            },
        })
            .then(function (posts) { return (posts.json()) })
            .then((result) => {
                if (result.posts === undefined) {
                    this.setState({ posts: [] })
                }
                else {
                    this.setState({ posts: [...this.state.posts, ...result.posts] })
                }
            })
    }
    componentDidMount() {
        this.showMoreObservedPosts()
    }
    render() {
        return (
            <div className={'containerWatchedUsersPosts'}>

                <InfiniteScroll
                    dataLength={this.state.posts.length}
                    next={this.showMoreObservedPosts}
                    hasMore={true}
                >
                    {this.state.posts.map(post =>
                        <div className={'watchedUsersPost'} key={post.id}>
                            <div className='watchedPostNick'>{post.login}</div>
                            <img className='watchedPostImage' src={`http://localhost:5000/${post.imageUrl}`} />
                            <div className='watchedPostIcons'>
                                <div className='oneWatchedPostIcon' style={{display:'none'}}><AiFillHeart></AiFillHeart></div>
                                <div className='oneWatchedPostIcon' style={{display:'inline'}}><AiOutlineHeart></AiOutlineHeart></div>
                                <div className='oneWatchedPostIcon'><AiOutlineMessage></AiOutlineMessage></div>
                            </div>
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        )
    }
}

export default WatchedUsersPosts