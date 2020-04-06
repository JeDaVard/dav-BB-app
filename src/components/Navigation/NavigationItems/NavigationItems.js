import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from "react-redux";

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={'/'} exact>Burger Builder</NavigationItem>
            <NavigationItem link={'/Orders'}>Orders</NavigationItem>
            {props.isLoggedIn ? null : <NavigationItem link={'/sign-in'}>Sign-in</NavigationItem>}
        </ul>
    );
};

const mapStateToProps = state => ({isLoggedIn: state.auth.userId});
export default connect(mapStateToProps)(NavigationItems);
