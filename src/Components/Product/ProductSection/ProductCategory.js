import React, { Component } from 'react'
import classes from './ProductList.module.css'
class ProductCategory extends Component{

    state ={
        productListCategory:this.props.categories
     }

     remove = (index) => {
         var temp = this.state.productListCategory.slice();
        var changed = temp.filter((i,pos) => pos !== index)
      this.setState({productListCategory:changed})

     }

    render(){
        var row = this.state.productListCategory.map((i,pos) => {
            return (
                <tr key={pos} className={classes.trow}>
                    <td>{i}</td>
                    <td onClick={() => this.remove(pos)}><i className="far fa-trash-alt"></i></td>
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
            <button className={classes.btn} onClick={this.props.modal}>ADD NEW CATEGORY</button>
        </div>
    )
}
}

export default ProductCategory