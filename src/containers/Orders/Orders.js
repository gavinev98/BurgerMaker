import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-order';

import withErrorHandler from '../../withErrorHandler/withErrorHandler';

import * as actionC from '../../store/actions/index';


class Orders extends Component {



    //we only want to mount it once ie when clicked so we use DidMount().
    componentDidMount() {

        //calll to asynchronous code action creator
        this.props.onFetchOrders();
    }


    render() {

        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={Number.parseFloat(order.price).toFixed(2)}
                    />
                ))}
            </div>
        );
    }
}

//setting up the connection to the redux stores.
const mapStateToProps = state => {
    return {

        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,

    };
}



const mapDispatchToProps = dispatch => {
    return {
        //dispatch asynch action cretor
        onFetchOrders: () => dispatch(actionC.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
