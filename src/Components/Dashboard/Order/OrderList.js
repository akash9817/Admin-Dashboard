import React from 'react'
import classes from './Order.module.css'

function OrderList (props) {

    var data =  props.orders.map((i,pos) => {
        return(
            <tr key={pos} className={classes.trow}>
                <th scope="row"><b>{i.orderNo}</b></th>
                <td>{i.status}</td>
                <td><b>{i.operators}</b></td>
                <td><b>{i.location}</b></td>
                <td><b>{i.distance}</b></td>
                <td>{i.startDate}</td>
                <td>{i.deliveryDate}</td>
            </tr>
        )
    })

    return(
        <div className={classes.order}>
            <h2>Order List</h2>
            <table className={classes.table}>
            <thead>
                <tr>
                    <th scope="col">ORDER NO.</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">OPERATORS</th>
                    <th scope="col">LOCATION</th>
                    <th scope="col">DISTANCE</th>
                    <th scope="col">START DATE</th>
                    <th scope="col">EST DELIVERY DUE</th>
                </tr>
            </thead>
            <tbody className={classes.tbody}>
                {data}
            </tbody>
            </table>
        </div>
    )
}

export default OrderList