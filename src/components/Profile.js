import React, { Component } from 'react';
import Navbar from './Navbar';
import ProfilePosts from './ProfilePosts';


class Profile extends Component {
    
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <ProfilePosts></ProfilePosts>
            </div>
        )
    }
}

export default Profile;
