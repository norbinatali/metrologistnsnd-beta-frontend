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
import LinearProgress from "@material-ui/core/LinearProgress";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import UserMenu from "./UserMenu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
                padding: theme.spacing(3),
        margin: 'auto',
         overflow: 'hidden'

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
const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: { padding: 0},
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);
const GET_MyDevice = gql`query { me{mydevices{module_device, brand_device, module_device, notes,  verification_device, calibration next_calibration} }}`;
function MyDevice({t,className, rest}) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
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
                        <Button
                            color="primary"
                            variant="contained"
                            >  <Link
                            component={RouterLink}
                            to="/add-device"
                            variant="h8" style={{color:"#fff"}}
                        >{t('Add Device')}</Link>
                                </Button>
        <Tooltip title="Reload">
            <IconButton>
                <RefreshIcon className={classes.block} style={{color:"#fff"}}  />
            </IconButton>
        </Tooltip>
    </Grid>

                    </Grid>
                </Toolbar>
</AppBar>

                 <div className={classes.content}>
                <Query query={GET_MyDevice} >
                    {( {loading, error, data} ) =>  {
                        if (loading) {return<LinearProgress variant="determinate" color="secondary"/>}
                        if (error) { return <div>error</div>;}
                        const devicelist = data.me.mydevices;


                            return(
                <Paper >
                    <Table aria-label="customized table" className={classes.table}>
                        <TableHead sticky table aria-label="sticky table" >
                            <TableRow >
                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Verification')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Calibration')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Next Calibration')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {devicelist.map(device =>(
                                <TableRow>
                                    <TableCell lign="center">{device.brand_device}</TableCell>
                                    <TableCell lign="center">{device.type_device}</TableCell>
                                    <TableCell lign="center">{device.module_device}</TableCell>
                                     <TableCell lign="center">{device.verification_device}</TableCell>
                                    <TableCell lign="center">{device.calibration}</TableCell>
                                    <TableCell lign="center">{device.next_calibration}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </Paper>)
                    }}
                                </Query>



            </div>

        </div>

                                                                         </main>
                                                                         </div>

    )



}
export default withTranslation()(MyDevice)
