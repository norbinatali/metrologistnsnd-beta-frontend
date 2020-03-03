import React, {Component, useState} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import history from '../history'
import gql from 'graphql-tag';
import LinearDeterminate from "./LinearDeterminate";
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";
import { SnackbarProvider, useSnackbar } from 'notistack';

const RESET_PASSWORD = gql `mutation ($email:String!, $resetToken:String!,$password:String! ) { passwordReset(email: $email, resetToken: $resetToken, password: $password){ id email  }}`;
const urlObj = new URL(window.location.href);
function ConfirmResetPassword ({t}) {
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
const emailUrl = urlObj.searchParams.get('email');
const resetTokenUrl = urlObj.searchParams.get('resetToken');
        
    const confirm =async (data) => {
      
        enqueueSnackbar('Your password has been changed. Пароль був змінено успішно');
        history.push('/')

    };
        return(
            <div>
                <Paper ><Mutation mutation={RESET_PASSWORD}  variables={{email:emailUrl, reserToken:resetTokenUrl, password } } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => this._confirm(data)}>
                        {( mutation,{loading}) => {
                if (loading) {return <LinearDeterminate />}
                              console.log(emailUrl)
                              console.log(resetTokenUrl)
                     return(
                    <label  htmlFor="password">{t('Password')} </label>
                    <TextField type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                     
                            <Button style={{color:"rgba(0,1,47,0.84)"}} onClick={mutation}>{t('Submit')}</Button>)}
                    </Mutation>

                </Paper>
            </div>

        )
    
   


}
export default withTranslation() (ConfirmResetPassword)
