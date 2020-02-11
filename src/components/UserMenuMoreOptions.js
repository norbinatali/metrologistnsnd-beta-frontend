import React from 'react';


import AssignmentIcon from "@material-ui/core/SvgIcon/SvgIcon";

import {ExitToApp} from "@material-ui/icons";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import BuildIcon from '@material-ui/icons/Build';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import history from '../history';
import { withTranslation} from 'react-i18next';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));
function UserMenuMoreOptions({t}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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
     

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return(
        <div>
            <IconButton edge="start" color="inherit" aria-label="open drawer" ref={anchorRef}   aria-controls={open ? 'menu-list-grow' : undefined}   aria-haspopup="true"  onClick={handleToggle} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                <MenuIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleDrawerCloseDashboard}><ListItem>  <ListItem ><ListItemIcon><DashboardIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon>  <ListItemText primary={<Typography>{t('Dashboard')}</Typography>} /></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseMetrology}><ListItem ><ListItemIcon><LibraryBooksIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('Metrology')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseMyDevice}><ListItem ><ListItemIcon><BuildIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('My devices')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseSand}><ListItem ><ListItemIcon><FolderIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('SAND')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem disabled onClick={handleDrawerCloseForum}><ListItem ><ListItemIcon><PeopleIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('Forum')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem disabled onClick={handleDrawerCloseApps}><ListItem ><ListItemIcon><ImportantDevicesIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('Apps')}</Typography>}/></ListItem></MenuItem>
                                    </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )

}
export default withTranslation() (UserMenuMoreOptions);
