
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect } from 'react-router-dom'
import Calendar from '../calendar/index'
import MultipleDatePicker from 'react-multiple-datepicker'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class EventForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
          eventName: "",
          eventDescription: "",
          dates: [],
          participants: "",
          submit: false,
          fireCalendar: false
        }
    }
        
        handleEventName(event){
           
            this.setState({
                eventName: event.target.value
            })
            console.log(this.state.dates,"dates")
        }
        handleEventDescription(event){
           
            this.setState({
                eventDescription: event.target.value
            }) 
        }
       
        handleDates(){

        }
        handleParticipants(event){
           
            this.setState({
                participants: event.target.value
            }) 
        }
        
        
  
           

      
        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40}}>
                    <Grid container spacing = {24}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={5}>
                    <Paper className = {classes.root} elevation={6} square>
                    <Typography
                        variant = "headline" component = "h3">
                        Create Event
                        </Typography>
                    <form  >
                    <div>
                    <TextField
                            name="EventName"
                            margin="dense"
                            type="text"
                            placeholder="EventName"
                            onChange={this.handleEventName.bind(this)}
                            fullWidth
                        />
                    </div>
                    <div>
                    <TextField
                            name="Event Description"
                            margin="dense"
                            type="text"
                            placeholder="Description"
                            onChange={this.handleEventDescription.bind(this)}
                            fullWidth
                        />
                    </div>
                
                    <MultipleDatePicker
                        onSubmit={dates => console.log("selected dates",dates)}
                    />
                   
                    </form> 
                    </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    </Grid>  
                
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



