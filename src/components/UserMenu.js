import React from 'react';
import {CssBaseline, AppBar, Toolbar, MenuItem, Select} from '@mui/material';
import {withTranslation} from 'react-i18next';
import i18n from "../i18n/i18n";
import FlagUA from "../assets/images/LogoMakr_1Xl0t4.png"
import FlagUS from "../assets/images/LogoMakr_4V1dPm.png"
import FlagRU from "../assets/images/LogoMakr_3lAH4j.png"
import LogoV2 from "../assets/images/LogoMakr_6pZrzB.png"
import UserMenuAccount from "./UserMenuAccount";
import UserMenuMoreOptions from "./UserMenuMoreOptions";

function UserMenu() {
    const [lang, setLang] = React.useState(i18n.language);
    const handleChangeLang = event => {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    };
    return (

        <div>
            <CssBaseline/>
            <AppBar position="absolute">
                <Toolbar>
                    <UserMenuAccount/>
                    <UserMenuMoreOptions/>
                    <img src={LogoV2} style={{marginRight: "auto", marginLeft: "auto"}} alt={''}/>
                    <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={lang}
                            style={{backgroundColor: "transparent"}} onChange={handleChangeLang} autoWidth>
                        <MenuItem value={'ua'}
                                  style={{backgroundColor: "rgba(0,1,14,0.74)", border: "none", outline: "none"}}><img
                            src={FlagUA} alt={''}/></MenuItem>
                        <MenuItem value={'en'}
                                  style={{backgroundColor: "rgba(0,1,14,0.74)", border: "none", outline: "none"}}><img
                            src={FlagUS} alt={''}/></MenuItem>
                        <MenuItem value={'ru'}
                                  style={{backgroundColor: "rgba(0,1,14,0.74)", border: "none", outline: "none"}}><img
                            src={FlagRU} alt={''}/></MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default withTranslation()(UserMenu)
