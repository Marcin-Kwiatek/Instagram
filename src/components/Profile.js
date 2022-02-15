import React from 'react';
import Navbar from './Navbar';
import ProfilePosts from './ProfilePosts';
import PersonIntro from './PersonIntro';


function Profile() {

    return (
        <div>
            <Navbar></Navbar>
            <PersonIntro></PersonIntro>
            <ProfilePosts></ProfilePosts>
        </div>
    )
}

export default Profile;
