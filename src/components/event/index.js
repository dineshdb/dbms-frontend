
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
          category: [],
          days: 0,
          participants: 0,
          eventNameValid: true,
          categoryValid: true,
          daysValid: true,
          participantsvalid: true,
          eventNameLabel: "Event Name",
          categoryLabel: "Category",
          daysLabel: "Days",
          participantsLabel: "Participant",
          submitValid: false

            
        }
    }
        componentDidMount(){
            
        }
    
        
        handleEventName(event){
           
            this.setState({
                eventName: event.target.value
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
                            id="EventName"
                            type="text"
                            
                            placeholder="EventName"
                            
                            
                            
                            fullWidth
                        />
                    </div>
                   
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



