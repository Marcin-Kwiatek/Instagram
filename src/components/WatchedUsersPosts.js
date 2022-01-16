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
                    dataLength={this.state.posts.length}
                    next={this.showMoreObservedPosts}
                    hasMore={true}
                >
                    {this.state.posts.map(post =>
                        <div className={'watchedUsersPost'} key={post.id}>
                            <div>{post.login}</div>
                            <div>{post.text}</div>
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        )
    }
}

export default WatchedUsersPosts