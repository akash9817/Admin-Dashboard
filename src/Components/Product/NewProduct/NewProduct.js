import React, { Component } from 'react';
import classes from  './NewProduct.module.css'
import {connect} from 'react-redux'

class NewProduct extends Component {

    state = {
        newProduct:[],
        name:'',
        description:''

    }

    handleChange = (e) => {
        const{name,value} = e.target
        if(/^[A-Za-z\d\s]*$/i.test(value)){
        this.setState({[name]:value})
        }else{
            e.preventDefault()
        }
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
       var date =  this.convertDate(formData.expireDate.value)
        var newProduct = {
            name:formData.name.value,
            unitSold: '',
            stock:formData.stock.value,
            expireDate:date,
            unitSold:0
        }
        var data =  JSON.parse(localStorage.getItem('productsPage'))
        data.products.push(newProduct)
        localStorage.setItem('productsPage',JSON.stringify(data))
        this.props.onAddProduct(newProduct)
        this.props.history.push('/products')
    }

    convertDate = (value) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
        const d = new Date(value)
        const month = monthNames[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()
        console.log(`${date} ${month} ${year}`)
        return `${date} ${month} ${year}`
    }

    x = (e) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
            
        const {name,value} = e.target
        const d = new Date(value)
        const month = monthNames[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()
        console.log(`${date} ${month} ${year}`)
        //return `${date} ${month} ${year}`
        // console.log(e.target)
        // console.log(value)
        // console.log(new Date(value).getMonth())
        // console.log(new Date(value).getDate())
        // console.log(new Date(value).getFullYear())
        // console.log(new Date(value).getUTCDay())
        // console.log(new Date(value).getUTCDate())
        // console.log(new Date(value).getUTCMonth())
    }

     render(){
    return(
       <div className={classes.newproductcon}> 
        <h3 style={{color:'white'}}>Add Product</h3>
        <div className={classes.formcontainer}>
            <div className={classes.formsection}>
                <form className={classes.form} id="newProductForm" onSubmit={this.addProduct}>
                    <label htmlFor="name">Product Name</label>
                    <input id="name" 
                    onChange={(e) => this.handleChange(e)}
                     name="name"
                      type="text"
                     value={this.state.name}
                      required/>
                    <label htmlFor="desc">Description</label>
                    <textarea
                     id="desc"
                    name="description"
                    rows="7"
                    value={this.state.description}
                    onChange={(e) => this.handleChange(e)}
                     required/>
                    <label htmlFor="catrgory">Category</label>
                    <select defaultValue={'DEFAULT'} id="category" required>
                        <option value="DEFAULT" disabled>select category</option>
                        <option value="1">New Arrival</option>
                        <option value="2">Most Popular</option>
                        <option value="3">Trending</option>
                    </select>
                    <div className={classes.x}>
                    <div className={classes.field}>    
                    <label>Expire Date
                    </label>
                    <input type="date" name="expireDate" required/>
                    </div>
                    <div className={classes.field}>
                    <label>Units in Stock
                    </label>
                    <input type="number" name="stock" required/>
                    </div>
                    </div>
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