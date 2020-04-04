import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css'

function CheckoutSummary({ingredients, checkoutCanceled, checkoutContinued }) {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We know you will love it!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType='Danger' action={checkoutCanceled} >CANCEL</Button>
            <Button btnType='Success' action={checkoutContinued} >CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;