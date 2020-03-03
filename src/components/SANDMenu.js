import React from 'react';
import {Grid, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Toolbar} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import history from '../history'
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop:'50px',
        width: "100%",
        "@media (min-width: 576px)": {
            maxWidth: "540px",
            marginTop:'80px'
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px",
            marginTop:"50px",
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px",
            marginTop:"50px",
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1340px",
            marginTop:"30px",
        },
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


function SANDMenu({t}){
const classes = useStyles();
  

return(
    <div style={{display: 'flex', marginTop:"50px"}}>
            <Grid container justify={center} xs={12} spacing={2}>
        <Grid item lg={4} md={6} xs={12}>
                        <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
                            <ButtonBase
                                focusRipple
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width:"300px",
                                }}
                                onClick={()=> history.push('/sand/17025')}
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
                {t('ISO 17025:2017')}
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
onClick={()=> history.push('/sand/9001')}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width:"300px",
                                }}
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
                {t('ISO 9001')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
  <ButtonBase focusRipple onClick={()=> history.push('/sand/17065')} className={classes.image} focusVisibleClassName={classes.focusVisible} style={{width:"300px",}}>
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 17065:2012')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
<ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/80000')} focusVisibleClassName={classes.focusVisible} style={{width:"300px",}}>
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 80000:2016')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
<ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/17021')} focusVisibleClassName={classes.focusVisible} style={{
                                    width:"300px",
                                }}
                            >
          <span className={classes.imageSrc} style={{
                  backgroundImage: `url(})`,
              }}
          />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 17021:2011')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                            </ButtonBase>
                                </div>
                            </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
 <ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/17043')} focusVisibleClassName={classes.focusVisible} style={{
                                width:"300px",
                            }}
                        >
          <span className={classes.imageSrc} style={{backgroundImage: `url()`,}}/>
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 17043')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
<ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/17020')} focusVisibleClassName={classes.focusVisible} style={{
                width:"300px",
            }}
            >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 17020')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
            </ButtonBase>
        </div>
</Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
 <ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/17034')} focusVisibleClassName={classes.focusVisible} style={{
                    width:"300px",
                }}
                >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 17034')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                </ButtonBase>
        </div>
</Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div style={ {display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',}}>
<ButtonBase focusRipple className={classes.image} onClick={()=> history.push('/sand/8000')} focusVisibleClassName={classes.focusVisible} style={{
                            width:"300px",
                        }}
                        >
          <span className={classes.imageSrc} style={{
              backgroundImage: `url()`,
          }}
          />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                {t('ISO 8000')}
                <span className={classes.imageMarked} />
            </Typography>
          </span>
                        </ButtonBase>
                    </div>
                </Grid>
            </Grid>
</div>

)


}
export default withTranslation() (SANDMenu)
