import React, { Component } from 'react';
import './WatchedUsersPosts.css';
import InfiniteScroll from 'react-infinite-scroll-component';



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
                    dataLength={this.state.posts.length} //This is important field to render the next data
                    next={this.showMoreObservedPosts}
                    hasMore={true}
                >
                    {this.state.posts.map(post =>
                        <div className={'watchedUsersPost'} key={post.id}>{post.text}</div>
                    )}
                </InfiniteScroll>
            </div>
        )
    }
}

export default WatchedUsersPosts