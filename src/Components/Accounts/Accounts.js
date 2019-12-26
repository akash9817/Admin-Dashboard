import React, { Component } from 'react'
import classes from './Accounts.module.css'
import {connect} from 'react-redux';


class Accounts extends Component{

    state={
        accountsData:this.props.accountsData,
        currentProfile:'',
        currentData: {}
    }

    accounts = (e) => {
        var selectedOption =  e.target.options[e.target.selectedIndex].value;
        var accountsData = this.state.accountsData
        this.setState({
            currentData:accountsData[selectedOption],
            currentProfile:selectedOption})
    }
    upload = (e) => {
        e.preventDefault();
        //this.uploadImg.click()
        this.uploadImage.click()
    }

    changeImage = () => {
        this.changeImg.src= ""
    }

    newImage = () => {
        console.log(this.uploadImage.files[0])
        console.log(URL.createObjectURL(this.uploadImage.files[0]))
    }

    handleChange = (e) => {
        var temp = this.state.currentData
        temp[e.target.name] = e.target.value
        this.setState({
            currentData:temp
        })
    }

    updateProfile = (e) => {
        e.preventDefault()
        var tempCurrent = this.state.currentData
        var arr = [this.state.currentProfile,tempCurrent]
        this.props.newData(arr)
        alert("Information Updated Successfully!")
    }

    render(){
        var currentData = this.state.currentData
        return(
           <React.Fragment> 
            <div className={classes.accounts}>
                <h2 >List of Accounts</h2>
                <p>Accounts</p>
                <select defaultValue={'DEFAULT'} onChange={this.accounts}>
                    <option value="DEFAULT" disabled >Select account</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Merchant">Merchant</option>
                    <option value="Customer">Customer</option>
               </select>
            </div>
            <div className={classes.details}>
                <div className={classes.left}>
                    <h3 style={{color:'white'}}>Change Avatar</h3>
                    <div className={classes.image} onClick={this.changeImage}>
                    <img src={currentData.profilePic} ref={(ele) => {this.changeImg = ele}} style={{width:'100%',height:'100%'}} alt=""/>
                    <span className={classes.avatardelete}>
                        <i className="far fa-trash-alt"></i>
                    </span> 
                    </div>
                    <input type ="file" ref={(ele) => {this.uploadImage = ele}} onChange={this.newImage} style={{display:'none'}}/>
                    <button className={classes.btn} style={{width:'100%'}} onClick={this.upload}>UPLOAD NEW PHOTO</button>
                </div>
                <div className={classes.right}>
                    <h3 style={{color:'white'}}>Account Settings</h3>
                    <form className={classes.form} onSubmit={this.updateProfile}>
                        <label htmlFor="name">
                            <div>Account Name</div>
                            <input type="text" name="name" value={currentData.name || ''} onChange={this.handleChange}/>
                        </label>
                        <label htmlFor="email">
                           <div>Account Email</div>
                        <input  type="text" name="email" value={currentData.email || ''} onChange={this.handleChange}/>
                        </label>
                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" value={currentData.password || ''} onChange={this.handleChange} />
                        </label>
                        
                        <label htmlFor="password">
                            Re-enter Password
                            <input type="password" name="password" value={currentData.password || ''} onChange={this.handleChange}/>
                         </label>
                        
                        <label htmlFor="name">
                            Phone
                            <input type="text" name="phone" value={currentData.phone || ''} onChange={this.handleChange}/>
                        </label>
                       <label> 
                           <div>&nbsp;</div>
                        <button className={classes.btn} type="submit">UPDATE YOUR PROFILE</button>
                        </label>
                    </form>
                    <div> 
                    <button className={classes.btn} style={{width:'100%'}}>DELETE YOUR ACCOUNT</button>
                    </div>
                </div>
            </div>
            </React.Fragment> 
        )
    }
}

const mapGlobalStateToProps = (globalState) => {
    return{
        accountsData : globalState.accountsData
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        newData : (item) => {dispatch({type:'UPDATE_PROFILE',val:item})}
    }
}

export default connect(mapGlobalStateToProps,mapDispatchToProps)(Accounts)