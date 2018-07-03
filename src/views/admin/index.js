import React from 'react'
import HomeBar from '../../components/appBar/index'
import Organizers from '../../components/admin/organizers/index'
import Events from '../../components/admin/events/index'
import Footer from '../../components/footer/index'

class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
           
            <Events/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

           {/*
           Here should be the admin panel components
           */}
           <Footer/>

        
            </div>
            )
    }
}
export default Home;