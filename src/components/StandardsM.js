import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {withTranslation} from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import i18n from "../i18n/i18n";
import UserMenu from "./UserMenu";
import CircularProgressLoading from "./CircularProgressLoading";
import {Grid, IconButton, Paper} from "@mui/material";
import history from '../history';
import MaterialTable from "@mui/material/Table";

const GET_Device = gql`query { dtc(id:"ck4coj4gssmxa0993upfhepm4") {id name_EN name_UA device_id{ name_UA name_EN module tr{name_TR_UA name_TR_EN} }}}`;

function StandardsM() {
    const handleBack = () => {
        history.goBack();
    };
    return (
        <div style={{height: "100%", width: "100%"}}>
            <UserMenu/>
            <div style={{marginTop: "60px"}}>
                <Grid container spacing={1}>
                    <Grid item>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon style={{color: "rgba(0,1,47,0.84)", marginTop: "5%", marginRight: "auto"}}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Query query={GET_Device}>
                            {({loading, error, data}) => {
                                if (loading) {
                                    return <CircularProgressLoading/>
                                }
                                if (error) {
                                    return <div>error</div>;
                                }
                                const devicelist = data.dtc.device_id;
                                if (i18n.language === "ua") {
                                    return (
                                        <Paper>
                                            <MaterialTable title={i18n.t('M')}
                                                           columns={[{
                                                               title: i18n.t('Device'),
                                                               field: 'device'
                                                           }, {
                                                               title: i18n.t('Category'),
                                                               field: 'category'
                                                           }, {title: i18n.t('Module'), field: 'module'}]}
                                                           data={devicelist.map((dev) => ({
                                                               device: dev.name_UA,
                                                               category: dev.tr.name_TR_UA,
                                                               module: dev.module
                                                           }))}
                                                           options={{
                                                               sorting: true,
                                                               rowStyle: {
                                                                   backgroundColor: '#EEE',
                                                               },
                                                           }} localization={{
                                                body: {
                                                    emptyDataSourceMessage: "Немає данного приладу"
                                                },
                                                toolbar: {searchPlaceholder: "Пошук"},
                                                pagination: {labelRowsSelect: "рядків"}
                                            }}
                                            />
                                        </Paper>)
                                }
                                if (i18n.language === "en") {
                                    return (
                                        <Paper>
                                            <MaterialTable title={i18n.t('M')}
                                                           columns={[{
                                                               title: i18n.t('Device'),
                                                               field: 'device'
                                                           }, {title: i18n.t('Module'), field: 'module'}]}
                                                           data={devicelist.map((dev) => ({
                                                               device: dev.name_EN,
                                                               module: dev.module
                                                           }))}
                                                           options={{
                                                               sorting: true,
                                                               rowStyle: {
                                                                   backgroundColor: '#EEE',
                                                               },
                                                           }}/>
                                        </Paper>)
                                } else return null
                            }
                            }
                        </Query>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default withTranslation()(StandardsM);
