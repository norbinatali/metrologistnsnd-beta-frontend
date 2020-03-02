import React from 'react';
import clsx from 'clsx';

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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import history from '../history';
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import ListSubheader from "@material-ui/core/ListSubheader";
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png"
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png"
import FlagRU from "../menu/style/LogoMakr_3lAH4j.png"
import LogoV2 from  "../menu/style/LogoMakr_6pZrzB.png"
import { GC_USER_ID } from '../constants'
import Auth from '../components/Auth';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import BuildIcon from '@material-ui/icons/Build';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserMenuAccount from "./UserMenuAccount";
import UserMenuMoreOptions from "./UserMenuMoreOptions";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
       
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 2,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        height:"100%",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: 240,
        width: 'calc(100% - ${drawerWidth}px)',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '80%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        border:"1px solid",
        color: 'inherit',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    Control: {
        color:"White",
        margin: theme.spacing(2),
        minWidth: 50,
    },

}));


 function UserMenu({t}) {

    const classes = useStyles();
    const [component, setComponent] = React.useState(' ');
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [valueLang, setValueLang] = React.useState(''
    );
     const [lang, setLang] = React.useState(i18n.language);
 const handleChangeLang = event => {
     setLang(event.target.value);
i18n.changeLanguage(event.target.value);
    

  };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
     const handleDrawerCloseDashboard = () => {
         setOpen(false);
         history.push('/dashboard');
     };
    const handleDrawerCloseMetrology = () => {
        setOpen(false);
       history.push('/metrology');
    };
     const handleDrawerCloseMyDevice = () => {
         setOpen(false);
        history.push('/mydevices');
     };
     const handleDrawerCloseSand = () => {
         setOpen(false);
         history.push('/standards');
     };
     const handleDrawerCloseForum = () => {
         setOpen(false);
         setComponent('forum')
     };
     const handleDrawerCloseApps = () => {
         setOpen(false);
         setComponent('apps')
     };
     
     const handleDrawerCloseUserPage = () => {
         setOpen(false);
          history.push('/account');
     };
     const handleDrawerCloseContactUS = () => {
         setOpen(false);
          history.push('/contactus');
     };
    
     const userId = localStorage.getItem(GC_USER_ID);
   
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                   <UserMenuAccount/>
                    <UserMenuMoreOptions />
                     
                   <img src={LogoV2} style={{marginRight:"auto",marginLeft:"auto"}}/>
<Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={lang} style={{backgroundColor:"transparent"}} onChange={handleChangeLang} autoWidth>
   <MenuItem value={'ua'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagUA}/></MenuItem>
   <MenuItem value={'en'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagUS}/></MenuItem>
<MenuItem value={'ru'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagRU}/></MenuItem>
                  </Select> 
                                </Toolbar>

            </AppBar>
           
           
        </div>


    );

}

export default withTranslation()(UserMenu)
