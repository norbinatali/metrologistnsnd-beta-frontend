import React from 'react';
import clsx from 'clsx';
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
import AssessmentTheory from "../components/AssessmentTheory";
import QM from "../components/QM";
import Standards from "../components/Standards";
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Dashboard from "../components/Dashboard";
import MyDevice from "../components/MyDevice";
import AddDevice from "../components/AddDevice";
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png"
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png"
import LogoV2 from  "../menu/style/LogoMakr_6pZrzB.png"
import { AUTH_TOKEN } from '../constants';
import ContactUS from "../components/ContactUS";
import { GC_USER_ID } from '../constants'
import Auth from '../components/Auth';



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
        height: 240,
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


 function MenuUser({t}) {

    const classes = useStyles();
    const [component, setComponent] = React.useState(' ');
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [valueLang, setValueLang] = React.useState(''
    );
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
         setComponent('dashboard')
     };
    const handleDrawerCloseMetrology = () => {
        setOpen(false);
        setComponent('metrology')
    };
     const handleDrawerCloseMyDevice = () => {
         setOpen(false);
         setComponent('mydevice')
     };
     const handleDrawerCloseSand = () => {
         setOpen(false);
         setComponent('sand')
     };
     const handleDrawerCloseForum = () => {
         setOpen(false);
         setComponent('forum')
     };
     const handleDrawerCloseApps = () => {
         setOpen(false);
         setComponent('apps')
     };
     const handleDrawerCloseContactUS = () => {
         setOpen(false);
         setComponent('contactus')
     };
     const handleDrawerCloseUserPage = () => {
         setOpen(false);
         setComponent('UserPage')
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
                    <IconButton edge="start" color="inherit" aria-label="open drawer" value={valueLang} onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                   <img src={LogoV2} style={{marginRight:"auto",marginLeft:"auto"}}/>
                                </Toolbar>

            </AppBar>
            <Drawer classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose} >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >
                    <ListItem button onClick={handleDrawerCloseDashboard} >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('Dashboard')} />
                </ListItem>
                    <ListItem  button onClick={handleDrawerCloseMetrology}>
                        <ListItemIcon >
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Metrology')} />
                    </ListItem>
                    <ListItem  button onClick={handleDrawerCloseMyDevice}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('My devices')} />
                    </ListItem>
                    <ListItem button onClick={handleDrawerCloseSand}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('SAND')} />
                    </ListItem>
                    <ListItem button onClick={handleDrawerCloseForum}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Forum')} />
                    </ListItem>
                    <ListItem button onClick={handleDrawerCloseApps}>
                        <ListItemIcon>
                            <ImportantDevicesIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Apps')} />
                    </ListItem>
        </List>
                <Divider />
                <List> <div>
                    <ListSubheader inset>{t('Settings')}</ListSubheader>
                    <ListItem button onClick={handleDrawerCloseUserPage}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Change profile')} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('About us')} />
                    </ListItem>
                    <ListItem button onClick={handleDrawerCloseContactUS}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('Contacts')} />
                    </ListItem>
                    <ListItem button onClick={() => {
                         Auth.signout();
                         history.push('/')
                        }}>
                            <ListItemIcon>
                                <ExitToApp/>
                            </ListItemIcon>
                            <ListItemText primary={t('logout')}/>
                        </ListItem>
                </div></List>
            </Drawer>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
               

                {  component === 'dashboard' ?
                    <div style={{ marginTop: 40 }}>

                        <div style={{ marginTop: 20, padding:30}}>
                                <Dashboard/>
                                <div >
                                    <ContactUS/>
                                </div>
                        </div>
                        </div>

                        :
                        component === 'metrology' ?
                            <div style={{display:"flex"}}>
                                <div style={{ marginTop: 80,padding:30 }}>
                                    <Typography variant="h5" component="h2">{t('Metrology')}</Typography>
                                    <div style={{ marginTop: 20 }}>
                                       <History/>
                                    </div>
                                </div>
                                </div>
                            :
                            component === 'mydevice' ?
                                <div style={{display:"flex"}}>
                                    <div style={{ marginTop: 80,padding:30  }}>
                                                 <MyDevice />
                                    </div>
                                </div>
                                :
                            component === 'sand' ?
                                
                                    <div style={{ marginTop: 80,padding:30 }}>
                                <div style={{flexGrow: 1, width: '100%'}}>
                                     
                                              <Typography variant="h5" component="h2">{t('Measuring Instrument')}</Typography>
                                          <div style={{ marginTop: 20 }}>
                                                <Standards />
                                         
                                        </div>
                                    </div></div>
                                                :
                                component === 'history' ?
                                <History />
                                :
                                component === 'addDevice' ?
                    <AddDevice/>
                    :
                                    component === 'contactus'?
                                        <div >
                                            <div style={{ marginTop: 40,padding:30 }}>
                                                <Typography variant="h5" component="h2">{t('Contact us')}</Typography>
                                            </div>
                                            <div style={{flexGrow: 1, width: '100%'}}>
                                                <ContactUS/>
                                            </div>
                                        </div>
                                        :
                                        component === ' ' ?
                                            <div style={{display:"flex"}}>
                                                <div style={{ marginTop: 40,padding:30 }}>
                                                   
                                                        <Dashboard/>
                                                        <div >
                                                            <ContactUS/>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                            : component
                }

            </main>



        </div>


    );

}

export default withTranslation()(MenuUser)
