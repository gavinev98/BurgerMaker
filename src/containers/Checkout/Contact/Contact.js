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
        }
    }

    orderHander = () => {
            console.log(this.props.ingredients);

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