//asynchrounous action creators eg dealing with the database.
import * as actionTypes from './actionTypes';
//creating action creators for purchasing/ordering a burger.
export const purchaseBurgerSuccess = (id, orderData) =>  {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}