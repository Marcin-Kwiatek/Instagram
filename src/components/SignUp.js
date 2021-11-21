import './SignUp.css';
import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        login: '',
        password: ''
    }
    SignUp = () => {
        console.log(this.state.login, this.state.password)
    }
    changeLogin = (e) => {
        this.setState({login: e.target.value})
    }
    changePassword = (e) => {
        this.setState({password: e.target.value})
    }
    render() {
        return (
            <div className="container">
                <input placeholder="Login" onChange={this.changeLogin}></input>
                <input placeholder="Password" onChange={this.changePassword}></input>
                <button onClick={this.SignUp}>Sign Up</button>
            </div>
        )
    }

}

export default SignUp;
