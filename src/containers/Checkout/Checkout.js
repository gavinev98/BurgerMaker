import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';

import Contact from '../Checkout/Contact/Contact'

import connect from 'react-redux';

class Checkout extends Component {


    checkoutCancelledHander = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    /*
    componentWillMount () {
        //extracting query params
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;

        for(let param of query.entries()) {
            // ['salad' , '1', 'bacon' , '1']
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients : ingredients, price : price});
    }
    */


    //goal is to create a checkout summary show burger,
    render() {
        return (
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHander} 
                checkoutContinued={this.checkoutContinuedHandler} 
                ingredients={this.state.ingredients} />
                
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<Contact ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>

        );
    }


}


const mapStateToProps = state => {
    
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }

}

//we dont dispatch as we are not dispatching.



export default connect(mapStateToProps)(Checkout);