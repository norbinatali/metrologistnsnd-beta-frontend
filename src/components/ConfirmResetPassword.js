import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";


 class ConfirmResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmresetpassword:true,
            id: "",
            email: '',
            password: '',
            classes: true,
            resetToken:RESET_TOKEN,


        };

    }

    render() {
        const RESET_PASSWORD = gql `mutation ($email:String!, $resetToken:String!,$password:String! ) { passwordReset(email: $email, resetToken: $resetToken, password: $password){ id resetToken password}}`;
        const { email, resetToken, password} = this.state;
       const { t } = this.props;
        return(
            <div>
                <Paper >
                    <label  htmlFor="password">{t('Password')} </label>
                    <TextField type="text" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}}/>
                    <Mutation mutation={RESET_PASSWORD}  variables={{email, resetToken, password } } onCompleted={() => this._confirm()}>
                        {mutation => (
                            <Button style={{color:"rgba(0,1,47,0.84)"}} onClick={mutation}>{t('Submit')}</Button>)}
                    </Mutation>

                </Paper>
            </div>

        )
    }
    _confirm =(resetToken) => {
         this._saveUserData(resetToken);

    };


    _saveUserData =(resetToken) => {
              localStorage.setItem(RESET_TOKEN, resetToken)
    }
}
export default withTranslation() (ConfirmResetPassword)
