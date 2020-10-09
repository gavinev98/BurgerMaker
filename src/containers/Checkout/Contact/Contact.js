import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'

import classes from './Contact.module.css'

import axios from '../../../axios-order';

import  Spinner from '../../../components/UI/Modal/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';


class Contact extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zipCode :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options : [{value: 'fastest', displayValue : 'Fastest'},
                                {value: 'cheapest', displayValue : 'Cheapest'} ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHander = (event) => {
                //positing to the firebase. creating object to store our data.
                this.setState({loading : true});
                const order = {
                    ingredients : this.props.ingredients,
                    price: this.props.price,

                }
                axios.post('/orders.json', order)
                .then(response => {
                   //closed the spinner
                   this.setState({loading: false});
                   //alert message
                   alert("Thank you, your order was sucessful");
                   this.props.history.push('/');
          
        
                })
                .catch(error => {
                 alert("Your order was not successful please try again");
                 //hide spinner and modal
                 this.setState({loading : false});
                })

    }

    render () {
        //converting our order form js object to array.
        const formElementsArray = [];
        //looping over the keys in form to create input object ie , name, address, zipcode etc.
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
            {formElementsArray.map(formElement => {
                <Input elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig} /> 
            })}
            <Button btnType="Success" clicked={this.orderHander}>ORDER</Button>
           
        </form>

        );
        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
              

            </div>


        );
    }
}


export default Contact;