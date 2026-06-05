import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import './Login.css'
import { Link, replace, useNavigate } from 'react-router'


function Login() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(email,password)
    }

    function handleEmailChange(e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value)
        const emailError = email && !email.includes('@') ? 'Email must include @' : '';
        setError(emailError)
    }

    function handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
        const passwordError = password.length < 8 ? 'Password must conatin atleast 8 chars' : '';
        if (password.length>10) {
            throw new Error('Password is required');
        }
        setError(passwordError)
    }

    function checkLogin(){
        const token = localStorage.getItem('token')
        if (token){
            navigate('/employee', {replace: true})
        }
        else{
            console.log('NO token')
        }
    }

    return (
    <main className='main-login'>
        <div className="banner-image">
            <div>
            <img src="./src/assets/images/working-people.png" alt="Banner image"/>
            </div>
        </div>
        <div className='login-container'>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <img src="./src/assets/images/logo.png" alt="Logo" id="logo-image"/>
                <Input type="text" label="Username" placeholder="Username" isRequired={true} onChange={(e)=>{handleEmailChange(e)}}/>
                <Input type="password" label="Password" placeholder="Password" isRequired={true} onChange={(e)=>{handlePasswordChange(e)}}/>
                <div className='error'>
                    {error}
                </div>
                {/* <Link to='/employee' >
                </Link> */}
                    <Button typeName="submit" className='primary' label="Login" onClick={()=>checkLogin()}/>
            </form>
        </div>
    </main>
  )
}

export default Login