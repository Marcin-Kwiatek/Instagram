import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import './SearchUser.css';
import { Link } from "react-router-dom";


function SearchUser() {

    const [searchUsers, setSearchUsers] = useState([]);

    const searchUser = async (value) => {
        let response = await fetch(`http://localhost:5000/searchUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: value })
        })
        if (response.status === 404) {
        } else {
            let responseJson = response.json()
            let result = await responseJson
            setSearchUsers(result.users)
        }
    }
    const changeSearchUser = (e) => {
        searchUser(e.target.value)
    }
    const hideProptedUsers = () => {
        setSearchUsers([])
    }
    const changeFokusUser = (id) => {
        window.location.href = `/Profile?id=${id}`
    }

    return (
        <ClickAwayListener onClickAway={hideProptedUsers}>
            <div>
                <input type='text' placeholder="Szukaj" className="searchUserInput" onChange={changeSearchUser}></input>
                <div className='proptedUsersContainer'>{searchUsers.map(user =>
                    <Link key={user.id} to='Profile' className='proptedLink'>
                        <div onClick={() => changeFokusUser(user.id)} className="proptedUsers" key={user.id}>{user.login}</div>
                    </Link>)}
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default SearchUser;
