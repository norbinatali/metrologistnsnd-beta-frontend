import React, { Component } from 'react';
import MenuUser from "../menu/MenuUser";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
import Check from '@material-ui/icons/Check';
import PropTypes from "prop-types";
import GeneralInfo from "./GeneralInfo";
import ModulesInfo from "./ModulesInfo";
import {withTranslation} from "react-i18next";
import AssessmentTheory from "./AssessmentTheory";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);
const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});
function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {[classes.active]: active,})}>
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}
QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};
function getSteps() {
    return ['', '', ''];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <GeneralInfo/>;
        case 1:
            return <ModulesInfo/>;
        case 2:
            return <AssessmentTheory/>;
        default:
            return 'Unknown step';
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        color:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)"
    },
    boxFlex:"column"

}));
 function History({t}) {
const posts={
    title: "",
    excerpt:""


};
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {

        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return(
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
        <div style={{display:'flex'}}>
                <Grid container spacing={2} justify="center" style={{backgroundColor:"white"}}>
                    <Card>
                    <CardActionArea>
                            <div className={classes.root}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>{t('All steps completed')}</Typography>
                                            <Button onClick={handleReset}>{t('Reset')}</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                            <div>
                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                                                    {t('Back')}
                                                </Button>
                                                <Button variant="contained" style={{backgroundColor:"rgba(0,1,47,0.84)"}}onClick={handleNext}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                       <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{posts.title}</Typography>
                            <Typography component="p">{posts.excerpt}</Typography>
                       </CardContent>

                    </CardActionArea>
                    </Card>
                </Grid>
        </div>


</main>
</div>
    )


    }
export default withTranslation()(History)
