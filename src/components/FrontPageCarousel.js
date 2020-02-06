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
import MenuTabPanel from "./MenuTabPanel";
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
});const tutorialSteps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            image3,
    },
    {
        label: 'Bird',
        imgPath:
            image2,
    },

];
function FrontPageCarousel({t}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
    const handleStepChange = step => {
        setActiveStep(step);
    };
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };
    return (
        <div>
            <MenuTabPanel/>
        <TabPanel value={0} index={0} dir={theme.direction} className={classes.panel}>
            <div style={{marginRight:"auto", marginLeft:"auto"}}>
                <div style={{marginLeft: "auto", marginRight:"auto", display:"flex"}}>
                <MuiThemeProvider>
                    <Grid container spacing={5} xs={12}>
                        <Grid item xs={12} md={5} >
                            <Typography style={{color:"rgba(0,1,14,0.74)", marginTop:"55%"}}>  <h4 >{t('New software for metrologists, manufacturers and people who want to know more about measuring technology')}</h4></Typography>
                        <Button variant="outlined" color="primary" onClick={()=>history.push('/login')}><Typography>{t('Lets start')}</Typography></Button>
</Grid>
                        <Grid item xs={12} md={4} lg={8} >

                                    <Card style={{backgroundColor:"rgba(0,1,47,0.84)", width:"50%"}}>
                                        <AutoPlaySwipeableViews
                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                            index={activeStep}
                                            variant="dots"
                                            onChangeIndex={handleStepChange}
                                            enableMouseEvents
                                        >
                                            {tutorialSteps.map((step, index) => (
                                                <div key={step.label}>
                                                    {Math.abs(activeStep - index) <= 2 ? (
                                                        <img className={classes.img} src={step.imgPath} alt={step.label} />
                                                    ) : null}
                                                </div>
                                            ))}
                                        </AutoPlaySwipeableViews></Card>


                        </Grid>
                    </Grid>
                </MuiThemeProvider>
                </div></div>
        </TabPanel>
        </div>

    );
}
export default withTranslation() (FrontPageCarousel)
