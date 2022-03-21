import React from 'react';
import {withTranslation} from "react-i18next";
import {
    ListItemText,
    ListItem,
    ListItemIcon,
    Popper,
    Paper,
    Grow,
    ClickAwayListener,
    MenuList,
    MenuItem,
    IconButton,
    Typography
} from "@mui/material";
import AssignmentIcon from "@mui/material/SvgIcon/SvgIcon";
import Auth from "../pages/Home/Auth/Auth";
import history from "../history";
import {ExitToApp} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PropTypes from "prop-types";

function UserMenuAccount({t}) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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

    const handleDrawerCloseUserPage = () => {
        setOpen(false);
        history.push('/account');
    };
    const handleDrawerCloseContactUS = () => {
        setOpen(false);
        history.push('/contactus');
    };
    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="open drawer" ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
                <AccountCircleIcon/>
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
                                    <MenuItem
                                        onClick={handleDrawerCloseUserPage}><ListItem><ListItemIcon><AccountCircleIcon
                                        style={{
                                            color: "rgba(0,1,14,0.74)",
                                            border: "none",
                                            outline: "none"
                                        }}/></ListItemIcon> <ListItemText
                                        primary={<Typography>{t('Change profile')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem disabled><ListItem><ListItemIcon><AssignmentIcon style={{
                                        color: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}/></ListItemIcon><ListItemText
                                        primary={<Typography>{t('About us')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseContactUS}><ListItem><ListItemIcon>
                                        <ContactSupportIcon style={{
                                            color: "rgba(0,1,14,0.74)",
                                            border: "none",
                                            outline: "none"
                                        }}/></ListItemIcon><ListItemText
                                        primary={<Typography>{t('Contacts')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={() => {
                                        Auth.signOut();
                                        history.push('/')
                                    }}><ListItem><ListItemIcon> <ExitToApp style={{
                                        color: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}/></ListItemIcon><ListItemText primary={<Typography>{t('logout')}</Typography>}/></ListItem></MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

UserMenuAccount.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(UserMenuAccount);
