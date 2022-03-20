import React from 'react';
import {withTranslation} from "react-i18next";
import {
    Grid,
    FormControl,
    TextField,
    Card,
    Divider,
    CardActions,
    Button,
    CardHeader,
    Typography,
    CardContent
} from "@mui/material";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import {AUTH_TOKEN} from '../constants';
import UserMenu from "./UserMenu";
import CircularProgressLoading from "./CircularProgressLoading";
import {useSnackbar} from "notistack";
import i18n from 'i18next';
import history from '../history.js'

const authToken = localStorage.getItem(AUTH_TOKEN);

function UserProfile({t, props}) {

    const {...rest} = props;
    const {enqueueSnackbar} = useSnackbar();
    const [newpassword, setNewPassword] = React.useState('');
    const [oldpassword, setOldPassword] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [name, setName] = React.useState('');

    const confirm = async () => {
        enqueueSnackbar(i18n.t('Your password is successful changed'));
        history.push('/account');

    };
    const confirmUp = async () => {
        enqueueSnackbar(i18n.t('You updated your personal information successfully'));
        history.push('/account');
    };

    const QUERY_USER = gql`query{me {name, email,country, companyName}}`;
    const CHANGE_PASSWORD = gql`mutation($oldpassword:String!, $newpassword:String!,$email:String!){changePassword(email: $email,oldpassword: $oldpassword,newpassword: $newpassword){
        id
        email
        name
    }}`;
    const UPGRADE_USER = gql`mutation($email:String!, $country:String, $name:String, $companyName:String){upgradeUser(email: $email,companyName: $companyName,country: $country,name: $name){
        name
        companyName
        country
    }}`
    return (

        <div>
            <UserMenu/>
            <main style={{flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <Query query={QUERY_USER} pollInterval={50}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <CircularProgressLoading/>
                        }
                        if (error) {
                            return error.message
                        }

                        if (authToken && data) {
                            return (
                                <div>
                                    <Grid container spacing={4}>
                                        <Grid item lg={4} md={6} xl={4} xs={12}>
                                            <Card {...rest}>
                                                <FormControl>
                                                    <CardHeader subheader={t("Update password")}
                                                                title={t("Password")}/>
                                                    <Divider/>
                                                    <CardContent>
                                                        <TextField
                                                            fullWidth
                                                            label={t("Password")}
                                                            name="password"
                                                            onChange={(e) => setOldPassword(e.target.value)}
                                                            type="password"
                                                            value={oldpassword}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label={t("New password")}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            style={{marginTop: '1rem'}}
                                                            type="password"
                                                            value={newpassword}
                                                            variant="outlined"
                                                        />
                                                    </CardContent>
                                                    <Divider/>
                                                    <CardActions>
                                                        <Mutation mutation={CHANGE_PASSWORD} variables={{
                                                            email: data.me.email,
                                                            oldpassword,
                                                            newpassword
                                                        }}
                                                                  onError={(error) => enqueueSnackbar(error.message)}
                                                                  onCompleted={() => confirm()}>
                                                            {(changepassword, {loading, error}) => {
                                                                if (loading) {
                                                                    return (<CircularProgressLoading/>)
                                                                }
                                                                if (error) {
                                                                    return (error.message)
                                                                }
                                                                if (authToken) {
                                                                    return (
                                                                        <Button onClick={changepassword}
                                                                                color="primary"
                                                                                variant="outlined"> {t("Update")}</Button>
                                                                    )
                                                                }
                                                            }}</Mutation>
                                                    </CardActions>
                                                </FormControl>
                                            </Card>
                                        </Grid>
                                        <Grid item lg={4} md={6} xl={4} xs={12}>
                                            <Card{...rest} >
                                                <Mutation mutation={UPGRADE_USER} variables={{
                                                    email: data.me.email,
                                                    country,
                                                    companyName,
                                                    name
                                                }} onError={(error) => enqueueSnackbar(error.message)}
                                                          onCompleted={(data) => confirmUp(data)}>
                                                    {(upgradeUser, {loading, error}) => {
                                                        if (loading) {
                                                            return (<CircularProgressLoading/>)
                                                        }
                                                        if (error) {
                                                            return (error.message)
                                                        }
                                                        if (authToken) {
                                                            return (
                                                                <FormControl autoComplete="off" noValidate>
                                                                    <CardHeader
                                                                        subheader={t("The information can be edited")}
                                                                        title={t('Profile')}/>
                                                                    <Divider/>
                                                                    <CardContent>

                                                                        <Grid container spacing={3}>

                                                                            <Grid item md={6} xs={12}>
                                                                                <Typography>{t('Full Name')}</Typography>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    style={{color: "rgba(0,1,14,0.74)"}}
                                                                                    placeholder={data.me.name}
                                                                                    onChange={(e) => setName(e.target.value)}
                                                                                    value={name}
                                                                                    variant="outlined"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={6} xs={12}>
                                                                                <Typography>{t('Company Name')}</Typography>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    style={{color: "rgba(0,1,14,0.74)"}}
                                                                                    placeholder={data.me.companyName}
                                                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                                                    value={companyName}
                                                                                    variant="outlined"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={6} xs={12}>
                                                                                <Typography>{t('Country')}</Typography>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    style={{color: "rgba(0,1,14,0.74)"}}
                                                                                    placeholder={data.me.country}
                                                                                    onChange={(e) => setCountry(e.target.value)}
                                                                                    value={country}
                                                                                    variant="outlined"
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </CardContent>
                                                                    <Divider/>
                                                                    <CardActions>
                                                                        <Button onClick={upgradeUser}
                                                                                color="primary" variant="outlined">
                                                                            {t("Save details")}
                                                                        </Button>
                                                                    </CardActions>
                                                                </FormControl>)
                                                        }
                                                    }}
                                                </Mutation>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>)
                        } else return null
                    }}
                </Query>
            </main>
        </div>)
}

UserProfile.propTypes = {
    className: PropTypes.string,
    t: PropTypes.object,
    props: PropTypes.node
};
export default withTranslation()(UserProfile);
