import React, {Component} from 'react';

import gql from "graphql-tag";
import {AUTH_TOKEN,CONFIRM_EMAIL, GC_USER_ID} from "../constants";
import {Mutation} from 'react-apollo'
import history from "../history";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {withTranslation} from "react-i18next";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import {
    Grid, Button, IconButton,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class CheckYourEmail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail:true,
        };
    }
    componentDidMount() {
        const urlObj = new URL(window.location.href);
        const email = urlObj.searchParams.get('email');
        const emailConfirmToken = urlObj.searchParams.get('emailConfirmToken');
        this.setState({email, emailConfirmToken});

    }
    render(){

        const userId = localStorage.getItem(GC_USER_ID);
        const {t}= this.props;
        return (
            <div style={{height: '100%'}} >
                <MuiThemeProvider>
                    <Grid container style={{ height: '100%'}} >

                        <Grid item lg={5}>
                          
                        </Grid>
                        <Grid
                            item
                            lg={7}
                            xs={12}
                        >
                    <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <Typography>{t('Please Check your email to confirm!')}</Typography>
                    </FormControl>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }

    _confirm = async data => {
        const {id,emailConfirmToken } = this.state.confirmEmail;
        this._saveUserData(id, emailConfirmToken);
        history.push('/');

    };

    _saveUserData = (id, emailConfirmToken) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(CONFIRM_EMAIL, emailConfirmToken)
    }
    handleBack = () => {
        history.goBack();
    };
}
export default withTranslation()(CheckYourEmail)
