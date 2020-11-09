//asynchrounous action creators eg dealing with the database.
import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
//creating action creators for purchasing/ordering a burger.


//this is a synchronous action creator
export const purchaseBurgerSuccess = (id, orderData) =>  {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

//this is a synchronous action creator
export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {

        return {
            type: actionTypes.PURCHASE_BURGER_START
        }

}

//this is an asynchronous action creator. This will run when we click order.
export const purchaseBurger = (orderData) => {
    return  dispatch => {
        //dispatching this method before reaching out to firebase.
        dispatch(purchaseBurgerStart());
        //we want to post a new order to firebase.
        axios.post('/orders.json', orderData)
        .then(response => {
          //if we were sucessful then we want to dispatch our synchronous action creator ie purchaseBurgerSuccess.
          console.log(response.data);
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(error));
       
        })
    }
};

//the final action creator will be used to redirect to the homepage
export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

//asynch action creator to fetch order via axios
export const fetchOrders = () => {
        //using axios to retrieve our data.
    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
            const fetchedOrders = [];
            for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
         //dispatch our synchronous action creator with fetched orders.
         dispatch(fetchOrdersSucess(fetchedOrders));
             
            }).catch(err => {
        //dispatch our synchronous action creator for failed fetching
        dispatch(fetchOrdersFail(error));
        
            })
        }

}