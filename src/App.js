import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import Login from './views/login'
import SignUp from './views/signup'
import {Redirect} from 'react-router-dom'
import NewEvent from './views/newEvent'
import PageNotFound from './views/404'
import {USER_TOKEN} from './definitions/index'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }
    componentDidMount(){
        var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
        if(userToken){
            this.setState({
                isLoggedIn: userToken.isOnline
            })
        }
    }
    render() {
        return (
            <Router>
                <div >
                    
                    <Route path = "/" exact strict component={
                      Home
                    }
                    />
                    <Route path = "/login" exact strict component={Login}
                        
                    />
                    <Route path = "/signup" exact strict component={
                       SignUp
                        }
                    />
                    <Route path = "/error" exact strict component={
                       PageNotFound
                        }
                    />
                    <Route path = "/newEvent" component = {
                        NewEvent
                    }
                    />

                     
                    
                    
                </div>
            </Router>


        )
    }
}

export default App;
