import React, { Component } from 'react';
import './WatchedUsersPosts.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";




class WatchedUsersPosts extends Component {
    state = {
        posts: [],
        visibilityLikeIcon: 'inline',
        visibilityUnlikeIcon: 'none'
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
    unlikePhoto = () => {
        this.setState({visibilityLikeIcon: 'inline'})
        this.setState({visibilityUnlikeIcon: 'none'})
    }
    likePhoto = () => {
        this.setState({visibilityLikeIcon: 'none'})
        this.setState({visibilityUnlikeIcon: 'inline'})
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
                                <div className='oneWatchedPostIcon' onClick={this.unlikePhoto} 
                                style={{ display: this.state.visibilityUnlikeIcon, color:'red'}}><AiFillHeart></AiFillHeart></div>
                                <div className='oneWatchedPostIcon' onClick={this.likePhoto} 
                                style={{ display: this.state.visibilityLikeIcon }}><AiOutlineHeart></AiOutlineHeart></div>
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