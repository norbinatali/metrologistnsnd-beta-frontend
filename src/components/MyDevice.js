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
import Link from "@material-ui/core/Link";
import UserMenu from "./UserMenu";
import MyDeviceForm from "./MyDeviceForm";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import DeleteIcon from "@material-ui/icons/Delete"
const drawerWidth = 240;
 const userId = localStorage.getItem(GC_USER_ID);
const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
    root: {
                padding: theme.spacing(3),
        margin: 'auto',
         overflow: 'auto'

    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    button: {
        width:"100 px",
        height:"10 px",
        backgroundColor:"white",
        textColor:"white",
        marginRight: theme.spacing(3)
    },
    input: {
        display: 'none',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '50%',
        flexShrink: 0,
        display:"center",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: 240,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
        margin: '40px 16px',
    }

}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width:'20px'
    },
    body: {
        fontSize: 12,
        width:'20px'
    },
}))(TableCell);
const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, notes,  verification_device, calibration next_calibration} }}`;
function MyDevice({t,className, rest}) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
 const refreshPage=()=>{ 
    window.location.reload(false); 
}
    return(
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
        <div className={classes.root}>

<AppBar position="static" elevation={0} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)',backgroundColor:"transparent", marginTop:"10%"}} >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
            <Typography variant="h5" component="h2">{t('My devices')}</Typography>
                        </Grid>

    <Grid item>
                        <span className={classes.spacer} />
                        <Button color="primary" variant="contained" > 
                         <Link component={RouterLink} to="/add-device" variant="h8" style={{color:"#fff"}} >{t('Add Device')}</Link>
                                </Button>
          </Grid>
                   </Grid>
                </Toolbar>
</AppBar>
                <MyDeviceForm />
                     
              
        </div>

                                                                         </main>
                                                                         </div>

    )



}
export default withTranslation()(MyDevice)
