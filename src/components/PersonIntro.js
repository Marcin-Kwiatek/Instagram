import './PersonIntro.css';
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { addToFollowed, deleteFromFollowers, getPersonIntro, isUserFollowing } from '../utils/Api';



function PersonIntro(props) {
    const [nickName, setNickName] = useState([]);
    const [isUserFollowed, setIsUserFollowed] = useState(true);

    const location = useLocation()


    const followUser = () => {
        const focusUserId = new URLSearchParams(location.search).get('id')
        if (isUserFollowed === true) {
            setIsUserFollowed(false)
            addToFollowed(focusUserId)
                .catch((err) => { console.error(err) })
        } else {
            setIsUserFollowed(true)
            deleteFromFollowers(focusUserId)
                .then(function (response) { return response.json() })
        }
    }
    useEffect(async () => {
        const userId = localStorage.getItem("currentUserId")
        const focusUserId = new URLSearchParams(location.search).get('id')
        getPersonIntro(userId)
            .then(function (response) { return response.json() })
            .then((data) => {
                console.log(data.data)
                let nick = data.data
                setNickName(nick)
            })
            .catch((error) => console.error(error))
        try {
            let response = await isUserFollowing(userId, focusUserId)
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