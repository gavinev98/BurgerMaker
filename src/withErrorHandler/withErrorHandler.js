import React, {Component} from 'react';

import Modal from '../components/UI/Modal/Modal';

import Aux from '../hoc/Aux';

import axios from 'axios';


const withErrorHandler = (WrappedComponent, axios) => {

        return class extends Component {

            state = {
                error : null
            }



            //lifecycle methods.
            //checking status recieved from axios using componentdidmount
            componentWillMount() {
                //using interceptors to check request and response at endpoints.
                //setting error to null for each request sent.
                this.requestInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error : null});
                    return req;
                })

                //setting error to error for each response.
                this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({ error: error});
                })
            }

            //unmounting the  component when it is not needed anymore / prevents memory leaks.
            //remove interceptors.
            componentWillUnmount () {
                //ejecting interceptors once not need anymore.
                console.log('Will Unmount', this.requestInterceptor, this.responseInterceptor);
                axios.interceptors.request.eject(this.requestInterceptor);
                axios.interceptors.response.eject(this.responseInterceptor);

            }

            errorConfirmedHandler = () => {
                this.setState({error : null});
            }


            render() {
                return (
                    <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    </Aux>
                );
            }

        }


}

export default withErrorHandler;