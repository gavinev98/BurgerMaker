import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-order';


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
            this.setState({loading : false});
        }).catch(err => {
            this.setState({loading : false});
        })

    }


    render() {

        return(
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders;
