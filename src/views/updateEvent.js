import React from 'react'
import HomeBar from '../components/appBar/index'
import UpdateEvent from '../components/updateEvent/index'
import {Redirect} from 'react-router-dom'
class Event extends React.Component
{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            <HomeBar/>
            <UpdateEvent />

        </div>

    }
}

export default Event;