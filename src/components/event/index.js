
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
import {Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import ToolBar from '@material-ui/core/Toolbar'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import Collapse from '@material-ui/core/Collapse'
import RoomTable from '../rooms/index'
import {UpdateRooms,UpdateSelectedRooms} from "../rooms/action";
import Cancel from '@material-ui/icons/Cancel'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      align: "center",
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
    typoButton: {
        marginTop: "10px",
        fontSize: "24px",
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
    container: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  textField: {
    marginLeft: theme.spacing.unit*50,
    marginRight: theme.spacing.unit*50,
    width: "60%"
  },
  button: {
    borderRadius: "0px",

  }
  });

class EventForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            organizerName: "",
            organizerEmail: "",
            organizerAddress: "",
            organizerPhone: "",
            eventName: "",
            eventDescription: "",
            eventDays: 0,
            dates: [],
            starting: [],
            ending: [],
              submit: false,
              fireRedirect: false,
            open: [],
            event: []

        }
    }

    handleOrganizerName(event){
        this.setState({
            organizerName: event.target.value
        })

        }
    handleOrganizerEmail(event){
        this.setState({
            organizerEmail: event.target.value
        })
    }
    handleOrganizerPhone(event){
        this.setState({
            organizerPhone: event.target.value
        })

        }
    handleOrganizerAddress(event){
        this.setState({
            organizerAddress: event.target.value
        })

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
    handleEventDays(event){
        let temp = []
        let temp2 = []
        let temp3 = []
        let temp4 = []
        for(let i=0;i<event.target.value;i++){
            temp.push(moment())
            temp2.push("08:00")
            temp3.push("17:00")
            temp4.push(false)
        }
            this.setState({
                eventDays: Number(event.target.value),
                dates: temp,
                starting: temp2,
                ending: temp3,
                open: temp4

            }
            )
        }
        clearState() {
            this.props.dispatch(UpdateSelectedRooms())
        }

        handleSubmit(event){
            event.preventDefault()
            const {organizerName,
                organizerAddress,
                organizerEmail,
                organizerPhone,
                eventDescription,
                eventName,
                eventDays,dates,starting,ending} = this.state
            const {roomsFromReducer,RoomsSelected} = this.props
            let temp = []
            for(let i=0;i<eventDays;i++){
                let tempDate = dates[i].format('YYYY-MM-DD')
                let newTemp = []
                for(let j=0;j<RoomsSelected.rooms[i].length;j++){
                    roomsFromReducer.rooms[i].map((room)=>{
                        if (room.roomId === RoomsSelected.rooms[i][j]){
                            newTemp.push(room)
                        }
                    })
                }

                temp.push({
                    date: tempDate,
                    timeSlotList: [
                        {
                            startingTime: starting[i],
                            endingTime: ending[i],
                            rooms: newTemp
                        }
                    ]



                })
            }
            let postingData = {
                organizerName: organizerName,
                organizerPhone: organizerPhone,
                organizerEmail: organizerEmail,
                organizerAddress: organizerAddress,
                eventName: eventName,
                eventDescription: eventDescription,
                eventDurationInDays: eventDays,
                perDayInfoList: temp

            }
            axios.post(`/api/saveEvent`,postingData,{crossDomain: true})
                .then(response =>{
                }).then(()=>{
                    this.clearState()
                    this.setState({
                        fireRedirect: true
                    })
            }

            )
        }


        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40}} className={classes.root}>

                    <form  onSubmit={this.handleSubmit.bind(this)}>
                        <Paper
                            elevation={4}
                            className={classes.innerPaper}
                        >
                           <Link to = "/">
                                    <Button
                                        variant="fav"
                                    >
                                    <Cancel/>

                                    </Button>
                                </Link>
                        <Typography
                            className={classes.title}
                            align="center"
                        >
                            Organizer
                        </Typography>
                       
                        <div className={classes.container}>
                              <TextField
                                label="Name *"
                                className={classes.textField}
                            
                                onChange={this.handleOrganizerName.bind(this)}
                                value={this.state.organizerName}
                              />
                              <TextField
                                label="Email *"
                                className={classes.textField}
                                fullWidth
                                onChange={this.handleOrganizerEmail.bind(this)}
                                value={this.state.organizerEmail}

                              />
                              <TextField
                                label="Address *"
                                className={classes.textField}
                                value={this.state.organizerAddress}
                                
                                onChange={this.handleOrganizerAddress.bind(this)}
                              />
                              <TextField
                                label="Phone *"
                                className={classes.textField}
                                
                                onChange={this.handleOrganizerPhone.bind(this)}
                                value={this.state.organizerPhone}
                              />
                        </div>
                        <Typography className={classes.title} align="center">
                                    Event
                        </Typography>

                        <div className={classes.container}>
                              <TextField
                                label="Name *"
                                className={classes.textField}
                                fullWidth
                                onChange={this.handleEventName.bind(this)}
                                value={this.state.eventName}
                              />
                              <TextField
                                label="Description *"
                                className={classes.textField}
                                multiline
                                onChange={this.handleEventDescription.bind(this)}
                                value={this.state.eventDescription}
                              />
                              <TextField
                                label="Days *"
                                className={classes.textField}
                                
                                onChange={this.handleEventDays.bind(this)}
                              />
                   </div>
                  

                
                              {
                                                this.state.dates.map((date,key)=>{
                                                    return(
                                                        <div style={{marginLeft: "100px"}}>
                                                        <ToolBar>

                                                            <Grid container spacing={24}>
                                                                <Grid item xs={3}>
                                                                    <Typography
                                                                        className={classes.typo}
                                                                    >
                                                                        Date
                                                                    </Typography>
                                                                    <DatePicker
                                                                        selected={this.state.dates[key]}
                                                                        onChange={(Date)=>{
                                                                            let temp = this.state.dates
                                                                            temp[key] = Date
                                                                            this.setState({
                                                                                dates: temp
                                                                            })
                                                                            let temp2 = this.state.open
                                                                            temp2[key]=!(this.state.open[key])
                                                                            this.setState({
                                                                                open: temp2
                                                                            })
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Typography
                                                                        className={classes.typo}
                                                                    >
                                                                        Starting-Time
                                                                    </Typography>
                                                                   <TextField
                                                                    type="text"
                                                                    defaultValue={this.state.starting[key]}
                                                                    onChange={
                                                                        (event)=> {
                                                                            let temp = this.state.starting
                                                                            temp[key] = event.target.value
                                                                            this.setState({
                                                                                starting: temp
                                                                            })
                                                                            let temp2 = this.state.open
                                                                            temp2[key]=!(this.state.open[key])
                                                                            this.setState({
                                                                                open: temp2
                                                                            })
                                                                        }
                                                                    }
                                                                   />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Typography
                                                                        className={classes.typo}
                                                                    >
                                                                        Ending-Time
                                                                    </Typography>
                                                                    <TextField
                                                                        type="text"
                                                                        defaultValue={this.state.ending[key]}
                                                                        onChange={
                                                                            (event)=> {
                                                                                let temp = this.state.ending
                                                                                temp[key] = event.target.value
                                                                                this.setState({
                                                                                    ending: temp
                                                                                })
                                                                                let temp2 = this.state.open
                                                                                temp2[key]=!(this.state.open[key])
                                                                                this.setState({
                                                                                    open: temp2
                                                                                })
                                                                            }
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Button
                                                                        className={classes.button}
                                                                        style={{marginTop: "15px"}}
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick = {
                                                                            ()=>{
                                                                                const {dates,starting,ending}=this.state
                                                                                let tempDate = dates[key].format('YYYY-MM-DD')
                                                                                let search = {
                                                                                    eventSectionDate: tempDate,
                                                                                    eventSectionStartTime: starting[key],
                                                                                    eventSectionEndTime: ending[key]
                                                                                }
                                                                                let tempRooms = []
                                                                                this.clearState()
                                                                                axios.post(`/api/findRooms`,search,{crossDomain:true})
                                                                                    .then((response)=>{
                                                                                        tempRooms=response.data
                                                                                    }).then(()=>{
                                                                                   this.props.dispatch(UpdateRooms(key,tempRooms))
                                                                                })
                                                                                let temp = this.state.open
                                                                                temp[key]=!(this.state.open[key])
                                                                                this.setState({
                                                                                    open: temp
                                                                                })




                                                                        }}
                                                                    >
                                                                      Find Rooms
                                                                    </Button>

                                                                </Grid>
                                                            </Grid>

                                                        </ToolBar>
                                                            {
                                                                this.state.open[key] && <Collapse in = {this.state.open[key]}
                                                                >   <div style={{marginRight: "50px"}}>
                                                                    <RoomTable
                                                                        Key={key}

                                                                    />
                                                                    </div>
                                                                </Collapse>
                                                            }

                                                        </div>
                                                        )

                                                })

                                            }

                    <Grid container spacing={24} style={{marginTop: 10}}
                        >
                        <Grid item xs={9}>
                        </Grid>
                        <Grid item xs={3}>
                            <ToolBar>
                                <Link to = "/">
                                    <Button
                                        variant = "contained"
                                        size="large"
                                        color="primary"
                                        type="submit"
                                        className={classes.button}

                                        onClick={this.handleSubmit.bind(this)}

                                    >
                                    Submit

                                    </Button>
                                </Link>

                            </ToolBar>
                        </Grid>
                </Grid>
                
                </Paper>
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
        roomsFromReducer: state.rooms,
        RoomsSelected: state.RoomsSelected
    }
}
export default connect(mapStateToProps)(withStyles(styles)(EventForm));



