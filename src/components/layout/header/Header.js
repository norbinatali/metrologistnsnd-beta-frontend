import React from 'react';
import {Toolbar} from '@mui/material';
import logo from "../../../assets/images/LogoMakr_6pZrzB.png";
import {LanguageSwitch} from "../../languageSwitch/LanguageSwitch";
import UserMenuAccount from "../../userCard/UserMenuAccount";
import Auth from "../../../pages/Home/Auth/Auth";

export default function Header() {
    return (
        <Toolbar className={"d-flex align-center justify-content-center" }>

                <div style={{"flex": "1 0 80%"}}>
                    <img src={logo} alt={''}/>
                </div>
                <div style={{"flex": "0 0 4%"}}>
                    <LanguageSwitch/>
                </div>
            {Auth.isAuthenticated && <div style={{"flex": "0 0 6%"}}>
                <UserMenuAccount/>
            </div>
            }
        </Toolbar>
    );
}
