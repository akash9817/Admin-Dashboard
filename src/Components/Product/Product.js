import React,{Component} from 'react';
import classes from './Product.module.css';
import ProductList from './ProductSection/ProductList';
import ProductCategory from './ProductSection/ProductCategory';
import Modal from './Modal/Modal'
import {connect }from 'react-redux';

class Product extends Component{

    state={
        ProductsData:this.props.ProductsData,
        modal:false
    }
    closeModal = () => {
        this.setState(prevState => ({modal:!prevState.modal}))
    }

    render(){
        return(
           <div className={classes.div}> 
             {this.state.modal ? <Modal close={this.closeModal}/>: null} 
                <div className={classes.productmain}>
                <div className={classes.productlist}>
                    <ProductList products={this.state.ProductsData.products}/>
                </div>
                
                <div className={classes.productcategory}>
                    <ProductCategory 
                    modal={this.closeModal} 
                    categories={this.state.ProductsData.categories}
                    />
                </div>
            </div>
            </div>

            
        )
    }

}

const mapGlobalStateToProps = (globalState) => {
    return{
        ProductsData : globalState.productsData
    }
}


export default connect(mapGlobalStateToProps)(Product)