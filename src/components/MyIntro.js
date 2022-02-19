import React, { useState, useEffect } from 'react';
import './PersonIntro.css';
import { getPersonIntro } from '../utils/Api';


function MyIntro() {
    const [nickName, setNickName] = useState([]);

    useEffect(async () => {
        const userId = localStorage.getItem("currentUserId")
        getPersonIntro(userId)
            .then(function (response) { return response.json() })
            .then((data) => {
                let nick = data.data
                setNickName(nick)
            })
            .catch((error) => console.error(error))
    }, [])
    return (
        <div className='introContainer'>
            {nickName}
        </div>
    )
}

export default MyIntro;