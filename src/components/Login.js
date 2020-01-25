import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import history from "../history"
import gql from 'graphql-tag';
import '../style/login.css';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import i18n from "../menu/translations/i18n";
import {withTranslation} from "react-i18next";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Auth from './Auth';

import LoginForm from './LoginForm'

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
    
        return (
          <div style={{marginLeft: "auto", marginRight:"auto", display:"flex"}}> 
                      <MuiThemeProvider>
         <Grid container spacing={5} >
                                  
                                   <Grid item xs={12} md={2} >
            
            </Grid>
                                    <Grid item xs={12} md={4} lg={8} >
                                        <LoginForm />
                          </Grid>
                                </Grid>
                </MuiThemeProvider>
                </div>
        )
    }
   
}
export default withTranslation()(Login);

