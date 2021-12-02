import React,{Component} from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import './MainPage.css';


class MainPage extends Component {
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
        <input type='text' placeholder="Szukaj" className="searchUserInput"></input>
        <div className="icons">
        <Link className='iconLink' to='/'><div className="oneIcon"><AiFillHome></AiFillHome></div></Link>
        <Link className='iconLink' to='/myProfile'><div className="oneIcon"><BsFillPersonFill></BsFillPersonFill></div></Link>
        </div>
      </div>
    </div>
  </>  )
  }
}

export default MainPage;
