import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';

import { makeStyles } from '@material-ui/core/styles';
import history from "../history";
import i18n from 'i18next';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarProvider, useSnackbar } from 'notistack';

export default class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forgetpassword:true,
            id: "",
            email: '',
            password: '',
            classes: true,
            
        };
    }

    render() {
        const FORGET_PASSWORD = gql `mutation ($email:String!) { triggerPasswordReset(email: $email){ ok,resetToken }}`;
        const { enqueueSnackbar } = this.props;
        const { email} = this.state;
        return(
            <div>
                <Paper>
                <label  htmlFor="email">Email </label>
                <TextField type="text" value={this.state.email} onChange={e => {this.setState({ email: e.target.value })}}/>
                <Mutation mutation={FORGET_PASSWORD}  variables={{ email } } onError={(error) => this.props.enqueueSnackbar(error.message)} onCompleted={(data) => this._confirm(data)}>
                    {( mutation,{loading, error}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
                        <Button onClick={mutation}>Submit</Button>)}}
                </Mutation>
                    </Paper>
            </div>
        )
    }
    _confirm = async (data) => {
        this._saveUserData(data.triggerPasswordReset.resetToken);
        this.props.enqueueSnackbar(i18n.t('Check your email')
       
           };

    _saveUserData =( resetToken) => {
        localStorage.setItem(RESET_TOKEN, resetToken);
    }
}
