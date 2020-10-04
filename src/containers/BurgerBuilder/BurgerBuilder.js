import React, { Component } from "react";

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

//adding modal component.
import Modal from '../../components/UI/Modal/Modal';

//adding order summary component.
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-order';

import Spinner from '../../components/UI/Modal/Spinner/Spinner';

import withErrorHandler from '../../withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    //adding state to our burger builder class
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    //method for fetching data componentdidmount
    componentDidMount () {
        axios.get('https://react-my-burger-70850.firebaseio.com/ingredients.json')
            .then(response => {

                //recieve the ingredients in the response handle null valeus also
                 this.setState({ingredients : response.data});
        
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

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

    //handler to differentiate if the order now button was clicked.
    //arrow functions are used for maintaining state.
    purchaseHandler = () => {
        
        this.setState({purchasing: true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
        //positing to the firebase. creating object to store our data.
        this.setState({loading : true});
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Gavin Eve',
                address :{
                    street : 'Test Street',
                    zipCode : '23232'
                },
                email: 'test@test.com',
            },
            delivery: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
           //closed the spinner
           this.setState({loading: false});

           //alert message
           alert("Thank you, your order was sucessful");
           this.setState({ purchasing: false});

        })
        .catch(error => {
         alert("Your order was not successful please try again");
         //hide spinner and modal
         this.setState({loading : false, purchasing: false});
        })

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

            let orderSummary = null;

            let burger =  this.state.error ? <p>Ingredients cant be loaded.</p> : <Spinner />;

            //use conditional statement to check if we have recieved data from server or else display spinner.
            if(this.state.ingredients) {
    
            burger = 
            (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
             ingredientAdded={this.addIngredientHandler}
             ingredientDeducted={this.removeIngredientHandler}
             disabled={disableInfo}
             purchasable={this.state.purchasable}
             price={this.state.totalPrice}
             ordered={this.purchaseHandler}
            />
            </Aux>            
            );

            orderSummary =  <OrderSummary totalPrice={this.state.totalPrice} continue={this.purchaseContinueHandler} cancel={this.purchaseCancelHandler} ingredients={this.state.ingredients} />

        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }


            return(
            <Aux>
                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
                 </Modal>

                    {burger};

            </Aux>

        );


    }

}

export default withErrorHandler(BurgerBuilder, axios);