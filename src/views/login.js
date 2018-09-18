import React from 'react'
import HomeBar from '../components/appBar/index'
import LoginBar from '../components/login/index'

class Login extends React.Component
{
    render(){
        return (
            <div>
               
            <HomeBar/>
            <LoginBar/>
            </div>
            )
}
}
export default Login;