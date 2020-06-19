import React from 'react';
import '../App.css';
import cartApi from "../actions/cartApi.js";
import swal from 'sweetalert';

const initialState = {
    name: "",
    card: "",
    month: "",
    year: "",
    ccv: "",
    nameError: "",
    cardError: "",
    monthError: "",
    yearError: "",
    ccvError: ""
}


class Payment extends React.Component {
    
    state = initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    SubmitForm = e => {
        e.preventDefault();
        const correctAll = this.validation();
        if(correctAll){
            console.log(this.state);
            cartApi.cart().update(localStorage.getItem('cartId'),{ type: 'order' , payment: 'paid' })
            .then(res =>{
                swal("Success!", "Payment Successful!", "success")
                window.location.href = '/order';
            })
        }
    }

    onPayments(){
        cartApi.cart().update(localStorage.getItem('cartId'),{ type: 'order' , payment: 'Cash On Deliver' })
        .then(res =>{
            swal("Success!", "Order Successful!", "success")
            window.location.href = '/order';
        })
    }

    validation = () => {
        let nameError= "";
        let cardError= "";
        let monthError= "";
        let yearError= "";
        let ccvError= "";

        if(!this.state.name){
            nameError="Name Required!"
        }

        if(!this.state.card){
            cardError = "Card Number Required!";
        }else if(isNaN(this.state.card)){
            cardError = "Use only digits!";
        }else if(this.state.card.length!==16){
            cardError = "Invalid Card Number!";
        }

        if(!this.state.month){
            monthError="Select month"
        }

        if(!this.state.ccv){
            ccvError="CCV Code Required!"
        }else if(this.state.ccv.length!==3){
            ccvError = "Invalid Code!";
        }else if(isNaN(this.state.ccv)){
            ccvError = "Use only digits!";
        }

        if(!this.state.year){
            yearError="Select Year"
        }

        if( cardError || nameError || monthError || ccvError || yearError){
            this.setState({ cardError , nameError , monthError , ccvError , yearError });
            return false;
        }

        return true;
    }

    render (){
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h1>Payment Gateway</h1>
                    <hr/>
                    <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.nameError}</div>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Card Number</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="card" value={this.state.card} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.cardError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Year</label>
                            <div class="col-md-6">
                                <select class="form-control" name="year" value={this.state.year} onChange={this.handleChange}>
                                    <option value="">~select~</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                                <div style={{color : "red"}}>{this.state.yearError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Month</label>
                            <div class="col-md-6">
                                <select class="form-control" name="month" value={this.state.month} onChange={this.handleChange}>
                                    <option value="">~select~</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <div style={{color : "red"}}>{this.state.monthError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">CCV Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="ccv" value={this.state.ccv} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.ccvError}</div>
                            </div>
                        </div>
                    
                        <div class="col-md-4 offset-md-4">
                            <input type="submit" class="btn btn-outline-primary" value="Pay" /><br/><br/>
                            <input type="button" class="btn btn-outline-success" value="Cash On Deliver" onClick={() => this.onPayments()} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Payment;
