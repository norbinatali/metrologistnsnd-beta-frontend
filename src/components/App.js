import React, {Component} from 'react';
import '../style/App.css';
import Login from "./Login";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from "../SignUp";
import history from '../history';
import {GC_USER_ID, RESET_TOKEN as resetToken} from '../constants'
import CircularProgressLoading from "./CircularProgressLoading"
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
import Footer from "./Footer";
import History from "./History";
import WhatIsMetrology from "./WhatIsMetrology";
import HistoryMetrology from "./HistoryMetrology";
import UserProfile from "./UserProfile";
import StandardListGrid from "./StandardListGrid";
import ContactUS from "./ContactUS";
import WhatIsMetrologist from "./WhatIsMetrologist";
import LoginForm from "./LoginForm";
import FrontPageCarousel from "./FrontPageCarousel";
import ContactForm from "./ContactForm";
import ForumPage from "./ForumPage";
import MyDeviceInfo from "./MyDeviceInfo";
import QMS from "./QMS";
import TeamList from "./TeamList";
import TeamInfo from "./TeamInfo";
import ConfirmTeamMember from "./ConfirmTeamMember";
import MyDeviceActivity from "./MyDeviceActivity";
import MyDeviceSchedule from "./MyDeviceSchedule";
import MyDeviceSetting from "./MyDeviceSetting";
import PropTypes from "prop-types";
import {PrivateRoute} from "./routing/PrivateRouting";

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
                            <Route path="/" element={<FrontPageCarousel/>}/>
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
