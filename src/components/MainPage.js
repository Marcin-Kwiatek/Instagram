import React, { Component } from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import './MainPage.css';
import { useHistory } from "react-router-dom";


function EnhanceMainPageHistory(props) {
  const history = useHistory()
  return <MainPage history={history} {...props}></MainPage>
}

class MainPage extends Component {
  state = {
    searchUsers: [],
    visibiltyAddPost: false,
    addPostText: '',
    err: ''
  }
  changeSearchUser = (e) => {
    this.searchUser(e.target.value)
  }
  changeAddPostText = (e) => {
    this.setState({ addPostText: e.target.value })
  }
  resetSearchUser = () => {
    this.setState({ searchUsers: [] })
  }
  addPost = () => {
    this.setState({ visibiltyAddPost: true })
  }
  cancelAddPost = () => {
    this.setState({ visibiltyAddPost: false })
    this.setState({ err: '' })
  }
  approvalOfAddingAPost = () => {
    if (this.state.addPostText === "") {
      this.setState({ err: 'Pole nie może być puste' })
    }
    else {
      fetch(`http://localhost:5000/addPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: Math.random(), text: this.state.addPostText })
      })
      this.setState({visibiltyAddPost: false})
    }
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
  componentDidMount() {
    fetch(`http://localhost:5000/currentUser/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken')
      },
    })
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
              <div className='oneIcon' onClick={this.addPost}><BsPlusSquare ></BsPlusSquare></div>
              <Link className='iconLink' to='/myProfile'><div className="oneIcon"><BsFillPersonFill></BsFillPersonFill></div></Link>
            </div>
          </div>
          <div className='proptedUsersContainer'>{this.state.searchUsers.slice(0, 5).map(user => <div className="proptedUsers" key={user.id}>{user.login}</div>)}</div>
        </div>
        {this.state.visibiltyAddPost &&
          <div className='addPostContainer'>
            <div className='addText' ><input onChange={this.changeAddPostText} type='text' placeholder='enter your post content'></input></div>
            <button onClick={this.cancelAddPost}>Cancel</button>
            <button onClick={this.approvalOfAddingAPost}>Add Post</button>
            <div className="err">{this.state.err}</div>
          </div>
        }

        <div className="posts"></div>
      </div>
    )
  }
}

export default EnhanceMainPageHistory;
