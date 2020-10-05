import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-order';

import withErrorHandler from '../../withErrorHandler/withErrorHandler';


class Orders extends Component {


    state = {
            orders : [],
            loading: true

    }

    //we only want to mount it once ie when clicked so we use DidMount().
    componentDidMount() {
        //using axios to retrieve our data.
        axios.get('/orders.json')
        .then(response => {

            const fetchedOrders = [];
            for(let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }

           



            this.setState({loading : false, orders : fetchedOrders});

            console.log(fetchedOrders);
        }).catch(err => {
            this.setState({loading : false});
        })

    }


    render() {

        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
