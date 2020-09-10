import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls =  [

    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},

];

const buildControls = (props) => (

        <div className={classes.BuildControls}>
           <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p> 
        {/* mapping controls array to a build control */}
         {controls.map(ctrl => (
             <BuildControl 
             key={ctrl.label} 
             label={ctrl.label}
             added={() => props.ingredientAdded(ctrl.type)} 
             deducted={() => props.ingredientDeducted(ctrl.type)}
             disabled={props.disabled[ctrl.type]} 
            /> 
         ))}

        <button className={classes.OrderButton}>ORDER NOW</button>

        </div>

);



export default buildControls;