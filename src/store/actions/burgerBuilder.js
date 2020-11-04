//synchronous action creators for adding and removing items from burger.
import axios from '../../axios-order';

//importing our action types
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


//creating asynchronous action creator to fetch data.(ie ingredients)
export const initIngredients = () => {
    return dispatch => {

        axios.get('https://react-my-burger-70850.firebaseio.com/ingredients.json')
        .then(response => {
            //dispatch the action setIngredients.....
            dispatch(setIngredients(response.data)); 
      
         })
        .catch(error => {
          dispatch(fetchIngredientsFailed());
        });
    }
}