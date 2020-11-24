//this file will be used as a central store for all action creators.

export { addIngredient, removeIngredient, initIngredients} from './burgerBuilder';
export {purchaseBurger, purchaseInit, fetchOrders} from './order';
//exporting auth options
export { auth, logout, setAuthRedirect, authCheckState} from './auth';