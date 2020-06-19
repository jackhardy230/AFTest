import React from 'react';
import '../App.css';
import cartApi from "../actions/cartApi.js";
import proApi from "../actions/productApi.js";
import comApi from "../actions/commentApi.js";
import swal from 'sweetalert';

const initialState = {
    products: [],
    messages: [],
    confirmButton: "Send",
    p_id: "",
    p_name: "",
    p_price: "",
    p_discount: "",
    p_quantity : "",
    p_image : "",
    quantity : "",
    type:"",
    total:"",
    quantityError:"",
    com:"",
    comError:"",
    all_com:[],
    rate:"",
    rateError:"",
}

class product_view extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    componentDidMount() {
        const purl = "http://localhost:3500/product";
        fetch(purl).then(response => response.json())
        .then(json => {const pro = json.filter(pro => pro._id===localStorage.getItem('product_ID'))
            this.setState({products: pro,p_id:pro[0]['_id'],p_name:pro[0]['name'],p_price:pro[0]['price'],p_discount:pro[0]['discount'],p_quantity:pro[0]['quantity'],p_image:pro[0]['image']})
        })
        const url = "http://localhost:3500/comments";
        fetch(url).then(response => response.json())
        .then(json => {const com = json.filter(com => com.product===localStorage.getItem('product_ID'))
            this.setState({all_com: com})
        })
    }

    onDeleteComments(id){
        swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                comApi.comment().delete(id)
                .then(res =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })
    }

    onEditComments(id){
        swal("Write Yoor Comment:", {
            content: "input",
          })
          .then((value) => {
              if(value){
                comApi.comment().update(id,{message:value})
                .then(res => {
                    swal("Success!", "Edit Successful!", "success")
                    this.componentDidMount()
                } )
              }
          })
    }

    onCart(){
        if(localStorage.getItem('email')){
            if(this.state.quantity){
                if(this.state.quantity<=this.state.p_quantity){
                    const total=this.state.quantity*this.state.p_price-(this.state.p_discount*this.state.quantity)
                    this.setState({ type:'cart' ,total:total , email: localStorage.getItem('email') }, () => { 
                        cartApi.cart().create(this.state)
                        .then(res =>{
                            proApi.product().update_quantity(localStorage.getItem('product_ID'),{quantity:this.state.p_quantity-this.state.quantity})
                            swal("Success!", "Add Successful!", "success")
                            this.componentDidMount()
                            this.setState(initialState)
                        })
                    })
                }else{
                    this.setState({quantityError:"Quantity Error!"})
                }
            }else{
                this.setState({quantityError:"Quantity Required!"})
            }
        }else{
            swal("Warning!", "Please Login!", "warning")
        }
    }

    comments_btn(email,id){
        if(localStorage.getItem('email')){
            if(email===localStorage.getItem('email')){
                return  [<button type='button' onClick={() => this.onEditComments(id)} class="btn btn-outline-success">EDIT</button>,
                        <button type='button' onClick={() => this.onDeleteComments(id)} class="btn btn-outline-danger">Delete</button>];
            }
        }
    }

    SubmitForm = e => {
        e.preventDefault();
        if(localStorage.getItem('email')){
            const correctAll = this.validation();
            if(correctAll){
                const data = { product: localStorage.getItem('product_ID'), user: localStorage.getItem('email'), message: this.state.com , rate: this.state.rate}
                comApi.comment().create(data)
                .then(res => {
                    swal("Success!", "Add successful!", "success")
                    this.setState(initialState)
                    this.componentDidMount()
                } )
            }
        }else{
            swal("Warning!", "Please Login!", "warning")
        }
    }

    validation = () => {
        let comError = "";
        let rateError ="";

        if(!this.state.com){
            comError="Comment Required!"
        }

        if(!this.state.rate){
            rateError="Rate Required!"
        }

        if(comError||rateError){
            this.setState({ comError , rateError });
            return false;
        }

        return true;
    }

    render (){
        const { products , all_com } = this.state;
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <table class="table">
                        <tbody>
                        {
                            products.map((product) =>

                            <tr>
                                <td class="tableTh" width="35%"><img width="500px" alt="" src={ "http://localhost:3500/"+product.image } class="img-thumbnail" /></td>
                                <td class="tableTh" width="65%"><h3>{ product.name  }</h3><br/><h5>category :{ product.name  } / Price: Rs. { product.price }</h5>
                                <br/><h5>Discount : Rs. { product.discount }</h5>
                                <br/><h5>Available Quantity : { product.quantity }</h5>
                                <p>Description : { product.description  }</p>
                                <br/>Quantity : <input type='text' name="quantity" value={this.state.quantity} onChange={this.handleChange} style={{width: "50px"}} /> / { product.quantity }
                                <div style={{color : "red"}}>{this.state.quantityError}</div><br/>
                                <br/><button type='button' onClick={() => this.onCart()} class="btn btn-outline-primary"><img src="https://img.icons8.com/bubbles/100/000000/add-shopping-cart.png" title="Add to Cart"/></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <hr/>
                <h1>Comments</h1>
                    <hr/>
                    <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Ratings</label>
                                <div class="col-md-6">
                                <fieldset  value={this.state.rate} onChange={this.handleChange}>
                                    <input type="radio" name="rate" value="1"/><label for="rate"> 1 Star</label>
                                    <input type="radio" name="rate" value="2"/><label for="rate"> 2 Star</label>
                                    <input type="radio" name="rate" value="3"/><label for="rate"> 3 Star</label>
                                    <input type="radio" name="rate" value="4"/><label for="rate"> 4 Star</label>
                                    <input type="radio" name="rate" value="5"/><label for="rate"> 5 Star</label>
                                </fieldset>
                                <div style={{color : "red"}}>{this.state.rateError}</div>
                            </div>
                        </div>  

                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Comment</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="com" value={this.state.com} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.comError}</div>
                            </div>
                        </div>
                                
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-outline-primary">
                                ADD
                            </button>
                        </div>
                    </form>
                    <hr/>
                    {
                        all_com.map((com_one) =>
                        <tr>
                            <td><h5>{ com_one.user }</h5></td>
                            <td width="50%"><p>{ com_one.message } / Rating : { com_one.rate }</p></td>
                            <td>{ this.comments_btn(com_one.user,com_one._id)}</td>
                        </tr>
                        
                        
                    )}
            </div>
        );
    }
}

export default product_view;
