import React from 'react';
import {withTranslation} from "react-i18next";
import {
    ListItemIcon,
    MenuItem,
    IconButton,
    Tooltip, Avatar, Divider
} from "@mui/material";
import Auth from "../../pages/Home/Auth/Auth";

import {Logout, Menu, PersonAdd, Settings} from "@mui/icons-material";

import PropTypes from "prop-types";

function UserMenuAccount({t}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    console.log(Auth.isAuthenticated);
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem>
                    <Avatar/> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar/> My account
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small"/>
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

UserMenuAccount.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(UserMenuAccount);
