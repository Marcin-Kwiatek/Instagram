import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import MyProfile from './components/MyProfile';
import Profile from './components/Profile';


function App() {

    return (
        <Router>
            <Switch>
                <Route exact path='/SignIn'>
                    <LoginPage></LoginPage>
                </Route>
                <Route exact path='/SignUp'>
                    <SignUp></SignUp>
                </Route>
                <Route exact path='/'>
                    <MainPage></MainPage>
                </Route>
                <Route exact path='/myProfile'>
                    <MyProfile></MyProfile>
                </Route>
                <Route exact path='/Profile'>
                    <Profile></Profile>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
