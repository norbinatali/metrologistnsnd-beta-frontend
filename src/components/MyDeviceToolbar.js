import React from 'react';
import {withTranslation} from "react-i18next";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import history from '../history';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import {List, ListItem, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme=>({

    root: {},
    row: {
        marginTop:"0",
        height: '42px',
        display: 'flex',
        alignItems: 'center',

    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginLeft: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }

}));



function MyDeviceToolbar({t},props) {
    const classes = useStyles();

    const {className, ...rest} = props;
    return (

        <AppBar position={"relative"}  color="default" elevation={5}>
            <Toolbar >
                        <Button >{t('Person')}</Button>

                        <Button style={{marginLeft:"auto"}} variant="outlined" onClick={()=> history.push(/add-device)} > {t('Add product')}</Button>


            </Toolbar>
        </AppBar>


    );
}


export default withTranslation() (MyDeviceToolbar)
