import React from 'react';
import classes from './Login.module.css';
import {connect} from 'react-redux'

function Login(props){
    var submit = (e) => {
        
        e.preventDefault()
        props.onUserLoggedIn()
        props.history.push('/dashboard')
    }
    return(
        <div className={classes.main}>
            <div className={classes.formbox}>
                <h2 className={classes.heading}>Welcome to Dashboard, Login</h2>
                <form className={classes.form} onSubmit={submit}>
                    <label>Username</label>
                    <input type="text" required/>
                    <label>Password</label>
                    <input type="password" required/>
                    <button type="submit">Login</button>
                    <button>Forgot your Password</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedIn: () => {dispatch({type:'USER_LOGIN'})}
    }
}

export default connect(null,mapDispatchToProps)(Login)