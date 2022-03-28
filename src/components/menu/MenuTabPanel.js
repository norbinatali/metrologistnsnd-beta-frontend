import React from 'react';
import {Toolbar} from '@mui/material';
import {withTranslation} from "react-i18next";
import {TabButton} from '../tabButtons/TabButton'


const MenuTabPanel = () => {
    const tabs =[{
        id: "welcome",
        addClass: "button-menu",
        title: "Welcome",
        link: '/'
    }, {
        id: "login",
        addClass: "button-menu",
        title: "Login",
        link: '/login'
    },{
        id: "contact",
        addClass: "button-menu",
        title: "Contact",
        link: '/contact'
    }];

    return (
        <Toolbar position="static">
            <TabButton arr={tabs}/>
        </Toolbar>
    );
}

export default withTranslation()(MenuTabPanel)
