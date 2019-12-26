import React, {Fragment, Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Navbar.module.css'

class NavItems extends Component{
    render(){
    return(
       <Fragment> 
        <NavLink to='/dashboard' className={classes.navlink}  activeClassName={classes.active}>
            <div className={classes.item}>
            <i className="fas fa-tachometer-alt"></i>
            <p>Dashboard</p>
            </div>
            </NavLink>
            <NavLink to='/products' className={classes.navlink}  activeClassName={classes.active}>
            <div  className={classes.item}>
            <i className="fas fa-shopping-cart"></i>
            <p>Products</p>
            </div>
            </NavLink>
           <NavLink to="/accounts" className={classes.navlink} activeClassName={classes.active}> 
            <div  className={classes.item}>
            <i className="far fa-user"></i>
            <p>Accounts</p>
            </div>
            </NavLink>
        </Fragment>
    )
}
}

export default NavItems