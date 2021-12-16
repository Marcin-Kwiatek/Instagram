import React, { Component } from 'react';
import Navbar from './Navbar';
import MyProfilePosts from './MyProfilePosts';

class MyProfile extends Component {
    
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <MyProfilePosts></MyProfilePosts>
            </div>
        )
    }
}

export default MyProfile;
