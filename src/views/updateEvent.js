import React from 'react'
import HomeBar from '../components/appBar/index'
import UpdateEvent from '../components/updateEvent/index'
class Event extends React.Component{
    render(){
        return <div>
            <HomeBar/>
            <UpdateEvent />

        </div>

    }
}

export default Event;