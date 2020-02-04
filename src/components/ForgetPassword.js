import React, { useState, useEffect } from 'react';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';
import LinearDeterminate from "./LinearDeterminate";
import {
    fade, withStyles,
        makeStyles
} from '@material-ui/core/styles';
import history from "../history";
import i18n from 'i18next';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarProvider, useSnackbar } from 'notistack';
const FORGET_PASSWORD = gql `mutation ($email:String!) { triggerPasswordReset(email: $email){ ok,resetToken }}`;

const useStyles = makeStyles(theme => ({
    root: {
        width:"300px",
           height:"300px",
           marginTop:"10px",
           marginBottom:"10px",
           
        flexWrap: 'wrap',
    },
    margin: {
        color:"rgba(0,1,47,0.84)"
    },
}));
function ForgetPassword ({t}) {
 const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
       const confirm = async (data) => {
       saveUserData(data.triggerPasswordReset.resetToken);
      enqueueSnackbar(i18n.t('Check your email'));
     }

    const saveUserData =(resetToken) => {
        localStorage.setItem(RESET_TOKEN, resetToken);
    }
         const handleBack = () => {
        history.goBack();
    };

        return(
            <div> 
            <Grid container style={{ height: '100%'}} >
            <Grid item>
                    <div style={{marginTop:"0px"}} >
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon style={{color:"rgba(0,1,47,0.84)"}} />
                        </IconButton>
                    </div>
                    </Grid>
                    <Grid  item lg={10} xs={12} >
                <Paper class={classes.root}>
             <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>
                <label  htmlFor="email" style={{color:"rgba(0,1,47,0.84)"}}>{t('Email')} </label>
                <TextField type="text" fullWidth value={email} onChange={e => setEmail( e.target.value )}/>
                <Mutation mutation={FORGET_PASSWORD}  variables={{ email } } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                    {( mutation,{loading, error}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
                        <Button onClick={mutation}>{t('Submit')}</Button>)}}
                </Mutation>
                                       </FormControl>
                    </Paper>
                                       </Grid>
                                        </Grid>
            </div>
        )
    
   
}
export default withTranslation()(ForgetPassword)
