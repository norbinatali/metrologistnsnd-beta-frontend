import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import UserMenu from "./UserMenu";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
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
