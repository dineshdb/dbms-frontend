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
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {ROOMS} from '../../definitions/index'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    color: "#5b5a42"
  },
  table: {
    minWidth: 700,
  },
});



class Rooms extends React.Component {

    constructor(props){
        super(props)
        this.state={
            initialTimeSlots: [],
            chosenTimeSlots: [],
            description: [],
            total: 0,
            costs: []
        }
    }
    componentDidMount(){
      /*
        Fetch get method to get the information of the rooms of that particular day
        axios.get()
       */
      const fetchedData = {
        /*
          availability of the rooms for each timeslot
        */
        timeSlots: [
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
          [false,false,true,false,true],
        ],
        costs: [
          "10000",
          "15000",
          "15000",
          "5000",
          "5000",
        ],
        category: [
          "Computer Lab",
          "Seminar Hall",
          "Class",
          "Class",
          "Class"
        ],
        capacity: [
          "50",
          "100",
          "50",
          "50",
          "50"
        ]
      }
      localStorage.setItem('temp',JSON.stringify(fetchedData))
      const temp = []
      const {category,capacity,costs} = fetchedData 
      for(var i=0;i<5;i++){
        const data = "Category :"+category[i]+" Capacity :"+capacity[i]+"\n\n"+"Cost :Rs. "+costs[i]
        temp.push(data)
      }
    
      this.setState({
        initialTimeSlots: fetchedData.timeSlots,
        chosenTimeSlots: fetchedData.timeSlots,
        description: temp,
        costs: costs,
        
      })
       
    }
    handleCheckbox = (i,j) => event => {
      var temp1 = this.state.chosenTimeSlots
      var temp2 = this.state.chosenTimeSlots[i]
      temp2[j] = event.target.checked
      temp1[i] = temp2
      if (temp2[j] === true){
        const cost = Number(this.state.costs[j])
        this.setState({
          total: this.state.total+cost
        })
      }
      this.setState({
        chosenTimeSlots: temp1
      })
      console.log("New checked",temp1)
    }
    handleSave(){
      const {chosenTimeSlots,total} = this.state
      var initial = JSON.parse(localStorage.getItem('temp'))
      initial = initial.timeSlots
      const temp1 = []
      for(var i=0;i<8;i++){
        var temp2 = []
        for(var j=0;j<5;j++){
          if(chosenTimeSlots[i][j] === initial[i][j]){
            temp2.push(false)
          }
          else{
            temp2.push(true)
          }
        }
        temp1.push(temp2)
      }
      localStorage.removeItem('temp')
    console.log(temp1)
    localStorage.setItem(ROOMS,JSON.stringify(
      {
        chosenTimeSlots: temp1,
        totalCost: total
      }
    ))

    }
  

  render(){
    const { classes } = this.props;
    const {chosenTimeSlots,initialTimeSlots} = this.state
    const temp = chosenTimeSlots
    const timeSlots = [
    "9:00 - 10:00 A.M",
    "10:00 - 11:00 A.M",
    "11:00 - 12:00 P.M",
    "12.00 P.M - 1:00 P.M",
    "1.00 P.M - 2:00 P.M",
    "2.00 P.M - 3:00 P.M",
    "3.00 P.M - 4:00 P.M",
    "4.00 P.M - 5:00 P.M"
  ]
        return (
          <div style={{color: "#5b5a42"}}>
            
            <Paper className={classes.root}
            
            >
            <Typography 
              variant="display1"
              >Done</Typography>
            <Checkbox onChange={this.handleSave.bind(this)}>
              
              </Checkbox>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>
                      Rooms/Timeslice
                    </TableCell>
                   {
                     this.state.description.map((x,i) => {
                       return (
                         <TableCell> {x} </TableCell>
                       )
                     })
                   }
                </TableRow>
                </TableHead>
                <TableBody>
                 
                  {temp.map((x,i) => {
                  
                    return (
                    <TableRow>
                      <TableCell>{timeSlots[i]}</TableCell>
                      {x.map((y,j)=>{
                        return(
                          <TableCell><Checkbox checked={temp[i][j]}onChange = {this.handleCheckbox(i,j)} disabled={temp[i][j]}/></TableCell>
                        )
                      })}
                      </TableRow>

                  )
                  })}

               </TableBody>
               </Table>
               <Typography
                variant="display1"
                >
                Total: <t/>Rs. 
                 {this.state.total}
                 </Typography>
            </Paper>
            </div>
        );
    }
}

Rooms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rooms);