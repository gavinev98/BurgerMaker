//creating some action types
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';


//setting up action types for successful burger purchase and failure of burger purchase.
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';

//setting up action type for loading when fetching ingredients.
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';


//adding a redirect action type once the order has suceesfully gone through.
export const PURCHASE_BURGER_INIT = 'PURCHASE_BURGER_INIT';


//setting up an action type for fetching orders to display on orders page
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';


//authentication
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

