import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
import PropTypes from "prop-types";
import GeneralInfo from "./GeneralInfo";
import ModulesInfo from "./ModulesInfo";
import {withTranslation} from "react-i18next";
import AssessmentTheory from "./AssessmentTheory";
import UserMenu from "./UserMenu";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import history from '../history'

const useStyles = makeStyles(theme => ({
    h5:{
    fontWeight: "normal"},
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        color:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)"
    },
    boxFlex:"column"

}));
 function WhatIsMetrologist({t,props}) {

    const classes = useStyles();

     const {  ...rest } = props;

    return(
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                    <div style={{ marginTop: 40 }}>
                        <div style={{ marginTop: 20, padding:30}}>
                        <div style={{display:'flex'}}>
                <Grid container spacing={2} >
                    <Grid item>
                   <Paper elevation={3}>
        <Typography align={"center"} variant="h6" style={{padding:10}}>{t('What is Metrologist')}</Typography>
                        <Typography align={"justify"} variant="subtitle1" style={{padding:30}} variant="h5">
                      
                    <p>{t('About Metrologist')}<br/></p>
                    <p>{t('Why Metrologist is needed')}<br/></p>
                    <p>{t('Metrologist test')} <br/></p>
                    <p>{t('Metrologist recommendations')}<br/></p>
                

                     </Typography>
                    </Paper>

                </Grid>
                </Grid>

        </div>
                        </div>
                    </div>
                </main>
</div>
    )}
WhatIsMetrologist.propTypes = {
    className: PropTypes.string
};
export default withTranslation()(WhatIsMetrologist)
