import React from 'react';
import '../App.css';
import proApi from "../actions/productApi.js";
import swal from 'sweetalert';
import axios from 'axios';

const initialState = {
    id: "",
    name: "",
    nameError: "",
    description: "",
    category: "",
    descriptionError: "",
    categoryError: "",
    quantity: "",
    quantityError: "",
    price: "",
    priceError: "",
    discount: "",
    discountError: "",
    confirmButton: "ADD",
    categories: [],
    products: [],
    selectedFile: "",
    image:""
}

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const url = "http://localhost:3500/category";
        fetch(url).then(response => response.json())
        .then(json => this.setState({categories: json}))
        const purl = "http://localhost:3500/product";
        fetch(purl).then(response => response.json())
        .then(json => this.setState({products: json}))
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    onChange(id){
        const url = "http://localhost:3500/product/";
        fetch(url).then(response => response.json())
        .then(json => {
            const pro = json.filter(pro => pro._id===id)
            this.setState({name: pro[0]['name'],category: pro[0]['category'],price: pro[0]['price'],quantity: pro[0]['quantity'],discount: pro[0]['discount'],id: pro[0]['_id'],image: pro[0]['image'],description: pro[0]['description']})
        })
        this.setState({confirmButton:"EDIT"});
    }

    onClear(){
        this.setState(initialState);
        this.componentDidMount();
    }

    onProDelete(id){
        swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                proApi.product().delete(id)
                .then(res =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        }, () => {
            const data = new FormData() 
            data.append('file', this.state.selectedFile)
            axios.post("http://localhost:3500/product/upload", data, { 
            }).then(res => { 
                this.setState({image:res.data.filename})
            })
        })
    }

    SubmitForm = e => {
        e.preventDefault();
        const correctAll = this.validation();
        if(correctAll){
            console.log(this.state);
            proApi.product().fetchAll().then(res => {
                const pro = res.data.filter( product => (product.name===this.state.name&&product.category===this.state.category));
                if(pro.length>0||this.state.id!==""){
                    if(pro.length===0){
                        proApi.product().update(this.state.id,this.state)
                        .then(res => {
                            swal("Success!", "Edit Successful!", "success")
                            this.setState(initialState)
                            this.componentDidMount()
                        } );
                    }else if((this.state.id!==""&&pro[0].name===this.state.name&&this.state.category===pro[0].category)||pro.length===0){
                        proApi.product().update(this.state.id,this.state)
                        .then(res => {
                            swal("Success!", "Edit Successful!", "success")
                            this.setState(initialState)
                            this.componentDidMount()
                        } );
                    } else {
                        swal("Warning!", "Already Exists!", "warning")
                    }
                }else{
                    proApi.product().create(this.state)
                    .then(res => {
                        swal("Success!", "Add Successful!", "success")
                        this.setState(initialState)
                        this.componentDidMount()
                    } );
                }
            });
        }
    }

    validation = () => {
        let nameError = "";
        let priceError = "";
        let discountError = "";
        let categoryError = "";
        let quantityError = "";
        let imageError = "";
        let descriptionError = "";

        if(!this.state.name){
            nameError="Product Name Required!"
        }

        if(!this.state.description){
            descriptionError="Description Required!"
        }

        if(!this.state.image){
            imageError="Image Required!"
        }

        if(!this.state.price){
            priceError="Price Required!"
        }else if(isNaN(this.state.price)){
            priceError = "Use only digits!";
        }

        if(!this.state.discount){
            discountError="Discount Required!"
        }else if(isNaN(this.state.discount)){
            discountError = "Use only digits!";
        }

        if(!this.state.category){
            categoryError="seelect category!"
        }

        if(!this.state.quantity){
            quantityError="Quantity Required!"
        }else if(isNaN(this.state.quantity)){
            quantityError = "Use only digits!";
        }

        if(nameError||quantityError||categoryError||discountError||priceError||imageError||descriptionError){
            
            this.setState({ nameError ,quantityError ,categoryError,discountError,priceError,imageError,descriptionError});
            
            return false;

        }else{

            this.setState({ nameError ,quantityError ,categoryError,discountError,priceError,imageError,descriptionError});
        
        }

        return true;
    }

    render (){
        if(localStorage.getItem('email')){
            const { categories , products } = this.state;
            return (
                <div class="container">
                <br/><br/>
                    <div class="justify-content-center">
                        <h1>ALL Products</h1>
                        <hr/>
                        <div class="x_scroll">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="tableTh">name</th>
                                        <th class="tableTh">Description</th>
                                        <th class="tableTh">Category</th>
                                        <th class="tableTh">Quantity</th>
                                        <th class="tableTh">Price</th>
                                        <th class="tableTh">Discount</th>
                                        <th class="tableTh">Image</th>
                                        <th class="tableTh">Edit</th>
                                        <th class="tableTh">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {

                                    products.map((product) =>

                                    <tr>
                                        <td class="tableTh">{ product.name }</td>
                                        <td class="tableTh">{ product.description }</td>
                                        <td class="tableTh">{ product.category }</td>
                                        <td class="tableTh">{ product.quantity }</td>
                                        <td class="tableTh">{ product.price }</td>
                                        <td class="tableTh">{ product.discount }</td>
                                        <td class="tableTh"><img width="100px" alt="" src={ "http://localhost:3500/"+product.image } class="img-thumbnail"/></td>
                                        <td class="tableTh"><button type='button' onClick={() => this.onChange(product._id)} class="btn btn-outline-success">Edit</button></td>
                                        <td class="tableTh"><button type='button' onClick={() => this.onProDelete(product._id)} class="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <br></br>
                            <hr/>
                            <form autoComplete="off" onSubmit={this.SubmitForm}>
                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Product Name</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.nameError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Product Description</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.descriptionError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Category</label>
                                <div class="col-md-6">
                                    <select class="form-control" name="category" onChange={this.handleChange} value={this.state.category}>
                                        <option value="">~select~</option>
                                    {
                                        categories.map((category) =>
                                            <option>{ category.name }</option>
                                        )
                                    }
                                    </select>
                                    <div style={{color : "red"}}>{this.state.categoryError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Quantity</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.quantityError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Price</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="price" value={this.state.price} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.priceError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Discount</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.discountError}</div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right font-weight-bold">Image</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control" name="file" onChange={this.onChangeHandler}/>
                                    <div style={{color : "red"}}>{this.state.imageError}</div>
                                </div>
                            </div>
                                    
                            <div class="col-md-4 offset-md-4">
                                <input type="submit" class="btn btn-outline-primary" value={this.state.confirmButton} />
                                <input type="button" class="btn btn-outline-danger" value="Clear" onClick={() => this.onClear()} />
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Product;
