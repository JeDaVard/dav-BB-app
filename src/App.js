import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuth } from './store/actions';

function App(props) {
    useEffect(() => {
        props.checkAuth();
    });
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    {props.isAuthenticated && <Route path="/orders" component={Orders} />}
                    <Route path="/sign-in" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" component={BurgerBuilder} />
                </Switch>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps, { checkAuth })(App);
