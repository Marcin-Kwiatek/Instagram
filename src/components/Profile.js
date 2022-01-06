import React, { Component } from 'react';
import Navbar from './Navbar';
import ProfilePosts from './ProfilePosts';
import PersonIntro from './PersonIntro';


class Profile extends Component {
    
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <PersonIntro></PersonIntro>
                <ProfilePosts></ProfilePosts>
            </div>
        )
    }
}

export default Profile;
