import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Button} from "@material-ui/core";
import {AUTH_TOKEN, GC_USER_ID, RESET_TOKEN} from '../constants';
import LinearDeterminate from "./LinearDeterminate";
import { makeStyles } from '@material-ui/core/styles';
import history from "../history";
import i18n from 'i18next';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarProvider, useSnackbar } from 'notistack';
const FORGET_PASSWORD = gql `mutation ($email:String!) { triggerPasswordReset(email: $email){ ok,resetToken }}`;
       
function ForgetPassword ({t}) {
 const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
       const confirm = async (data) => {
       saveUserData(data.triggerPasswordReset.resetToken);
      enqueueSnackbar(i18n.t('Check your email'));
     }

    const saveUserData =(resetToken) => {
        localStorage.setItem(RESET_TOKEN, resetToken);
    }
        
        return(
            <div>
                <Paper>
                <label  htmlFor="email">Email </label>
                <TextField type="text" value={email} onChange={e => setState( e.target.value )}/>
                <Mutation mutation={FORGET_PASSWORD}  variables={{ email } } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => this._confirm(data)}>
                    {( mutation,{loading, error}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
                        <Button onClick={mutation}>Submit</Button>)}}
                </Mutation>
                    </Paper>
            </div>
        )
    
   
}
export default withTranslation
