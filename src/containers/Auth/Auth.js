import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth, logOut } from '../../store/actions';
import Spinner from '../../components/UI/Spinners/Spinner';

function Auth(props) {
    const [state, setState] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
            },
        },
        loading: false,
        signIn: true,
    });

    const inputChangeHandler = (e, type) => {
        const updatedControls = {
            ...state.controls,
            [type]: {
                ...state.controls[type],
                value: e.target.value,
            },
        };
        setState({
            ...state,
            controls: {
                ...updatedControls,
            },
        });
    };

    const formElementArray = [];
    for (let key in state.controls) {
        formElementArray.push({
            id: key,
            config: state.controls[key],
        });
    }
    const form = formElementArray.map(el => (
        <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            onChange={e => inputChangeHandler(e, el.id)}
        />
    ));

    const email = state.controls.email.value;
    const password = state.controls.password.value;
    const authHandler = e => {
        e.preventDefault();

        props.auth(email, password, state.signIn);
    };

    const flipHandler = () => {
        setState(state => ({ ...state, signIn: !state.signIn }));
    };

    return (
        <div className={classes.Auth}>
            <div className={classes.Top}>
                <h2>{state.signIn ? 'Sign in' : 'Sign up'}</h2>
                {state.signIn ? (
                    <button onClick={flipHandler}>Haven't account yet?</button>
                ) : (
                    <button onClick={flipHandler}>Already have account?</button>
                )}
            </div>
            {props.loading ? (
                <Spinner />
            ) : (
                <form onSubmit={authHandler}>
                    {form}
                    {props.error && <p>{props.error}</p>}
                    <Button btnType={'Success'} type={'submit'}>
                        {state.signIn ? 'Login' : 'Register'}
                    </Button>
                </form>
            )}
        </div>
    );
}
const mapStateToProps = state => ({ loading: state.auth.loading, error: state.auth.error });
export default connect(mapStateToProps, { auth, logOut })(Auth);
