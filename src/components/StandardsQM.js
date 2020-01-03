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
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import history from '../history';

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
maxWidth:"100%",
        maxHeight:"500px",

       color:"rgba(0,1,47,0.84)"
    },
    inner:{
        minWidth: "100%"
    },
    row:{
        backgroundColor:"#fff"
    }
}));


const GET_Device = gql`query { dtc(id:"ck4conyk2vgkb0922o4ukdjdc") {id name_EN name_UA device_id{ name_UA name_EN module tr{name_TR_UA name_TR_EN} }}}`;


function StandardsQM({t}){
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
    React.useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;}
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });}
        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, [1]);
     const handleBack = () => {
    history.goBack();
};
    return (
        <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>

        <div  className={classes.root}>
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
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead >
                                            <TableRow >
                                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Reglament')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {devicelist.map(device =>(
                                                <TableRow>
                                                    <TableCell className={classes.row} lign="center">{device.name_UA}</TableCell>
                                                   <TableCell className={classes.row} lign="center">{device.tr.name_TR_UA}</TableCell>
                                                   <TableCell className={classes.row} lign="center">{device.module}</TableCell>
                                                </TableRow>  ))}
                                        </TableBody>


                                    </Table>

                               </Paper>)}




                    if (i18n.language === "en"){
                        return(
                            <Paper style={{width:"100%", maxHeight:"350px"}}>
                                <CardContent className={classes.content}>

                                    <Table component={Paper} className={classes.table} aria-label="customized table">
                                        <TableHead aria-label="sticky table">
                                            <TableRow >
                                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                               <StyledTableCell align="right">{t('Reglament')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {devicelist.map(device =>(
                                                <TableRow>
                                                    <TableCell lign="center">{device.name_EN}</TableCell>
                                                 <TableCell className={classes.row} lign="center">{device.tr.name_TR_EN}</TableCell>
                                                   <TableCell className={classes.row} lign="center">{device.module}</TableCell>
                                                </TableRow>  ))}
                                        </TableBody>
                                    </Table>

                                </CardContent></Paper>)}
                    else return null}
                }
            </Query>
                </Grid>
            </Grid>
        </div>
            </main>
        </div>

    );

}

export default withTranslation()(StandardsQM);
