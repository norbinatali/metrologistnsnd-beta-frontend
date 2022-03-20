import React from 'react';
import {Grid, Typography, Paper} from "@mui/material";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import UserMenu from "./UserMenu";

function HistoryMetrology({t}) {
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
                                        <Typography align={"justify"} style={{padding: 10}}
                                                    variant="subtitle1">{t('History')} </Typography>
                                        <Typography align={"justify"} style={{padding: 30}} variant="subtitle1">
                                            <p>{t('History info')}</p>
                                            <p>{t('History metrology info')}</p>
                                            <p>{t('History metrology')}</p>
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

HistoryMetrology.propTypes = {
    className: PropTypes.string,
    t:PropTypes.node
};
export default withTranslation()(HistoryMetrology)
