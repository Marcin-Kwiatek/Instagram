import React from 'react';
import Navbar from './Navbar';
import MyProfilePosts from './MyProfilePosts';
import MyIntro from './MyIntro';

function MyProfile() {

    return (
        <div>
            <Navbar></Navbar>
            <MyIntro></MyIntro>
            <MyProfilePosts></MyProfilePosts>
        </div>
    )
}

export default MyProfile;
