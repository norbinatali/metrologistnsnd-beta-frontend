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
import {AUTH_TOKEN, GC_USER_ID} from "./constants";
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

function SignUpForm({t},props){
    const SIGNUP_MUTATION = gql `mutation ($email: String!, $password: String!, $name: String!, $companyName:String){signup(email:$email , password: $password,name:$name, companyName: $companyName){token}}`;
    const [signup] = useState(true);
    const [email, setStateEmail]=useState("");
    const [password, setStatePassword]=useState("");
    const [name, setStateName]=useState("");
    const [companyName, setStateCompanyName]=useState("");
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

        const {id, token } = signup;
        saveUserData(id, token);
        history.push('/check-email')
    };
    const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);

    return (
        <Mutation mutation={SIGNUP_MUTATION}  variables={{ email, password,name, companyName} } onCompleted={() => confirm()}>
            {( signup,{loading, error, event}) => {
                if (loading) { return (<span></span> )}

                return(
                    <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>
                        <h3 style={{color:"#fff"}} >{t("Registration")}</h3><br/>

                        <label style={{color:"#fff"}} htmlFor="email">{t("Email")} </label>
                        <CssTextField
                            type="text"
                            name={"email"}
                            placeholder={"example@example.com"}
                            value={email} fullWidth
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
                        < label style={{color:"#fff"}} htmlFor="password">{t("Password")} </label>
                        <CssTextField
                            type="password"
                            size="medium"
                            name={"password"}
                            fullWidth
                            error={hasError('password')}
                            helperText={hasError('password') ? formState.errors.password[0] : null}
                            variant="outlined"
                            value={password}
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
                        <label style={{color:"#fff"}} htmlFor="name">{t("Name")} </label>
                        <CssTextField
                            type="name"
                            size="medium"
                            name={"name"}
                            fullWidth
                            error={hasError('name')}

                            helperText={
                                hasError('name') ? formState.errors.name[0] : null
                            }
                            variant="outlined"
                            value={name}
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
                        <label style={{color:"#fff"}} htmlFor="companyName">{t("Company Name")} </label>
                        <CssTextField
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

                        /><br/>
                                    <RaisedButton  onClick={signup}>{t("Submit")} </RaisedButton>

                    </FormControl>
                )}}

        </Mutation>
    )


}
SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withTranslation()(SignUpForm)
