import './FormFields.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SignUp extends Component {
    constructor(props){
        super(props)
        this.SignUp = this.SignUp.bind(this)
    }
    state = {
        login: '',
        password: '',
        err: ''
    }
    SignUp = () => {
        if (this.state.login === "" || this.state.password === "") {
            this.setState({ err: 'Nie poprawna wartość login lub hasło' })
        }
        else {
            fetch(`http://localhost:5000/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: Math.random(), login: this.state.login, password: this.state.password})
                })
                .then(function() { window.location.href = "/" })
         }
    }
    changeLogin = (e) => {
        this.setState({ login: e.target.value })
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div className="container">
                <div className="logo">
                    <img src={require("../img/logo.png").default}></img>
                </div>
                <input placeholder="Login" className="input" onChange={this.changeLogin}></input>
                <input placeholder="Hasło" className="input" onChange={this.changePassword}></input>
                <button className="submitButton" onClick={this.SignUp}>Sign Up</button>
                <div className="err">{this.state.err}</div>
                <div className="text">Masz już konto? <Link className='link' to='/'>Zaloguj się</Link></div>
            </div>
        )
    }

}

export default SignUp;
