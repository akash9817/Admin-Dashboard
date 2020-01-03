import React, {Component} from 'react'
import classes from './ProductList.module.css'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';

var removePos = []
class ProductList extends Component{

     state ={
        productListData:this.props.products 
     }
     handleChange = (position) => {
    removePos.push(position)
     }
    deleteProduct = () => {

        var temp = this.state.productListData.slice()
        var changed = temp.filter((i,pos) => {
            if(removePos.includes(pos)){
                return false
            }else{
                return true
            }
            
      })
      
      this.setState({productListData:changed}, () => {
        var data = JSON.parse(localStorage.getItem('productsPage'))
        data.products = changed
        localStorage.setItem('productsPage',JSON.stringify(data))
      })
      this.props.deleteProduct(changed)
      removePos = []
    } 


    dustbin = (pos) => {
        removePos.push(pos)
        this.deleteProduct()
    } 


    render(){
    
    var row = this.state.productListData.map((i,pos) => {
         return(
             <tr key={i.name + pos} className={classes.trow}>
                 <th>
                     <input type="checkbox" onChange={() => this.handleChange(pos)}/>
                 </th>
                    <td>{i.name}</td>
                    <td>{i.unitSold}</td>
                    <td>{i.stock}</td>
                    <td>{i.expireDate}</td>
                    <td onClick={() =>this.dustbin(pos)}><i className="far fa-trash-alt" ></i></td>
             </tr>
         )
     })

    return(
        <div >
           <div className={classes.tablecontainer}> 
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>PRODUCT NAME</th>
                        <th>UNIT SOLD</th>
                        <th>IN STOCK</th>
                        <th>EXPIRE DATE</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
            </div> 
            <Link to="/newproduct"><button className={classes.btn}>ADD NEW PRODUCT</button></Link>
            <button className={classes.btn} onClick={this.deleteProduct}>DELETE SELECTED PRODUCTS</button>
        </div>
    )
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (data) => {dispatch({type:'DELETE_PRODUCT',val:data})}
    }

}

export default connect(null,mapDispatchToProps)(ProductList)