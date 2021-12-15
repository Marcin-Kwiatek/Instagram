import React, { Component } from 'react';
import Navbar from './Navbar';
import ProfilePosts from './ProfilePosts';


class MyProfile extends Component {
    
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <ProfilePosts></ProfilePosts>
            </div>
        )
    }
}

export default MyProfile;
