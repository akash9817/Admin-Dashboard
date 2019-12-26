import React from 'react';
import classes from './Notification.module.css'

function Notifications (props) {
    var data = props.notifications.map((i,pos) => {
        // var msg = i.message
        // var name = msg.match(/\w+\s/)[0]
        // var people = (msg.match(/\d\s\w+/)
        return (
            <div key={pos} className={classes.item}>
                <div className={classes.image}>
                    <img src={i.pic} alt="Avatar" className={classes.pic}/>
                </div>
                <div className={classes.body}>
                    <p>{i.message}</p>
                    <span className="tm-small tm-text-color-secondary">{i.time}</span>
                </div>
            </div>
        )
    })

    return(
        <div className={classes.notification}>
            {data}
        </div>
    )

}

export default Notifications;
