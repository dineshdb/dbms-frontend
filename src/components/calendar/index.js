import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {DATES} from '../../definitions/index'
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment(),
      dates: [],
      duration: [],
      chosenDates: []
  
    };
  }
  componentDidMount(){
    var temp = []

  
  }

  handleFinal(){
    console.log("HELLO")
    console.log(this.state.duration)
    const {dates,duration} = this.state
    var temp = []
    dates.map((date,i)=>{
      var date = date.toDate()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var startTime = date.getHours()
      temp.push({
          year: year,
          month: month,
          day: day,
          startTime: startTime,
          endTime: startTime+duration[i]
          
      }
      )
    })
    console.log(temp)
    localStorage.setItem(DATES,JSON.stringify(temp))
  }

  render() {
      var dateComponents = []
      for(var i=0;i< this.props.days;i++){
            
        dateComponents.push(i)
      }

      
    
    return <div>
         
          {dateComponents.map((x,i)=> {
            console.log(this.state.dates)
            return <div>
               <Grid container spacing = {24}>
                <Grid item xs={8}>

                  <DatePicker
                      style = {{marginTop: "50"}}
                      selected={this.state.dates[i]}
                      onChange={(date)=>{
                       var temp = this.state.dates
                       temp[i] = date
                       this.setState({
                         dates: temp
                       })

                     }}
                      showTimeSelect
                      
                      timeFormat="HH:mm"
                      dateFormat="LLL"
                      timeIntervals={60}
                      timeCaption="time"
                      placeholderText="Select date and time"
                  />  
                  </Grid>
                  <Grid item xs = {4}>
                  <TextField
                      fullWidth
                      onChange = {
                        (event)=>{
                          var temp = this.state.duration
                          temp[i] = Number(event.target.value)
                          this.setState({
                            duration: temp
                          })
                          
                        }
                      }
                    />
                    </Grid>
                    </Grid>
                    {
                      this.handleFinal()
                    }
             </div>
          })}
      </div>
    
    
  }
}
export default Calendar;