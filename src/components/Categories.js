import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { withTranslation} from 'react-i18next';
import i18n from "../menu/translations/i18n";




const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color:"rgba(0,1,47,0.84)",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    body: {
        fontSize: 14,
    },

}))(TableRow);
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
const GET_Device = gql`query { feedDevice {id name_EN name_UA  module category}}`;


function Categories({t,i18n}){
    const classes = useStyles();

    return (

                    <Query query={GET_Device} >
                        {( {loading, error, data} ) =>  {
                            if (loading) {return <div>Fetching</div>}
                            if (error) { return <div>error</div>;}
                            const devicelist = data.feedDevice;
                            return( <div> <Table className={classes.table} aria-label="customized table">
                                <TableHead aria-label="sticky table">
                                <TableRow >
                                    <StyledTableCell >{t('Device')}</StyledTableCell>
                                    <StyledTableCell >{t('Category')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    <TableRow>
                                        < StyledTableRow>{devicelist.map(device =>
                                  <div><StyledTableCell component="tr" scope="row" key={device.id} >{device.name_EN}</StyledTableCell>
                                 </div>)}
                                        </StyledTableRow>
                                        <StyledTableRow>{devicelist.map(devices =>
                                            <div><StyledTableCell component="tr" scope="row" key={devices.id}>{devices.name_UA}</StyledTableCell></div>)}</StyledTableRow></TableRow>
                                </TableBody>
                            </Table></div>)}}
                    </Query>

    );

}

export default withTranslation()(Categories)
