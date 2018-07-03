import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
import axios from 'axios'
import {Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    color: "#b4ce84"
  },
  table: {
    minWidth: 700,
  },
});

// function event(eventName,name,org_name,email,startDate,endDate,duration,status){
//     return {
//         eventName: eventName,
//         userName: name,
//         organizerName: org_name,
//         email: email,
//         status: status,
//         duration: duration,
//         endDate: endDate,
//         startDate: startDate
//     }
// }
// const events = [
//     event('EXAM HEllo world','rupesh','rupesh','rupes@gmail.com',"2018/06/24","2018/06/29","5",false),
//     event('EXAM','rupesh','rupesh','rupes@gmail.com',"2018/06/24","2018/06/29","5",false),
//     event('EXAM','rupesh','rupesh','rupes@gmail.com',"2018/06/24","2018/06/29","5",false),
    
// ]

class Events extends React.Component {

    constructor(props){
        super(props)
        this.state={
            events: [],
            refresh: false
        }
    }
    componentDidMount(){

        this.setState({
            refresh: false
        })
        axios.get('http://localhost:8080/events',{crossDomain:true})
        .then(response => {
            this.setState({
                events: response.data
            })
        }

        )
    }
    handleApprove = (id) => {
        axios.put(`http://localhost:8080/events/$(id)`,{crossDomain: true})
        this.setState({
            Redirect: true
        })
    }
    handleDecline = (id) => {
        axios.put('http://localhost:8080/events/id',{crossDomain: true})
        this.setState({
            Redirect: true
        })
    }

  

  render(){
    const { classes } = this.props;
    const {events} = this.state
        return (
            <div style={{marginLeft: "20px",marginRight: "20px"}}>
            <Paper className={classes.root}>
            <Typography
                        align="center"
                        variant="display3"
                        >
                        Events
                        </Typography>
            <Table className={classes.table}>
              
                <TableHead >
                <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell >Organizer's Username</TableCell>
                    <TableCell >Organizer's Email</TableCell>
                    <TableCell >StartDate</TableCell>
                    <TableCell >EndDate</TableCell>
                    <TableCell >Duration(days)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {events.map((n,i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell>{n.eventName}</TableCell>
                       {(n.accepted == true) && (
                            <TableCell></TableCell>
                        )}
                        {(n.accepted ==  false) && (
                            <TableCell>
                                <Grid container spacing={24}>
                              
                                <Grid item xs={6}>
                                    <IconButton variant="contained" style={{
                                        
                                        }}
                                        onClick={this.handleApprove(n.eventId)}  ><Check/></IconButton>
                                </Grid>
                                
                                <Grid item xs= {6}>
                                    <IconButton variant="contained" color="secondary"  >
                                    <Clear/></IconButton>
                                </Grid>
                              
                                </Grid>
                            </TableCell>
                        )}
                        
                        {(n.accepted == true) && (
                            <TableCell>Approved</TableCell>
                        )}
                        {(n.accepted == false) && (
                            <TableCell>Pending</TableCell>
                        )}
                       
                        <TableCell >{n.organizerName}</TableCell>
                        <TableCell >{n.email}</TableCell>
                        <TableCell >{n.startDate}</TableCell>
                        <TableCell >{n.endDate}</TableCell>
                        <TableCell >{n.eventDurationInDays}</TableCell>
                    </TableRow>
                    
                    );
                })}
                <br/>
                <br/>
                <br/>
                </TableBody>
            </Table>
             {/* <Button onClick = {this.fetchData(1)}>
            Next
            </Button>  */}
            </Paper>
            {
                this.state.refresh && (<Redirect to="/" />)
            }
            </div>
        );
    }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);