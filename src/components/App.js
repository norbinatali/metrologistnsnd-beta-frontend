import React, {Component} from 'react';
import '../style/App.css';
import Login from "./Login";
import {Switch,Route,Redirect} from 'react-router-dom'
import SignUp from "../SignUp";
import history from '../history';
import {Router} from "react-router-dom";
import { GC_USER_ID, RESET_TOKEN as resetToken} from '../constants'
import UserMenu from "./UserMenu";
import ForgetPassword from "./ForgetPassword";
import ConfirmResetPassword from "./ConfirmResetPassword";
import MenuTabPanel from "./MenuTabPanel";
import AddDevice from "./AddDevice";
import PleaseConfirmEmail from "./PleaseConfirmEmail";
import CheckYourEmail from "./CheckYourEmail";
import Auth from "./Auth";
import Standards from "./Standards";
import Dashboard from "./Dashboard";
import MyDevice from "./MyDevice";
import History from "./History";
import StandardListGrid from "./StandardListGrid";

class App extends Component {

    render() {
        const userId = localStorage.getItem(GC_USER_ID);

        return (

            <div className="App">
                <div className="App-header">

                    <Switch>
                    <Router history={history}>
                    <Route exact path="/" component={MenuTabPanel} />
                    <Route path={"/check-email"} component={CheckYourEmail}/>
                    <Route path={"/confirm-email"} component={PleaseConfirmEmail}/>
                    <Route path="/reset-password" component={ForgetPassword} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path={"/reset-password/"+resetToken} component={ConfirmResetPassword}/>
                    <Route exact path="/signup" component={SignUp} />

                           
                           <PrivateRoute path="/user" component={UserMenu} />
                           <PrivateRoute path="/dashboard" component={Dashboard} />
                           <PrivateRoute path="/mydevices" component={MyDevice} />
                           <PrivateRoute path="/metrology" component={History} />
                           <PrivateRoute path="/add-device" component={AddDevice} />
                           <PrivateRoute path="/standards/L" component={Standards} />
                           <PrivateRoute path="/standards" component={StandardListGrid} />
                            
                        </Router>
                    </Switch>

                </div>
            </div> )
    }
}
            
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/" }}
                />
            )
        }
    />
);


export default App;
