import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {


    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }


    //goal is to create a checkout summary show burger,
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />


            </div>

        );
    }


}

export default Checkout;