import React, {Component} from 'react';
import '../style/App.css';
import Login from "./Login";
import {Switch,Route,Redirect} from 'react-router-dom'
import SignUp from "../SignUp";
import history from '../history';
import {Router} from "react-router-dom";
import { GC_USER_ID, RESET_TOKEN as resetToken} from '../constants'
import ForgetPassword from "./ForgetPassword";
import ConfirmResetPassword from "./ConfirmResetPassword";
import MenuTabPanel from "./MenuTabPanel";
import AddDevice from "./AddDevice";
import PleaseConfirmEmail from "./PleaseConfirmEmail";
import CheckYourEmail from "./CheckYourEmail";
import Auth from "./Auth";
import Standards from "./Standards";
import StandardsM from "./StandardsM";
import StandardsEM from "./StandardsEM";
import StandardsT from "./StandardsT";
import StandardsTF from "./StandardsTF";
import StandardsPR from "./StandardsPR";
import StandardsIR from "./StandardsIR";
import StandardsAUV from "./StandardsAUV";
import StandardsQM from "./StandardsQM";
import Dashboard from "./Dashboard";
import MyDevice from "./MyDevice";
import History from "./History";
import WhatIsMetrology from "./WhatIsMetrology";
import HistoryMetrology from "./HistoryMetrology";
import UserProfile from "./UserProfile";
import StandardListGrid from "./StandardListGrid";
import ContactUS from "./ContactUS";
import WhatIsMetrologist from "./WhatIsMetrologist";

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

                           
                           <PrivateRoute path="/user" component={Dashboard} />
                           <PrivateRoute path="/dashboard" component={Dashboard} />
                           <PrivateRoute path="/metrology" component={History} />
                           <PrivateRoute path="/what-is-metrologist" component={WhatIsMetrologist} />
                           <PrivateRoute path="/what-is-metrology" component={WhatIsMetrology} />
                           <PrivateRoute path="/history-metrology" component={HistoryMetrology} />
                           <PrivateRoute path="/what-is-conformity-assessment" component={History} />
                           <PrivateRoute path="/modules" component={History} />
                           <PrivateRoute path="/technical-reglaments" component={History} />
                           <PrivateRoute path="/procedure-conformity-assessment" component={History} />
                           <PrivateRoute path="/what-is-quality-system" component={History} />
                           <PrivateRoute path="/documents-of-quality-system" component={History} />
                           <PrivateRoute path="/add-device" component={AddDevice} />
                           <PrivateRoute path="/mydevices" component={MyDevice} />
                           
                           <PrivateRoute path="/account" component={UserProfile} />
                           <PrivateRoute path="/contactus" component={ContactUS} />
                         
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
