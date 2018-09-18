import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Home from './views/home'
import PublicHome from './views/public/home'
import Login from './views/login'
import SignUp from './views/signup'
import { Redirect } from 'react-router-dom'
import NewEvent from './views/newEvent'
import PageNotFound from './views/404'
import { USER_TOKEN } from './definitions/index'
import AdminHome from './views/admin/index'
import Events from './views/admin/events'
import UserEvent from './views/events'
import Organizers from './views/admin/users'
import theme from './theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import UpdateEvent from './views/updateEvent'
import Search from './views/admin/search'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <div >
                        <Route path="/" exact strict render={() => {
                            let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <Login />
                            } else {
                                return <AdminHome />
                            }
                        }
                        }
                        />
                        <Route path="/login" exact strict render={() => {
                            var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <Login />
                            }
                            else {
                                return <Redirect to="/" />
                            }
                        }

                        }
                        />
                        <Route path="/error" exact strict render={() => <PageNotFound errorMessage="Invalid page" />}
                        />
                        <Route path="/newEvent" render={() => {
                            let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <PublicHome />
                            }

                            else {
                                return <NewEvent />
                            }

                        }} />
                        <Route path="/searchEvent" render={() => {
                            let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <PublicHome />
                            }

                            else {
                                return <Search />
                            }

                        }} />

                        <Route path="/updateEvent/:id" render={() => {
                            let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <PublicHome />
                            }

                            else {
                                return <UpdateEvent />
                            }

                        }} />
                        <Route path="/showEvents" render={() => {
                            let userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
                            if (!userToken) {
                                return <PublicHome />
                            }
                            else {
                                return <Events />
                            }

                        }} />
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App;
