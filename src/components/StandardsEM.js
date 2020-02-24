import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { withTranslation} from 'react-i18next';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import history from '../history';
import MaterialTable from "material-table";
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        overflowX: 'auto',
        marginRight:"auto",
        marginLeft:"auto",
        height:"100%"
    },
      table: {
        marginTop:"20px",
marginRight:"auto",
        marginLeft:"auto",
        width: "100%",
        "@media (min-width: 576px)": {
            maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        },
        color:"rgba(0,1,47,0.84)"
    },
    inner:{
        minWidth: "100%"
    },
    row:{
        backgroundColor:"#fff"
    }
}));


const GET_Device = gql`query { dtc(id:"ck4cojsojvfol0922u51fqdn6") {id name_EN name_UA device_id{ name_UA name_EN module tr{name_TR_UA name_TR_EN} }}}`;


function StandardsEM({t}){
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
  
    const handleBack = () => {
    history.goBack();
};
    return (
       <div style={{height:"100%", width:"100%"}}>
            <UserMenu/>
            <div style={{marginTop:"60px"}} >
            <Grid container spacing={1}>
                <Grid item >
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon style={{color:"rgba(0,1,47,0.84)", marginTop:"5%", marginRight:"auto"}} />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
            <Query query={GET_Device} >
                {( {loading, error, data} ) =>  {
                    if (loading) {return<LinearDeterminate/>}
                    if (error) { return <div>error</div>;}
                    const devicelist = data.dtc.device_id;

                    if (i18n.language === "ua" )  {
                        return(
                            <Paper className={classes.table} >
                                  <MaterialTable  title={i18n.t('EM')}
                                            columns={[{title: i18n.t('Device'), field: 'device'},{title:i18n.t('Category'), field:'category'},{title:i18n.t('Module'), field:'module'}]}
                                                       data={devicelist.map((dev)=> ({device:dev.name_UA, category:dev.tr.name_TR_UA, module:dev.module}))}
                                                       options={{
                                                           sorting: true,
                                                           rowStyle: {
                                                               backgroundColor: '#EEE',
                                                               
                                                           },
                                                       }}  localization={{
                                            body: {
                                                emptyDataSourceMessage:"Немає данного приладу"},
                                            toolbar: {searchPlaceholder:"Пошук"},
                                            pagination: {labelRowsSelect:"рядків"}
                                                       }}
                                                        />

                               </Paper>)}




                    if (i18n.language === "en"){
                        return(
                            <Paper className={classes.table}>
                            <MaterialTable  title={i18n.t('EM')}
                                            columns={[{title: i18n.t('Device'), field: 'device'},{title:i18n.t('Reglament'), field:'category'},{title:i18n.t('Module'), field:'module'}]}
                                                       data={devicelist.map((dev)=> ({device:dev.name_EN, module:dev.module}))}
                                                       options={{
                                                           sorting: true,
                                                           rowStyle: {
                                                               backgroundColor: '#EEE',
                                                        },
                                                       }} />
                                </Paper>)}
                    else return null}
                }
            </Query>
                </Grid>
            </Grid>
        </div>
           
        </div>

    );

}

export default withTranslation()(StandardsEM);
