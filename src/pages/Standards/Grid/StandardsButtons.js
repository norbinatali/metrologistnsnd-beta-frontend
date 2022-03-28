import React from 'react';
import {Typography, Grid, ButtonBase} from '@mui/material';
import history from '../../../history';
import {withTranslation} from 'react-i18next';
import PropTypes from "prop-types";

function StandardButtons({t}) {
    return (
        <div style={{display: 'flex'}}>
            <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase
                            focusRipple
                            style={{
                                width: "300px",
                            }}
                            onClick={() => history.push('/standards-L')}
                        >
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                            >
                                {t('L')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
                        <ButtonBase
                            focusRipple
                            style={{
                                width: "300px",
                            }}
                            onClick={() => history.push('/standards-M')}
                        >
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                            >
                                {t('M')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple
                                    onClick={() => history.push('/standards-EM')} style={{width: "300px",}}>
                            <Typography component="span" variant="subtitle1" color="inherit"
                                        className={classes.imageTitle}>
                                {t('EM')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple
                                    onClick={() => history.push('/standards-T')} style={{width: "300px",}}>

                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('T')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/standards-TF')}>
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('TF')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/standards-PR')}>
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('PR')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple
                                    onClick={() => history.push('/standards-IR')}>
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('IR')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple
                                    onClick={() => history.push('/standards-AUV')}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('AUV')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple
                                    onClick={() => history.push('/standards-QM')}
                        >

                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('QM')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

StandardButtons.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(StandardButtons)
