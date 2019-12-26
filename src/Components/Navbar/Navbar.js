import React, { Component } from 'react'
import classes from './Navbar.module.css'
import NavItems from './NavItems'
import { connect} from 'react-redux';
import { Link,NavLink } from 'react-router-dom';

class Navbar extends Component{

    state = {
        showReports : false,
        showSettings :false,
        showHamburger:false,
        loggedIn:false
    }

     closeHamburger = (event) => {
        if(!this.list.contains(event.target)){
            this.setState({showHamburger:false}, () => {
                document.removeEventListener('click',this.closeHamburger)})
            }
     }

     openHamburger = (str)=>{
        this.setState({showHamburger:true}, () => {
        document.addEventListener('click',this.closeHamburger)})
     }   
    render(){
    return(
        <div className={classes.navbar}>
            <div className={classes.container}>
               <Link to="/dashboard"><div className={classes.navbrand}><h1>Product Admin</h1></div></Link>
               <div className={classes.navitem}>
                    <NavItems/>
                    </div>    
                {this.props.userLoggedInStatus &&
                        <Link to="/"><div className={classes.login} onClick={this.props.onUserLoggedOut}>Admin, logout</div></Link>
                       }
                <div className={classes.hamburger} onClick={this.openHamburger}>
                    <i className={['fas','fa-bars ','fa-2x',classes.hamicon].join(" ")}></i>
                    {this.state.showHamburger && 
                    <div className={classes.list} ref={(element) => {this.list = element}}>
                        <NavItems />
                        {this.props.userLoggedInStatus &&
                        <NavLink className={classes.navlink} to="/"><div className={classes.item} onClick={this.props.onUserLoggedOut}>Admin, logout</div></NavLink>
                       }
                    </div>}

                    </div>
                    
            </div>
        </div>
    )
}
}

const mapGlobalStateToProps = (globalState) => {
    return{
        userLoggedInStatus : globalState.loggedInStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedOut: () => {dispatch({type:'USER_LOGOUT'})}
    }
}

export default connect(mapGlobalStateToProps,mapDispatchToProps)(Navbar);
