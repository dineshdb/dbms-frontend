import React from 'react'
import HomeBar from '../components/appBar/index'

import Description from '../components/Description/index'
import Renderer from '../components/newUserDetails'
import {USER_TOKEN} from '../components/../definitions/index'
import Body from '../components/bodyAfterLogin/index'
class Home extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            token: false
        }
    }
   componentDidMount(){
    var token = JSON.parse(localStorage.getItem(USER_TOKEN))
    console.log("HEY token is",token)
    if(token){
        this.setState({
            token: true
        })
    }
    else{
        this.setState({
            token: false
        })
    }
   }
    render(){
       const {token} = this.state
       console.log("token is ",token)
        if(token){
            return (
                <div>
                <HomeBar/>
                <Body/>
                <Renderer/>
            
                </div>
                )
            }
        else{
            return (
                <div>
                    Hello
                    <HomeBar/>
                    
                    </div>
            )
        }
    }
}
export default Home;