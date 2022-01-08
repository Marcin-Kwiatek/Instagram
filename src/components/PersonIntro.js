import React, { Component } from 'react';
import './PersonIntro.css';
import { useLocation } from "react-router-dom"


function EnhancePersonIntroWithLocation(props){
    const location = useLocation()
    return <PersonIntro location={location} {...props}></PersonIntro>
}
class PersonIntro extends Component {
    state = {
        nickName: [],
        isUserFollowed: true
    }
    followUser = () => {
        const currentUserId = localStorage.getItem("currentUserId")
        const focusUserId = new URLSearchParams(this.props.location.search).get('id')
        if (this.state.isUserFollowed === true) {
            this.setState({ isUserFollowed: false })
            fetch(`http://localhost:5000/addFollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ observerId: currentUserId, watchedId: focusUserId })
            })
                .catch((err) => { console.error(err) })
        } else {
            this.setState({ isUserFollowed: true })
            fetch(`http://localhost:5000/unfollow?id=${currentUserId}${focusUserId}`, {
                method: 'DELETE',
            })
                .then(function (response) { return response.json() })
        }
    }
    async componentDidMount() {
        const userId = localStorage.getItem("currentUserId")
        const focusUserId = new URLSearchParams(this.props.location.search).get('id')
        fetch(`http://localhost:5000/personIntro?id=${focusUserId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                console.log(data.data)
                let nick = data.data
                this.setState({ nickName: nick })
            })
        let response = await fetch(`http://localhost:5000/searchFollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ observerId: userId, watchedId: focusUserId })
        })
        if (response.status === 404) {
            this.setState({ isUserFollowed: true })
        } else {
            this.setState({ isUserFollowed: false })
        }
    }
    render() {
        return (
            <div className='introContainer'>
                {this.state.nickName}
                <button onClick={this.followUser} className='followButton'>
                    {this.state.isUserFollowed ? 'Follow' : 'Unfollow'}
                </button>
            </div>
        )
    }

}

export default EnhancePersonIntroWithLocation;