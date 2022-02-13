import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import AddPost from './AddPost';
import SearchUser from './SearchUser';
import ClickAwayListener from 'react-click-away-listener';
import { useHistory } from "react-router-dom";


function Navbar() {
    const [visibiltyAddPost, setVisibiltyAddPost] = useState(false);
    const [visibiltyShowMyProfileEvents, setVisibiltyShowMyProfileEvents] = useState(false);

    const history = useHistory()

    const showMyProfileEvents = () => {
        setVisibiltyShowMyProfileEvents(true)
    }
    const hideMyProfileEvents = () => {
        setVisibiltyShowMyProfileEvents(false)
    }
    const showPostForm = () => {
        setVisibiltyAddPost(true)
    }
    const hidePostForm = () => {
        setVisibiltyAddPost(false)
    }
    const LogOut = () => {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('accessToken');
        history.push("/SignIn");
    }

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
                        <div className='oneIcon' onClick={showPostForm}><BsPlusSquare ></BsPlusSquare></div>
                        <div className="oneIcon" onClick={showMyProfileEvents} style={{ position: 'relative' }}>
                            <BsFillPersonFill></BsFillPersonFill>
                            {visibiltyShowMyProfileEvents &&
                                <ClickAwayListener onClickAway={hideMyProfileEvents}>
                                    <div className='my-events'>
                                        <Link className='iconLink' to='/myProfile'>
                                            <div className='my-event'>
                                                <BsFillPersonFill></BsFillPersonFill>Profile
                                            </div>
                                        </Link>
                                        <div className='my-event' id='my-event-log-out' onClick={LogOut}>
                                            Log Out
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {visibiltyAddPost &&
                <AddPost cancelAddPost={hidePostForm} onPostAdded={hidePostForm}></AddPost>
            }
        </div>
    )

}

export default Navbar;
