import React from 'react';

import {Select, MenuItem, CssBaseline, Toolbar, AppBar, Grid} from "@mui/material";
import '../style/login.css';
import i18n from "../menu/translations/i18n";
import {withTranslation} from "react-i18next";
import logo from "../menu/style/LogoMakr_6pZrzB.png"
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png";
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png";
import FlagRU from "../menu/style/LogoMakr_3lAH4j.png";

function MenuForConfirm() {

    const [lang, setLang] = React.useState(i18n.language);

    const handleChangeLang = event => {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <Grid container spacing={16}>
                        <Grid item xs={11}>
                            <div style={{marginRight: "auto", marginLeft: "auto",}}>
                                <img src={logo} alt={}/>
                            </div>
                        </Grid>
                        <Grid item spacing={6}>
                            <div style={{marginRight: "auto"}}>
                                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth"
                                        value={lang} style={{backgroundColor: "transparent"}}
                                        onChange={handleChangeLang} autoWidth>
                                    <MenuItem value={'ua'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagUA} alt={}/></MenuItem>
                                    <MenuItem value={'en'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagUS} alt={}/></MenuItem>
                                    <MenuItem value={'ru'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagRU} alt={}/></MenuItem>
                                </Select></div>
                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>

        </div>
    );


}

export default withTranslation()(MenuForConfirm)
