import React, {Component} from 'react';

import gql from "graphql-tag";
import {AUTH_TOKEN,CONFIRM_EMAIL, GC_USER_ID} from "../constants";
import {Mutation} from 'react-apollo'
import history from './history';
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


class PleaseConfirmEmail extends Component{
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
        const CONFRIM_EMAIL = gql `mutation ($email:String!, $emailConfirmToken:String! ) {confirmEmail(email:$email,emailConfirmToken:$emailConfirmToken){token} }`;
        const { email, emailConfirmToken, password} = this.state;
        const userId = localStorage.getItem(GC_USER_ID);
        const {t}= this.props;
        return (
            <div style={{height: '100%'}} >
                <MuiThemeProvider>

                            <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                                <Typography>{t('you confirmed your email!')}</Typography>
                             <Mutation mutation={CONFRIM_EMAIL}  variables={{ email,emailConfirmToken } } onCompleted={() => this._confirm()}>
                                    {confirm_email => (
                                        <RaisedButton onClick={confirm_email}>{t("Login Page")} </RaisedButton>)}
                                </Mutation>
                            </FormControl>

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

}
export default withTranslation()(PleaseConfirmEmail)
