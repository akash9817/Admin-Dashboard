import React from 'react'
import classes from './Tooltip.module.css'

function Tooltip(props){
    var type = props.type
    return(
        type === 'USERNAME' ?
        <div className={classes.tooltip}>
            <ul>
                <li>
                    it should only contain small letters.
                </li>
                <li>it cannot contain numbers and special character.</li>
                <li>it can contain - & _.</li>
                <li>min length should be 4 chars.</li>
            </ul>
        </div>
        :
        <div className={classes.tooltip}>
        <ul>
            <li>
                it should only contain minimun 8 chars.
            </li>
            <li>it should contain at least one number and one letter.</li>
            <li>it should contain at least one special character.</li>
        </ul>
        </div>
    )
}

export default Tooltip