import React from 'react'
import HomeBar from '../../components/appBar/index'
import Organizers from '../../components/admin/organizers/index'
class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
            <Organizers/>
           {/*
           Here should be the admin panel components
           */}

        
            </div>
            )
    }
}
export default Home;