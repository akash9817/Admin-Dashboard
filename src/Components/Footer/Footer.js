import React from 'react'
import classes from './Footer.module.css'

function Footer(){
    return(
        <div className={classes.footer}>
            <div style={{color:'white'}}>
            Copyright © 2019 All rights reserved.
            </div>
        </div>
    )
}

export default Footer