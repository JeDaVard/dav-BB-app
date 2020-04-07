import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { logOut } from '../../../store/actions';
import { connect } from "react-redux";

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={'/'} exact>Burger Builder</NavigationItem>
            {props.isLoggedIn && <NavigationItem link={'/Orders'}>Orders</NavigationItem>}
            {props.isLoggedIn ? <NavigationItem link={'/logout'}>Logout</NavigationItem> : <NavigationItem link={'/sign-in'}>Sign-in</NavigationItem>}
        </ul>
    );
};

const mapStateToProps = state => ({isLoggedIn: state.auth.token !== null});
export default connect(mapStateToProps, { logOut })(NavigationItems);
