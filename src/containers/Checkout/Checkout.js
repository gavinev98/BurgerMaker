import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route, Redirect } from 'react-router-dom';

import Contact from '../Checkout/Contact/Contact'

import { connect } from 'react-redux';

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

        let summary = <Redirect to="/"/>
        //check if ingredients are not equal to null.
        if(this.props.ings) {
         summary =  (<div>
            <CheckoutSummary 
            checkoutCancelled={this.checkoutCancelledHander} 
            checkoutContinued={this.checkoutContinuedHandler} 
            ingredients={this.props.ings} />

            <Route path={this.props.match.path + '/contact-data'} 
            component={Contact}/>
            
        </div>);
        }
        
        return summary;
    }


}


const mapStateToProps = state => {
    
    return {
        ings: state.ingredients
    }

}

//we dont dispatch as we are not dispatching.



export default connect(mapStateToProps)(Checkout);