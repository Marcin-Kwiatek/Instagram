import './SignUp.css';
import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        login: '',
        password: '',
        err: ''
    }
    SignUp = () => {
        console.log(this.state.login, this.state.password)
        if(this.state.login === "" || this.state.password === ""){
            this.setState({err: 'Nie poprawna wartość login lub hasło'})
        }
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
                <input placeholder="Hasło" onChange={this.changePassword}></input>
                <button onClick={this.SignUp}>Sign Up</button>
                <div>{this.state.err}</div>
            </div>
        )
    }

}

export default SignUp;
