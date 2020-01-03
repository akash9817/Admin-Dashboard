import React, { Component } from 'react';
import classes from  './NewProduct.module.css'
import {connect} from 'react-redux'

class NewProduct extends Component {

    state = {
        newProduct:[]
    }

    upload = (e) => {
        e.preventDefault();
        //this.uploadImg.click()
        this.uploadImage.click()
    }
    fileValidation = (e) => {
        
        if(this.uploadImage.files[0].size > 1048576){
            alert("File size is larger than 1mb")
            return
        }
        var type = this.uploadImage.files[0].type.substring(6)
        if(type === "png" || "jpeg" || "jpg" || "bmp" || "svg" || "webp"){  
              if(e.target.files && e.target.files[0]){
                  var reader = new FileReader();
                  reader.onload = (e) => {
                      this.changeImg.src= e.target.result
                  }
                  reader.readAsDataURL(e.target.files[0])
              }
        }else{
            alert('File format is incorrect, please select png, jpg, bmp, svg, webp format ')
        }
    }
    addProduct = (e) => {
        e.preventDefault()
        var formData = e.target
        var newProduct = {
            name:formData.name.value,
            unitSold: '',
            stock:formData.stock.value,
            expireDate:formData.expireDate.value
        }
        var data =  JSON.parse(localStorage.getItem('productsPage'))
        data.products.push(newProduct)
        localStorage.setItem('productsPage',JSON.stringify(data))
        this.props.onAddProduct(newProduct)
        this.props.history.push('/products')
    }
     render(){
    return(
       <div className={classes.newproductcon}> 
        <h3 style={{color:'white'}}>Add Product</h3>
        <div className={classes.formcontainer}>
            <div className={classes.formsection}>
                <form className={classes.form} id="newProductForm" onSubmit={this.addProduct}>
                    <label htmlFor="name">Product Name</label>
                    <input id="name" name="name" type="text" required/>
                    <label htmlFor="desc">Description</label>
                    <textarea id="description" rows="7" required/>
                    <label htmlFor="catrgory">Category</label>
                    <select defaultValue={'DEFAULT'} id="category" required>
                        <option value="DEFAULT" disabled>select category</option>
                        <option value="1">New Arrival</option>
                        <option value="2">Most Popular</option>
                        <option value="3">Trending</option>
                    </select>
                    <label>Expire Date</label>
                    <input type="date" name="expireDate" required/>
                    <label>Units in Stock</label>
                    <input type="number" name="stock" required/>
                </form>
            </div>
            <div className={classes.formsection}>
                <div className={classes.image}  onClick={this.upload}>
                <img src="" ref={(ele) => {this.changeImg = ele}} style={{width:'100%',height:'100%'}} alt=""/>
                <span className={classes.avatardelete}>
                        <i className="far fa-trash-alt"></i>
                </span> 
                </div>
                <input type ="file" ref={(ele) => {this.uploadImage = ele}} onChange={this.fileValidation} style={{display:'none'}}/>
                <button className={classes.addprobtn} onClick={this.upload}>UPLOAD PRODUCT IMAGE</button>
            </div>
        </div>
        <button className={classes.addprobtn} type="submit" form="newProductForm">ADD PRODUCT NOW</button>
        </div>  
    )
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProduct: (item) => {dispatch({type:'ADD_PRODUCT',val:item})}
    }
}

export default connect(null,mapDispatchToProps)(NewProduct)