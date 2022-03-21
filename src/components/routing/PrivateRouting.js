
import { Navigate } from 'react-router-dom'
import Auth from "../../pages/Home/Auth/Auth";
import PropTypes from "prop-types";
import React from "react";

export const PrivateRoute = ({component: RouteComponent}) => {
    return Auth.getAuth() ? (
        <RouteComponent/>
    ) : (
        <Navigate to={{pathname: "/"}}
        />
    )};

PrivateRoute.propTypes = {
    component: PropTypes.func
}
