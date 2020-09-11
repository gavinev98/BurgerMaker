import React from 'react';

import classes from './Button.module.css';


const button = (props) => (

    //creating dynamic button so will look like 'button danger' or 'button success'
    <button
    className={[classes.Button, classes[props.btnType]].join(' ')} 
    onClick={props.clicked}>{props.children}</button>

);


export default button;