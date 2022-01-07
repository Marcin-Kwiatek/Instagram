import React, { Component } from 'react';
import './PersonIntro.css';


class PersonIntro extends Component {
    state = {
        nickName: [],
        followButton: 'Follow'
    }
    followUser = () => {
        const currentUserId = localStorage.getItem("currentUserId")
        const focusUserId = localStorage.getItem("focusUserId")
        if (this.state.followButton === 'Follow') {
            this.setState({ followButton: 'Unfollow' })
            fetch(`http://localhost:5000/addFollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ observerId: currentUserId, watchedId: focusUserId })
            })
                .catch((err) => { console.error(err) })
        } else {
            this.setState({ followButton: 'Follow' })
            fetch(`http://localhost:5000/unfollow?id=${currentUserId}${focusUserId}`, {
                method: 'DELETE',
            })
                .then(function (response) { return response.json() })
        }
    }
    componentDidMount() {
        const userId = localStorage.getItem("focusUserId")
        fetch(`http://localhost:5000/personIntro?id=${userId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                console.log(data.data)
                let nick = data.data
                this.setState({ nickName: nick })
            })

    }
    render() {
        return (
            <div className='introContainer'>
                {this.state.nickName}
                <button onClick={this.followUser} className='followButton'>{this.state.followButton}</button>
            </div>
        )
    }

}

export default PersonIntro;