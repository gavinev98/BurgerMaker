import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    //taking in the ingredients in via props and using object.keys to etract string values.
    const ingredientSummary = Object.keys(props.ingredientSummary)
                                .map(igKey => {
                                    return <li><span>{igKey}</span>: {props.ingredients[igKey]}</li>
                                });


    return (
        <Aux>
        <h3>Your Order</h3>
        <p>A delicious buger with the following ingredients</p>

        <ul>
       


        </ul>


        </Aux>
    );

};

export default orderSummary;