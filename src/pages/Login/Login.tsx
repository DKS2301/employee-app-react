import './Login.css';

import { useLoginMutation } from '@api-services/auth/login.api';
import Button from '@components/Button';
import Input from '@components/Input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setEmail(value);

        setError(value && !value.includes('@') ? 'Email must include @' : '');
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setPassword(value);

        setError(value.length < 8 ? 'Password must contain at least 8 chars' : '');
    }

    async function checkLogin() {
        login({ username: email, password: password })
            .unwrap()
            .then((response) => {
                console.log(response);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                navigate('/employee');
            })
            .catch((error) => {
                console.log('error', error);
                setError(error.data.detail);
            });
    }

    return (
        <main className="main-login">
            <div className="banner-image">
                <div>
                    <img src="./src/assets/images/working-people.png" alt="Banner image" />
                </div>
            </div>
            <div className="login-container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <img src="./src/assets/images/logo.png" alt="Logo" id="logo-image" />
                    <div className="input-group">
                        <Input
                            type="text"
                            id="username"
                            label="Username"
                            placeholder=" "
                            isRequired={true}
                            onChange={(e) => {
                                handleEmailChange(e);
                            }}
                            autoFocus={true}
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-group">
                        <Input
                            type="password"
                            id="password"
                            label="Password"
                            placeholder=" "
                            isRequired={true}
                            onChange={(e) => {
                                handlePasswordChange(e);
                            }}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    {/* <Link to='/employee' >
                </Link> */}
                    <Button
                        id="login"
                        typeName="submit"
                        className={`${isLoading ? 'outline' : 'primary'}`}
                        label={`${isLoading ? 'Logging in..' : 'Login'}`}
                        onClick={() => checkLogin()}
                        disabled={isLoading}
                    />
                    <div className="error">{error}</div>
                </form>
            </div>
        </main>
    );
}

export default Login;
