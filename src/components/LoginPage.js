import './FormFields.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const history = useHistory()

    const Login = () => {
        if (login === "" || password === "") {
            setErr('Nie poprawna wartość login lub hasło')
        }
        else {
            fetch(`http://localhost:5000/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, password: password })
            })
                .then((response) => {
                    if (response.status === 404) {
                        setErr('Nie znaleziono użytkownika o podanym loginie lub haśle')
                    } else {
                        response.json().then(data => {
                            localStorage.setItem('accessToken', data.accessToken);
                            localStorage.setItem('currentUserId', data.userId);
                            history.push("/");
                        })
                    }
                })
        }
    }
    const changeLogin = (e) => {
        setLogin(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="container">
            <div className="logo">
                <img src={require("../img/logo.png").default}></img>
            </div>
            <input placeholder="Login" className="input" maxLength="20" type="text" onChange={changeLogin}></input>
            <input placeholder="Hasło" className="input" maxLength="20" type="password" onChange={changePassword}></input>
            <button className="submitButton" onClick={Login}>Zaloguj się</button>
            <div className="err">{err}</div>
            <div className="text">Nie masz konta? <Link className='link' to='/SignUp'>Zarejestruj się</Link>
            </div>
        </div>
    )

}

export default LoginPage;
