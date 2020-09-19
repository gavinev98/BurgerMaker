import React, {Component} from 'react';

import Modal from '../components/UI/Modal/Modal';

import Aux from '../hoc/Aux';


const withErrorHandler = (WrappedComponent, axios) => {

        return class extends Component {

            state = {
                error : null
            }


            //checking status recieved from axios using componentdidmount
            componentDidMount() {
                //using interceptors to check request and response at endpoints.
                //setting error to null for each request sent.
                axios.interceptors.request.use(req => {
                    this.setState({error : null});
                })

                //setting error to error for each response.
                axios.interceptors.response.use(null, error => {
                    this.setState({ error: error});
                })
            }

            errorConfirmedHandler = () => {
                this.setState({error : null});
            }


            render() {
                return (
                    <Aux>
                    <Modal show={this.state.error}
                            clicked={this.errorConfirmedHandler}>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    </Aux>
                );
            }

        }


}

export default withErrorHandler;