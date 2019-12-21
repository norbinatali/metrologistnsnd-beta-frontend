import React from 'react';
import clsx from 'clsx';
import Auth from '../components/Auth';
import SearchIcon from '@material-ui/icons/Search';
import { fade,makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import Box from '@material-ui/core/Box';
import history from '../history';
import History from "../components/History";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import AssessmentTheory from "../components/AssessmentTheory";
import QM from "../components/QM";
import Standards from "../components/Standards";
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Dashboard from "../components/Dashboard";
import MyDevice from "../components/MyDevice";
import { AUTH_TOKEN } from '../constants';
import ContactUS from "../components/ContactUS";
import { GC_USER_ID } from '../constants'
import UserProfile from "../components/UserProfile";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Link from "@material-ui/core/Link";
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
