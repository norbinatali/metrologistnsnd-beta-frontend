import React from 'react';
import {withTranslation} from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
function ModulesInfo({t}) {
    const classes = useStyles();

return(
    <div className={classes.root}>
    <Paper >
        <p> <Typography variant="h5" component="h3">{t('System of quality management')}</Typography></p>

        <Typography component="p" align={"justify"} style={{marginRight:"40px", marginLeft:"40px", marginBottom:"40px"}}>
            {t('About QM')}<br/>
            {t('About QM2')}
        </Typography>
    </Paper>

    </div>
)

}
export default withTranslation()(ModulesInfo)