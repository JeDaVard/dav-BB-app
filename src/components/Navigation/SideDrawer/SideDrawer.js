import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from './SideDrawer.module.css'
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <Backdrop order={props.show} click={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
};

export default SideDrawer