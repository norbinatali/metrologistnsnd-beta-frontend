import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
    Button,
    TextField,
    FormControl, Grid, IconButton,
} from '@mui/material';
import {withTranslation} from "react-i18next";
import {SIGNUP_MUTATION} from '../../../graphql/mutations/Mutations';
import {Mutation} from 'react-apollo';
import history from "../../../history";
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading";
import {useSnackbar} from 'notistack';
import i18n from 'i18next';
import {GC_USER_ID, GC_AUTH_TOKEN} from "../../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const RedditTextField = (props) => {
    return <TextField InputProps={{disableUnderline: true}} {...props} />;
}

const SignUpForm = ({t}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [email, setStateEmail] = useState("");
    const [password, setStatePassword] = useState("");
    const [name, setStateName] = useState("");
    const [companyName, setStateCompanyName] = useState("");
    const [country, setStateCountry] = useState("");
    const [formState, setFormState] = useState({
        isValid: false,
        values: {email, password, name},
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

    const confirm = async (token) => {
        enqueueSnackbar(i18n.t('Please Check your email to confirm'))
        saveUserData(token);
        history.push('/')
    };
    const saveUserData = (id, token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(GC_AUTH_TOKEN, token)
    };
    const handleBack = () => {
        history.goBack();
    };

    const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);

    return (
        <Mutation mutation={SIGNUP_MUTATION} variables={{email, password, name, companyName, country}}
                  onError={(error) => enqueueSnackbar(error.message)} onCompleted={(token) => confirm(token)}>
            {(signup, {loading}) => {
                if (loading) {
                    return (<CircularProgressLoading/>)
                }
                return (
                    <Grid container spacing={12}>
                        <Grid item>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item lg={10} xs={12}>
                            <FormControl>
                                <h3>{t("Registration")}</h3><br/>
                                <label htmlFor="email">{t("Email")} </label>
                                <RedditTextField
                                    type="text"
                                    name={"email"}
                                    placeholder={"example@example.com"}
                                    value={formState.values.email || ''}
                                    fullWidth
                                    size="medium"
                                    error={hasError('email')}
                                    helperText={hasError('email') ? formState.errors.email[0] : null}
                                    variant="outlined"
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
                                <label htmlFor="password">{t("Password")} </label>
                                <RedditTextField
                                    type="password"
                                    size="medium"
                                    name={"password"}
                                    fullWidth
                                    error={hasError('password')}
                                    helperText={hasError('password') ? formState.errors.password[0] : null}
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
                                        }));

                                    }} required
                                />
                                <label htmlFor="name">{t("Name")} </label>
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
                                <label htmlFor="companyName">{t("Company Name")} </label>
                                <RedditTextField
                                    type="companyName"
                                    size="medium"
                                    name={"companyName"}
                                    fullWidth
                                    variant="outlined"
                                    value={companyName}
                                    onChange={e => {
                                        setStateCompanyName(e.target.value);
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

                                /><label htmlFor="country">{t("Country")} </label>
                                <RedditTextField
                                    type="country"
                                    size="medium"
                                    name={"country"}
                                    fullWidth
                                    variant="outlined"
                                    value={country}
                                    onChange={e => {
                                        setStateCountry(e.target.value);
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
                                <Button disabled={!formState.isValid} style={{color: "rgba(0,1,47,0.84)"}}
                                        onClick={signup}>{t("Submit")} </Button>

                            </FormControl>
                        </Grid>
                    </Grid>
                )
            }}

        </Mutation>
    )
}

SignUpForm.propTypes = {
    t: PropTypes.node.isRequired,
};
export default withTranslation()(SignUpForm)
