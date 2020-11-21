import React from 'react'

import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

//importing backdrop
import Backdrop from '../../UI/Backdrop/Backdrop'

import Aux from '../../../hoc/Aux';


const sideDrawer = (props) => {
    //conditionally attach different css animations open/close
    let attatchedClasses =  [classes.SideDrawer, classes.Closed];

    if(props.open) {
        attatchedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attatchedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
        </Aux>

    );

};

export default sideDrawer;