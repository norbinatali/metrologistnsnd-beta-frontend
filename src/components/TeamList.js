import React from "react";
import {withTranslation} from "react-i18next";
import {List, ListItemText,makeStyles} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import TableRow from "@material-ui/core/TableRow";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, CREATE_MY_DEVICE, GC_USER_ID,DEVICE_ID, DEVICE_NAME} from "../constants";
import DeleteIcon from "@material-ui/icons/Delete"
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from "@material-ui/core/Toolbar";
import Draggable from 'react-draggable';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import history from '../history.js'
import ListItem from "@material-ui/core/ListItem";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useTheme from "@material-ui/core/styles/useTheme";
import SwipeableViews from 'react-swipeable-views';
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {Mutation} from "react-apollo";
import Tooltip from "@material-ui/core/Tooltip";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MaterialTable from 'material-table';


const authToken = localStorage.getItem(AUTH_TOKEN);
const useStyles = makeStyles(theme => ({


    table:{

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
        },
    },
    root: {

        height:"100%",
        marginRight:"auto",
        marginLeft:"auto",
        backgroundColor:"transparent",
        width: "100%",
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
        },
    },
    tableCell:{ width:"300px",
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
        },},
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    inner:{
        minWidth: "60%"
    },
    row:{
        backgroundColor:"#fff"
    },
    paper:{ backgroundColor:"transparent"},

}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
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

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 10,
    },
}))(TableCell);


const QUERY_TEAMLIST = gql`query {me{teams{name}}}`;
function TeamList({t,className, rest},props) {
    const classes = useStyles();
    const theme = useTheme();
    const [dense, setDense] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const [id,setId]= React.useState('');
    const [value, setValue] = React.useState(0);
    const handleChange = panel => (event, isExpanded) => {setExpanded(isExpanded ? panel : false);};
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
    };


    return(
        <div>
            <UserMenu/>
            <div  className={classes.root}>

                <Query query={QUERY_TEAMLIST} fetchPolicy={"network-only"} onError={(error) => enqueueSnackbar(error.message)}  >
                    {( {loading, error, data} ) =>  {
                        if (loading) {return <LinearDeterminate />}


                        if(authToken){
                            return(

                                <Grid container spacing={2} xs={12}>
                                    <AppBar position={"relative"}  color="default" elevation={5} style={{marginTop:"50px"}}>
                                        <Toolbar className={classes.toolbar} >
                                            <Button >{t('Team')}</Button>

                                            <Button style={{marginLeft:"auto "}} variant="outlined" onClick={()=> history.push("/add-device")}> {t("Add Device")}</Button>


                                        </Toolbar>
                                        <AppBar position="static" color="default" square>
                                            <Tabs value={value} onChange={handleChangeTab} indicatorColor="default" textColor="primary" scrollButtons="auto" variant="scrollable" centered style={{ flexGrow: 1,width: '100%', marginRight:"auto", marginLeft:"auto", backgroundColor:"#fff"}}>

                                                <Tab style={{backgroundColor:"#fff",marginRight:"auto", marginLeft:"auto"}} label={<Typography color='primary' variant={"caption"}>{data.me.teams.name}</Typography>} {...a11yProps("auto")} />
                                               </Tabs>
                                        </AppBar>
                                    </AppBar>
                                </Grid>
                            )}else return null}}
                </Query>
            </div>
        </div>)
}
export default withTranslation() (TeamList)