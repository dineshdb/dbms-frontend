import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {USER_TOKEN} from '../../definitions/index'
import {Redirect } from 'react-router-dom'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
                userName: "",
                userPassword: "",
                userNameLabel: "",
                userPasswordLabel: "",
                userNameValid: true,
                userPasswordValid: true,
                submitValid: false,
                userId: "",
                userOnline: false,
                fireRedirect: false,
                loginFailed: false

            
        }
    }
    
        handleUserName(event){
           
            this.setState({
                userName: event.target.value
            })
           
        }
        handleUserPassword(event){
            this.setState({
                userPassword: event.target.value
            })
           
           
        }

        validateUserName(){
            const {userName} = this.state
            if(userName.length > 0){
                this.setState({
                    userNameValid: true,
                    userNameLabel: "Username"
                })
            }
            else{
                this.setState({
                    userNameValid: false,
                    userNameLabel: "Invalid"
                })
            }
        }
        validateUserPassword(){
            const {userPassword} = this.state
            if(userPassword.length > 0){
                this.setState({
                    userPasswordValid: true,
                    userPasswordLabel: "Password"
                })
            }
            else{
                this.setState({
                    userPasswordValid: false,
                    userPasswordLabel: "Invalid"
                })
            }
        }
       
        validateSubmit(){
            const {userNameValid,userPasswordValid} = this.state
           this.setState({
               submitValid: (userNameValid && userPasswordValid)
           })
            
             
        }

        handleSubmit(event){
           
            event.preventDefault()
            const postingData = {
                userName: this.state.userName,
                userPassword: this.state.userPassword
            }
            axios.post(`http://localhost:8080/login` 
            ,(postingData),
            {crossDomain: true})
            .then(response => {
                if(response.data != ""){
                localStorage.setItem(USER_TOKEN,JSON.stringify({
                    isOnline: true,
                    id: response.data.userId,
                    userName: response.data.userName,
                    userPassword: response.data.userPassword,
                    userRole: response.data.userRole
                }))
                this.setState({
                    loginFailed: false
                })
             }
             else{
                this.setState({
                    loginFailed: true
                })
             }
             
             })
            .catch(err => {
                console.log("Error")
                this.setState({
                    userOnline: false
                })
                throw err
            })
            if(localStorage.getItem(USER_TOKEN)){
                this.handleRedirect()
            }
        }
        handleRedirect()
        {
            this.setState({
                fireRedirect: true
            })
        }

        render(){
            const {classes} = this.props
            return(
                <div style={{marginTop: 40, marginBottom: 40}}>
                    <Grid container spacing = {24}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={5}>
                    <Paper className = {classes.root} elevation={6} square>
                    <Typography
                        variant = "headline" component = "h3">
                        Login
                        </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)} >
                    <div>
                    <TextField
                            name="UserName"
                            margin="dense"
                            id="UserName"
                            type="text"
                            error={!this.state.userNameValid}
                            placeholder="Username"
                            label= {this.state.userNameLabel}
                            onChange={this.handleUserName.bind(this)}
                            onBlur = {this.validateUserName.bind(this)}
                            
                            fullWidth
                        />
                    </div>
                    <div>
                    <TextField
                            error={!this.state.userPasswordValid}
                            margin="dense"
                            id="Password"
                            type="password"
                            placeholder="Password"
                            label={this.state.userPasswordLabel}
                            onChange={this.handleUserPassword.bind(this)}
                            onBlur = {this.validateUserPassword.bind(this)}
                            fullWidth
                          
                        />
                    </div>    
                    <Grid container spacing={24} style={{marginTop: 10}}
                        >
                        <Grid item xs={9}>
                        </Grid>
                        <Button 
                        disabled = {!this.validateSubmit.bind(this)}
                        variant = "contained" 
                        type="submit" 
                        color="inherit" 
                        style = {{marginBottom: 15,marginTop: 5}}
        
                        >
                        Login
                        
                        </Button>
                       

                    </Grid>
                
                    </form> 
                    </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    </Grid>  
                
                {this.state.fireRedirect && (
                    <Redirect to = "/" />
                )}
                {this.state.loginFailed && (
                    <Redirect to = "/error" />
                )}
                </div>

            )
        }
    
}
LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state){
    return {
        newUsers: state.newUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(LoginForm));