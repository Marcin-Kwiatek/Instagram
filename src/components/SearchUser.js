import React, { Component } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import './SearchUser.css';


class SearchUser extends Component {
    state = {
        searchUsers: []
    }
    changeSearchUser = (e) => {
        this.searchUser(e.target.value)
    }
    searchUser = async (value) => {
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
            this.setState({ searchUsers: result.users })
        }
    }
    hideProptedUsers = () => {
        this.setState({ searchUsers: [] })
    }
    render() {

        return (
            <ClickAwayListener onClickAway={this.hideProptedUsers}>
                <div>
                    <input type='text' placeholder="Szukaj" className="searchUserInput" onChange={this.changeSearchUser}></input>
                    <div className='proptedUsersContainer'>{this.state.searchUsers.map(user => <div className="proptedUsers" key={user.id}>{user.login}</div>)}</div>
                </div>
            </ClickAwayListener>
        )
    }
}

export default SearchUser;