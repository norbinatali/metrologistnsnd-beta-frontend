import React from 'react';
import {Paper, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {withTranslation} from "react-i18next";
import UserMenu from "./UserMenu";

function WhatIsMetrology({t}) {
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
                                        <Typography align={"centery"} style={{padding: 10}} variant="h6">
                                            <p>{t('What is Metrology?')}</p></Typography>
                                        <Typography align={"justify"} variant="subtitle1" style={{padding: 30}}>
                                            <p>{t('Metrology info')}</p>
                                            <p>{t('Metrology tasks')}</p>
                                            <p>{t('Metrology Methods')}</p>
                                            <p>{t('Metrology Methods list')}</p>
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

WhatIsMetrology.propTypes = {
   t: PropTypes.node
};
export default withTranslation()(WhatIsMetrology)
