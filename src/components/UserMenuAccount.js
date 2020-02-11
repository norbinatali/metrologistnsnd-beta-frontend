import React from 'react';
import {withTranslation} from "react-i18next";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Auth from "./Auth";
import history from "../history";
import Menu from "@material-ui/core/Menu";
import {ExitToApp} from "@material-ui/icons";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));
function UserMenuAccount({t}) {
const classes = useStyles();
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
return(
        <div>
            <IconButton edge="start" color="inherit" aria-label="open drawer" ref={anchorRef}   aria-controls={open ? 'menu-list-grow' : undefined}   aria-haspopup="true"  onClick={handleToggle} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                <AccountCircleIcon />
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
                                    <MenuItem onClick={handleDrawerCloseUserPage}><ListItem ><ListItemIcon><AccountCircleIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}}/></ListItemIcon>  <ListItemText primary={<Typography>{t('Change profile')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem  disabled><ListItem ><ListItemIcon><AssignmentIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}}/></ListItemIcon><ListItemText primary={<Typography>{t('About us')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={handleDrawerCloseContactUS}><ListItem > <ContactSupportIcon style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} /></ListItemIcon><ListItemText primary={<Typography>{t('Contacts')}</Typography>}/></ListItem></MenuItem>
                                    <MenuItem onClick={onClick={() => {
                         Auth.signout();
                         history.push('/')
                        }}>}><ListItem ><ListItemIcon>  <ExitToApp style={{color:"rgba(0,1,14,0.74)",border:"none",outline:"none"}}/></ListItemIcon><ListItemText primary={<Typography>{t('logout')}</Typography>}/></ListItem></MenuItem>
                                    </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )

}
export default withTranslation() (UserMenuAccount);
