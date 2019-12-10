import React from 'react';
import {withTranslation} from "react-i18next";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../style/index.css'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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
 function GeneralInfo({t}) {
     const classes = useStyles();
     const [expanded, setExpanded] = React.useState(false);

     const handleChange = panel => (event, isExpanded) => {
         setExpanded(isExpanded ? panel : false);
     };
     return(
         <div className={classes.root}>
             <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                     <Typography className={classes.heading}>{t('General Information')}</Typography>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails>
                     <Typography align={"justify"}>
                         <p><h4>{t('Conformity assessment general')}</h4></p>

                     </Typography>
                 </ExpansionPanelDetails>
             </ExpansionPanel>
             <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                     <Typography className={classes.heading}>{t('Procedure of conformity assessment')}</Typography>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails>
                     <Typography align={"justify"}>
                         <p><h4>{t('Assessment procedure')}</h4></p>
                         {t('About procedure')}<br/>
                         {t('About procedure2')}

                     </Typography>
                 </ExpansionPanelDetails>
             </ExpansionPanel>
             <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                     <Typography className={classes.heading}>{t('Modules')}</Typography>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails>
                     <Typography  align={"justify"} >
                         <p><h4>{t('Assessment module')}</h4></p><br/>
                         <div align={"center"}> {t('About module')}</div><br/>
                      {t('Module A')}<br/>
                         {t('Module A2')}<br/>
                         {t('Module B')}<br/>

                         {t('Module C')}<br/>
                             {t('Module C2')}<br/>
                         {t('Module D')}<br/>
                         {t('Module D1')}<br/>
                         {t('Module E')}<br/>
                         {t('Module E1')}<br/>
                         {t('Module F')}<br/>
                         {t('Module F1')}<br/>
                         {t('Module H')}<br/>
                         {t('Module H1')}<br/>
                         <p>{t('Module B+D+E+F')}<br/>
                             {t('Module D1,H,H1')} </p>
                     </Typography>
                 </ExpansionPanelDetails>
             </ExpansionPanel>

         </div>
     );
 }
export default withTranslation()(GeneralInfo)