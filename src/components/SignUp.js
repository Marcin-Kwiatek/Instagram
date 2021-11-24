import './FormFields.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SignUp extends Component {
    state = {
        login: '',
        password: '',
        err: ''
    }
    SignUp = () => {
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
                <div className="signUpText">Masz już konto? <Link className='signUpLink' to='/'>Zaloguj się</Link></div>
            </div>
        )
    }

}

export default SignUp;
