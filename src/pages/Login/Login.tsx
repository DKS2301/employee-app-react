import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import './styles.css'

function Login() {
  return (
    <main className='main-login'>
        <div className="banner-image">
            <div>
                <img src="./src/assets/images/working-people.png" alt="Banner image"/>
            </div>
        </div>
        <div className='login-container'>
            <form >
                <img src="./src/assets/images/logo.png" alt="Logo" id="logo-image"/>
                <Input type="text" label="Username" placeholder="Username" isRequired={true} />
                <Input type="text" label="Password" placeholder="Password" isRequired={true} />
                <Button typeName="submit" className='primary' label="Login"/>
            </form>
        </div>
    </main>
  )
}

export default Login