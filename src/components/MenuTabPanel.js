import React from 'react';

import {Box, Grid, AppBar, CssBaseline, Toolbar, Typography, Tabs, Tab, MenuItem, Select} from '@mui/material';
import '../style/login.css';
import i18n from "../menu/translations/i18n";
import history from "../history";
import Login from "./Login";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import logo from "../menu/style/LogoMakr_6pZrzB.png"
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png";
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png";
import FlagRU from "../menu/style/LogoMakr_3lAH4j.png";


function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div>
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function MenuTabPanel() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                                <img src={logo} alt={''}/>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{marginRight: "auto"}}>
                                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth"
                                        value={lang} style={{backgroundColor: "transparent"}}
                                        onChange={handleChangeLang} autoWidth>
                                    <MenuItem value={'ua'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagUA} alt={''}/></MenuItem>
                                    <MenuItem value={'en'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagUS} alt={''}/></MenuItem>
                                    <MenuItem value={'ru'} style={{
                                        backgroundColor: "rgba(0,1,14,0.74)",
                                        border: "none",
                                        outline: "none"
                                    }}><img src={FlagRU} alt={''}/></MenuItem>
                                </Select></div>
                        </Grid>
                    </Grid>
                </Toolbar>
                <AppBar position="static" square>
                    <Tabs centered value={value} onChange={handleChange} indicatorColor="secondary" variant="fullWidth">
                        <Tab label={"Welcome"} {...a11yProps(0)}
                             onClick={() => history.push('/')}/>
                        <Tab label={'Login'}  {...a11yProps(1)}
                             onClick={() => history.push('/login')}/>
                        <Tab label={'Contacts'} {...a11yProps(2)}
                             onClick={() => history.push('/contact')}/>
                    </Tabs>
                </AppBar>
            </AppBar>
        </div>
    );
}

export default withTranslation()(MenuTabPanel)
