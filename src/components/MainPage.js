import React, { Component } from 'react';
import Navbar from './Navbar';
import WatchedUsersPosts from './WatchedUsersPosts';


class MainPage extends Component {
    
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <WatchedUsersPosts></WatchedUsersPosts>
            </div>
        )
    }
}

export default MainPage;