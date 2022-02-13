import './PersonIntro.css';
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';


function PersonIntro(props) {
    const [nickName, setNickName] = useState([]);
    const [isUserFollowed, setIsUserFollowed] = useState(true);

    const location = useLocation()


    const followUser = () => {
        const focusUserId = new URLSearchParams(location.search).get('id')
        if (isUserFollowed === true) {
            setIsUserFollowed(false)
            fetch(`http://localhost:5000/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ watchedId: focusUserId })
            })
                .catch((err) => { console.error(err) })
        } else {
            setIsUserFollowed(true)
            fetch(`http://localhost:5000/follow?id=${focusUserId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': localStorage.getItem("accessToken")
                },
            })
                .then(function (response) { return response.json() })
        }
    }
    useEffect(async () => {
        const userId = localStorage.getItem("currentUserId")
        const focusUserId = new URLSearchParams(location.search).get('id')
        fetch(`http://localhost:5000/personIntro?id=${focusUserId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                console.log(data.data)
                let nick = data.data
                setNickName(nick)
            })
            .catch((error) => console.error(error))
        try {
            let response = await fetch(`http://localhost:5000/follow?observedId=${userId}&watchedId=${focusUserId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 404) {
                setIsUserFollowed(true)
            } else {
                setIsUserFollowed(false)
            }
        }
        catch (error) {
            console.error(error)
        }
    }, [])
    return (
        <div className='introContainer'>
            {nickName}
            <button onClick={followUser} className='followButton'>
                {isUserFollowed ? 'Follow' : 'Unfollow'}
            </button>
        </div>
    )


}

export default PersonIntro;