import React, { Component } from 'react';




class Auth extends Component {

    //this wont be handled in redux as we only care about local state.
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            pasword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    render() {
        return (
            <div>
                <form>


                </form>
            </div>


        );
    }


}

export default Auth;