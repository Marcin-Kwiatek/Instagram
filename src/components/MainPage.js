import React from 'react';
import Navbar from './Navbar';
import WatchedUsersPosts from './WatchedUsersPosts';


function MainPage() { 
    return (
        <div>
            <Navbar></Navbar>
            <WatchedUsersPosts></WatchedUsersPosts>
        </div>
    )
}

export default MainPage;