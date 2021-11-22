import './LoginPage.css';
import React, { Component } from 'react';

class LoginPage extends Component {
    render(){
    return (
        <div className="container">
            <div className="logo">
                <img src={require("../img/logo.png").default}></img>
            </div>
            <input placeholder="Login" className="input" maxLength="20" type="text"></input>
            <input placeholder="Hasło" className="input" maxLength="20" type="text"></input>
            <button className="submitButton">Zaloguj się</button>
            <div className="signUpText">Nie masz konta? Zarejestruj się</div>
        </div>
    )}
  }
  
  export default LoginPage;
  