import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    //methods
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    //retrieve the old state instead of current state.
    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            
           return {showSideDrawer: !prevState.showSideDrawer};
    });
    }


    render ()  {
        return (
        <Aux>
        <Toolbar
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.toggleSideDrawerHandler} />
        <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
            {this.props.children}

        </main>
        </Aux>

    );
    }

}

const mapStateToProps = state => {

    return {
        isAuthenticated : state.auth.token !== null
    }
}


export default connect(mapStateToProps, null)(Layout);