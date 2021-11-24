import './FormFields.css';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class LoginPage extends Component {
    state = {
        login: '',
        password: '',
        err: ''
    }
    Login = () => {
        console.log(this.state.login, this.state.password)
        if (this.state.login === "" || this.state.password === "") {
            this.setState({ err: 'Nie poprawna wartość login lub hasło' })
        }
    }
    changeLogin = (e) => {
        this.setState({ login: e.target.value })
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    render(){
    return (
        <div className="container">
            <div className="logo">
                <img src={require("../img/logo.png").default}></img>
            </div>
            <input placeholder="Login" className="input" maxLength="20" type="text" onChange={this.changeLogin}></input>
            <input placeholder="Hasło" className="input" maxLength="20" type="text" onChange={this.changePassword}></input>
            <button className="submitButton" onClick={this.Login}>Zaloguj się</button>
            <div className="err">{this.state.err}</div>
            <div className="text">Nie masz konta? <Link className='link' to='/SignUp'>Zarejestruj się</Link>
</div>
        </div>
    )}
  }
  
  export default LoginPage;
  