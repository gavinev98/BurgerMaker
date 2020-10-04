import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'


class Contact extends Component {

    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render () {
        return (
            <div>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Your email" />
                    <input type="text" name="street" placeholder="Your street" />
                    <input type="text" name="postalcode" placeholder="Postal Code" />
                </form>

                <Button btnType="Success">ORDER</Button>

            </div>


        );
    }
}


export default Contact;