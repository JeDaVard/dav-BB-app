import React, { useState } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [state, setState] = useState({ showSideDrawer: false });
    const sideDrawerClosedHandler = () => {
        setState({ showSideDrawer: false });
    };
    const sideDrawerToggleHandler = () => {
      setState({showSideDrawer: true})
    };
    return (
        <>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                show={state.showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </>
    );
};

export default Layout;
