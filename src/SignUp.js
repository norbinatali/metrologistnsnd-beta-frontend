import React, {Component} from 'react';

import gql from "graphql-tag";
import {AUTH_TOKEN, GC_USER_ID} from "./constants";
import {Mutation} from 'react-apollo'
import history from './history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import {
    Grid, Button, IconButton,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withTranslation} from "react-i18next";

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            signup:true,
            name:'',

        };

    }

    render(){
        const SIGNUP_MUTATION = gql `mutation ($email: String!, $password: String!, $name: String!){signup(email:$email , password: $password,name:$name){token}}`;
        const { email, password,name } = this.state;
         const { t } = this.props;
        const userId = localStorage.getItem(GC_USER_ID);
        return (
            <div>
            
              <MuiThemeProvider>
                <FormControl >
            <div style={{display: 'flex'}}>
                                <IconButton onClick={this._handleBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </div>
            <h3>{t('Registration')}</h3><br/>
       <label  htmlFor="email">{t('Email')} </label>
                    <TextField
                        type="text"
                        value={this.state.email}
                        onChange={e => {
                            this.setState({ email: e.target.value })
                        }}
                        required
                    />
       < label htmlFor="password">{t('Password')} </label>
                    <TextField
                        type="text"
                        value={this.state.password}
                        onChange={e => {
                            this.setState({ password: e.target.value })
                        }} required
                    />
       <label  htmlFor="name">{t'(Name')} </label>
                    <TextField
                        type="text"
                        value={this.state.name}
                        onChange={e => {
                            this.setState({ name: e.target.value })
                        }}
                    /><br/>
                    <Mutation mutation={SIGNUP_MUTATION}  variables={{ email, password, name } } onCompleted={() => this._confirm()}>
                        {signup => (
                            <RaisedButton onClick={signup}>{t('Submit')} </RaisedButton>)}
                    </Mutation>


                 </FormControl> </Grid>
                                                            </MuiThemeProvider></Grid>
            </div>
        );
    }

    _confirm = async data => {
        const {id, token } = this.state.signup;

        this._saveUserData(id, token);

    };

    _saveUserData = (id, token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    }

}
export default withTranslation()(SignUp)
