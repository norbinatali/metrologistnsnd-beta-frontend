import React from 'react';


import { makeStyles } from '@material-ui/core/styles';



import Typography from '@material-ui/core/Typography';



import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import history from '../history';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import StandardButtons from "./StandardsButtons";
import UserMenu from "./UserMenu";





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


function StandardListGrid({t}) {

    const classes = useStyles();
    const [component, setComponent] = React.useState(' ');
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [valueLang, setValueLang] = React.useState('');
  
    return (
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
        <div className={classes.root}>
            <div style={{ marginTop: "10%" }}>
                <Typography variant="h5" component="h2">{t('Standards and Devices')}</Typography>
            </div>

            <div className={classes.content}>


<StandardButtons/>



            </div>

        </div>
</main>
</div>
    );

}

export default withTranslation()(StandardListGrid)
