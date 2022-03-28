import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
    Grid,
    FormControl,
    Button,
    Snackbar,
    TextField,
    Link,
    Typography
} from '@mui/material';
import {withTranslation} from "react-i18next";
import {Mutation} from 'react-apollo';
import {LOGIN_QUERY} from "../../../graphql/mutations/Mutations"
import Auth from "../Auth/Auth";
import history from "../../../history";
import i18n from 'i18next';
import {AUTH_TOKEN, GC_USER_ID} from "../../../constants";
import {useSnackbar} from 'notistack';
import MenuTabPanel from "../../../components/menu/MenuTabPanel";
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading"

const schema = {
    email: {
        presence: {allowEmpty: false, message: 'is required'},
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: {allowEmpty: false, message: 'is required'},
        length: {
            maximum: 128
        }
    }
};

const LoginForm = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {id} = React.useState("");
    const [email, setStateEmail] = useState("");
    const [password, setStatePassword] = useState("");
    const [formState, setFormState] = React.useState({
        isValid: false,
        values: {email, password},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState(formState => ({
            ...formState,
            isValid: !errors,
            errors: errors || {}
        }));
    }, [formState.values]);

    const confirm = async (data) => {
        saveUserData(data.login.token);
        Auth.authenticate();
        history.push('/user')
        enqueueSnackbar(i18n.t('Welcome'))

    };
    const saveUserData = (token, id) => {
        localStorage.setItem(AUTH_TOKEN, token)
        localStorage.setItem(GC_USER_ID, id);
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <MenuTabPanel/>
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Mutation mutation={LOGIN_QUERY} variables={{email, password, id}}
                              onError={(error) => enqueueSnackbar(error.message)}
                              onCompleted={(data) => confirm(data)}>
                        {(mutation, {loading, error}) => {
                            if (loading) {
                                return (<CircularProgressLoading/>)
                            }

                            return (
                                <FormControl>
                                    <h3>{"Login in"}</h3> <br/>
                                    <label htmlFor="email">{'Email'} </label>
                                    <TextField
                                        type="text"
                                        name={"email"}
                                        placeholder={"example@example.com"}
                                        value={formState.values.email || ''}
                                        fullWidth
                                        size="medium"
                                        error={hasError('email')}
                                        helperText={hasError('email') ? formState.errors.email[0] : null}
                                        variant="outlined"
                                        onChange={(e) => {
                                            setStateEmail(e.target.value);
                                            e.persist();
                                            setFormState(formState => ({
                                                    ...formState,
                                                    values: {
                                                        ...formState.values,
                                                        [e.target.name]:
                                                            e.target.type === 'checkbox'
                                                                ? e.target.checked
                                                                : e.target.value
                                                    },
                                                    touched: {
                                                        ...formState.touched,
                                                        [e.target.name]: true
                                                    }
                                                }
                                            ));
                                        }}
                                    />
                                    <label htmlFor="password">{'Password'} </label>
                                    <TextField
                                        type="password"
                                        size="medium"
                                        name={"password"}
                                        fullWidth
                                        error={hasError('password')}
                                        helperText={
                                            hasError('password') ? formState.errors.password[0] : null
                                        }
                                        variant="outlined"
                                        value={formState.values.password || ''}
                                        onChange={e => {
                                            setStatePassword(e.target.value)
                                            e.persist();
                                            setFormState(formState => ({
                                                    ...formState,
                                                    values: {
                                                        ...formState.values,
                                                        [e.target.name]:
                                                            e.target.type === 'checkbox'
                                                                ? e.target.checked
                                                                : e.target.value
                                                    },
                                                    touched: {
                                                        ...formState.touched,
                                                        [e.target.name]: true
                                                    }
                                                }
                                            ));
                                        }
                                        }
                                    /><br/>
                                    <Link component={RouterLink} to="/reset-your-password" variant="h8">
                                        {'Forgot password?'}
                                    </Link><br/>
                                    <Button disabled={!formState.isValid} onClick={mutation}>{'Submit'}
                                    </Button>
                                    <Typography variant="body1">
                                        {'Dont have an account?'}{' '}
                                        <Link component={RouterLink} to="/signup" variant="h8">
                                            {'Sign up'}
                                        </Link>
                                    </Typography>
                                </FormControl>
                            )
                        }}

                    </Mutation>
                    <Snackbar open={open} onClose={() => setOpen(false)}
                              message={<span>error.message</span>} autoHideDuration={6000}/>
                </Grid>
            </Grid>
        </div>
    )

}

export default withTranslation()(LoginForm)
