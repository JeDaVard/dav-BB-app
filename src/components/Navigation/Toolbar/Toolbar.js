import React from 'react';
import classes from './Toolbar.module.css'

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <div>Logo</div>
            <nav>
                <ul>
                    <li>Nav Link</li>
                </ul>
            </nav>
        </header>
    );
};

export default Toolbar;
