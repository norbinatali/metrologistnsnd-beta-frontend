import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
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
                <Grid container spacing={12}>
                    <Grid item xs={6} md={6}>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <LoginForm/>
                    </Grid>
                </Grid>
        )
    }
}

export default withTranslation()(Login);

