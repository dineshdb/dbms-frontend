import React from 'react'
import {Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import {Redirect} from 'react-router-dom'

class SignUpForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
                userName: "",
                organizerName: "",
                email: "",
                password: "",
                phone: "",
                address:"",
                userNameValid: true,
                organizerNameValid: true,
                emailValid: true,
                passwordValid: true,
                phoneValid: true,
                addressValid: true,
                userNameLabel: "Username",
                organizerNameLabel: "Organizer Name",
                emailLabel: "Email",
                passwordLabel: "Password",
                phoneLabel: "Phone",
                addressLabel: "Address",
                submitValid: false,
                triggerSubmit: false

            
        }
    }
    
        validateSubmit(){
     
            const {userNameValid,organizerNameValid,emailValid,passwordValid,phoneValid,addressValid} = this.state
            return !(userNameValid && organizerNameValid && emailValid && passwordValid && phoneValid && addressValid)
            
             
        }
        handleUserName(event){
           
            this.setState({
                userName: event.target.value
            })
            this.validateUserName()
           
        }
        handleOrganizerName(event){
            this.setState({
                organizerName: event.target.value
            })
            this.validateOrganizerName()
           
        }
        handleEmail(event){
            this.setState({
                email: event.target.value
            })
            this.validateEmail()
           
        }
        handlePassword(event){
            this.setState({
                password: event.target.value
            })
            this.validatePassword()
           
        }
        handlePhone(event){
            this.setState({
                phone: event.target.value
            })
            this.validatePhone()
            
        }
        handleAddress(event){
            this.setState({
                address: event.target.value
            })
            this.validateAddress()
            
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
        validateOrganizerName(){
            const {organizerName} = this.state
            if(organizerName.length > 0){
                this.setState({
                    organizerNameValid: true,
                    organizerNameLabel: "Organizer Name"
                })
            }
            else{
                this.setState({
                    organizerNameValid: false,
                    organizerNameLabel: "Invalid"
                })
            }
        }
        validateEmail(){
            const {email} = this.state
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                this.setState({
                    emailValid: false,
                    emailLabel: "Invalid Email"
                })
            }
            else{
                this.setState({
                    emailValid: true,
                    emailLabel: "Email"
                })
            }
        }
            
        validatePassword(){
            const {password} = this.state
            if(password.length > 7){
                this.setState({
                    passwordValid: true,
                    passwordLabel: "Password"
                })
            }
           
            else{
                this.setState({
                    passwordValid: false,
                    passwordLabel: "Invalid Password"
                })
            }
        }
        validatePhone(){
            const {phone} = this.state
            if(phone.length === 10 ){
                this.setState({
                    phoneValid: true,
                    phoneLabel: "Phone"
                    
                })
            }
            else{
                this.setState({
                    phoneValid: false,
                    phoneLabel: "Invalid Phone No"
                })
            }
        }
        validateAddress(){
            const {address} = this.state
            if(address.length > 0){
                this.setState({
                    addressValid: true,
                    addressLabel: "Address"
                    
                })
            }
            else{
                this.setState({
                    addressValid: false,
                    addressLabel: "Invalid Address"
                })
            }
        }
       
       
        handleSubmit(event){
            event.preventDefault()
            const {userName,organizerName,password,email,phone,address} = this.state
            const signUpObject = {
                userName: userName,
                organizerName: organizerName,
                userPassword: password,
                organizerEmail: email,
                organizerPhone: phone,
                organizerAddress: address
            }
            axios.post('/api/organizers'
            ,(signUpObject),{crossDomain: true})
            .then(response => {
        
            })
            this.setState({
                triggerSubmit: true
            })
            


        }

        render(){
            return(
                <div style={{marginTop: 40}}>
                    <Grid container spacing = {24}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper elevation={6} square>
                    <br/>
                    <Typography 
                        align="center"
                        variant = "display1"
                    >
                    Welcome To ICT 
                    </Typography>
                   
                    <Typography 
                        align="center"
                        variant = "body1"
                        
                    >
                    Create your id to register event 
                    </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)} style={{marginLeft:20,marginRight: 20,marginTop: 20,marginBottom: 20}}>
                    <div>
                    <TextField
                            margin="dense"
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
                            error={!this.state.organizerNameValid}
                            margin="dense"
                            type="text"
                            placeholder="Organizer Name"
                            label={this.state.organizerNameLabel}
                            onChange={this.handleOrganizerName.bind(this)}
                            onBlur = {this.validateOrganizerName.bind(this)}
                            fullWidth
                          
                        />
                         </div>
                        <div>
                    <TextField
                            error={!this.state.emailValid}
                            margin="dense"
                            id="email"
                            type="email"
                            placeholder="Email"
                            label={this.state.emailLabel}
                            onChange={this.handleEmail.bind(this)}
                            onBlur ={this.validateEmail.bind(this)}
                            
                            fullWidth
                        />
                         </div>
                        <div>
                    <TextField
                        error={!this.state.passwordValid}
                           name="password"
                           margin="dense"
                           id="password"
                           type="password"
                          
                           placeholder="Password"
                           label= {this.state.passwordLabel}
                           onChange={this.handlePassword.bind(this)}
                           onBlur = {this.validatePassword.bind(this)}
                           
                           fullWidth
                        />
                         </div>
                        <div>
                     <TextField
                            error={!this.state.phoneValid}
                            name="phone"
                            margin="dense"
                            id="phone"
                            type="text"
                            placeholder="Phone"
                            label={this.state.phoneLabel}
                            onChange={this.handlePhone.bind(this)}
                            onBlur= {this.validatePhone.bind(this)}
                            
                            fullWidth
                        />
                         </div>
                        <div>
                         <TextField
                            error={!this.state.addressValid}
                            margin="dense"
                            name="address"
                            id="address"
                            type="text"
                            placeholder="Address"
                            label={this.state.addressLabel}
                            onChange={this.handleAddress.bind(this)}
                            onBlur={this.validateAddress.bind(this)}
                            fullWidth
                        />
                         </div>
                    
                    <Grid container spacing={24} style={{marginTop: 10}}
                        >
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs = {3}>
                        <Link to = "/">
                            <Button>
                                Cancel
                                </Button>
                        </Link>
                        </Grid>
                        <Button
                        disabled = {this.validateSubmit()}
                        variant = "contained" 
                        type="submit" 
                        color="inherit" 
                        style = {{marginBottom: 15,marginTop: 5}}
        
                        >
                        Submit
                        </Button>

                    </Grid>
                
                    </form> 
                    </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    </Grid>  
                    {
                        this.state.triggerSubmit && <Redirect to = "/login" />
                    }
                </div>

            )
        }
    
}
function mapStateToProps(state){
    return {
        newUsers: state.newUsers
    }
}
export default connect(mapStateToProps)(SignUpForm);