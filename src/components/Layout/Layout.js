import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from './Layout.module.css'

const Layout = (props) => (
    <>
        <div>
            <Toolbar/>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
);

export default Layout;