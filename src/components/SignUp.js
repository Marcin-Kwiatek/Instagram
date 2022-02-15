import './FormFields.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import generateId from '../utils/generateId';

function SignUp() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const history = useHistory()

    const SignUp = () => {
        if (login === "" || password === "") {
            setErr('Nie poprawna wartość login lub hasło')
        }
        else {
            fetch(`http://localhost:5000/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, password: password })
            })
                .then((response) => {
                    if (response.status === 404) {
                        setErr('Ten login jest już zajęty')
                    } else {
                        fetch(`http://localhost:5000/user`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: generateId(), login: login, password: password })
                        })
                        history.push("/SignIn");
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
            <input placeholder="Login" className="input" onChange={changeLogin}></input>
            <input placeholder="Hasło" className="input" onChange={changePassword} type="password"></input>
            <button className="submitButton" onClick={SignUp}>Sign Up</button>
            <div className="err">{err}</div>
            <div className="text">Masz już konto? <Link className='link' to='/SignIn'>Zaloguj się</Link></div>
        </div>
    )
}

export default SignUp;
