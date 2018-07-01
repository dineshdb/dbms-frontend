import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import PublicHome from './views/public/home'
import Login from './views/login'
import SignUp from './views/signup'
import {Redirect} from 'react-router-dom'
import NewEvent from './views/newEvent'
import PageNotFound from './views/404'
import {USER_TOKEN} from './definitions/index'
import AdminHome from './views/admin/index'

class App extends React.Component {
    constructor(props){
        super(props)
    
    }

    render() {
        return (
            <Router>
                <div >
                    <Route path = "/" exact strict render = {() => {
                        var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <PublicHome/>
                        }
                        /* toDO
                            ***
                            If userToken is available, then parse the userToken
                            to get the type of user.
                            If the user is admin then render the admin home view
                            else
                            render the organiser view
                        */
                        else{
                            if(userToken.userRole = "ADMIN"){
                                return <AdminHome/>
                            }
                            else{
                                return <Home/>
                            }
                        }
                    }
                }
                    />
                    <Route path = "/login" exact strict render = {() => {
                         var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
                        /***** 
                            ****
                            ***
                            Hey watch out this !!!.. This is little bit naive. after the
                            user has logged in, the userToken is not null .. 
                        ****/
                         if(!userToken){
                            return <Login/>
                        }
                        else{
                            return <Redirect to = "/" />
                        }
                    }

                        }
                    />
                      <Route path = "/admin" exact strict render = {() => {

                            return (
                                <AdminHome/>
                            )
                      }
                    
                    }
                    //      var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
                    //     /***** 
                    //         ****
                    //         ***
                    //         Hey watch out this !!!.. This is little bit naive. after the
                    //         user has logged in, the userToken is not null .. 
                    //     ****/
                    //      if(!userToken){
                    //         return <Login/>
                    //     }
                    //     else{
                    //         return <Redirect to = "/" />
                    //     }
                    // }

                    //     }
                    />
                    <Route path = "/signup" exact strict render = {() => {
                        var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
                        if(!userToken){
                            return <SignUp/>
                        }
                        else{
                            return <Redirect to = "/" />
                        }
                    }

                        }
                    />
                    <Route path = "/error" exact strict render = {() => <PageNotFound errorMessage = "Invalid page" />}
                    />
                    <Route path = "/newEvent" render = {() => {
                        var userToken = JSON.parse(sessionStorage.getItem(USER_TOKEN))
                        /*
                                *****
                                The user can create new event only after getting logged in.
                                so down the code, the login = true should be overwritten by userToken 
                                if token is successful then newevent is created.
                                *****
                        */

                        const login = true
                        if(login){
                            return <NewEvent/>
                        }
                        // if(userToken === null){
                        //     return <Redirect to = "/error" />
                        // }
                    }

                        }
                    />

                     
                    
                    
                </div>
            </Router>


        )
    }
}

export default App;
