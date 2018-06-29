import React from 'react'
import HomeBar from '../components/appBar/index'
import Description from '../components/Description/index'
import Footer from '../components/footer/index'
import {USER_TOKEN} from '../definitions/index'
import NewEvent from '../components/event/index'
import {Redirect} from 'react-router-dom'
class Event extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            isLoggedIn: false,
           
        }
    }
    componentDidMount(){
        var  token = JSON.parse(localStorage.getItem(USER_TOKEN)).isOnline
        console.log(token)
       //const {token} = this.state
        if(token){
            this.setState({
                isLoggedIn: true
            })
        }
        else{
            this.setState({
                isLoggedIn: false
            })
        }
    }
    render(){
        
        const {isLoggedIn } = this.state
        console.log("isLogged in" ,isLoggedIn)
        if(isLoggedIn){
            return (
                <div>
                
                <HomeBar/>
                <NewEvent/>
                
                </div>
                )
            }
        else{
            return(
                <Redirect to = "/error" />
            )
        }
    }
}
export default Event;