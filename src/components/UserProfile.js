import React from 'react';
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "material-ui/RaisedButton";

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


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },}));


function UserProfile({t}) {

    const userId = localStorage.getItem(GC_USER_ID);
    const classes = useStyles();

    const QUERY_USER= gql`query{me {name, email}}`;
    return(
<div className={classes.root}>
    {userId ? (
    <Grid container spacing={6} style={{marginTop:"20%",padding:"40"}}>
        <Grid item xs={4} sm={5} style={{backgroundColor:'white'}}>
            <FormControl >
                <Query query={QUERY_USER} >
                    {( {loading, error, data} ) => {
                        if (error) { return <div>error</div>;}
                        const me = data.me;
                        return(
                            <div>
                        <label htmlFor="email">Email </label>
                                {me.map(me =>  <Typography key={me.id} lign="center" style={{textAlign: "center"}}>{me.email}</Typography>)}
                       <label htmlFor="name">Name</label>
                                {me.map(me =>  <Typography key={me.id} lign="center" style={{textAlign: "center"}}>{me.name}</Typography>)}
                            </div>
                    ) }}
                </Query>
            </FormControl></Grid>
        <Grid item xs={4} sm={1} style={{backgroundColor:'transparent'}}><h5 style={{color:"white"}}>Or</h5>
        </Grid>
        <Grid item xs={4} sm={5} style={{backgroundColor:'white'}}>
            <FormControl >
                <ChangeProfile />
            </FormControl>

        </Grid>
    </Grid>

    ):( <Login/>)}

</div>


    )

}
export default withTranslation()(UserProfile);