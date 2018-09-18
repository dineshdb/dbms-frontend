
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
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
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import Collapse from '@material-ui/core/Collapse'
import RoomTable from '../rooms/index'
import {UpdateRooms, UpdateSelectedRooms} from "../rooms/action";
import ToolBar from '@material-ui/core/Toolbar'
import Remove from '@material-ui/icons/Delete'
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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
            event: [],
            checkedRooms: [],
            checkedRoomsId: [],
            eventId: 0

        }
    }
    componentDidMount(props){
        let EventId = Number(localStorage.getItem('ID'))
        this.setState({
            eventId: EventId
        })
        axios.get(`/api/showAllEvents`,{crossDomain: true})
            .then(response =>{
                let temp = response.data
                this.setState({
                    event: temp
                })
                let tempEvent = temp.find((event)=> event.eventId === EventId)

                if(tempEvent){
                    const info = tempEvent.eventInfo

                    this.setState({
                        organizerName: info.organizerName,
                        organizerPhone: info.organizerPhone,
                        organizerAddress: info.organizerAddress,
                        organizerEmail: info.organizerEmail,
                        eventName: info.eventName,
                        eventDescription: info.eventDescription,
                        eventDays: info.eventDurationInDays
                    })
                    let tempo1 = []
                    let tempo2 = []
                    let tempo3 = []
                    let tempo4 = []
                    let tempo6 = []
                    info.perDayInfoList.forEach((slot) => {
                        tempo1.push(moment(slot.date))
                        tempo2.push(slot.timeSlotList[0].startingTime)
                        tempo3.push(slot.timeSlotList[0].endingTime)
                        let tempo5 = []
                        let tempo7 = []
                        slot.timeSlotList[0].rooms.forEach((room)=>{
                            tempo5.push(room)
                            tempo7.push(room.roomId)
                        })
                        tempo4.push(tempo5)
                        tempo6.push(tempo7)
                    })
                    this.setState({
                        dates: tempo1,
                        starting: tempo2,
                        ending: tempo3,
                        checkedRooms: tempo4,
                        checkedRoomsId: tempo6
                    })
                }
            })


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
           if(RoomsSelected.rooms[i]){
               for(let j=0;j<RoomsSelected.rooms[i].length;j++){
                   roomsFromReducer.rooms[i].map((room)=>{
                       if (room.roomId === RoomsSelected.rooms[i][j]){
                           newTemp.push(room)
                       }
                   })
               }
           }
            else{
                for(let j=0;j<RoomsSelected.rooms[0].length;j++){
                    roomsFromReducer.rooms[0].map((room)=>{
                        if (room.roomId === RoomsSelected.rooms[0][j]){
                            newTemp.push(room)
                        }
                    })
                }
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
        axios.post(`/api/updateEvent/${this.state.eventId}`,postingData,{crossDomain: true})
            .then(response =>{
                this.setState({
                    fireRedirect: true
                })
            })
    }
    handleDelete(){
        axios.post(`/api/deleteEvent/${this.state.eventId}`,{},{crossDomain: true})
            .then(response =>{
                this.setState({
                    fireRedirect: true
                })
            })
    }



    render(){
        const {classes} = this.props
        return(
            <div style={{marginTop: 40, marginBottom: 40}}>
                <Paper>
                    <Grid container spacing={24}>
                        <Grid item xs="9">
                            <IconButton onClick = {this.handleDelete.bind(this)}
                            color="secondary" 
                            variant = "outlined"
                            style={{margin: "25px"}}
                            >
                               <Remove/>
                            
                            </IconButton>
                        </Grid>
                        <Grid container xs="3">
                            <ToolBar>
                                <Link to = "/">
                                    <Button
                                    variant="outlined"

                                    >
                                        <Typography
                                            className={classes.typoButton}
                                        >
                                            Cancel
                                        </Typography>


                                    </Button>
                                </Link>

                                <Button
                                    variant = "contained"
                                    color="primary"
                                    type="submit"
                                    onClick={this.handleSubmit.bind(this)}

                                >
                                    <Typography
                                        className={classes.typoButton}
                                    >
                                        Update
                                    </Typography>

                                </Button>


                            </ToolBar>
                        </Grid>
                    </Grid>

                </Paper>

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
                                                    value={this.state.organizerName}
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
                                                    value={this.state.organizerEmail}
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
                                                    value={this.state.organizerAddress}
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
                                                    value={this.state.organizerPhone}
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
                                                    value={this.state.eventName}
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
                                                    value={this.state.eventDescription}
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
                                    <ToolBar>
                                        <Grid container spacing="24">
                                            <Grid item xs="1">
                                                <Typography
                                                    className={classes.typo}>
                                                    Days*
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="11">
                                                <TextField
                                                    margin="dense"
                                                    type="text"
                                                    placeholder="Days"
                                                    value={this.state.eventDays}
                                                    onChange={this.handleEventDays.bind(this)}
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

                                                />
                                            </Grid>
                                        </Grid>
                                    </ToolBar>
                                    {
                                        this.state.dates.map((date,key)=>{

                                            return(
                                                <div>
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
                                                                    className={classes.typoButton}
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
                                                                            axios.post(`/api/findRooms`,search,{crossDomain:true})
                                                                                .then((response)=>{
                                                                                    tempRooms=response.data
                                                                                }).then(()=>{

                                                                                    if(this.state.checkedRooms[key]){
                                                                                        this.state.checkedRooms[key].map((room)=>{
                                                                                            tempRooms.push(room)
                                                                                        })
                                                                                        this.props.dispatch(UpdateRooms(key,tempRooms))
                                                                                        this.props.dispatch(UpdateSelectedRooms(key,this.state.checkedRoomsId[key]))

                                                                                    }
                                                                                    else{
                                                                                        this.props.dispatch(UpdateRooms(key,tempRooms))
                                                                                    }
                                                                            })
                                                                            let temp = this.state.open
                                                                            temp[key]=!(this.state.open[key])
                                                                            this.setState({
                                                                                open: temp
                                                                            })

                                                                        }}
                                                                >
                                                                    <Typography
                                                                        className={classes.typo}
                                                                    >
                                                                        Find Rooms
                                                                    </Typography>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </ToolBar>
                                                    {
                                                        this.state.open[key] && <Collapse in = {this.state.open[key]}
                                                        >
                                                            <RoomTable
                                                                Key={key}
                                                            />
                                                        </Collapse>
                                                    }

                                                </div>
                                            )

                                        })

                                    }
                                </Grid>
                                <Grid item xs="3">
                                </Grid>
                            </Grid>

                        </Paper>
                    </Paper>

                    <Grid container spacing={24} style={{marginTop: 10}}>
                        <Grid item xs={9}>
                        </Grid>
                        <Grid item xs={3}>
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
        roomsFromReducer: state.rooms,
        RoomsSelected: state.RoomsSelected
    }
}
export default connect(mapStateToProps)(withStyles(styles)(EventForm));



