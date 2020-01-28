import React from 'react';
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import {AUTH_TOKEN, CREATE_MY_DEVICE, GC_USER_ID} from '../constants';
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import {useSnackbar} from "notistack";
import i18n from 'i18next';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(4),
        marginTop:"5%"
    },}));

const authToken = localStorage.getItem(AUTH_TOKEN);
function UserProfile({t,props}) {

    const {...rest} = props;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [newpassword, setNewPassword] = React.useState('');
    const [oldpassword, setOldPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        phone: '',
        state: '',
        country: '',
        password: '',
        companyName: ''
    });
    const confirm = async (data, e) => {
        enqueueSnackbar(i18n.t('Your password is successful changed'));
        console.log();

    };
    const saveUserData = () => {

        localStorage.setItem()
    };
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const QUERY_USER= gql`query{me {name, email}}`;
    const CHANGE_PASSWORD = gql`mutation($oldpassword:String!, $newpassword:String!,$email:String!){changePassword(email: $email,oldpassword: $oldpassword,newpassword: $newpassword){
        id
        email
        name
    }}`;
    return(
        <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div className={classes.root}>
                <Query query={QUERY_USER}>
                    {( {loading, error, data} ) =>  {
                        if (loading) {return <LinearDeterminate />}
                        if (error) { return error.message }
                        const userInfo = data.me;
                        if(authToken) {
                            return(
                            <Grid container spacing={4}>
                                <Grid item lg={4} md={6} xl={4} xs={12}>
                                    <Card {...rest}>
                                        {userInfo.map(info =>
                                            <Mutation mutation={CHANGE_PASSWORD} variables={{email:info.email, oldpassword, newpassword}} onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                                                {( changepassword,{loading, error, data}) => {
                                                    if (loading) { return (<LinearDeterminate /> )}
                                                    if (error) {return (error.message)}
                                                    if (authToken){
                                                        return(
                                            <FormControl>
                                                <CardHeader subheader={t("Update password")} title={t("Password")}/>
                                                <Divider/>
                                               
                                                    <CardContent>
                                                        <TextField
                                                            fullWidth
                                                            label={t("Password")}
                                                            name="password"
                                                            onChange={(e)=>setOldPassword(e.target.value)}
                                                            type="password"
                                                            value={oldpassword}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label={t("New password")}
                                                            name="confirm"
                                                            onChange={(e)=>setNewPassword(e.target.value)}
                                                            style={{marginTop: '1rem'}}
                                                            type="password"
                                                            value={newpassword}
                                                            variant="outlined"
                                                        />
                                                    </CardContent>
                                                    <Divider/>
                                                    <CardActions>
                                                        <Button onClick={changepassword} color="primary" variant="outlined"> {t("Update")}</Button>
                                                    </CardActions>
                                             
                                            </FormControl>
                                                        )}}}  </Mutation>)}
                                    </Card>
                                </Grid>
                                <Grid item lg={4} md={6} xl={4} xs={12}>
                                    <Card{...rest} >
                                        <form autoComplete="off" noValidate>
                                            <CardHeader subheader={t("The information can be edited")}
                                                        title={t("Profile")}/>
                                            <Divider/>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            helperText="Please specify the first name"
                                                            label={t("First name")}
                                                            margin="dense"
                                                            name="firstName"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.firstName}
                                                            variant="outlined"
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label={t("Email")}
                                                            margin="dense"
                                                            name="email"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.email}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Phone Number"
                                                            margin="dense"
                                                            name="phone"
                                                            onChange={handleChange}
                                                            type="number"
                                                            value={values.phone}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label={t("Company Name")}
                                                            margin="dense"
                                                            name="companyName"
                                                            onChange={handleChange}
                                                            required
                                                            select
                                                            // eslint-disable-next-line react/jsx-sort-props
                                                            SelectProps={{native: true}}
                                                            value={values.companyName}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Country"
                                                            margin="dense"
                                                            name="country"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.country}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <Divider/>
                                            <CardActions>
                                                <Button color="primary" variant="outlined">
                                                    {t("Save details")}
                                                </Button>
                                            </CardActions>)}
                                        </form>
                                    </Card>
                                </Grid>
                            </Grid>)
                        }else return null}}
                </Query></div>
            </main>
        </div>
    );
};

UserProfile.propTypes = {
    className: PropTypes.string
};
export default withTranslation()(UserProfile);
