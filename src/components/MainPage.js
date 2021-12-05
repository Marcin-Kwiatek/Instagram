import React,{Component} from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import './MainPage.css';


class MainPage extends Component {
  state = {
    returnUser: ''
  }
  changeSearchUser = (e) => {
    console.log('targetValue', e.target.value)
    this.searchUser(e.target.value)
}
  searchUser = (value) => {
    fetch(`http://localhost:5000/searchUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: value})
            })
            .then((response) => {
              if (response.status === 404) {
              } else {
                console.log('value', value)
                  this.setState({returnUser: value})
              }
          })
  }
  componentDidMount(){
    fetch(`http://localhost:5000/currentUser/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('accessToken')
                    },
                })
         }
  render(){
  return (
    <>
    <div className="logo">
      <div className="logoContainer">
        <div className="imgLogo">
          <Link to='/'><img src={require("../img/logo.png").default}></img></Link>
        </div>
        <input type='text' placeholder="Szukaj" className="searchUserInput" onChange={this.changeSearchUser}></input>
        <div className="icons">
        <Link className='iconLink' to='/'><div className="oneIcon"><AiFillHome></AiFillHome></div></Link>
        <Link className='iconLink' to='/myProfile'><div className="oneIcon"><BsFillPersonFill></BsFillPersonFill></div></Link>
        </div>
      </div>
    </div>
    <div className="posts">{this.state.returnUser}</div>
  </>  )
  }
}

export default MainPage;
