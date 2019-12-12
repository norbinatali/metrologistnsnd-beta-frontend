import React, { Component } from 'react';
import Navbar, { ElementsWrapper } from '../menu/navbar';
import SignUp from '../SignUp';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import { AUTH_TOKEN , GC_USER_ID} from '../constants';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import '../style/login.css';
import ContactUS from "./ContactUS";
import Link from "@material-ui/core/Link";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import {Button} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import i18n from "../menu/translations/i18n";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "./Login";
import {withTranslation} from "react-i18next";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import FrontPic from "../menu/style/Screen Shot 2019-11-28 at 9.19.01 PM.png"
import logo from "../menu/style/LogoMakr_6pZrzB.png"
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png";
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png";

const classes = makeStyles(theme => ({
    root: {
        marginTop:theme.spacing(1),
        width: "90%",
        height:"600px",
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529);",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div >
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
                className={classes.root}
            >
                {value === index && <Box p={3} >{children}</Box>}
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


const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",


    },
    toolBar:{
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529);",
display:"flex"
    },
    padding: {
        padding: theme.spacing(1),
    },
    panel: {
marginRight:"auto",
        marginTop: "0px",
        marginLeft: "auto",
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529);"
    },
    tab:{


    }


}));

function MenuTabPanel({t}) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar >
                <Toolbar className={classes.toolBar}>
 <Grid container spacing={16}>
                        <Grid item xs={11}>
 <div style={{ marginRight: "auto", marginLeft: "auto",}}>
                    <img src={logo}  />
</div>
</Grid>
  <Grid item spacing={6}>
                    <div style={{marginLeft:"auto"}}>
                        <button style={{height:"10%",width:"25%", backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} onClick={() => changeLanguage('ua')}><img src={FlagUA}/></button>
                        <button style={{height:"10%", width:"25%", backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} onClick={() => changeLanguage('en')}><img src={FlagUS}/></button>
                    </div>
</Grid>
</Grid>
                </Toolbar>
                <AppBar position="static" square>
                    <Tabs centered value={value} onChange={handleChange} indicatorColor="white" variant="fullWidth" className ={classes.toolBar}>
                        <Tab label={t("Welcome")} {...a11yProps(0)} className={classes.tab}/>
                        <Tab label={t('Login')}  {...a11yProps(1)} className={classes.tab}/>
                        <Tab label={t('Contacts')} {...a11yProps(2)} className={classes.tab}/>
                    </Tabs>
                </AppBar>
            </AppBar>


            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}  index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction} className={classes.panel}>
                    <div style={{display:"flex"}}>
                        <MuiThemeProvider>
                            <Grid container spacing={6} style={{display: 'flex'}} >
                                <Grid item xs={4} sm={5}  >
                                    <Typography style={{color:"#fff"}}>  <h4 >{t('New software for metrologist, manufactures and people who wants to know more about measuring technology')}</h4></Typography>
                                </Grid>
                                <Grid item xs={4} sm={5} >
                                    <img src={FrontPic}/>
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} className={classes.panel} >
                    <div style={{marginRight:"auto", marginLeft:"auto"}}>

                        <Login/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} className={classes.panel}>
                    <div>

                        <ContactUS />
                    </div>
                </TabPanel>
            </SwipeableViews>

        </div>
    );


}
export default withTranslation()(MenuTabPanel)
