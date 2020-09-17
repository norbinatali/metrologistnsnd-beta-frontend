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
import Auth from './components/Auth'
import history from "./history";
import CircularProgressLoading from "./components/CircularProgressLoading";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarProvider, useSnackbar } from 'notistack';
import i18n from 'i18next';
import {AUTH_TOKEN, GC_USER_ID,GC_AUTH_TOKEN} from "./constants";
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

const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'transparent',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&$focused': {
            backgroundColor: 'transparent',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        
    },
}));
 const SIGNUP_MUTATION = gql `mutation ($email: String!, $password: String!, $name: String!, $companyName:String){signup(email:$email , password: $password,name:$name, companyName: $companyName){token}}`;
   
function SignUpForm({t},props){
    const { enqueueSnackbar } = useSnackbar();
    const [email, setStateEmail]=useState("");
    const [password, setStatePassword]=useState("");
    const [name, setStateName]=useState("");
    const [companyName, setStateCompanyName]=useState("");
      const [country, setStateCountry]=useState("");
    const classes = useStyles();
    const [state, setState]=useState("");
    const [formState, setFormState] = useState({
        isValid: false,
        values: {email, password,name},
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

    const confirm = async (token, e) => {

       enqueueSnackbar(i18n.t('Please Check your email to confirm'))
        saveUserData(token);
        history.push('/')
    };
    const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(GC_AUTH_TOKEN, token)
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);

    return (
        <Mutation mutation={SIGNUP_MUTATION}  variables={{ email, password,name, companyName, country} } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(token) => confirm(token)}>
            {( signup,{loading, error, event}) => {
                if (loading) { return (<CircularProgressLoading /> )}

                return(
                    <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>
                        <h3 style={{color:"rgba(0,1,47,0.84)"}} >{t("Registration")}</h3><br/>

                        <label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="email">{t("Email")} </label>
                        <RedditTextField
                            type="text"
                            name={"email"}
                            placeholder={"example@example.com"}
                            value={formState.values.email || ''} 
                             fullWidth
                            size="medium"
                            error={hasError('email')}
                            helperText={hasError('email')? formState.errors.email[0] : null}
                            variant="outlined"
                            className={classes.margin}
                            onChange={e => {
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
                                }));
                            }}
                            required
                        />
                        < label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="password">{t("Password")} </label>
                        <RedditTextField
                            type="password"
                            size="medium"
                            name={"password"}
                            fullWidth
                            error={hasError('password')}
                            helperText={hasError('password') ? formState.errors.password[0] : null}
                            variant="outlined"
                            value={formState.values.password || ''}
                            onChange={e => {setStatePassword(e.target.value )
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

                            }} required
                        />
                        <label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="name">{t("Name")} </label>
                        <RedditTextField
                            type="name"
                            size="medium"
                            name={"name"}
                            fullWidth
                            error={hasError('name')}

                            helperText={
                                hasError('name') ? formState.errors.name[0] : null
                            }
                            variant="outlined"
                            value={formState.values.name || ''}
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
                                setStateName(e.target.value)
                            }}
                        />
                        <label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="companyName">{t("Company Name")} </label>
                        <RedditTextField
                            type="companyName"
                            size="medium"
                            name={"companyName"}
                            fullWidth
                            variant="outlined"
                            value={companyName}
                            onChange={e => {setStateCompanyName(e.target.value );
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

                            }}

                        /><label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="country">{t("Country")} </label>
                        <RedditTextField
                            type="country"
                            size="medium"
                            name={"country"}
                            fullWidth
                            variant="outlined"
                            value={country}
                            onChange={e => {setStateCountry(e.target.value );
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

                            }}

                        /><br/>
                                    <RaisedButton disabled={!formState.isValid} style={{color:"rgba(0,1,47,0.84)"}} onClick={signup}>{t("Submit")} </RaisedButton>

                    </FormControl>
                )}}

        </Mutation>
    )


}
SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withTranslation()(SignUpForm)
