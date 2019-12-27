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
import UserMenu from "./UserMenu";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import history from '../history'

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
 function HistoryMetrology({t,props}) {

    const classes = useStyles();

     const {  ...rest } = props;

    return(
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                    <div style={{ marginTop: 40 }}>
                        <div style={{ marginTop: 20, padding:30}}>
                        <div style={{display:'flex'}}>
                <Grid container spacing={2} >
                    <Grid item>
                   <Paper elevation={3}>
                        <Typography align={"justify"}>
                         <p><h4>{t('Conformity assessment general')}</h4></p>

                     </Typography>
                    </Paper>

                </Grid>
                </Grid>

        </div>
                        </div>
                    </div>
                </main>
</div>
    )}
HistoryMetrology.propTypes = {
    className: PropTypes.string
};
export default withTranslation()(HistoryMetrology)
