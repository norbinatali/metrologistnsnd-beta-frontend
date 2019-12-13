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
import Link from "@material-ui/core/Link";
import { Link as RouterLink, withRouter } from 'react-router-dom';

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

function MyDevice({t,className, rest}) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <div className={classes.root}>

<AppBar position="static" elevation={0} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)',backgroundColor:"transparent"}} >
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
                            to="/signup"
                            variant="h8"
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
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                <Typography className={classes.heading}>{t('T1')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <Table>
                                        <TableHead>
                                            <TableCell>{t('Device Name')}</TableCell>
                                            <TableCell>{t('Device Type')}</TableCell>
                                            <TableCell>{t('Device TR')}</TableCell>
                                            <TableCell>{t('Device Module')}</TableCell>
                                            <TableCell>{t('Device Date Last Calibration')}</TableCell>
                                            <TableCell>{t('Device Calibration Interval')}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableBody>
                                    </Table>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                                <Typography className={classes.heading}>{t('T2')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <Table>
                                        <TableHead>
                                            <TableCell>{t('Device Name')}</TableCell>
                                            <TableCell>{t('Device Type')}</TableCell>
                                            <TableCell>{t('Device TR')}</TableCell>
                                            <TableCell>{t('Device Module')}</TableCell>
                                            <TableCell>{t('Device Date Last Calibration')}</TableCell>
                                            <TableCell>{t('Device Calibration Interval')}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>Капуста</TableCell>
                                            <TableCell>Морква</TableCell>
                                            <TableCell>білий ведмідь</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableBody>
                                    </Table>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                                <Typography className={classes.heading}>{t('T3')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <Table>
                                        <TableHead>
                                            <TableCell>{t('Device Name')}</TableCell>
                                            <TableCell>{t('Device Type')}</TableCell>
                                            <TableCell>{t('Device TR')}</TableCell>
                                            <TableCell>{t('Device Module')}</TableCell>
                                            <TableCell>{t('Device Date Last Calibration')}</TableCell>
                                            <TableCell>{t('Device Calibration Interval')}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableBody>
                                    </Table>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                </div>

        </div>

    )



}
export default withTranslation()(MyDevice)
