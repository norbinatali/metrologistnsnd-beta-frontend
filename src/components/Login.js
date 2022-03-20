import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import '../style/login.css';
import {withTranslation} from "react-i18next";


import LoginForm from './LoginForm'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: true,
            login: true,
            id: "",
            email: '',
            password: '',
            email_signup: '',
            password_signup: '',
            name_signup: "",
            classes: true,
        };
    }

    render() {
        return (
            <div style={{marginLeft: "auto", marginRight: "auto", display: "flex"}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={2}>
                    </Grid>
                    <Grid item xs={12} md={4} lg={8}>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withTranslation()(Login);

