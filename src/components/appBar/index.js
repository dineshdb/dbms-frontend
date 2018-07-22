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
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

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
    },
    search: {
    
    }
};


class HomeBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOnline: false,
            userId: "",
            fireHome: false,
            userName: "",
            date: "",
            fireSearch: false
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
                                        <Typography value="ICT"/>
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
                                    <Button color="inherit" style={{margin: "5px"}}>
                                        <Typography
                                            className={classes.typography}
                                        > ICT
                                        </Typography>
                                    </Button>
                                </Link>

                                </Grid>
                                <Grid item xs={7}>
                                <Toolbar>
                                    <Link to="/showEvents" className={classes.pad}>
                                        <Button color="inherit">
                                            <Typography className={classes.typography}>Events</Typography>
                                        </Button>
                                    </Link>
                                
                                     <Link to="/searchEvent" className={classes.pad}>
                                        <IconButton color="inherit" aria-label="Search">
                                            <Icon>search</Icon>
                                        </IconButton>
                                    </Link>

                                         
                                    
                                     <DatePicker
                                          selected={this.state.date}
                                            onChange={(Date)=>{
                                                               this.setState({
                                                              date: Date
                                                              })
                                                             localStorage.setItem('DATE',Date.format('YYYY-MM-DD'))
                                                               }}
                                                                />
                                    </Toolbar>
                                    </Grid>
                                    <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={1}>
                                
                                    <Button style={{margin: "5px"}} variant="outlined" color="inherit" onClick={this.handleLogOut.bind(this)}>
                                        <Typography
                                            className={classes.typography}
                                        >Logout
                                        </Typography>
                                    </Button>
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
