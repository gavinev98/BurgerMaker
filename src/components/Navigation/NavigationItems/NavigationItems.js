import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem';


const navigationItems = () => (

        <ul className={classes.NavigationItems}>
        <NavigationItem link="/"> Burger Builder </NavigationItem>
        <NavigationItem link="/orders" > Orders </NavigationItem>
        <NavigationItem link="/auth" > Sign In </NavigationItem>
        </ul>

);




export default navigationItems;