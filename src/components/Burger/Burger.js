import React from 'react';

import classes from './Burger.module.css';

//importing the burger ingredients
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    //recieving the ingredients object from the burger builder and transforming it to an acceptable type.
    //object.keys will return the string part of the object not the values and returns it as an array so we can now use map.
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {    // [,]
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          return  <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }) // using reduce for checking if there is nothing in burger.
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    //console log the array.
    console.log(transformedIngredients);
    //if the length is 0 then output paragraph tag.
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients.</p>
    }



    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );


};

export default burger;

