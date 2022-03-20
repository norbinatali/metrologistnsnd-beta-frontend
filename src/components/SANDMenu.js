import React from 'react';
import {Grid, ButtonBase, Typography} from "@mui/material";

import history from '../history'
import {withTranslation} from 'react-i18next';
import PropTypes from "prop-types";

function SANDMenu({t}) {
    return (
        <div style={{display: 'flex', marginTop: "50px"}}>
            <Grid container justify={"center"} xs={12} spacing={2}>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase
                            focusRipple
                            style={{
                                width: "300px",
                            }}
                            onClick={() => history.push('/sand/17025')}
                        >
          <span
              style={{
                  backgroundImage: `url()`,
              }}
          />
                            <span/>
                            <span>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
                {t('ISO 17025-2017')}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
                        <ButtonBase
                            focusRipple
                            onClick={() => history.push('/sand/9001')}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: "300px",
                            }}
                        >
          <span
              style={{
                  backgroundImage: `url()`,
              }}
          />
                            <span/>
                            <span>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
            >
                {t('ISO 9001')}
                <span/>
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/17065')}
                                    style={{width: "300px"}}>
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 17065-2012')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/80000')}
                                    style={{width: "300px",}}>
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 80000-2016')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/17021')}
                                    style={{
                                        width: "300px",
                                    }}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 17021-2011')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/17043')}
                                    style={{
                                        width: "300px",
                                    }}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 17043')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/17020')}
                                    style={{
                                        width: "300px",
                                    }}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 17020')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/17034')}
                                    style={{
                                        width: "300px",
                                    }}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 17034')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple onClick={() => history.push('/sand/8000')}
                                    style={{
                                        width: "300px",
                                    }}
                        >
                            <Typography component="span" variant="subtitle1" color="inherit">
                                {t('ISO 8000')}
                            </Typography>
                        </ButtonBase>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

SANDMenu.propTypes = {
    className: PropTypes.string,
    t: PropTypes.node
};
export default withTranslation()(SANDMenu)
