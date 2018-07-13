import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'





const styles = {

    root: {
        flexGrow: 1,
       
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    pad:{
        // paddingTop: 10
    },
    typography:{
        fontSize: "25px",
        fontWeight: "lighter",
    }
};


class HomeBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOnline: false,
            userId: "",
            fireHome: false,
            userName: ""
        }
    }
    componentDidMount(){
        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        
        if(userToken){
            this.setState({
                isOnline: userToken.isOnline,
                userId: userToken.id,
                userName: userToken.userName
            })
        }

        
    }
    handleLogOut(){
        var userToken = JSON.parse(localStorage.getItem(USER_TOKEN))
        if(userToken){
           localStorage.removeItem(USER_TOKEN)
           this.setState({
               isOnline: false,
               userId: ""
           })
        }
        this.fireHome()
        
    }
    fireHome(){
        this.setState({
            fireHome: true
        })
    }


    render() {
        
        console.log("new state",this.state)
        const {classes} = this.props;
        if(!this.state.isOnline){
            return (
                <div >
                    {
                    (this.state.fireHome) && (<Redirect to = "/" />)
                     }
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                            <Grid container spacing = {24}>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={1}>
                                <Link to="/" className={classes.pad}>
                                    <Button color="inherit">
                                        <Typography
                                            value="Home"
                                        />
                                    </Button>
                                </Link>
                                </Grid>
                                <Grid item xs={8}>
                                </Grid>
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={1}>
                                </Grid>
                            
                                </Grid>
                        </Toolbar>
                    </AppBar>
                    

                
                </div>
            );
        }
        else{
           
            return (
                <div >
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                            <Grid container spacing = {24} >
                                <Grid item xs={1}>
                                <Link to="/" className={classes.pad}>
                                    <Button color="inherit">
                                        <Typography
                                            className={classes.typography}
                                        >Home
                                        </Typography>
                                    </Button>
                                </Link>

                                </Grid>
                                <Grid item xs={8}>
                                    <Link to="/showEvents" className={classes.pad}>
                                        <Button color="inherit">
                                            <Typography
                                                className={classes.typography}
                                            >Show Events
                                            </Typography>
                                        </Button>
                                    </Link>
                                    <Link to="/newEvent" className={classes.pad}>
                                        <Button color="inherit">
                                            <Typography
                                                className={classes.typography}
                                            >Create Event
                                            </Typography>
                                        </Button>
                                    </Link>


                                </Grid>
                                <Grid item xs={1}>
                                
                                    <Button color="inherit" onClick={this.handleLogOut.bind(this)}>
                                        <Typography
                                            className={classes.typography}
                                        >Logout
                                        </Typography>
                                    </Button>
                               
                                </Grid>
                                <Grid item xs={1}>


                           
                            </Grid>
                            
                                </Grid>
                               
                        </Toolbar>
                    </AppBar>
                    
             

                </div>
            );

        }
}
}
HomeBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        

    }
}
export default connect(mapStateToProps)(withStyles(styles)(HomeBar))
