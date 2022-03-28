import React, {Component} from 'react';
import './App.scss';
import Login from "../Home/LoginForm/LoginForm";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from "../Home/SignUp/SignUpForm";
import history from '../../history';
import {GC_USER_ID, RESET_TOKEN as resetToken} from '../../constants'
import ForgetPassword from "../Home/ResetPassword/ForgetPassword";
import ConfirmResetPassword from "../Home/ResetPassword/ConfirmResetPassword/ConfirmResetPassword";
import AddDevice from "../Devices/AddDevice/AddDevice";
import PleaseConfirmEmail from "../Home/SignUp/ConfirmEmail/PleaseConfirmEmail";
import CheckYourEmail from "../Home/SignUp/ConfirmEmail/CheckYourEmail";
import Auth from "../Home/Auth/Auth";
import Dashboard from "../../components/Dashboard";
import MyDevice from "../Devices/Dashboard/MyDevice";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import HomeDashboard from "../Home/Dashboard/HomeDashboard"
import UserProfile from "../UserProfile/UserProfile";
import LoginForm from "../Home/LoginForm/LoginForm";
import ContactForm from "../ContactUS/ContactForm";
import ForumPage from "../Forum/ForumPage";
import MyDeviceInfo from "../Devices/Info/MyDeviceInfo";
import MyDeviceActivity from "../Devices/Activity/MyDeviceActivity";
import MyDeviceSetting from "../Devices/Settings/MyDeviceSetting";
import PropTypes from "prop-types";
import {PrivateRoute} from "../../router/PrivateRouting";

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
                <Header/>
                <div className="body">
                    <BrowserRouter history={history}>
                        <Routes>
                            <Route path="/" element={<HomeDashboard/>}/>
                            <Route path="/check-email" element={<CheckYourEmail/>}/>
                            <Route path="/confirm-email" element={<PleaseConfirmEmail/>}/>
                            <Route exact path="/reset-your-password" element={<ForgetPassword/>}/>
                            <Route exact path="/login" element={<LoginForm/>}/>
                            <Route exact path="/contact" element={<ContactForm/>}/>
                            <Route exact path="/reset-password" element={<ConfirmResetPassword/>}/>
                            <Route exact path="/signup" element={<SignUp/>}/>
                            <Route path="/dashboard" element={<PrivateRoute component={Dashboard}/>}/>
                            <Route path="/add-device" element={<PrivateRoute component={AddDevice}/>}/>
                            <Route exact path="/mydevices" element={<PrivateRoute component={MyDevice}/>}/>
                            <Route path="/account" element={<PrivateRoute component={UserProfile}/>}/>
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
