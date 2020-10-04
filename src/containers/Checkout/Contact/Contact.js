import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'

import classes from './Contact.module.css'


class Contact extends Component {

    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHander = (event) => {
                //positing to the firebase. creating object to store our data.
                this.setState({loading : true});
                const order = {
                    ingredients : this.props.ingredients,
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

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postalcode" placeholder="Postal Code" />
                </form>

                <Button btnType="Success" clicked={this.orderHander}>ORDER</Button>

            </div>


        );
    }
}


export default Contact;