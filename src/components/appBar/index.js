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
import DatePicker from 'react-datepicker'
import Search from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import {DatetimePicker} from 'rc-datetime-picker'
import TextField from '@material-ui/core/TextField'
import moment from 'moment';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        borderRadius: "0px",
        marginTop: theme.spacing.unit
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
    typo: {
        margin: theme.spacing.unit
    },
    search: {
    
    },
    textField: {
    width: 200,
  },
});


class HomeBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOnline: false,
            userId: "",
            fireHome: false,
            userName: "",
            date: moment().format('YYYY-MM-DD HH:MM'),
            fireSearch: false,
            moment: moment()
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
                            
                                <Grid item xs={8}>
                                <Toolbar>
                                    <Link to="/showEvents" className={classes.pad}>
                                        <Button color="inherit" className={classes.button} size= "large" >
                                           <Typography className={classes.typo} style={{fontSize: "20px",color: "white"}}>Events</Typography>
                                        </Button>
                                    </Link>
                                
                                     <Link to="/searchEvent" className={classes.pad}>
                                        <IconButton onClick = {()=>{
                                            console.log("date",this.state.date)
                                              localStorage.setItem('DATE',this.state.date)
                                        }}color="inherit" aria-label="Search">
                                            <Search/>
                                        </IconButton>
                                    </Link>

                                         
                                     <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue={new moment().format('YYYY-MM-DD HH:MM')}
                                        className={classes.textField}
                                        onChange={
                                            (event)=>{
                                                console.log("D",event.target.value)
                                                this.setState({
                                                    date: event.target.value
                                                })
                                               
                                            }
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                 
                                    </Toolbar>
                                    </Grid>
                                    <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={1}>
                                
                                    <Button size = "large" className={classes.button} variant="outlined" color="inherit" onClick={this.handleLogOut.bind(this)}>
                                       Logout
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
