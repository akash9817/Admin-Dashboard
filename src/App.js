import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import axios from 'axios'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer'
import Dashboard from './Components/Dashboard/Dashboard';
import Product from './Components/Product/Product';
import NewProduct from './Components/Product/NewProduct/NewProduct'
import Accounts from './Components/Accounts/Accounts';

class App extends Component {

  // componentDidMount(){
  //   if(localStorage.getItem('accountsPage')){
  //     return
  //   }
  //   axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
  //   .then(res => {
  //     localStorage.setItem('accountsPage',JSON.stringify(res.data.accountsPage))
  //     localStorage.setItem('dashboardPage',JSON.stringify(res.data.dasbhoardPage))
  //     localStorage.setItem('productsPage',JSON.stringify(res.data.productsPage))
  //     this.props.Started()
  //     console.log(res.data.dasbhoardPage)
  //   }).catch(err => {
  //     console.log(err)
  //   })
   
  // }

  

  
  render(){
  //   window.onbeforeunload = function() {
  //     localStorage.clear();
  //  }
    console.log(this.props.all)
  return (
    <div className="App">
        <Navbar/>
        <div className="main">
          <div className="container">
            <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/dashboard" render={props => this.props.userLoggedInStatus ?<Dashboard {...props}/> : <Redirect to={"/"}/> }/>
            <Route path="/products" render={props => this.props.userLoggedInStatus ? <Product {...props}/> : <Redirect to={"/"}/> }/>
            <Route path="/newproduct" component={NewProduct}/>
            <Route path="/accounts" render={props => this.props.userLoggedInStatus ? <Accounts {...props}/> : <Redirect to={"/"}/> }/>
            </Switch>
         </div>
        </div>
        <Footer/>
    </div> 
  );
 }


}

const mapGlobalStateToProps = (globalState) => {
  return{
      all : globalState,
      userLoggedInStatus : globalState.loggedInStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      Started : () => {dispatch({type:'STARTED'})}
  }
}


export default connect(mapGlobalStateToProps,mapDispatchToProps)(App);
