import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
import {UpdateSelectedRooms} from './action'




const columnData = [
  "Check","ID","Name","Capacity","Floor","Category","CostPerDay","CostPerHour","CostPerUnit"
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
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    typo: {
        fontWeight: "lighter"
    }
});

class RoomTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            data: [],
            key: 0
            ,
        };
    }
    componentWillReceiveProps(){
        const {rooms,Key,selectedRooms} = this.props
        const render = selectedRooms.roomsSelected[Key]
        if(render){
         this.setState({
             selected: render
         })
        }
        this.setState({
            data: rooms.rooms[Key],
            key: Key
        })
    }
    renderInitial = (id) => {
            const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
}
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.props.dispatch(UpdateSelectedRooms(this.state.key,newSelected))
        this.setState({ selected: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes,Key,rooms} = this.props;
        const {data} = this.state

        return (
            <Paper className={classes.root} elevation={2}>
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
                        <TableBody>
                            {

                                data
                                .map(n => {
                                    const isSelected = this.isSelected(n.roomId);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.roomId)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.roomId}
                                                </Typography>

                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.roomName}
                                                </Typography>

                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.roomCapacity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.roomFloor}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.roomCategory}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.costPerDay}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.costPerHour}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope = "row" padding="none">
                                                <Typography
                                                    className={classes.typo}
                                                >
                                                    {n.costPerUnit}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

RoomTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state){
    return {
        rooms: state.rooms,
        selectedRooms: state.RoomsSelected
    }
}

export default connect(mapStateToProps)(withStyles(styles)(RoomTable));