import React, { Component } from 'react';

import { connect } from 'react-redux';

import Order from '../../components/Order/Order';

import axios from '../../axios-order';

import withErrorHandler from '../../withErrorHandler/withErrorHandler';

import * as actionC from '../../store/actions/index';

import Spinner from '../../components/UI/Modal/Spinner/Spinner';




class Orders extends Component {


    //we only want to mount it once ie when clicked so we use DidMount().
    componentDidMount() {

        //calll to asynchronous code action creator
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }


    render() {

        let orders = <Spinner />;
 
        if(!this.props.loading){
         orders =  (this.props.orders.map(order => (
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={Number.parseFloat(order.price).toFixed(2)}
                />
            )))
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

//setting up the connection to the redux stores.
const mapStateToProps = state => {
    return {

        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId

    };
}



const mapDispatchToProps = dispatch => {
    return {
        //dispatch asynch action cretor
        onFetchOrders: (token, userId) => dispatch(actionC.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
