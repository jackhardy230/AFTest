import React from 'react';
import '../App.css';

const initialState = {
    products: []
}

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const purl = "http://localhost:3500/product";
        fetch(purl).then(response => response.json())
        .then(json => this.setState({products: json}))
    }

    onGoBuy(id){
        localStorage.setItem("product_ID",id);
        window.location.href = '/viewProduct';
    }

    render (){
        const { products } = this.state;
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h1>All Products</h1>
                    <hr/>
                        <table class="table">
                            <tbody>
                            {
                                products.map((product) =>

                                <tr>
                                    <td width="center"><img width="300px" alt="" src={ "http://localhost:3500/"+product.image } onClick={() => this.onGoBuy(product._id)} class="img-thumbnail" />
                                    <h3 style={{cursor: "pointer"}} onClick={() => this.onGoBuy(product._id)} >{ product.name  }</h3><br/><h5>category :{ product.category  } / Price: Rs. { product.price }</h5>
                                        <p>Description : { product.description  }</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                </div>
            </div>
        );
    }
}

export default ProductList;
