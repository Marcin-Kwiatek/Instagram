import React, { Component } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import AddPost from './AddPost';
import SearchUser from './SearchUser';
import ClickAwayListener from 'react-click-away-listener';
import { useHistory } from "react-router-dom";

function EnhanceNavbarWithHistory(props){
    const history = useHistory()
    return <Navbar history={history} {...props}></Navbar>
}

class Navbar extends Component {
    state = {
        visibiltyAddPost: false,
        visibiltyShowMyProfileEvents: false,
    }
    showMyProfileEvents = () => {
        this.setState({ visibiltyShowMyProfileEvents: true })
    }
    hideMyProfileEvents = () => {
        this.setState({ visibiltyShowMyProfileEvents: false })
    }
    showPostForm = () => {
        this.setState({ visibiltyAddPost: true })
    }
    hidePostForm = () => {
        this.setState({ visibiltyAddPost: false })
    }
    LogOut = () => {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('accessToken');
        this.props.history.push("/SignIn");
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
                            <div className="oneIcon" onClick={this.showMyProfileEvents} style={{position:'relative'}}>
                                <BsFillPersonFill></BsFillPersonFill>
                                {this.state.visibiltyShowMyProfileEvents &&
                                    <ClickAwayListener onClickAway={this.hideMyProfileEvents}>
                                        <div className='my-events'>
                                            <Link className='iconLink' to='/myProfile'>
                                                <div className='my-event'>
                                                    <BsFillPersonFill></BsFillPersonFill>Profile
                                                </div>
                                            </Link>
                                            <div className='my-event' id='my-event-log-out' onClick={this.LogOut}>
                                                Log Out
                                            </div>
                                        </div>
                                    </ClickAwayListener>
                                }
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

export default EnhanceNavbarWithHistory;
