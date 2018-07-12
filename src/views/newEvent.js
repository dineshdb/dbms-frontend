import React from 'react'
import HomeBar from '../components/appBar/index'
import Footer from '../components/footer/index'
import NewEvent from '../components/event/index'
import {Redirect} from 'react-router-dom'
class Event extends React.Component
{
    constructor(props){
        super(props)
        }
    render(){
        return <div>
            <HomeBar/>
            <NewEvent/>
            </div>

    }
}

export default Event;