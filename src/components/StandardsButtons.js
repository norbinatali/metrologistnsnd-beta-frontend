import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import history from '../history';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import Paper from "@material-ui/core/Paper";
import Dashboard from "../components/Dashboard";
import MyDevice from "../components/MyDevice";
import { AUTH_TOKEN } from '../constants';
import ContactUS from "../components/ContactUS";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    image: {
        position: 'relative',
        height: 100, [theme.breakpoints.down('xs')]: {
            width: '90% !important', // Overrides inline-style
            height: 100,
        },

        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    content: {
        marginTop: theme.spacing(2)
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },


}));


function StandardButtons({t}) {

    const classes = useStyles();
    const [component, setComponent] = React.useState(' ');
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [valueLang, setValueLang] = React.useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
    return (
        <div style={{display: 'flex'}}>
            <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
                        <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                            <ButtonBase
                                focusRipple
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width:"300px",
                                }}
                                onClick={()=> history.push('/standards-L')}
                            >
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url()`,
              }}
          />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
                {t('L')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                        </div>
        </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
                            <ButtonBase
                                focusRipple

                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width:"300px",
                                }}
                                  onClick={()=> history.push('/standards-M')}
                            >
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url()`,
              }}
          />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
                {t('M')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                            <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible}   onClick={()=> history.push('/standards-EM')} style={{width:"300px",}}>
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('EM')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
     <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible}   onClick={()=> history.push('/standards-T')} style={{width:"300px",}}>
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('T')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                            <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} style={{
                                    width:"300px",
                                }}
                                  onClick={()=> history.push('/standards-TF')}
                            >
          <span className={classes.imageSrc} style={{
                  backgroundImage: `url(})`,
              }}
          />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('TF')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} style={{
                                width:"300px",
                            }}
                              onClick={()=> history.push('/standards-PR')}
                        >
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('PR')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} style={{
                width:"300px",
            }}
              onClick={()=> history.push('/standards-IR')}
            >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('IR')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
            </ButtonBase>
        </div>
</Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} style={{
                    width:"300px",
                }}
                  onClick={()=> history.push('/standards-AUV')}
                >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('AUV')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                </ButtonBase>
        </div>
</Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                        <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} style={{
                            width:"300px",
                        }}
                          onClick={()=> history.push('/standards-QM')}
                        >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('QM')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
            </Grid>
             </div>
    );

}

export default withTranslation()(StandardButtons)
