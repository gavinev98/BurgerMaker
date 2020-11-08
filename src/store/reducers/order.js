
import * as actionTypes from '../actions/actionTypes';

//setting up the initial state
const initialState = {

    orders: [],
    loading: false

}



const reducer = (state = initialState, action) => {

        switch (action.type) {

            case actionTypes.PURCHASE_BURGER_SUCCESS:
                //create javascript object for each order. merging together.
                const newOrder = {
                    ...action.orderData,
                    id: action.id
                }
                return {
                    ...state,
                    loading: false,
                    orders: state.orders.concat(newOrder)

                };
            case actionTypes.PURCHASE_BURGER_FAIL:
                return {
                    ...state,
                    loading: false,
                    
                };
            default:
                return state;
        }
}

export default reducer;