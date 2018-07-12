
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect } from 'react-router-dom'
import Calendar from '../calendar/index'
import Divider from '@material-ui/core/Divider'
import MultipleDatePicker from 'react-multiple-datepicker'
import {DATES} from '../../definitions/index'
import {ROOMS} from '../../definitions/index'
import ToolBar from '@material-ui/core/Toolbar'
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      color: "#b4ce84"
    },
    innerPaper:{
      marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "10px"
    },
    title:{
      fontWeight: "lighter",
      fontSize: "30px",
      align: "center",
        marginBottom: "5px",
        marginTop: "5px"
    },
    text:{
        width: "50%",
        marginLeft: "10px"
    },
    typo: {
        marginTop: "22px",
        fontSize: "20px",
        fontWeight: "lighter",
        marginRight: "5px"
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
        color: "white"
    },
  });

class EventForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
          eventName: "",
          eventDescription: "",
          dates: [],
          days: 0,
          chosenRooms: {},
          totalCost: "",
          participants: "",
          submit: false,
          fireCalendar: false,
            dateSlot: {
              date: "",
                startTime: new Date(),
                endTime: new Date(),
                rooms: []
            }
        }
    }
        handleOrganizerEmail(event){

        }


        handleEventName(event){
           
            this.setState({
                eventName: event.target.value
            })
        }
        handleEventDescription(event){
           
            this.setState({
                eventDescription: event.target.value
            }) 
        }
        handleDays(event){
            this.setState({
                days: Number(event.target.value)
            }
            )
        }
    
           
        handleParticipants(event){
           
            this.setState({
                participants: event.target.value
            }) 
        }
        handleOrganizerName(event){

        }
        handleOrganizerPhone(event){

        }
        handleOrganizerAddress(event){

        }
        handleAddDay(){

        }
        handleSubmit(event){
            event.preventDefault()
            const {eventName,eventDescription,participants,dates} = this.state
            let data = localStorage.getItem(DATES)
            
            if(data){
                let temp = JSON.parse(data)
            
          
                if(eventName.length > 0 && eventDescription.length > 0 ){
                    let user = JSON.parse(localStorage.getItem(USER_TOKEN))
                    let rooms = temp
                    
                    let postingData = {
                        event: {
                            eventName: eventName,
                            eventDescription: eventDescription,
                            expectedNumberOfParticipants: participants,
                            eventDurationInDays: this.state.days,
                            
                        },
                        roomMatrixList: temp
                       
                       

                    }
                 
                    
                    console.log("Data is",postingData)
                    
                    axios.post(`http://localhost:8080/organizers/${user.id}/eventInfo`,postingData,{crossDomain: true})
                    .then(response => {
                        console.log(response,"response")
                    })
                    
                this.setState({
                    fireRedirect: true
                })
                
            }
        }
           
        }
        
        
  
           

      
        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40}}>

                    <form  onSubmit={this.handleSubmit.bind(this)}>
                        <Paper
                            elevation={0}
                            className={classes.innerPaper}
                        >
                        <Typography
                            className={classes.title}
                            align="center"
                        >
                            Organizer
                        </Typography>
                        <Paper className={classes.root} elevation={1} square>
                            <Grid container spacing={24}>
                                <Grid item xs={9}>
                                    <ToolBar>
                                        <Grid container spacing="24">
                                            <Grid item xs="1">
                                                <Typography
                                                    className={classes.typo}>
                                                    Name*
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="11">
                                                <TextField
                                                    margin="dense"
                                                    type="text"
                                                    placeholder="Name"
                                                    onChange={this.handleOrganizerName.bind(this)}
                                                    fullWidth
                                                    className={classes.text}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        classes: {
                                                            root: classes.bootstrapRoot,
                                                            input: classes.bootstrapInput,
                                                        },

                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        className: classes.bootstrapFormLabel,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>


                                    </ToolBar>
                                    <ToolBar>
                                        <Grid container spacing="24">
                                            <Grid item xs="1">
                                                <Typography
                                                    className={classes.typo}>
                                                    Email*
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="11">
                                                <TextField
                                                    margin="dense"
                                                    type="text"
                                                    placeholder="Email"
                                                    onChange={this.handleOrganizerEmail.bind(this)}
                                                    fullWidth
                                                    className={classes.text}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        classes: {
                                                            root: classes.bootstrapRoot,
                                                            input: classes.bootstrapInput,
                                                        },

                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        className: classes.bootstrapFormLabel,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </ToolBar>
                                    <ToolBar>
                                        <Grid container spacing="24">
                                            <Grid item xs="1">
                                                <Typography
                                                    className={classes.typo}>
                                                    Address*
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="11">
                                                <TextField
                                                    margin="dense"
                                                    type="text"
                                                    placeholder="Address"
                                                    onChange={this.handleOrganizerAddress.bind(this)}
                                                    fullWidth
                                                    className={classes.text}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        classes: {
                                                            root: classes.bootstrapRoot,
                                                            input: classes.bootstrapInput,
                                                        },

                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        className: classes.bootstrapFormLabel,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>


                                    </ToolBar>
                                    <ToolBar>
                                        <Grid container spacing="24">
                                            <Grid item xs="1">
                                                <Typography
                                                    className={classes.typo}>
                                                    Phone*
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="11">
                                                <TextField
                                                    margin="dense"
                                                    type="text"
                                                    placeholder="Phone"
                                                    onChange={this.handleOrganizerPhone.bind(this)}
                                                    fullWidth
                                                    className={classes.text}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        classes: {
                                                            root: classes.bootstrapRoot,
                                                            input: classes.bootstrapInput,
                                                        },

                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        className: classes.bootstrapFormLabel,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>


                                    </ToolBar>
                                </Grid>
                                <Grid item xs="3">
                                </Grid>
                            </Grid>
                            <br/>
                        </Paper>
                                <Typography
                                    className={classes.title}
                                    align="center"
                                >
                                    Event
                                </Typography>
                                <Paper className={classes.root} elevation={2} square>
                                    <Grid container spacing={24}>
                                        <Grid item xs={9}>

                                            <ToolBar>
                                                <Grid container spacing="24">
                                                    <Grid item xs="1">
                                                        <Typography
                                                            className={classes.typo}>
                                                            Name*
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs="11">
                                                        <TextField
                                                            margin="dense"
                                                            type="text"
                                                            placeholder="Name"
                                                            onChange={this.handleEventName.bind(this)}
                                                            fullWidth
                                                            className={classes.text}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                classes: {
                                                                    root: classes.bootstrapRoot,
                                                                    input: classes.bootstrapInput,
                                                                },

                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                className: classes.bootstrapFormLabel,
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>


                                            </ToolBar>
                                            <ToolBar>
                                                <Grid container spacing="24">
                                                    <Grid item xs="2">
                                                        <Typography
                                                            className={classes.typo}>
                                                            Description*
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs="10">
                                                        <TextField
                                                            margin="dense"
                                                            type="text"
                                                            placeholder="Description"
                                                            onChange={this.handleEventDescription.bind(this)}
                                                            fullWidth
                                                            style={{
                                                                marginBottom: "20px",
                                                                width: "45%"
                                                            }}
                                                            className={classes.text}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                classes: {
                                                                    root: classes.bootstrapRoot,
                                                                    input: classes.bootstrapInput,
                                                                },

                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                className: classes.bootstrapFormLabel,
                                                            }}
                                                            multiline
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </ToolBar>
                                            <Grid container spacing="24">
                                                <Grid item xs="5">
                                                </Grid>
                                                <Grid item xs="7">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={{
                                                            marginLeft: "20px",
                                                            marginTop: "20px"
                                                        }}
                                                        onClick = {this.handleAddDay.bind(this)}
                                                    >
                                                        Add
                                                    </Button>
                                                </Grid>

                                            </Grid>




                                        </Grid>
                                        <Grid item xs="3">
                                        </Grid>
                                    </Grid>

                                </Paper>
                            </Paper>

                    <Grid container spacing={24} style={{marginTop: 10}}
                        >
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs = {3}>
                            <Link to = "/">
                            <Button  
                            type="cancel" 
                            color="inherit" 
                        
                            style = {{marginBottom: 15,marginTop: 5}}
            
                            >
                            Cancel
                            
                            </Button>
                            </Link>
                       
                        </Grid>
                        <Grid item xs={4}>
                            <Button 
                            variant = "contained" 
                            type="submit" 
                            color="inherit" 
                        
                            style = {{marginBottom: 15,marginTop: 5}}
            
                            >
                            Submit
                            
                            </Button>
                        
                        <Grid>
                    </Grid>
                </Grid>
                </Grid>
                    </form> 

                {this.state.fireRedirect && (
                    <Redirect to = "/" />
                )}
               
                </div>

            )
        }
    
}
EventForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state){
    return {
        newUsers: state.newUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(EventForm));



