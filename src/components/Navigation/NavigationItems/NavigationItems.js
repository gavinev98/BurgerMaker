import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem';


const navigationItems = (props) => (

        <ul className={classes.NavigationItems}>
        <NavigationItem link="/"> Burger Builder </NavigationItem>
        <NavigationItem link="/orders" > Orders </NavigationItem>
{ props.isAuthenticated ? <NavigationItem link="/logout" > Logout </NavigationItem> : <NavigationItem link="/auth" > Sign In </NavigationItem> }
        </ul>

);




export default navigationItems;