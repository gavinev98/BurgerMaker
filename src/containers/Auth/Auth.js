import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';





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
          //converting our controls form js object to array.
          const formElementsArray = [];
          //looping over the keys in form to create input object ie , name, address, zipcode etc.
          for(let key in this.state.controls) {
              formElementsArray.push({
                  id: key,
                  config: this.state.controls[key]
              });
          }


          const form = formElementsArray.map(formElement => (
              <Input
              key={formElement.id} 
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.id}

              />
          ));


        return (
            <div>
                <form>


                </form>
            </div>


        );
    }


}

export default Auth;