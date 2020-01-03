import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';

import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";


export default class ConfirmResetPassword extends Component {

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
        const RESET_PASSWORD = gql `mutation ($email:String!, $resetToken:String!,$password:String! ) { passwordReset(email: $email, resetToken: $resetToken, password: $password){ id}}`;
        const { email, resetToken, password} = this.state;

        return(
            <div>
                <Paper >
                    <label  htmlFor="password">Password </label>
                    <TextField type="text" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}}/>
                    <Mutation mutation={RESET_PASSWORD}  variables={{email, resetToken, password } } onCompleted={() => this._confirm()}>
                        {mutation => (
                            <Button style={{color:"rgba(0,1,47,0.84)"}} onClick={mutation}>Submit</Button>)}
                    </Mutation>

                </Paper>
            </div>

        )
    }
    _confirm =() => {

        const {resetToken} = this.props.confirmresetpassword;
        this._saveUserData(resetToken);

    };


    _saveUserData =(id, token, resetToken) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(RESET_TOKEN, resetToken)
    }
}
