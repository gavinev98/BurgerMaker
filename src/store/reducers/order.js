
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

//setting up the initial state
const initialState = {

    orders: [],
    loading: false,
    redirect:false

}



const reducer = (state = initialState, action) => {

        switch (action.type) {

            case actionTypes.PURCHASE_BURGER_SUCCESS:
                //create javascript object for each order. merging together.
                const newOrder = {
                    ...action.orderData,
                    id: action.orderID
                }
                //return the updated object.
                return updateObject(state, { loading: false, orders: state.orders.concat(newOrder), redirect: true });
            case actionTypes.PURCHASE_BURGER_FAIL:
                return updateObject(state, { loading: false });
            case actionTypes.PURCHASE_BURGER_START:
                return updateObject(state, { loading:true });
            case actionTypes.PURCHASE_BURGER_INIT:
                return updateObject(state, { redirect: false });
            case actionTypes.FETCH_ORDERS_START:
                return updateObject(state, { loading: true });
            case actionTypes.FETCH_ORDERS_SUCCESS:
                return updateObject(state, { orders: action.orders, loading: false });
            case actionTypes.FETCH_ORDERS_FAIL:
                return updateObject(state, { loading: false });
            default:
                return state;
        }
}

export default reducer;