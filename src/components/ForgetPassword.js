import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';

import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";


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
        const { email} = this.state;
        return(
            <div>
                <Paper>
                <label  htmlFor="email">Email </label>
                <TextField type="text" value={this.state.email} onChange={e => {this.setState({ email: e.target.value })}}/>
                <Mutation mutation={FORGET_PASSWORD}  variables={{ email } } onCompleted={() => this._confirm()}>
                    {mutation => (
                        <Button onClick={mutation}>Submit</Button>)}
                </Mutation>
                    </Paper>
            </div>
        )
    }
    _confirm = async (data) => {
        const {resetToken} = this.props.forgetpassword;
        console.log(resetToken);
        this._saveUserData(resetToken);
           };

    _saveUserData =(id, token, resetToken) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(RESET_TOKEN, resetToken);
    }
}
