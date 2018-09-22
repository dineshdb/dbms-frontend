import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {connect} from 'react-redux'
import axios from 'axios'
import classNames from 'classnames';
import {Redirect ,Link} from 'react-router-dom'
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'



const columnData = [
    "ID","Event Name","Organizer Name","Organizer Email","Start","End"
];


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        Nutrition
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    rootNew: { 
        margin: theme.spacing.unit*3
    },
    root: {

        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    typo: {
        fontWeight: "lighter",
        marginLeft: "10px",
    },
     button: {
    margin: 3*theme.spacing.unit,
    borderRadius: "0px",

  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
   table: {
    minWidth: 700,
  },
   fullList: {
    width: 'auto',
  },
});

class EventTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            key: 0,
            id:0,
            fireUpdate: false,
            date: "",
            expand: false,
            availableRooms: []
            ,
        };
    }

   
    componentDidMount(){
        let x = localStorage.getItem('DATE')
        this.setState({
            date: x
        })
        console.log("DATE CHOSEN",x)
        axios.post(`http://localhost:8080/findEventsHappeningAtDate`,{date: x},{crossDomain: true})
            .then(response =>{
                console.log("response",response)
                this.setState({
                    events: response.data
                })
            })
    }

   

    handleClick(id){
        localStorage.setItem('ID',id)
        console.log("get",localStorage.getItem('ID'))
        this.setState({
            id: id,
            fireUpdate: true
        })


    }
     toggleDrawer = (side, open) => () => {
            this.setState({
              [side]: open,
    });
}
    render() {
        const {classes} = this.props;
        const {events} = this.state
        let count = 0

        return (

        <div>
            <Typography align= "center" style={{fontWeight: "lighter",fontSize: "40px",marginTop: "4px"}}>Events</Typography>
            <Paper className={classes.root} elevation={2} style={{marginLeft:"20px"}}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                {columnData.map((data)=>{
                                    return (
                                        <TableCell> <Typography
                                            className={classes.typo}
                                        >
                                            {data}
                                        </Typography></TableCell>
                                    )
                                })}

                            </TableRow>
                        </TableHead>
                        <TableBody style={{marginLeft: "50px"}}>
                            {

                                events
                                    .map(n => {

                                        return (

                                            <TableRow
                                                hover
                                                onClick={(event) => {
                                                    this.handleClick(n.eventId)

                                                }


                                                }

                                                tabIndex={-1}
                                                key={n.eventId}



                                                // selected={isSelected}
                                            >

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventId}
                                                    </Typography>

                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventInfo.eventName}
                                                    </Typography>

                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventInfo.organizerName}
                                                    </Typography>

                                                </TableCell>
                                                <TableCell component="th" scope = "row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventInfo.organizerEmail}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell component="th" scope = "row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventInfo.eventStartDate}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell component="th" scope = "row" padding="none">
                                                    <Typography
                                                        className={classes.typo}
                                                    >
                                                        {n.eventInfo.eventEndDate}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                    {
                        this.state.fireUpdate && (

                            <Redirect to = {`/updateEvent/${this.state.id}`} params={{id: this.state.id}} />
                        )
                    }
                </div>
            </Paper>
          
             <Button 
                size = "large" 
                align="center" 
                color = "primary" 
                variant="contained" 
                aria-label="Delete" 
                className={classes.button}
                onClick={()=>{
                     axios.post(`http://localhost:8080/findFreeSlotsAtTime`,{date: this.state.date},{crossDomain: true})
                     .then(response =>{
                    console.log("response",response)
                    this.setState({
                        expand: !this.state.expand,
                        availableRooms: response.data[0].rooms
                    })
                    
            })
                }
            }
                >

            See available rooms
      </Button>

        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
        <Paper className={classes.rootNew}>
        <Menu anchorOrigin = "horizontal:{left}" onClose={()=>{
            this.setState({
                expand: false
            })
        }} open ={this.state.expand} autoWidth={false} width="100%" listStyle={{width: '10%'}} style={{width:'100%'}}>
        {
            
                this.state.availableRooms.map(room=>(

                    <MenuItem onClick={()=>{
                        this.setState({
                            expand: false
                        })
                    }}>{room.roomName}</MenuItem>)
                    )
        
        }
        </Menu>
        </Paper>
       
        </Collapse>
            </div>
        );
    }
}

EventTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state){
    return {
        rooms: state.rooms,
        selectedRooms: state.RoomsSelected
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventTable));