import React, { Component } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import AddPost from './AddPost';

class Navbar extends Component {
    state = {
        searchUsers: [],
        visibiltyAddPost: false
    }
    changeSearchUser = (e) => {
        this.searchUser(e.target.value)
    }
    resetSearchUser = () => {
        this.setState({ searchUsers: [] })
    }
    showPostForm = () => {
        this.setState({ visibiltyAddPost: true })
    }
    hidePostForm = () => {
        this.setState({ visibiltyAddPost: false })
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
    render() {

        return (
            <div onClick={this.resetSearchUser}>
                <div className="logo">
                    <div className="logoContainer">
                        <div className="imgLogo">
                            <Link to='/'><img src={require("../img/logo.png").default}></img></Link>
                        </div>
                        <input type='text' placeholder="Szukaj" className="searchUserInput" onChange={this.changeSearchUser}></input>
                        <div className="icons">
                            <Link className='iconLink' to='/'><div className="oneIcon"><AiFillHome></AiFillHome></div></Link>
                            <div className='oneIcon' onClick={this.showPostForm}><BsPlusSquare ></BsPlusSquare></div>
                            <Link className='iconLink' to='/myProfile'><div className="oneIcon"><BsFillPersonFill></BsFillPersonFill></div></Link>
                        </div>
                    </div>
                    <div className='proptedUsersContainer'>{this.state.searchUsers.slice(0, 5).map(user => <div className="proptedUsers" key={user.id}>{user.login}</div>)}</div>
                </div>
                {this.state.visibiltyAddPost &&
                    <AddPost cancelAddPost={this.hidePostForm} onPostAdded={this.hidePostForm}></AddPost>
                }
            </div>
        )
    }
}

export default Navbar;
