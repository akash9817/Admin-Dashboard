import React, { Component } from 'react';
import classes from './Login.module.css';
import {connect} from 'react-redux'
import Tooltip from './Tooltip'

class Login extends Component{
    state={
        username:'',
        password:'',
        usernameValid: false,
        passwordValid: false,
        userError:true,
        passError:true,
        formValid: false,
        touched:{
            username:false,
            password:false
        }
    }

    handleChange = (e) => {
        e.persist()
        const {name,value} = e.target
        this.setState({[name]:value},
            () => {
                    this.validateField(e)
            })
    }

    validateField(e) {

        const {name,value} = e.target
        if(value.length === 0){
            return
        }
        let usernameValid = this.state.usernameValid;
         let passwordValid = this.state.passwordValid;
      
         let touched = {...this.state.touched}
        switch(name) {
          case 'username':
           
            // if(!/^[a-z-_+]{4,}$/.test(value)){
            //     usernameValid = false
                
            // }
            //     else{
            //         //this.setState({usernameValid:true})
            //         usernameValid = true
            //     }
                !/^[a-z-_+]{4,}$/.test(value) ? usernameValid = false : usernameValid = true
            break;
          case 'password':
                // if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)){
                //         //this.setState({passwordValid:false})
                //         passwordValid = false
                // }
                // else{
                //     //this.setState({passwordValid:true})
                //     passwordValid = true
                // }
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
                ?
                passwordValid = false
                :
                passwordValid = true   
                break;
      }
      this.setState({
          usernameValid,
          passwordValid,
          touched,
      },() => {
          this.validateForm()
          if(touched[name]){
          this.showError(e)}})
      
    }

    showError = (e) => {

        const {name,value} = e.target
        let userError = this.state.userError
        let passError = this.state.passError
        let touched = {...this.state.touched}
        if(value.length == 0 ){
            return null
        }
      switch(name){
          case'username':
          if(!this.state.usernameValid){
            userError = false
            touched[name] = true
        }else{
            userError = true
        }
        break;
        case'password':
        if(!this.state.passwordValid){
            passError = false
            touched[name] = true
        }
        else{
            passError = true
        }
        break;

      }  
   // }
        this.setState({
            userError,
            passError,
            touched
        })
    }

      validateForm() {
        if(this.state.usernameValid && this.state.passwordValid){
            this.setState({formValid:true})
        }else{
            this.setState({formValid:false})
        }
      }

    submit = (e) => {
        
        e.preventDefault()
        this.props.onUserLoggedIn()
        this.props.history.push('/dashboard')
    }
   render(){ 
    return(
        <div className={classes.main}>
            <div className={classes.formbox}>
                <h2 className={classes.heading}>Welcome to Dashboard, Login</h2>
                <form className={classes.form} onSubmit={this.submit}>
                    <label>Username</label>
                    <input type="text"
                     name="username"
                      onChange={(e) => this.handleChange(e)} 
                      onBlur={(e) => this.showError(e)} 
                      required/>
                   {this.state.userError ? null :<Tooltip type='USERNAME'/>} 
                   {/* {!this.state.usernameValid? <Tooltip type="USERNAME"/> : null } */}
                    <label>Password</label>
                    <input type="text"
                     name="password" 
                     onChange={(e) => this.handleChange(e)}
                      onBlur={this.showError} 
                      required/>
                    {this.state.passError?null : <Tooltip type='PASSWORD'/>}
                    <br/>
                    <button type="submit" disabled={!this.state.formValid}>Login</button>
                    <button>Forgot your Password</button>
                </form>
            </div>
        </div>
    )
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedIn: () => {dispatch({type:'USER_LOGIN'})}
    }
}

export default connect(null,mapDispatchToProps)(Login)