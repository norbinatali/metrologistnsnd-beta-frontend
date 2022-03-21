import React from 'react';
import {withTranslation} from "react-i18next";
import {withStyles} from '@mui/material/styles';
import {Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material';
import '../index.scss'

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
})();
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
})();

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))();
 function GeneralInfo({t}) {
     const [expanded, setExpanded] = React.useState(false);

     const handleChange = panel => (event, isExpanded) => {
         setExpanded(isExpanded ? panel : false);
     };
     return(
         <div>
             <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                     <Typography>{t('General Information')}</Typography>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails>
                     <Typography align={"justify"}>
                         <p><h4>{t('Conformity assessment general')}</h4></p>
                     </Typography>
                 </ExpansionPanelDetails>
             </ExpansionPanel>
             <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                     <Typography>{t('Procedure of conformity assessment')}</Typography>
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
                     <Typography>{t('Modules')}</Typography>
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
