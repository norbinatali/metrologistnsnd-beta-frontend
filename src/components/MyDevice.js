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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import AddDevice from "./AddDevice";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display:"flex",

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
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

function MyDevice({t}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <div className={classes.root}>
            <div style={{ marginTop: 20, padding: 60 }}>
                <Grid container spacing={24} justify={"space-between"} direction={"row"}  >

                    <Grid item xs={6} spacing={8}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                <Typography className={classes.heading}>{t('T1')}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <Table>
                                        <TableHead>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableHead>
                                        <TableBody>
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
                                            <TableCell>Коза</TableCell>
                                            <TableCell>Кроляка</TableCell>
                                            <TableCell>Бігімотяка</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>Капуста</TableCell>
                                            <TableCell>Морква</TableCell>
                                            <TableCell>білий ведмідь</TableCell>
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
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableBody>
                                    </Table>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={1} spacing={8} style={{backgroundColor:"transparent"}}>

                    </Grid>
                    <Grid item xs={5} spacing={8} >
                        <div >
                            <Typography variant="h5" component="h2">{t('Add device')}</Typography>

                            <AddDevice/>

                        </div>
                    </Grid>
                </Grid>
            </div>
            <main style={{ flexGrow: 1, height: '100vh', overflow: 'auto'}}>
                <div style={{paddingRight: 24}} />
                {
                    component === 'addDevice' ?

                        <div style={{display:"flex"}}>
                            <div style={{ marginTop: 40, padding: 30 }}>
                                <Typography variant="h5" component="h2">{t('Add Device')}</Typography>

                                <AddDevice/>
                            </div>
                        </div>

                        :
                        component === ''


                }
            </main>
        </div>

    )



}
export default withTranslation()(MyDevice)
