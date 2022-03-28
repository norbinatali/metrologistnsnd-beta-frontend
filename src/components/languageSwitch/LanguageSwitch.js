import {FormControl, MenuItem, Select} from "@mui/material";
import FlagUA from "../../assets/images/LogoMakr_1Xl0t4.png";
import FlagUS from "../../assets/images/LogoMakr_4V1dPm.png";
import FlagRU from "../../assets/images/LogoMakr_3lAH4j.png";
import React from "react";
import i18n from "../../i18n/i18n";

export const LanguageSwitch = () => {
    const [lang, setLang] = React.useState(i18n.language);
    const handleChangeLang = event => {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    };
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
        <Select value={lang} className={'switch-languages'}
                onChange={handleChangeLang}>
            <MenuItem value={'ua'}><img src={FlagUA} alt={''}/></MenuItem>
            <MenuItem value={'en'}><img src={FlagUS} alt={''}/></MenuItem>
            <MenuItem value={'ru'}><img src={FlagRU} alt={''}/></MenuItem>
        </Select>
        </FormControl>
    )
}
