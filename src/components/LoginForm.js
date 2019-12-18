import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withTranslation} from "react-i18next";
import {
    fade, withStyles,
        makeStyles
} from '@material-ui/core/styles';
import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import FormControl from "@material-ui/core/FormControl";
import RaisedButton from "material-ui/RaisedButton";
import Auth from "./Auth";
import history from "../history";
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import LinearDeterminate from "./LinearDeterminate";
const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

const CssTextField = withStyles({
    root: {
        '& .Mui-focused': {
            color: '#fff',
        },
        '& text.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
            color:"#fff"

        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#fff',


            },
            '&:hover fieldset': {
                borderColor: 'primary',
                color:"green"
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
                color:"green"
            },
        },
    },
})(TextField);
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        color:"#fff"
    },
}));

function LoginForm({t},props){
    const HELLO_QUERY = gql`mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
    const {email, password, id,text} = useState("");
    const {login} = useState (true);
    const classes = useStyles();
const [state, setState]=useState("");
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
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

    const handleBack = () => {
        history.goBack();
    };

        const confirm = async (data, e) => {
         e.preventDefault();
        const { token } = login;
        if (login){
            saveUserData(token);
            Auth.authenticate();
            history.push('/user')}
        else { history.push('/')}
    };
     const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);

    return (
        <Mutation mutation={HELLO_QUERY}  variables={{ email, password,id } } onCompleted={() => confirm()}>
            {( mutation,{loading, error, event}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
        <FormControl >
            <h3 style={{color:"#fff", marginTop:"50%"}}>{t("Login in")}</h3> <br/>
            <label style={{color:"#fff"}} htmlFor="email">{t('Email')} </label>
            <CssTextField
                type="text"
                name={"email"}
                label={email}
                placeholder={"example@example.com"}
                value={email&&(formState.values.email || '')} fullWidth
                size="medium"
                error={hasError('email')}
                helperText={hasError('email')? formState.errors.email[0] : null}
                variant="outlined"
                className={classes.margin}
                onChange={e => {
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
                        setState({ email: e.target.value });

                }}
            />
            < label style={{color:"#fff"}} htmlFor="password">{t('Password')} </label>
            <CssTextField
                type="password"
                size="medium"
                name={"password"}
                fullWidth
                error={hasError('password')}

                helperText={
                    hasError('password') ? formState.errors.password[0] : null
                }
                variant="outlined"

                value={password&&(formState.values.password || '')}
                onChange={e => {
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
                        }));
                    setState({ password: e.target.value })
                }}
            /><br/>
                        <RaisedButton disabled={!formState.isValid} onClick={mutation}>{t('Submit')}
                        </RaisedButton>
            <Typography style={{color:"#fff"}} variant="body1" >
                {t('Don't have an account?')}{' '}
                <Link component={RouterLink} to="/signup" variant="h8" style={{color:"#fff"}}  >
                    {t('Sign up')}
                </Link>
            </Typography>
        </FormControl>
                )}}

        </Mutation>
    )


}
LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withTranslation()(LoginForm)
