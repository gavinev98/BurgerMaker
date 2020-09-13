import React from 'react';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

//importing navigation items
import NavigationItems from '../NavigationItems/NavigationItems'


const toolbar = (props) => (

    <header className={classes.Toolbar}>
     <div>MENU</div>
     <div className={classes.Logo}>
     <Logo />
     </div>
     <nav>
     <NavigationItems />
     </nav>
    </header>

);


export default toolbar;