import React from 'react';
import classes from './Modal.module.css';
import {connect} from 'react-redux';

function Modal(props) {

 var addCategory = (e) => {
        e.preventDefault()
        var formData = e.target
        var newCategory = formData.name.value
        var data =  JSON.parse(localStorage.getItem('productsPage'))
        data.categories.push(newCategory)
        localStorage.setItem('productsPage',JSON.stringify(data))
        props.onAddCategory(newCategory)
        props.close()
    }

    return(
    <div className={classes.modal}>
        
        <form className={classes.form} onSubmit={addCategory}>
            <label htmlFor="name">Product Category <span onClick={props.close} style={{fontSize:'larger',float:'right'}}>&times;</span></label>
            <input name="name" type="text" required/>
            <button className={classes.btn} type="submit" >ADD CATEGORY</button>
        </form>
    </div>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCategory: (item) => {dispatch({type:'ADD_CATEGORY',val:item})}
    }
}
export default  connect(null,mapDispatchToProps)(Modal)