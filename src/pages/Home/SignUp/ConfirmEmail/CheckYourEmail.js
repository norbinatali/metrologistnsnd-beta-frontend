import React, {Component} from 'react';

import {CONFIRM_EMAIL, GC_USER_ID} from "../../../../constants";

import history from "../../../../history";
import {withTranslation} from "react-i18next";
import {
    Grid, FormControl, IconButton,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from "prop-types";


class CheckYourEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail: true,
        };
    }

    componentDidMount() {
        const urlObj = new URL(window.location.href);
        const email = urlObj.searchParams.get('email');
        const emailConfirmToken = urlObj.searchParams.get('emailConfirmToken');
        this.setState({email, emailConfirmToken});
    }

    render() {
        const {t} = this.props;
        return (
            <div style={{height: '100%', width: "100%"}}>
                <Grid container style={{height: '100%',}}>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <IconButton onClick={this.handleBack}>
                            <ArrowBackIcon style={{color: "rgba(0,1,47,0.84)"}}/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                            <Typography
                                style={{color: "rgba(0,1,47,0.84)"}}>{t('Please Check your email to confirm')}</Typography>
                        </FormControl>
                    </Grid>
                </Grid>
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
    handleBack = () => {
        history.goBack();
    };
}
CheckYourEmail.propTypes = {
    t: PropTypes.node.isRequired,
};
export default withTranslation()(CheckYourEmail)
