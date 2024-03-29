import React, {useState} from "react";
import {Button, TextField, FormControl, Paper} from "@mui/material";
import {withTranslation} from 'react-i18next';
import history from '../../../../history'
import CircularProgressLoading from "../../../../components/circularProgressLoading/CircularProgressLoading";
import {Mutation} from 'react-apollo';
import {useSnackbar} from 'notistack';
import PropTypes from "prop-types";
import {RESET_PASSWORD} from '../../../../graphql/mutations/Mutations'

const urlObj = new URL(window.location.href);

const ConfirmResetPassword = ({t}) => {
    const [password, setPassword] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const emailUrl = urlObj.searchParams.get('email');
    const resetTokenUrl = urlObj.searchParams.get('resetToken');

    const confirm = async () => {
        enqueueSnackbar('Your password has been changed. Пароль був змінено успішно');
        history.push('/')
    };
    return (
        <div>
            <Paper><Mutation mutation={RESET_PASSWORD}
                             variables={{email: emailUrl, resetToken: resetTokenUrl, password}}
                             onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                {(mutation, {loading}) => {
                    if (loading) {
                        return <CircularProgressLoading/>
                    }
                    return (
                        <FormControl>
                            <label htmlFor="password">{t('Password')} </label>
                            <TextField type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                            <Button style={{color: "rgba(0,1,47,0.84)"}} onClick={mutation}>{t('Submit')}</Button>
                        </FormControl>)
                }}
            </Mutation>
            </Paper>
        </div>
    )
}
ConfirmResetPassword.propTypes = {
    t: PropTypes.node.isRequired,
};
export default withTranslation()(ConfirmResetPassword)
