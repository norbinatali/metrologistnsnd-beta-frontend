import React from 'react';
import {Paper, Typography} from "@mui/material";
import {withTranslation} from "react-i18next";

function AssessmentTheory({t}) {
    return (
        <div>
            <Paper>
                <Typography variant="h5" component="h3">
                    {t('Terminology')}<br/></Typography>
                <Typography>
                    {t('Measuring Technology')}<br/>
                    {t('Errors')}<br/>
                    {t('Calibration is')}<br/>
                    {t('Fault')}<br/>
                    {t('Test')}<br/>
                    {t('Test procedure')}<br/>
                    {t('Test program')}<br/>
                </Typography>
            </Paper>
        </div>
    )
}

export default withTranslation()(AssessmentTheory)
