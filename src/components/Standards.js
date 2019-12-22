
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
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import i18n from "../menu/translations/i18n";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinearDeterminate from './LinearDeterminate';
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png";
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png";
import history from "../history"
import logo from "../menu/style/LogoMakr_6pZrzB.png"
import UserMenu from "./UserMenu";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);
const useStyles = makeStyles(theme => ({
    root: {
        height:"100%",
        width: '100%',
         marginRight:"auto",
        marginLeft:"auto",
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
      maxWidth:"100%",
        maxHeight:"500px",
        color:"#fff"
    },
     inner:{
        minWidth: "100%"
    },
    row:{
        backgroundColor:"#fff"
    }
}));


const GET_Device = gql`query { allDevice {id name_EN name_UA  module tr{name_TR_UA name_TR_EN} dtc{name_UA name_EN}}}`;


function Standards({t}){
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
    const handleBack = () => {
        history.goBack();
    };
     const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
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
    return (
         <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>

                    <div style={{marginTop:"0px"}} >
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon style={{color:"white"}} />
                        </IconButton>
                    </div>
              
                    <Query query={GET_Device} >
                            {( {loading, error, data} ) =>  {
                              if (loading) {return <LinearDeterminate/>}
                                if (error) { return <div>error</div>;}
                                const devicelist = data.allDevice;

                                if (i18n.language === "ua" )  {
                                return(
                                    <Paper>
                                   <CardContent className={classes.content}>
                                      
                                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow >
                                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Technical Reglament')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {devicelist.map(device =>(
                                            <TableRow>
                                                <TableCell className={classes.row} lign="center">{device.name_UA}</TableCell>
                                                 <TableCell className={classes.row} lign="center">{device.tr.name_TR_UA}</TableCell>
                                            <TableCell className={classes.row} lign="center">{device.dtc.name_UA}</TableCell>
                                             <TableCell className={classes.row} lign="center">{device.module}</TableCell>
                                            </TableRow>  ))}
                                            </TableBody>
                                                                                
                                             
                                    </Table>
                                  
                                    </CardContent></Paper>)}




                                if (i18n.language === "en"){
                                   return(
                                        <Paper>
                                       <CardContent className={classes.content}>
                                      
                                   <Table className={classes.table} stickyHeader aria-label="sticky table">
                                    <TableHead>
                                    <TableRow >
                                    <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('Technical Reglament')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {devicelist.map(device =>(
                                            <TableRow>
                                                <TableCell className={classes.row} lign="center">{device.name_EN}</TableCell>
                                                 <TableCell className={classes.row} lign="center">{device.tr.name_TR_EN}</TableCell>
                                            <TableCell className={classes.row} lign="center">{device.dtc.name_EN}</TableCell>
                                             <TableCell className={classes.row} lign="center">{device.module}</TableCell>
                                            </TableRow>  ))}
                                            </TableBody>
                                       </Table> 
                                            
                                    </CardContent></Paper>)}
                            else return null}
                            }
                        </Query>

   
            </main>
        </div>
    );

}

export default withTranslation()(Standards);
