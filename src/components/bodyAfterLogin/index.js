import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventForm from '../event/index';
import {Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {STYLES} from '../../definitions/index'

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            createEventButton: false

        }

    }
    handleNewEvent(){
        this.setState({
            createEventButton: true
        })
    }
    render(){
        const {classes} = this.props
        if(!this.state.createEventButton){
            return (
                    <div>
                    <Link to = "/newEvent">
                        <Button 
                        variant = "contained" 
                        size = "large" 
                        className = {classes.button} 
                        onClick = {this.handleNewEvent.bind(this)}
                        >
                        Create New Event
                    </Button>
                    </Link>
                   

                </div>
                
                
            )
        }
        else{
            return (
                <EventForm/>
            )
        }
    }

}
Body.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(STYLES)(Body);