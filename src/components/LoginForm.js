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
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarProvider, useSnackbar } from 'notistack';
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
        color:"#fff",
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
        color:"#fff"
    },
}));
  const HELLO_QUERY = gql`mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;
   
function LoginForm({t},props){
    const { enqueueSnackbar } = useSnackbar();
   const {id} = React.useState("");
    const [email,setStateEmail] = useState("");
    const [login] = useState(true);
    const [password,setStatePassword] = useState("");
    const classes = useStyles();
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

    const handleBack = () => {
        history.goBack();
    };

        const confirm = async (token, e) => {
            saveUserData(token);
            Auth.authenticate();
            history.push('/user')}
       
    };
     const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
 const [open, setOpen] = React.useState( false);
    return (
        <div>
        <Mutation mutation={HELLO_QUERY}  variables={{ email, password,id } } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(token) => confirm(token)}>
            {( mutation,{loading, error}) => {
                if (loading) { return (<LinearDeterminate /> )}

                return(
        <FormControl >
            <h3 style={{color:"#fff", marginTop:"50%"}}>{t("Login in")}</h3> <br/>
            <label style={{color:"#fff"}} htmlFor="email">{t('Email')} </label>
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
                            onChange={(e) => {setStateEmail(e.target.value);
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
                        < label style={{color:"#fff"}} htmlFor="password">{t('Password')} </label>
                        <RedditTextField
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
                            onChange={e =>  {setStatePassword(e.target.value )
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
                                ));}
                            }
                        /><br/>
                        <RaisedButton disabled={!formState.isValid} onClick={mutation}>{t('Submit')}
                        </RaisedButton>
            <Typography style={{color:"#fff"}} variant="body1" >
                {t('Dont have an account?')}{' '}
                <Link component={RouterLink} to="/signup" variant="h8" style={{color:"#fff"}}  >
                    {t('Sign up')}
                </Link>
            </Typography>
        </FormControl>
                )}}

        </Mutation>
<Snackbar open={open}  onClose={() => setOpen(false)} message={<span>error.message</span>} autoHideDuration={6000}/>
                                                               </div>
    )


}
LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withTranslation()(LoginForm)
