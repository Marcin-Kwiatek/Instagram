import React, { Component } from 'react';
import './PersonIntro.css';


class PersonIntro extends Component {
    state = {
        nickName: []
    }
    followUser = () => {
        const currentUserId = localStorage.getItem("currentUserId")
        const focusUserId = localStorage.getItem("focusUserId")
        fetch(`http://localhost:5000/addFollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ observerId: currentUserId, watchedId: focusUserId })
        })
            .catch((err) => { console.error(err) })
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
                <button onClick={this.followUser} className='followButton'>Follow</button>
            </div>
        )
    }

}

export default PersonIntro;