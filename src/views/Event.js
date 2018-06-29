import React from 'react'
import HomeBar from '../components/appBar/index'
import Description from '../components/Description/index'
import Footer from '../components/footer/index'
import NewEvent from '../components/event/index'
class Event extends React.Component
{
    
    render(){
        return (
            <div>
               
            <HomeBar/>
            <NewEvent/>
            <Description/>
            <Footer/>
            </div>
            )
}
}
export default Event;