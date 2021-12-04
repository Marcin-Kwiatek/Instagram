import './FormFields.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function EnhanceLoginPageWithHistory(props){
    const history = useHistory()
    return <LoginPage history={history} {...props}></LoginPage>
}

class LoginPage extends Component {
    state = {
        login: '',
        password: '',
        err: ''
    }
    Login = () => {
        if (this.state.login === "" || this.state.password === "") {
            this.setState({ err: 'Nie poprawna wartość login lub hasło' })
        }
        else {
            fetch(`http://localhost:5000/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: this.state.login, password: this.state.password })
            })
                .then((response) => {
                    if (response.status === 404) {
                        this.setState({ err: 'Nie znaleziono użytkownika o podanym loginie lub haśle' })
                    } else {
                        response.json().then(data => {
                            localStorage.setItem('accessToken', data.accessToken);
                            this.props.history.push("/");
                        })
                    }
                })
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
                <input placeholder="Login" className="input" maxLength="20" type="text" onChange={this.changeLogin}></input>
                <input placeholder="Hasło" className="input" maxLength="20" type="password" onChange={this.changePassword}></input>
                <button className="submitButton" onClick={this.Login}>Zaloguj się</button>
                <div className="err">{this.state.err}</div>
                <div className="text">Nie masz konta? <Link className='link' to='/SignUp'>Zarejestruj się</Link>
                </div>
            </div>
        )
    }
}

export default EnhanceLoginPageWithHistory;
