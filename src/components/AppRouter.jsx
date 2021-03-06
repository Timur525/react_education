import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
        ? <Switch>
            {privateRoutes.map( route => 
                <Route 
                    component={route.components} 
                    path={route.path} 
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to="/posts"></Redirect>
        </Switch>
        :<Switch>
            {publicRoutes.map( route => 
                <Route 
                    component={route.components} 
                    path={route.path} 
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to="/login"></Redirect>
        </Switch>
    )
};
export default AppRouter