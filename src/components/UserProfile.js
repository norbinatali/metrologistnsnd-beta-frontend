import React from 'react';
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { AUTH_TOKEN , GC_USER_ID} from '../constants';
import SignUp from "../SignUp";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ChangeProfile from "./ChangeProfile";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Login from "./Login";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import UserMenu from "./UserMenu";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
          padding: theme.spacing(4),
        marginTop:"5%"
    },}));


function UserProfile({t,props}) {

   const {  ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        state: '',
        country: '',
        password: '',
        newpassword: '',
        companyName:''
    });

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const QUERY_USER= gql`query{me {name, email}}`;
    return(
  <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div className={classes.root}>
                    <Grid container spacing={4}>
                        <Grid item lg={4} md={6} xl={4} xs={12}>
        <Card {...rest}>

            <form>
                <CardHeader subheader={t("Update password")} title={t("Password")}/>
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label={t("Password")}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label={t("New password")}
                        name="confirm"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="password"
                        value={values.newpassword}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="outlined">
                        {t("Update")}
                    </Button>
                </CardActions>
            </form>
        </Card>
                        </Grid>
                            <Grid item lg={4} md={6} xl={4} xs={12}>
                                <Card{...rest} >
            <form autoComplete="off" noValidate>
                <CardHeader subheader={t("The information can be edited")} title={t("Profile")}/>
                <Divider />
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
                                SelectProps={{ native: true }}
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
                <Divider />
                <CardActions>
                    <Button color="primary" variant="outlined">
                        {t("Save details")}
                    </Button>
                </CardActions>
            </form>
        </Card>
                            </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    );
};

UserProfile.propTypes = {
    className: PropTypes.string
};
export default withTranslation()(UserProfile);
