import React, { useState, useEffect } from 'react';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
                <div  >
               <IconButton  justify={"left"} onClick={handleBack}>
                            <ArrowBackIcon style={{color:"rgba(0,1,47,0.84)"}} />
                        </IconButton>
               </div>
                <Paper class={classes.root}>
                <label  htmlFor="email" style={{color:"#00000"}}>{t('Email')} </label>
                <TextField type="text" value={email} onChange={e => setEmail( e.target.value )}/><br/>
                <Mutation mutation={FORGET_PASSWORD}  variables={{ email } } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                    {( mutation,{loading, error}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
                        <Button onClick={mutation}>Submit</Button>)}}
                </Mutation>
                    </Paper>
            </div>
        )
    
   
}
export default withTranslation()(ForgetPassword)
