import React from "react";

import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.module.css'

function Burger(props) {
    const transformIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type={'bread-top'} />
                {transformIngredients.length ? transformIngredients : (
                    <p>Choose your ingredients</p>
                )}
            <BurgerIngredients type={'bread-bottom'} />
        </div>
    )
}

export default Burger;