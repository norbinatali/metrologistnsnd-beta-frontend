import React from 'react';
import {Grid, Typography, Paper} from "@mui/material";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import UserMenu from "./UserMenu";

function WhatIsMetrologist({t}) {

    return (
        <div>
            <UserMenu/>
            <main style={{flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div style={{marginTop: 40}}>
                    <div style={{marginTop: 20, padding: 30}}>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Paper elevation={3}>
                                        <Typography align={"center"} variant="h6"
                                                    style={{padding: 10}}>{t('What is Metrologist')}</Typography>
                                        <Typography align={"justify"} variant="subtitle1" style={{padding: 30}}>
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
    )
}

WhatIsMetrologist.propTypes = {
    t: PropTypes.object
};
export default withTranslation()(WhatIsMetrologist)
