import React, { Component } from "react";

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    //adding state to our burger builder class
    state = {
        ingredients : {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 4,
        purchasable: false
    };

    updatePurchaseStatus (ingredients) {
        //for the purchase button to be active there needs to be ingredients.
        //firstly we will copy the ingredients into a new object in an immutable way.
    /*    const ingredients = {
            ...this.state.ingredients
        } */

        //to create array of string enteries. eg salad bacon cheese. and then we map this array to recieve key values ie the quantities.
        //map method recieves the key.
        //using reduce key to flatten to single number.
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        //setting sum to true or false based on fact if sum is greater than 0.
        this.setState({purchasable: sum > 0})
        
    }

    //all method todo with interacting will be placed in the stateful component ie burgerbuilder
    //adding ingredients to the burger.
    addIngredientHandler = (type) => {
        
        //get current state
        const oldCount = this.state.ingredients[type];
        //updated count is old count plus 1
        const updatedCount = oldCount + 1;

        //state should be updated in an immmutable way so we will create a new object
        const updatedIngredients = {
            //get the current object
            ...this.state.ingredients

        };

        //updating the value of type chosen eg cheese bacon meat.
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;
        //new price is oldprice plus the new price.
        const newPrice = oldPrice + priceAddition;


        //finally updating the state of the price and ingredients.
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        //run method to activate purchasble button.
        this.updatePurchaseStatus(updatedIngredients);

    }

    //removing ingredients from burger.
    removeIngredientHandler = (type) => {


        //get current state
        const oldCount = this.state.ingredients[type];

        //check if count is less that zero if so do nothing.
        if(oldCount <= 0) {
            return;
        }


        //updated count is old count plus 1
        const updatedCount = oldCount - 1;
        
        //state should be updated in an immmutable way so we will create a new object
        const updatedIngredients = {
            //get the current object
            ...this.state.ingredients
        
        };
        
        updatedIngredients[type] = updatedCount;
        
        const priceMinus = INGREDIENT_PRICES[type];
        
        const oldPrice = this.state.totalPrice;
        //new price is oldprice plus the new price.
        const newPrice = oldPrice - priceMinus;
         
        //finally updating the state of the price and ingredients.
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
         
        //run method to activate purchasble button.
        this.updatePurchaseStatus(updatedIngredients);
        
    }

    render() {
            const disableInfo = {
                //copying object in an immutable way.
                ...this.state.ingredients
            };

            //checking the keys in ingredients state object eg then values.
            for(let key in disableInfo) {
                disableInfo[key] = disableInfo[key] <= 0
            }


        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                 ingredientAdded={this.addIngredientHandler}
                 ingredientDeducted={this.removeIngredientHandler}
                 disabled={disableInfo}
                 purchasable={this.state.purchasable}
                 price={this.state.totalPrice}
                />

            </Aux>

        );


    }

}

export default BurgerBuilder;