import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function user(name,org_name,email,phone,address){
    return {
        userName: name,
        organizerName: org_name,
        email: email,
        phone: phone,
        address: address
    }
}
const organizers = [
    user('rupesh','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh1','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh2','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh3','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh4','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh5','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh6','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh7','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh8','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh9','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh10','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh11','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh12','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh13','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh14','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh15','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh16','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh17','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh18','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh19','rupesh','rupes@gmail.com','12345','ktm'),
    user('rupesh20','rupesh','rupes@gmail.com','12345','ktm')

]

class Organizers extends React.Component {

    constructor(props){
        super(props)
        this.state={
            users: []
        }
    }
    componentDidMount(){
       const temp = []
       for(var i=0;i<5;i++){
           temp.push(organizers[i])
       }
       this.setState({
           users: temp
       })
    }
    fetchData(index){
        index = Number(index)
        const temp = []
        
       for(var i=5*index;i<5*(index+1);i++){
           temp.push(organizers[i])
         
       }
       this.setState({
           users: temp
       })
    }

  

  render(){
    const { classes } = this.props;
    const {users} = this.state
        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell >Organizer Name</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Phone</TableCell>
                    <TableCell >Address</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((n,i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {n.userName}
                        </TableCell>
                        <TableCell >{n.organizerName}</TableCell>
                        <TableCell >{n.email}</TableCell>
                        <TableCell >{n.phone}</TableCell>
                        <TableCell >{n.address}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
             {/* <Button onClick = {this.fetchData(1)}>
            Next
            </Button>  */}
            </Paper>
        );
    }
}

Organizers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Organizers);