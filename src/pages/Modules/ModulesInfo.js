import React from 'react';
import {withTranslation} from "react-i18next";
import {Paper, Typography} from '@mui/material';

function ModulesInfo({t}) {
    return (
        <div>
            <Paper>
                <p><Typography variant="h5" component="h3">{t('System of quality management')}</Typography></p>
                <Typography component="p" align={"justify"}
                            style={{marginRight: "40px", marginLeft: "40px", marginBottom: "40px"}}>
                    {t('About QM')}<br/>
                    {t('About QM2')}
                </Typography>
            </Paper>
        </div>
    )

}

export default withTranslation()(ModulesInfo)
