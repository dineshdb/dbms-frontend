import React from 'react'
import HomeBar from '../../components/appBar/index'
import Events from '../../components/admin/searchedEvents/index'

class Home extends React.Component
{
    
    render(){
        return (
            <div>
            <HomeBar/>
            <Events/>
            </div>
            )
    }
}
export default Home;