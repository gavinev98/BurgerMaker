import * as actionTypes from './actions';

const initialState = {

        ingredients: null,
        totalPrice: 4
};

const reducer = (state = initialState, action) => {

    //creating switch for different types
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {

            };

        case actionTypes.REMOVE_INGREDIENT:
            return {

            };
        default:
            return state;
    }

    return state;
}


export default reducer;