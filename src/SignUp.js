import React, {Component} from 'react';

import history from './history';

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
            <div style={{height: "100%"}}>
                <Grid container style={{height: '100%'}}>
                    <Grid item>
                        <div style={{marginTop: "0px"}}>
                            <IconButton onClick={this.handleBack}>
                                <ArrowBackIcon style={{color: "rgba(0,1,47,0.84)"}}/>
                            </IconButton>
                        </div>
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
