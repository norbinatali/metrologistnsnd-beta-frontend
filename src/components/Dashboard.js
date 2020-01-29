import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {AUTH_TOKEN, CREATE_MY_DEVICE, GC_USER_ID} from '../constants';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import ContactUS from "./ContactUS";
import LinearDeterminate from "./LinearDeterminate";
import UserMenu from "./UserMenu";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },

}));
const authToken = localStorage.getItem(AUTH_TOKEN);
 const QUERY_USER = gql`query{me {name, email,country, companyName}}`;
 function Dashboard ({t}){

     const classes = useStyles();
        return(
<div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
             <div style={{ marginTop: 40 }}>
                        <div style={{ marginTop: 20, padding:30}}>
            <div className={classes.root}>
             <Query query={QUERY_USER}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <LinearDeterminate/>
                        }
                        if (error) {
                            return error.message
                        }
                        const userInfo = data.me;
                        console.log(data.me.name)
                        console.log(data.me.email)
                        if (authToken) {
                            return (
            
<div >
            <Typography  align={"justify"} style={{color:"rgba(0,1,47,0.84)"}} >{t('Welcome')}</Typography><Typography> {data.me.name}</Typography><br/>
<Typography  align={"justify"} style={{color:"rgba(0,1,47,0.84)"}} >
    <p>{t('About Metrologist')}<br/></p>
    <p>{t('Why Metrologist is needed')}<br/></p>
    <p>{t('Metrologist test')} <br/></p>
    <p>{t('Metrologist recommendations')}<br/></p>
</Typography>

</div>
            )}}}
            </Query>
                </div>
         </div>
                    </div>
        </main>
 </div>



        )




}
export default withTranslation()(Dashboard)
