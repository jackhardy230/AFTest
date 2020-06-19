import React from 'react';
import '../App.css';
import catApi from "../actions/categoryApi.js";
import swal from 'sweetalert';

const initialState = {
    name: "",
    nameError: "",
    categories: []
}

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const url = "http://localhost:3500/category";
        fetch(url).then(response => response.json())
        .then(json => this.setState({categories: json}))
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    onCatDelete(id){
        swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                catApi.category().delete(id)
                .then(res =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })
    }

    SubmitForm = e => {
        e.preventDefault();
        const correctAll = this.validation();
        if(correctAll){
            console.log(this.state);
            catApi.category().fetchAll().then(res => {
                const cat = res.data.filter( cat => cat.name===this.state.name);
                if(cat.length>0){
                    swal("Warning!", "Catgory Name Already Exists!", "warning")
                }else{
                    catApi.category().create(this.state)
                    .then(res => {
                        swal("Success!", "Add successful!", "success")
                        this.setState(initialState)
                        this.componentDidMount()
                    } );
                }
            });
        }
    }

    validation = () => {
        let nameError = "";

        if(!this.state.name){
            nameError="Name Required!"
        }

        if(nameError){
            this.setState({ nameError });
            return false;
        }

        return true;
    }

    render (){
        if(localStorage.getItem('email')){
            const { categories } = this.state;
            return (
                <div class="container">
                <br/><br/>
                    <div class="justify-content-center">
                        <h1>Category</h1>
                        <hr/>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="tableTh"><h3>Category Name</h3></th>
                                    <th class="tableTh"><h3>Remove</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                            {

                                categories.map((category) =>

                                <tr>
                                    <td class="tableTh"><h5>{ category.name }</h5></td>
                                    <td class="tableTh"><button type='button' onClick={() => this.onCatDelete(category._id)} class="btn btn-outline-danger">Delete</button></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <br></br>
                        <hr/>
                        <form autoComplete="off" onSubmit={this.SubmitForm}>
                            <div class="form-group row">
                                <label class="col-md-4 col-form-label text-md-right">Category Name</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                    <div style={{color : "red"}}>{this.state.nameError}</div>
                                </div>
                            </div>
                                    
                            <div class="col-md-4 offset-md-4">
                                <button type="submit" class="btn btn-outline-primary" >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default Category;
