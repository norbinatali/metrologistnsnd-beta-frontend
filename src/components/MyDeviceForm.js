import React from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddDevice from "./AddDevice";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import TableRow from "@material-ui/core/TableRow";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import DeleteIcon from "@material-ui/icons/Delete"
import TableContainer from '@material-ui/core/TableContainer';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Draggable from 'react-draggable';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import history from '../history.js'

const drawerWidth = 240;
 const userId = localStorage.getItem(GC_USER_ID);
const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
  root: {
        maxWidth: '70%',
        overflow: 'auto',
        marginRight:"auto",
        marginLeft:"auto",
       
    },
    table: {
maxWidth:"100%",
        maxHeight:"300px",

        color:"#fff"
    },
    inner:{
        minWidth: "60%"
    },
    row:{
        backgroundColor:"#fff"
    }
}));
  

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 10,
    },
}))(TableCell);
function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, notes,  verification_device, calibration next_calibration} }}`;

function MyDeviceForm({t,className, rest}) {
    const classes = useStyles();
 const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return(  
                                  
                <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={500} >
                    {( {loading, error, data} ) =>  {
                        if (loading) {return <LinearDeterminate />}
                        if (error) { return error.message }
                        const devicelist = data.me.mydevices;
                       if(authToken){           
                           return(
                <Paper className={classes.root} >
                             <Button variant="outlined" color="primary" onClick={()=> history.push('/add-device')}> {t('Add device')}
                            </Button>
                            <TableContainer>
                    <Table stickyHeader>
                        <TableHead  >
                            <TableRow >
                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                <StyledTableCell align="right">{t('More')} </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {devicelist.map(device =>(
                                <TableRow>
                                    <TableCell lign="center">{device.brand_device}</TableCell>
                                    <TableCell lign="center">{device.type_device}</TableCell>
                                    <TableCell lign="center">{device.module_device}</TableCell>
                                    <TableCell lign="center"><IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <MoreHorizIcon className={classes.block}  />
            </IconButton>  <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
                                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                                 {t('More information')}
                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText>
                                                                  {t('Calibration')} : {device.calibration}<br/>
                                                                   {t('Next Calibration')} : {device.next_calibration} <br/>
                                                                   {t('Verification')}: {device.verification_device}<br/>
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button autoFocus onClick={handleClose} color="primary">
                                                                     {t('Cancel')}
                                                                    </Button>
                                                                    <Button onClick={handleClose} color="primary">
                                                                     {t('Edit')}
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog></TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table></TableContainer>
                </Paper>)}else return null}}  
                                </Query>

       
    )



}
export default withTranslation()(MyDeviceForm)
