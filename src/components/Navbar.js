import React, { Component } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import AddPost from './AddPost';
import SearchUser from './SearchUser';

class Navbar extends Component {
    state = {
        visibiltyAddPost: false
    }
    showPostForm = () => {
        this.setState({ visibiltyAddPost: true })
    }
    hidePostForm = () => {
        this.setState({ visibiltyAddPost: false })
    }
    render() {

        return (
            <div>
                <div className="logo">
                    <div className="logoContainer">
                        <div className="imgLogo">
                            <Link to='/'><img src={require("../img/logo.png").default}></img></Link>
                        </div>
                        <SearchUser></SearchUser>
                        <div className="icons">
                            <Link className='iconLink' to='/'><div className="oneIcon"><AiFillHome></AiFillHome></div></Link>
                            <div className='oneIcon' onClick={this.showPostForm}><BsPlusSquare ></BsPlusSquare></div>
                            <div className="oneIcon" onClick={this.showMyEvents}><BsFillPersonFill></BsFillPersonFill>
                                <div className='my-events'>
                                    <Link className='iconLink' to='/myProfile'>
                                        <div className='my-event'>
                                            <BsFillPersonFill></BsFillPersonFill>Profile
                                        </div>
                                    </Link>
                                    <Link className='iconLink' to='/SignIn'>
                                        <div className='my-event' id='my-event-log-out'>
                                            Log Out
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.visibiltyAddPost &&
                    <AddPost cancelAddPost={this.hidePostForm} onPostAdded={this.hidePostForm}></AddPost>
                }
            </div>
        )
    }
}

export default Navbar;
