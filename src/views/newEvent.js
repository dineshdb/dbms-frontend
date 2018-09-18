import React from 'react'
import HomeBar from '../components/appBar/index'
import NewEvent from '../components/event/index'
class Event extends React.Component{
    render(){
        return <div>
            <HomeBar/>
            <NewEvent />
            </div>

    }
}

export default Event;