import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';

import Contact from '../Checkout/Contact/Contact'

class Checkout extends Component {


    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkoutCancelledHander = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount () {
        //extracting query params
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};

        for(let param of query.entries()) {
            // ['salad' , '1', 'bacon' , '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredients});
    }


    //goal is to create a checkout summary show burger,
    render() {
        return (
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHander} 
                checkoutContinued={this.checkoutContinuedHandler} 
                ingredients={this.state.ingredients} />
                
                <Route path={this.props.match.path + '/contact-data'} 
                render={() => (<Contact ingredients={this.state.ingredients} />)} />
            </div>

        );
    }


}

export default Checkout;