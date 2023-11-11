import React, {Component} from 'react';
import './App.scss';


export default function App() {
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
