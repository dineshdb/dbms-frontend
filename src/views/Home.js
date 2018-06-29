import React from 'react'
import HomeBar from '../components/appBar/index'
import Renderer from '../components/newUserDetails'
import {USER_TOKEN} from '../components/../definitions/index'
import Body from '../components/bodyAfterLogin/index'
class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
            <Body/>
            <Renderer/>
        
            </div>
            )
    }
}
export default Home;