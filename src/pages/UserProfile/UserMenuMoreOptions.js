import React from 'react';
import {
    ListItemText,
    Popper,
    Paper,
    MenuItem,
    IconButton,
    ListItem,
    ListItemIcon,
    Typography,
    MenuList,
    Grow,
    ClickAwayListener
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import history from '../../history';
import {withTranslation} from 'react-i18next';
import PropTypes from "prop-types";

function UserMenuMoreOptions({t}) {
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
        localStorage.removeItem('device-id');
        localStorage.removeItem('device-name');
        history.push('/mydevices');
    };
    const handleDrawerCloseSand = () => {
        setOpen(false);
        history.push('/sand');
    };
    const handleDrawerCloseForum = () => {
        setOpen(false);
        history.push('/forum');
    };
    const handleDrawerCloseApps = () => {
        setOpen(false);
        history.push('/apps');
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
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="open drawer" ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}
                        >
                <MenuIcon/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleDrawerCloseDashboard}>
                                        <ListItem><ListItemIcon><DashboardIcon/> </ListItemIcon> <ListItemText
                                            primary={<Typography>{t('Dashboard')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem
                                        onClick={handleDrawerCloseMetrology}><ListItem><ListItemIcon><LibraryBooksIcon
                                        /></ListItemIcon><ListItemText
                                        primary={<Typography>{t('Metrology')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseMyDevice}><ListItem><ListItemIcon><BuildIcon
                                       /></ListItemIcon><ListItemText
                                        primary={<Typography>{t('My devices')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseSand}><ListItem><ListItemIcon><FolderIcon
                                        /></ListItemIcon><ListItemText
                                        primary={<Typography>{t('SAND')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem disabled
                                              onClick={handleDrawerCloseForum}><ListItem><ListItemIcon><PeopleIcon
                                        /></ListItemIcon><ListItemText
                                        primary={<Typography>{t('Forum')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem disabled
                                              onClick={handleDrawerCloseApps}><ListItem><ListItemIcon><ImportantDevicesIcon
                                        /></ListItemIcon><ListItemText
                                        primary={<Typography>{t('Apps')}</Typography>}/></ListItem></MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

UserMenuMoreOptions.propTypes = {
    className: PropTypes.string,
    t: PropTypes.node
};
export default withTranslation()(UserMenuMoreOptions);
