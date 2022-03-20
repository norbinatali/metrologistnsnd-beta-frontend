import React, {Component} from 'react';

import gql from "graphql-tag";
import {CONFIRM_EMAIL, GC_USER_ID} from "../constants";
import {Mutation} from 'react-apollo'
import history from "../history";
import {withTranslation} from "react-i18next";
import MenuForConfirm from './MenuForConfirm';
import {FormControl, Button, Typography} from '@mui/material';
import PropTypes from "prop-types";

class PleaseConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail: true,
            emailConfirmToken: '',
        };
    }

    componentDidMount() {
        const urlObj = new URL(window.location.href);
        const email = urlObj.searchParams.get('email');
        const emailConfirmToken = urlObj.searchParams.get('emailConfirmToken');
        this.setState({email, emailConfirmToken});
    }

    render() {
        const CONFRIM_EMAIL = gql`mutation ($email:String!, $emailConfirmToken:String! ) {confirmEmail(email:$email,emailConfirmToken:$emailConfirmToken){token} }`;
        const {email, emailConfirmToken} = this.state;
        const {t} = this.props;
        return (
            <div style={{height: '100%'}}>
                <MenuForConfirm/>
                <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                    <Typography>{t('you confirmed your email!')}</Typography>
                    <Mutation mutation={CONFRIM_EMAIL} variables={{email, emailConfirmToken}}
                              onCompleted={() => this._confirm()}>
                        {confirm_email => (
                            <Button onClick={confirm_email}>{t("Login Page")} </Button>)}
                    </Mutation>
                </FormControl>

            </div>
        );
    }

    _confirm = async () => {
        const {id, emailConfirmToken} = this.state.confirmEmail;
        this._saveUserData(id, emailConfirmToken);
        history.push('/');

    };

    _saveUserData = (id, emailConfirmToken) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(CONFIRM_EMAIL, emailConfirmToken)
    }
}

PleaseConfirmEmail.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(PleaseConfirmEmail)
