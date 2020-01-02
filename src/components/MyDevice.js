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
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from "@material-ui/icons/Delete"
const authToken = localStorage.getItem(AUTH_TOKEN);

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);


const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        overflow: 'auto',
        marginRight:"auto",
        marginLeft:"auto",
        height:"100%"
    },
    table: {
maxWidth:"60%",
        maxHeight:"500px",

        color:"#fff"
    },
    inner:{
        minWidth: "100%"
    },
    row:{
        backgroundColor:"#fff"
    },
    container: {
    maxHeight: "70%",
  },
}));


const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, verification_device calibration next_calibration} }}`;


function MyDevice({t}){
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
                        <ArrowBackIcon style={{color:"white", marginTop:"5%", marginRight:"auto"}} />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
             <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={500} >
                            {( {loading, error, data} ) =>  {
                                if (loading) {return <span>loading</span>}
                                if (error) { return error.message }
                                const devicelist = data.me.mydevices;

                   if(authToken){
                        return(
                             <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" className={classes.table}>
                                        <TableHead >
                                            <TableRow >
                                                 <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                                        <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                                        <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                                        <StyledTableCell align="right">{t('Calibration')}</StyledTableCell>
                                                        <StyledTableCell align="right">{t('Next Calibration')}</StyledTableCell>
                                                        <StyledTableCell align="right">{t('Delete')} </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {devicelist.map(device =>(
                                                <TableRow>
                                                     <TableCell lign="center">{device.brand_device}</TableCell>
                                                            <TableCell lign="center">{device.type_device}</TableCell>
                                                            <TableCell lign="center">{device.module_device}</TableCell>
                                                            <TableCell lign="center">{device.calibration}</TableCell>
                                                            <TableCell lign="center">{device.next_calibration}</TableCell>
                                                            <TableCell lign="center"><IconButton>
                                                                <DeleteIcon className={classes.block}  />
                                                            </IconButton></TableCell>
                                                        </TableRow> ))}
                                        </TableBody>
                                    </Table>
                                               </TableContainer>
                              )}
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
export default withTranslation()(MyDevice)
