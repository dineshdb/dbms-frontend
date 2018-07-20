import React from 'react'
import HomeBar from '../../components/appBar/index'
import Renderer from '../../components/newUserDetails'
import Body from '../../components/admin/index'
import Footer from '../../components/footer/index'
import Events from '../../components/userEvents/index'

class Home extends React.Component {    
    render(){
        return (
            <div>
            <HomeBar/>
            </div>
            )
    }
}
export default Home;
