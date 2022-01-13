import React, { Component } from 'react';
import Navbar from './Navbar';
import MyProfilePosts from './MyProfilePosts';
import MyIntro from './MyIntro';
class MyProfile extends Component {
    
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <MyIntro></MyIntro>
                <MyProfilePosts></MyProfilePosts>
            </div>
        )
    }
}

export default MyProfile;
