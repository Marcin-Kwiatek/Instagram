import React, { useState, useEffect } from 'react';
import './PersonIntro.css';


function MyIntro() {
    const [nickName, setNickName] = useState([]);

    useEffect(async () => {
        const userId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/personIntro?id=${userId}`, {})
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