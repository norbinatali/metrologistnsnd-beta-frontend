import React, { Component,useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import{Mutation} from 'react-apollo';
import { CREATE_LETTER} from '../constants';
import '../style/login.css';
import ContactUS from "./ContactUS";
import { useSnackbar } from 'notistack';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import i18n from "../menu/translations/i18n";
import gql from "graphql-tag";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../history";
import Login from "./Login";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import FrontPic from "../menu/style/Screen Shot 2019-11-28 at 9.19.01 PM.png"
import logo from "../menu/style/LogoMakr_6pZrzB.png"
import FlagUA from "../menu/style/LogoMakr_1Xl0t4.png";
import FlagUS from "../menu/style/LogoMakr_4V1dPm.png";
import FlagRU from "../menu/style/LogoMakr_3lAH4j.png";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    fade
} from '@material-ui/core/styles';

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
};
const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'transparent',
       color:"rgba(0,1,47,0.84)",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&$focused': {
            backgroundColor: 'transparent',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));




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

function MenuTabPanel({t,props}) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
const { enqueueSnackbar } = useSnackbar();
    const [sendMail]= useState(true);
     const [from, setFrom] =useState("");
     const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
const [formState, setFormState] = useState({
        isValid: false,
        values: {from},
        touched: {},
        errors: {}
    });
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
const [lang, setLang] = React.useState(i18n.language);
 
const handleChangeLang = event => {
setLang(event.target.value);
i18n.changeLanguage(event.target.value);  
  };
    const handleChangeIndex = index => {
        setValue(index);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
 const confirm = async (token, e) => {
       
        saveLetterData(token);
        enqueueSnackbar('Thank you for your request. Дякую за Ваше звернення')
    };
 const saveLetterData = token => {
        localStorage.setItem(CREATE_LETTER, token)
    }
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
                    <div style={{marginRight:"auto"}}>
  <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={lang} style={{backgroundColor:"transparent"}} onChange={handleChangeLang} autoWidth>
   <MenuItem value={'ua'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagUA}/></MenuItem>
   <MenuItem value={'en'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagUS}/></MenuItem>
<MenuItem value={'ru'} style={{backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} ><img src={FlagRU}/></MenuItem>
                  </Select>  </div>
</Grid>
</Grid>
                </Toolbar>
                <AppBar position="static" square>
                    <Tabs centered value={value} onChange={handleChange} indicatorColor="white" variant="fullWidth" className ={classes.toolBar}>
                        <Tab label={t("Welcome")} {...a11yProps(0)} className={classes.tab} onClick={()=> history.push('/')} />
                        <Tab label={t('Login')}  {...a11yProps(1)} className={classes.tab} onClick={()=> history.push('/login')} />
                        <Tab label={t('Contacts')} {...a11yProps(2)} className={classes.tab} onClick={()=> history.push('/contact')}/>
                    </Tabs>
                </AppBar>
            </AppBar>

        </div>
    );


}
export default withTranslation()(MenuTabPanel)
