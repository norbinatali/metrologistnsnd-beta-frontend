import React, {Component} from 'react';
import './App.scss';
import Login from "../Home/LoginForm/Login";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from "../Home/SignUp/SignUp";
import history from '../../history';
import {GC_USER_ID, RESET_TOKEN as resetToken} from '../../constants'
import CircularProgressLoading from "../../components/CircularProgressLoading"
import ForgetPassword from "../../components/ForgetPassword";
import ConfirmResetPassword from "../../components/ConfirmResetPassword";
import MenuTabPanel from "../../components/menu/MenuTabPanel";
import AddDevice from "../../components/AddDevice";
import PleaseConfirmEmail from "../../components/PleaseConfirmEmail";
import CheckYourEmail from "../../components/CheckYourEmail";
import Auth from "../Home/Auth/Auth";
import Standards from "../../components/Standards";
import StandardsM from "../../components/StandardsM";
import StandardsEM from "../../components/StandardsEM";
import StandardsT from "../../components/StandardsT";
import StandardsTF from "../../components/StandardsTF";
import StandardsPR from "../../components/StandardsPR";
import StandardsIR from "../../components/StandardsIR";
import StandardsAUV from "../../components/StandardsAUV";
import StandardsQM from "../../components/StandardsQM";
import Dashboard from "../../components/Dashboard";
import MyDevice from "../../components/MyDevice";
import Footer from "../../components/Footer";
import History from "../../components/History";
import WhatIsMetrology from "../../components/WhatIsMetrology";
import HistoryMetrology from "../../components/HistoryMetrology";
import UserProfile from "../../components/UserProfile";
import StandardListGrid from "../../components/StandardListGrid";
import ContactUS from "../ContactUS/ContactUS";
import WhatIsMetrologist from "../../components/WhatIsMetrologist";
import LoginForm from "../Home/LoginForm/LoginForm";
import FrontPage from "../Home/FrontPage/FrontPage";
import ContactForm from "../ContactUS/ContactForm";
import ForumPage from "../../components/ForumPage";
import MyDeviceInfo from "../../components/MyDeviceInfo";
import QMS from "../../components/QMS";
import TeamList from "../../components/TeamList";
import TeamInfo from "../../components/TeamInfo";
import ConfirmTeamMember from "../../components/ConfirmTeamMember";
import MyDeviceActivity from "../../components/MyDeviceActivity";
import MyDeviceSchedule from "../../components/MyDeviceSchedule";
import MyDeviceSetting from "../../components/MyDeviceSetting";
import PropTypes from "prop-types";
import {PrivateRoute} from "../../components/routing/PrivateRouting";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fakeRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();  // removing the spinner element
                this.setState({loading: false}); // showing the app

            }
        });
    }

    fakeRequest = () => {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    };

    render() {
        const userId = localStorage.getItem(GC_USER_ID);
        if (this.state.loading) {
            return null; //app is not ready (fake request is in process)
        }

        return (
            <div className="App">
                <div className="App-header">
                    <BrowserRouter history={history}>
                        <Routes>
                            <Route path="/" element={<FrontPage/>}/>
                            <Route path="/check-email" element={<CheckYourEmail/>}/>
                            <Route path="/confirm-email" element={<PleaseConfirmEmail/>}/>
                            <Route exact path="/reset-your-password" element={<ForgetPassword/>}/>
                            <Route exact path="/login" element={<LoginForm/>}/>
                            <Route exact path="/contact" element={<ContactForm/>}/>
                            <Route exact path="/reset-password" element={<ConfirmResetPassword/>}/>
                            <Route exact path="/signup" element={<SignUp/>}/>
                            <Route path="/create-team" element={<ConfirmTeamMember/>}/>
                            <Route path="/dashboard" element={<PrivateRoute component={Dashboard}/>}/>
                            <Route path="/user" element={<PrivateRoute component={Dashboard}/>}/>
                            <Route path="/metrology" element={<PrivateRoute component={History}/>}/>
                            <Route path="/add-device" element={<PrivateRoute component={AddDevice}/>}/>
                            <Route exact path="/mydevices" element={<PrivateRoute component={MyDevice}/>}/>
                            <Route exact path="/team" element={<PrivateRoute component={TeamList}/>}/>
                            <Route path="/team/:teamID" element={<PrivateRoute component={TeamInfo}/>}/>
                            <Route path="/mydevices/:deviceName" element={<PrivateRoute component={MyDeviceInfo}/>}/>
                            <Route path="/mydevices/:deviceName/activity" element={<PrivateRoute component={MyDeviceActivity}/>}/>
                            <Route path="/mydevices/:deviceName/schedule" element={<PrivateRoute component={MyDeviceSchedule}/>}/>
                            <Route path="/mydevices/:deviceName/setting" element={<PrivateRoute component={MyDeviceSetting}/>}/>
                            <Route path="/account" element={<PrivateRoute component={UserProfile}/>}/>
                            <Route path="/contactus" element={<PrivateRoute component={ContactUS}/>}/>
                            <Route path="/sand" element={<PrivateRoute component={QMS}/>}/>
                            <Route path="/sand/:sandNumber" element={<PrivateRoute component={QMS}/>}/>
                            <Route path="/standards-L" element={<PrivateRoute component={Standards}/>}/>
                            <Route path="/standards" element={<PrivateRoute component={StandardListGrid}/>}/>
                            <Route path="/standards-M" element={<PrivateRoute component={StandardsM}/>}/>
                            <Route path="/standards-EM" element={<PrivateRoute component={StandardsEM}/>}/>
                            <Route path="/standards-TF" element={<PrivateRoute component={StandardsTF}/>}/>
                            <Route path="/standards-PR" element={<PrivateRoute component={StandardsPR}/>}/>
                            <Route path="/standards-IR" element={<PrivateRoute component={StandardsIR}/>}/>
                            <Route path="/standards-AUV" element={<PrivateRoute component={StandardsAUV}/>}/>
                            <Route path="/standards-IR" element={<PrivateRoute component={StandardsIR}/>}/>
                            <Route path="/standards-QM" element={<PrivateRoute component={StandardsQM}/>}/>
                            <Route path="/what-is-metrologist" element={<PrivateRoute component={WhatIsMetrologist}/>}/>
                            <Route path="/what-is-metrology" element={<PrivateRoute component={WhatIsMetrology}/>}/>
                            <Route path="/history-metrology" element={<PrivateRoute component={HistoryMetrology}/>}/>
                            <Route path="/modules" element={<PrivateRoute component={History}/>}/>
                            <Route path="/technical-reglaments" element={<PrivateRoute component={History}/>}/>
                            <Route path="/what-is-conformity-assessment" element={<PrivateRoute component={History}/>}/>
                            <Route path="/forum" element={<PrivateRoute component={ForumPage}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default App;
