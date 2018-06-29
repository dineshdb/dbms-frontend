import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'
export default class Error extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            home: false
        }
    }
    handleHome(){
        this.setState({
            home: true
        })
    }
    render(){
        return (
            <div>
                <Typography
                    
                    >
                    <h1>
                    Error !!! Login Failed
                    </h1>
                    </Typography>
                    <Button color = "inherit" onClick = {this.handleHome.bind(this)}>
                        Home
                    </Button>
                    { this.state.home && (
                    <Redirect to = "/" />)}
                        
             </div>
        )
    }
}