import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
 
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment(),
      dates: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      date: date
    });
  }
 
  render() {
      var dateComponents = []
      for(var i=0;i< this.props.days;i++){
          dateComponents.push((
              <DatePicker
              selected={this.state.date}
              showTimeSelect
              dateFormat="LLL" />))
      }

    return 
        <div>
            {dateComponents.map((date) => date)}
            </div>
    
    
  }
}
export default Calendar;