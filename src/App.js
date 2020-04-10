import React, { useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuth } from './store/actions';
import Spinner from "./components/UI/Spinners/Spinner";

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
})
const Auth = React.lazy( () => {
    return import('./containers/Auth/Auth')
})

function App(props) {
    useEffect(() => {
        props.checkAuth();
    });
    return (
        <div>
            <Layout>
                <Suspense fallback={<div className={'abscent'}><Spinner /></div>}>
                    <Switch>
                        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
                        {props.isAuthenticated && <Route path="/orders" render={(props) => <Orders {...props} />} />}
                        <Route path="/sign-in" render={(props) => <Auth {...props} />} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" component={BurgerBuilder} />
                    </Switch>
                </Suspense>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps, { checkAuth })(App);
