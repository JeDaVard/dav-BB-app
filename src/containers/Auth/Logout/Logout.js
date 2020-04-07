import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { logOut } from "../../../store/actions";
import { Redirect } from 'react-router-dom';

function Logout(props) {
    useEffect(() => {
        props.logOut();
        props.history.push('/');
    });
    return (
        <Redirect to={'/'}/>
    )
}

export default connect(null, { logOut })(Logout)