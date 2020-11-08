import React, { Component } from "react";
import { connect } from 'react-redux';

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

import * as burgerBuilderActions from '../../store/actions/index';
import { fetchIngredientsFailed, initIngredients } from "../../store/actions/burgerBuilder";




class BurgerBuilder extends Component {
    //adding state to our burger builder class
    state = {
        purchasing: false,
        loading: false,

    };

    //method for fetching data componentdidmount
   componentDidMount () {
        //fetching ingredients via the redux store.
        this.props.fetchIngredients();

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
        return sum > 0;
        //setting sum to true or false based on fact if sum is greater than 0.
        //this.setState({purchasable: sum > 0})
        
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
        /*
        const queryParams = [];

        for(let i in this.props.ing){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
    */
        this.props.history.push({
            pathname: '/checkout'
           
        }
        );

    }

    

    render() {
            const disableInfo = {
                //copying object in an immutable way.
                ...this.props.ing
            };

            //checking the keys in ingredients state object eg then values.
            for(let key in disableInfo) {
                disableInfo[key] = disableInfo[key] <= 0
            }

            let orderSummary = null;

            let burger =  this.props.error ? <p>Ingredients cant be loaded.</p> : <Spinner />;

            //use conditional statement to check if we have recieved data from server or else display spinner.
            if(this.props.ing) {
    
            burger = 
            (
            <Aux>
            <Burger ingredients={this.props.ing} />
            <BuildControls 
             ingredientAdded={this.props.onIngredientAdded}
             ingredientDeducted={this.props.onIngredientRemoved}
             disabled={disableInfo}
             purchasable={this.updatePurchaseStatus(this.props.ing)}
             price={this.props.price}
             ordered={this.purchaseHandler}
            />
            </Aux>            
            );

            orderSummary =  <OrderSummary totalPrice={this.props.price} continue={this.purchaseContinueHandler} cancel={this.purchaseCancelHandler} ingredients={this.props.ing} />

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

//setting up the connection to the redux stores.
const mapStateToProps = state => {
    return {

        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error

    };
}



const mapDispatchToProps = dispatch => {
    return {
        //creating two methods
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        fetchIngredients: () => dispatch(burgerBuilderActions.initIngredients())
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));