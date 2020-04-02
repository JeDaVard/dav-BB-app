import React from "react";
import classes from './Logo.module.css'
import logo from '../../assets/images/logo.png'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt="logo"/>
        </div>
    )
};

export default Logo