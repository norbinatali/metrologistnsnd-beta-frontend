
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
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: "90%",
        maxHeight:"300px",
        color:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)"
    },
     inner:{
        minWidth: "100%"
    },
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
    return ( <div  className={classes.root}>
          <CssBaseline />
        <AppBar >
        <Toolbar className={classes.toolBar}>
        <Grid container spacing={16}>
        <Grid item xs={11}>
        <div style={{ marginRight: "auto", marginLeft: "auto",}}>
<img src={logo} />
</div>
</Grid>
<Grid item spacing={6}>
<button style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} onClick={() => changeLanguage('ua')}><img src={FlagUA}/></button>
<button style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} onClick={() => changeLanguage('en')}><img src={FlagUS}/></button>

</Grid>
</Grid>
</Toolbar>
</AppBar>
<Grid item >
                    <div style={{marginTop:"0px"}} >
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon style={{color:"white"}} />
                        </IconButton>
                    </div>
                    </Grid>
                    <Query query={GET_Device} >
                            {( {loading, error, data} ) =>  {
                              if (loading) {return <LinearDeterminate/>}
                                if (error) { return <div>error</div>;}
                                const devicelist = data.allDevice;

                                if (i18n.language === "ua" )  {
                                return(
                                    <Paper style={{width:"100%", maxHeight:"350px"}}>
                                   <CardContent className={classes.content}>
                                      
                                    <Table component={Paper} className={classes.table} aria-label="customized table">
                                        <TableHead aria-label="sticky table">
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
                                                <TableCell lign="center">{device.name_UA}</TableCell>
                                                 <TableCell lign="center">{device.tr.name_TR_UA}</TableCell>
                                            <TableCell lign="center">{device.dtc.name_UA}</TableCell>
                                             <TableCell lign="center">{device.module}</TableCell>
                                            </TableRow>  ))}
                                            </TableBody>
                                                                                
                                             
                                    </Table>
                                  
                                    </CardContent></Paper>)}




                                if (i18n.language === "en"){
                                   return(
                                        <Paper style={{width:"100%", maxHeight:"350px"}}>
                                       <CardContent className={classes.content}>
                                      
                                    <Table component={Paper} className={classes.table} aria-label="customized table">
                                    <TableHead aria-label="sticky table">
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
                                                <TableCell lign="center">{device.name_EN}</TableCell>
                                                 <TableCell lign="center">{device.tr.name_TR_EN}</TableCell>
                                            <TableCell lign="center">{device.dtc.name_EN}</TableCell>
                                             <TableCell lign="center">{device.module}</TableCell>
                                            </TableRow>  ))}
                                            </TableBody>
                                       </Table> 
                                            
                                    </CardContent></Paper>)}
                            else return null}
                            }
                        </Query>
</div>


    );

}

export default withTranslation()(Standards);
