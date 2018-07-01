import React from 'react'
import HomeBar from '../../components/appBar/index'
import HomeImage from '../../assets/images/home.jpeg'
class Home extends React.Component
{
    render(){
        return (
            <div style = {{backgroundImage: HomeImage}}>
                <HomeBar/>
                <img src={HomeImage} style = {{
                    height: "100%",
                    width: "100%"
                }}/>
                </div>
        )
    }
}
export default Home;