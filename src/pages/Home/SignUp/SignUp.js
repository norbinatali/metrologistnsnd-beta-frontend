import React, {Component} from 'react';

import history from '../../../history';

import {withTranslation} from "react-i18next";
import {IconButton, Grid} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignUpForm from "./SignUpForm";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signup: true,
            name: '',
            companyName: "",
        };
    }
    render() {
        return (
            <div>
                <Grid container spacing={12}>
                    <Grid item>
                            <IconButton onClick={this.handleBack}>
                                <ArrowBackIcon/>
                            </IconButton>
                    </Grid>
                    <Grid item lg={10} xs={12}>
                        <SignUpForm/>
                    </Grid>
                </Grid>
            </div>
        );
    }

    handleBack = () => {
        history.goBack();
    };
}

export default withTranslation()(SignUp)
