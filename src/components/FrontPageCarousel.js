import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from "@material-ui/core/Grid";
import {withTranslation} from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import {Button} from "@material-ui/core";
import history from "../history";
import Card from "@material-ui/core/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import image2 from "../menu/style/Screen Shot 2020-02-06 at 4.21.40 PM.png";
import MenuTabPanel from "./MenuTabPanel";
import Hidden from "@material-ui/core/Hidden";
import {CardContent, Paper} from "@material-ui/core";
import Parallax from "./Parallax";
import front from "../menu/style/plain-white-background.jpg"
import iphonePic from "../menu/style/iphonePic.jpg"
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
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

const useStyles = makeStyles({
    section: {
        padding: "70px 0"
    },
    conatinerFluid :{
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%"
    },
button: {
        background: 'linear-gradient(45deg, #7600FF 5%, rgba(0,1,14,0.74) 95%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(18, 1, 13, .76)',
        color: 'white',
        height: 48,
        padding: '0 10px',
    },
    buttonSignup: {
        background: 'linear-gradient(45deg, #ffe400 5%, rgba(0,1,14,0.74) 95%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(18, 1, 13, .76)',
        color: '#fff',
        height: 48,
        marginLeft:"10px",
        padding: '0 10px',

    },
brand: {
        marginTop:"50px",
        color: "rgba(0,1,14,5.74)",
        textAlign: "left"
    },
    subtitle: {
        fontSize: "1.1rem",
        textAlign: "center",
        maxWidth: "500px",
        margin: "10px 0 0",
        color:"rgba(0,1,14,0.74)"
    },
    info: {
        fontSize: "0.9rem",
        textAlign: "center",
        maxWidth: "500px",
        margin: "10px 0 0",
        color:"#9f0018"
    },
container:{
    "@media (min-width: 576px)": {
        maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
        maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
        maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
        maxWidth: "1140px"
    },paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
    },
    marginAuto: {
        marginLeft: "auto !important",
        marginRight: "auto !important"
    },
    slickImage:{
        centerMode: true,
    infinite: true,
    autoplay: false,
    centerPadding: '0px',
    slidesToShow: 1,
    arrows: true}
});
function FrontPageCarousel({t}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
   
   
    return (
        <div>
            <MenuTabPanel/>
      
          <div className={classes.container}>
                        <Grid container>
                            <Grid item>
                                <div className={classes.brand}>
                                    <Typography  variant={"h2"} className={classes.title}>{t('Metrology Software')}</Typography>
                                    <Typography  variant={"h4"}  className={classes.subtitle}>{t('New software for metrologists, manufacturers and people who want to know more about measuring technology')}</Typography>
                                    <Typography  variant={"body1"}  className={classes.info}>{t('Currently, it is a test version, more information and features will provide soon ')}</Typography>

                                </div>
                                <Grid item>
                                    <Button className={classes.button} onClick={()=>history.push('/login')}>{t('Lets start')}</Button >
                                    <Button className={classes.buttonSignup} onClick={()=>history.push('/signup')}>{t('Sign Up')}</Button >
                                </Grid>
                            </Grid>
                        </Grid>
    
                        
        </div>
    );
}
export default withTranslation() (FrontPageCarousel)
