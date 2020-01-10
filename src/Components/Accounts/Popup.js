import React from 'react'
import classes from './Popup.module.css';

function Popup (){
    return(
        <React.Fragment>
        <div className={classes.back}></div>
        <div className={classes.pop}>
             <i className="far fa-check-circle fa-3x"></i>
            <h3>Information updated Successfully</h3>
        </div>
        </React.Fragment>
    )
}

export default Popup
