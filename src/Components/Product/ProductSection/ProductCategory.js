import React from 'react'
import classes from './ProductList.module.css'
import {connect} from 'react-redux';

function ProductCategory(props){
 
    var productListCategory =  props.categories

    var  remove = (index) => {
        var temp = productListCategory.slice();
        var changed = temp.filter((i,pos) => pos !== index)

        var data = JSON.parse(localStorage.getItem('productsPage'))
        data.categories = changed
        localStorage.setItem('productsPage',JSON.stringify(data))
        props.deleteCategory(changed)
        }   

    var row = productListCategory.map((i,pos) => {
                    return (
                        <tr key={i + pos} className={classes.trow}>
                            <td>{i}</td>
                            <td onClick={() => remove(pos)}><i className="far fa-trash-alt"></i></td>
                        </tr>
                    )
                })
       
    return(
        <div>
            <h2 className={classes.title}>Product Category</h2>
           <div className={classes.tablecontainer}> 
            <table className={classes.table}>
                <tbody>
                    {row}
                </tbody>
            </table>
            </div>  
            <button className={classes.btn} onClick={props.modal}>ADD NEW CATEGORY</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCategory: (data) => {dispatch({type:'DELETE_CATEGORY',val:data})}
    }

}

export default connect(null, mapDispatchToProps)(ProductCategory)