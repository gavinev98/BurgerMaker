import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName,
                         amount : props.ingredients[ingredientName]})
    }


    return(        
    <div className={classes.Order}>
    <p>Ingredients : Salad  (1) </p>
    <p>Price : <strong>USD {props.price}</strong> </p>
    </div>
    );


};

export default order;