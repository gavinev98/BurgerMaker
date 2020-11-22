import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import { Redirect } from 'react-router-dom';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Modal/Spinner/Spinner';

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
            password: {
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
        },
        isSignUp: true
        
    }

    componentWillMount () {

        if(!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath('/');
        } 
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        // getting current state acquiring control named passed and updating props.
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        //updating the controls via setState.
        this.setState({controls: updatedControls});


    }


    //using method to switch between sign in and sign up.
    switchAuthHandler = () => {
        debugger;
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp
          }));
  }

    submitHandler = (event) => {
        debugger;
        //prevent page reload.
        console.log(event);
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
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


          let form = formElementsArray.map(formElement => (
              <Input
              key={formElement.id} 
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.id}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
               ));


         if(this.props.loading){
             form = <Spinner />
         }

         let errorMessage = null;
         if(this.props.error) {
             errorMessage = (
                 <p>{this.props.error.message}</p>
             )
         }

         let authRedirection = null;
         if(this.props.isAuthenticated) {
            //render redirect
            authRedirection = <Redirect to={this.props.authRedirect}/>
         }
          

        return (
            <div className={classes.Auth}>
                {authRedirection}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                 {form}
                <Button btnType="Success" >Sign Up</Button>
                </form>

                <Button
                 clicked={this.switchAuthHandler}                 
                 btnType="Danger" >SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>


        );
    }
}


//maping state to props to access loading state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
       

    }


}


//map dispatch to props to connect to redux container.
const mapDispatchToProps = dispatch => {

    return {

        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
        onSetAuthRedirectPath: (path) => dispatch(actions.auth(actions.setAuthRedirect(path)))


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);