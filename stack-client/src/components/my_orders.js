import React from 'react';
import '../App.css';

const initialState = {
    myOrder: []
}

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const purl = "http://localhost:3500/cart";
        fetch(purl).then(response => response.json())
        .then(json => {const cart = json.filter(cart => {
                return (cart.email===localStorage.getItem('email') && cart.type==='order')
            })
            this.setState({ myOrder:cart })
        })
    }

    render (){
        const { myOrder } = this.state;
        if(localStorage.getItem('email')){
            return (
                <div class="container">
                <br/><br/>
                    <div class="justify-content-center">
                        <h1>My Order</h1>
                        <hr/>
                        <tbody>
                        {
                            myOrder.map((my) =>

                            <tr>
                                <td class="tableTh" width="25%"><img width="200px" alt="" src={ "http://localhost:3500/"+my.p_image } class="img-thumbnail" /></td>
                                <td class="tableTh" width="60%"><h3>{ my.p_name  }</h3><br/><h5>Price: Rs. { my.p_price } / Discount: Rs. { my.p_discount }</h5><br/><h5>Total: Rs. { my.total } / Quantity: { my.p_quantity }</h5></td>
                                <td class="tableTh" width="25%"><h5> Payment Method : { my.payment } </h5></td>
                            </tr>
                        )}
                        </tbody>
                    </div>
                </div>
            );
        }
    }
}

export default Order;
