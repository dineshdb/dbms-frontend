import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventForm from '../event/index'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            createEventButton: false
        }
    }
    render(){
        const {classes} = this.props
        if(!this.state.createEventButton){
            return (
                <Button variant = "contained" size = "large" className = {classes.button} >
                    Create New Event
                </Button>
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
  
  export default withStyles(styles)(Body);