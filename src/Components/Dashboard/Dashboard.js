import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
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
        if(localStorage.getItem('accountsPage')){
            var data = JSON.parse(localStorage.getItem('dashboardPage'))
            this.setState({latestHits:data.latestHits,
                        performance:data.performance,
                        storage:data.storage,
                        notifications:data.notifications,
                        orders:data.orders})
            return null
          }
          axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
          .then(res => {
            localStorage.setItem('accountsPage',JSON.stringify(res.data.accountsPage))
            localStorage.setItem('dashboardPage',JSON.stringify(res.data.dasbhoardPage))
            localStorage.setItem('productsPage',JSON.stringify(res.data.productsPage))
            this.props.Started()
            var data = JSON.parse(localStorage.getItem('dashboardPage'))
            this.setState({latestHits:data.latestHits,
                        performance:data.performance,
                        storage:data.storage,
                        notifications:data.notifications,
                        orders:data.orders})
          }).catch(err => {
            console.log(err)
          })
     
    }
    render(){
        var latestHits = this.state.latestHits
        var performance = this.state.performance
        var storage = this.state.storage
        var storageLabel = []
        for (let key in storage){
            if(storage.hasOwnProperty(key)){
              storageLabel.push(`${key} (${storage[key]}GB)`)
            }
         }

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
            labels:storageLabel,
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
                    scaleLabel: {
                        display: true,
                        labelString: 'Hits',
                        fontColor:'white'
                      }
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

const mapDispatchToProps = (dispatch) => {
    return{
        Started : () => {dispatch({type:'STARTED'})}
    }
  }

export default connect(null,mapDispatchToProps)(Dashboard);