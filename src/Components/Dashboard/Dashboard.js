import React, { Component } from 'react'
import classes from './Dashboard.module.css';
import {Line, HorizontalBar, Pie} from 'react-chartjs-2';
import Notifications from './Notification/Notifications'
import OrderList from './Order/OrderList'

class Dashboard extends Component{

    state= {
        latestHits:{},
        performance:{},
        storage:{},
        notifications:[],
        orders:[]
    }

    componentDidMount(){
        var data = JSON.parse(localStorage.getItem('dashboardPage'))
       
        this.setState({latestHits:data.latestHits,
                    performance:data.performance,
                    storage:data.storage,
                    notifications:data.notifications,
                    orders:data.orders})
    }
    render(){
        var latestHits = this.state.latestHits
        var performance = this.state.performance
        var storage = this.state.storage

        var latestTemp = {
            labels:latestHits.months,
            datasets:[
                {
                    label:'Latest Hits',
                    borderColor:'rgba(0,255,0,0.75)',
                    data:latestHits.latest,
                    fill:false,
                    pointRadius:0
                },
                {
                    label:'Popular Hits',
                    borderColor:'rgba(0,0,255,0.75)',
                    data:latestHits.popular,
                    fill:false,
                    pointRadius:0
                },
                {
                    label:'Featured',
                    borderColor:'rgba(255,0,0.75)',
                    data:latestHits.featured,
                    fill:false,
                    pointRadius:0
                },
            ]
        }
        var performanceTemp = {
            labels:Object.keys(performance),
            datasets:[
                        {
                            label:'# of Hits',
                            backgroundColor: [...Object.keys(performance)],
                            data:Object.values(performance),
                            barThickness:'8'
                         }
                    ]
        } 
        var storageTemp = {
            labels:Object.keys(storage),
            datasets:[
                {   
                    backgroundColor:['red','green','blue'],
                    data:Object.values(storage)
                }
            ]

        }
        var defaultOptions = {
            responsive:true,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                    },
                }],
              xAxes: [{
                    ticks: {
                        fontColor: 'white'
                    },
                }]
            } 
        }
    return(
        <div>
            <div className={classes.container}>
               <div style={{color:'white',marginBottom:'1.5rem'}}>welcome back, <b>Admin</b></div>
                <div className={classes.charts}>
                   <div className={classes.item}> 
                   <h2>Latest Hits</h2>
                    <Line
                    options={defaultOptions}
                    data = {latestTemp}/>
                    </div>

                    <div className={classes.item}> 
                    <h2>Performance</h2>
                    <HorizontalBar
                    options={defaultOptions}
                    data = {performanceTemp}/>
                    </div>

                    <div className={classes.item}> 
                    <h2>Storage Information</h2>
                    <Pie
                    options={{...defaultOptions,
                        scales:{
                            xAxes:[{
                                display:false
                            }]
                        }
                    }}
                    data = {storageTemp}/>
                    </div>

                    <div className={classes.item}> 
                    <h2>Notification List</h2>
                        <Notifications notifications={this.state.notifications}/>
                    </div>
                </div>
            </div>

            <div className={classes.ordertable}>
                <OrderList orders={this.state.orders}/>
            </div>
            </div>

    )
}
}

export default Dashboard;