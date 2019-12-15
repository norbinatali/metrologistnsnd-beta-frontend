import React, { Component } from 'react';
import Navbar, { ElementsWrapper } from '../menu/navbar';
import SignUp from '../SignUp';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import history from "../history"
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import { AUTH_TOKEN , GC_USER_ID} from '../constants';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import '../style/login.css';
import ContactUS from "./ContactUS";
import Link from "@material-ui/core/Link";
import ForgetPassword from "./ForgetPassword";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import {Button} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import i18n from "../menu/translations/i18n";
import MenuTabPanel from "./MenuTabPanel";
import {withTranslation} from "react-i18next";
import { Link as RouterLink, withRouter } from 'react-router-dom';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    form: {
        width: '50%', // Fix IE 11 issue.
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    grid:{
        backgroundColor: "white"
    }
});



class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signup: true,
            login: true,
            id: "",
            email: '',
            password: '',
            email_signup: '',
            password_signup: '',
            name_signup: "",
            classes: true,
        };
    }
    render() {
        const { classes } = this.props;
        const { t } = this.props;
        const HELLO_QUERY = gql`mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
        const {email, password, id} = this.state;
        return (
          <div style={{marginLeft: "auto", marginRight:"auto", display:"flex"}}> 
                      <MuiThemeProvider>
         <Grid container spacing={5} >
                                  
                                   <Grid item xs={12} md={4} >
            <h3 style={{color:"#fff", marginTop:"50%"}}>{t("Login in")}</h3> <br/>
            </Grid>
                                    <Grid item xs={12} md={4} >
                                        <FormControl >
              
                <label style={{color:"#fff"}} htmlFor="email">{t('Email')} </label>
                <TextField
                    type="text"
                    value={this.state.email} fullWidth
                    
                    variant="outlined"
                    style={{backgroundColor:"#fff", height:"20%"}}
                    onChange={e => {
                        this.setState({ email: e.target.value })
                    }}
                />
                < label style={{color:"#fff"}} htmlFor="password">{t('Password')} </label>
                <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    style={{backgroundColor:"#fff",height:"20%"}}
                    value={this.state.password}
                    onChange={e => {
                        this.setState({ password: e.target.value })
                    }}
                /><br/>
                                        <Button style={{color:"#fff"}} link onClick={this.forgotpassword} >{t('Forgot Password')}</Button>
                <Mutation mutation={HELLO_QUERY}  variables={{ email, password,id } } onCompleted={() => this._confirm()}>
                    {mutation => (
                        <RaisedButton onClick={mutation}>{t('Submit')}
                        </RaisedButton>)}
                </Mutation>
                       <Typography style={{color:"#fff"}} variant="body1" >
                                    Don't have an account?{' '}
                                    <Link component={RouterLink} to="/signup" variant="h8" style={{color:"#fff"}}  >
                                        Sign up
                                    </Link>
                                </Typography>
                                    </FormControl> </Grid>
                                </Grid>
                </MuiThemeProvider>
                </div>
        )
    }
    _confirm = async data => {
        const { token } = this.state.login;
        if (this.state.login){
            this._saveUserData(token);
            history.push('/user')}
        else { history.push('/')}
    };
    _saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    }
}
export default withTranslation()(Login);

