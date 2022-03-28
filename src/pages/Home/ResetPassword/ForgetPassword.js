import React, {useState} from 'react';
import {withTranslation} from "react-i18next";
import {TextField, FormControl, IconButton, Grid, Button, Paper} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {RESET_TOKEN} from '../../../constants';
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading";
import history from "../../../history";
import i18n from 'i18next';
import {Mutation} from 'react-apollo';
import {useSnackbar} from 'notistack';
import PropTypes from "prop-types";
import {FORGET_PASSWORD} from '../../../graphql/mutations/Mutations';

const ForgetPassword = ({t}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [email, setEmail] = useState('');
    const confirm = async (data) => {
        saveUserData(data.triggerPasswordReset.resetToken);
        enqueueSnackbar(i18n.t('Check your email'));
    }

    const saveUserData = (resetToken) => {
        localStorage.setItem(RESET_TOKEN, resetToken);
    }
    const handleBack = () => {
        history.goBack();
    };
    return (
        <div>
            <Grid container style={{height: '100%'}}>
                <Grid item>
                    <div style={{marginTop: "0px"}}>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIosIcon style={{color: "rgba(0,1,47,0.84)"}}/>
                        </IconButton>
                    </div>
                </Grid>
                <Grid item lg={10} xs={12}>
                    <Paper>
                        <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width: "100%"}}>
                            <label htmlFor="email" style={{color: "rgba(0,1,47,0.84)"}}>{t('Email')} </label>
                            <TextField type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)}/>
                            <Mutation mutation={FORGET_PASSWORD} variables={{email}}
                                      onError={(error) => enqueueSnackbar(error.message)}
                                      onCompleted={(data) => confirm(data)}>
                                {(mutation, {loading, error}) => {
                                    if (loading) {
                                        return (<CircularProgressLoading/>)
                                    }

                                    return (
                                        <Button onClick={mutation}>{t('Submit')}</Button>)
                                }}
                            </Mutation>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
ForgetPassword.propTypes = {
    t: PropTypes.node.isRequired
};
export default withTranslation()(ForgetPassword)
