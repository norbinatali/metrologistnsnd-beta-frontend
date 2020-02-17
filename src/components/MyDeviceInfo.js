import React from "react";
import {withTranslation} from "react-i18next";
import {List, ListItemText,makeStyles} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import Hidden from "@material-ui/core/Hidden";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, CREATE_MY_DEVICE, DEVICE_ID, DEVICE_NAME, GC_USER_ID} from "../constants";
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
import { SnackbarProvider, useSnackbar } from 'notistack';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import TableRow from "@material-ui/core/TableRow";

const deviceID = localStorage.getItem(DEVICE_ID);
const deviceName=localStorage.getItem(DEVICE_NAME);

const authToken = localStorage.getItem(AUTH_TOKEN);
const useStyles = makeStyles(theme => ({

    table: {
        position: "relative",
        maxWidth:"100vh",
        color:"#fff",
        minWidth:"100%",
        overflowX: 'auto',

    },
    root: {
        maxWidth: '100%',
        height:"100%",
        overflowX: 'auto',
        marginRight:"auto",
        marginLeft:"auto",
        backgroundColor:"transparent",
    },

    inner:{
        minWidth: "60%"
    },
    row:{
        backgroundColor:"#fff"
    },
    flex: {
        flex: 1
    },
    paper:{ backgroundColor:"transparent"},
    container:{
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
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
    }
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
function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const GET_MyDevice = gql`query ($id:ID!){ myDevice(id:$id){ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }`;
const DELETE_MYDevice =gql`mutation ($id:ID!){deleteMyDevice(id:$id){ id }}`
function MyDeviceInfo({t,className, rest}) {
    const classes = useStyles();
    const theme = useTheme();
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
    const handleClickOpen = () => {setOpen(true);};


    const handleClose = () => {setOpen(false);};
    return(
        <div className={classes.container}>
        <UserMenu/>



            <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100} onError={(error) => enqueueSnackbar(error.message)} variables={{id:localStorage.getItem('device-id').toString()}}>
                {( {loading, error, data} ) =>  {
                    if (loading) {return <LinearDeterminate />}
                    if (error) { return error.message }

                    const currentDate =new Date();
                    const startDate= new Date(currentDate.setHours(2,0,0,0)).toISOString();
                    const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

                    console.log(currentDate);
                    console.log(startDate);

console.log(data.myDevice.id)
                    console.log(deviceID)
                    const devicelist = data.myDevice;
                    if(authToken){
                        const tabsMenu= <Tabs value={value} onChange={handleChangeTab} indicatorColor="default" textColor="primary" scrollButtons="auto" variant="scrollable" centered style={{ flexGrow: 1,width: '100%', marginRight:"auto", marginLeft:"auto", backgroundColor:"#fff"}}>
                            <Tab style={{backgroundColor:"#fff",marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Overview')}</Typography>} {...a11yProps(0)} />
                            <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Activity')}</Typography>} {...a11yProps(1)} />
                            <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Create a schedule')}</Typography>}  {...a11yProps(2)} />
                            <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"overline"}>{t('Setting')}</Typography>}  {...a11yProps(3)} />
                        </Tabs>
                        return(
                            <Grid container spacing={2} xs={12}>
                                <AppBar position={"static"}  color="default" elevation={5} style={{marginTop:"50px"}}>
                                    <Toolbar className={classes.container} >
                                        <Button >{t('Person')}</Button>
                                        <ArrowForwardIosIcon/>
                                        <Button>{data.myDevice.name_device}</Button>

                                        <Button style={{marginLeft:"auto"}} variant="outlined" onClick={()=> history.push("/more")}> {t("More")}</Button>


                                    </Toolbar>
                                    <AppBar position="static" color="default" square>
                                        <Hidden smDown implementation="css">
                                        {tabsMenu}
                                        </Hidden>
                                        <div className={classes.flex}>
                                            <Hidden mdUp>
                                                <Tabs value={value} onChange={handleChangeTab} indicatorColor="default" textColor="primary" scrollButtons="auto" variant="scrollable" centered style={{ flexGrow: 1,width: '100%', marginRight:"auto", marginLeft:"auto", backgroundColor:"#fff"}}>
                                                    <Tab style={{backgroundColor:"#fff",marginRight:"auto", marginLeft:"auto"}} label={ <InfoIcon style={{color:"#000"}}/>} {...a11yProps(0)} onClick={()=>  (localStorage.removeItem('device-name'),history.push('/mydevices/'+deviceName))} />
                                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={ <TimelineIcon style={{color:"#000"}}/>} {...a11yProps(1)} onClick={()=> history.push('/mydevices/'+deviceName+'/activity')}/>
                                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={ <ScheduleIcon style={{color:"#000"}}/>}  {...a11yProps(2)} onClick={()=> history.push('/mydevices/'+deviceName+'/schedule')}/>
                                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={ <SettingsIcon style={{color:"#000"}}/>}  {...a11yProps(3)} onClick={()=> history.push('/mydevices/'+deviceName+'/setting')} />
                                                </Tabs>
                                            </Hidden>
                                        </div>
                                    </AppBar>
                                </AppBar>
                                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                    <TabPanel value={value} index={0} dir={theme.direction} style={{
                                        width: "100%",
                                        minHeight: "375px",
                                        marginRight: "auto",
                                        marginTop: "0px",
                                        marginLeft: "auto",
                                    }}>


                                        <Grid item justify={"center"} xs={12}>

                                            <Paper className={classes.table}>

                                                <List>
                                                    <ListItem>
                                                        <ListItemText><Typography
                                                            style={{color: "#000"}}> {data.myDevice.name_device}</Typography></ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText><Typography style={{color: "#000"}}> {data.myDevice.brand_device}</Typography></ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText><Typography style={{color: "#000"}}> {data.myDevice.series_device}</Typography> </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText> <Typography style={{color: "#000"}}> {data.myDevice.kind_device}</Typography></ListItemText>
                                                    </ListItem>
                                                    {data.myDevice.certificate_conformity === true &&(
                                                        <List>

                                                       <ListItem><ListItemText> {data.myDevice.certificate_assessment_number}</ListItemText></ListItem>
                                                            <ListItem><ListItemText> <Typography style={{color: "#000"}}>{data.myDevice.module_device}</Typography></ListItemText></ListItem>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}> {data.myDevice.department_assessment_center}</Typography></ListItemText></ListItem>
                                                            {data.myDevice.conformity_data >= endDate  &&(<ListItem align="center" ><ListItemText> <Typography style={{color:"#00DE28"}}>{data.myDevice.calibration_data}</Typography></ListItemText></ListItem>)}
                                                            {data.myDevice.conformity_data <= startDate &&(<ListItem align="center" style={{color:"#ff0737"}}>{data.myDevice.calibration_data}</ListItem>) }

                                                        </List>)}
                                                    {data.myDevice.certificate_verification === true &&(
                                                        <List>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}> {data.myDevice.certificate_verification_number}</Typography></ListItemText></ListItem>
                                                            <ListItem><ListItemText> <Typography style={{color: "#000"}}>{data.myDevice.department_verification_center}</Typography></ListItemText></ListItem>
                                                            {data.myDevice.valid_verification >= endDate  &&(<ListItem align="center" ><ListItemText> <Typography style={{color:"#00DE28"}}>{data.myDevice.valid_verification}</Typography></ListItemText></ListItem>)}
                                                            {data.myDevice.valid_verification <= startDate &&(<ListItem align="center" style={{color:"#ff0737"}}>{data.myDevice.valid_verification}</ListItem>) }

                                                        </List>)}
                                                    {data.myDevice.certificate_calibration === true &&(
                                                        <List>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}>{data.myDevice.certificate_calibration_number}</Typography></ListItemText></ListItem>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}> {data.myDevice.department_calibration_center}</Typography></ListItemText></ListItem>
                                                            {data.myDevice.calibration_data >= endDate  &&(<ListItem align="center" ><ListItemText> <Typography style={{color:"#00DE28"}}>{data.myDevice.calibration_data}</Typography></ListItemText></ListItem>)}
                                                            {data.myDevice.calibration_data <= startDate &&(<ListItem align="center" style={{color:"#ff0737"}}>{data.myDevice.calibration_data}</ListItem>) }

                                                        </List>)}
                                                    {data.myDevice.certificate_calibration === true &&(
                                                        <List>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}> {data.myDevice.certificate_calibration_number}</Typography></ListItemText></ListItem>
                                                            <ListItem><ListItemText><Typography style={{color: "#000"}}> {data.myDevice.department_calibration_center}</Typography></ListItemText></ListItem>
                                                            {data.myDevice.calibration_data >= endDate  &&(<ListItem align="center" ><ListItemText> <Typography style={{color:"#00DE28"}}>{data.myDevice.calibration_data}</Typography></ListItemText></ListItem>)}
                                                            {data.myDevice.calibration_data <= startDate &&(<ListItem align="center" style={{color:"#ff0737"}}>{data.myDevice.calibration_data}</ListItem>) }

                                                        </List>)}
                                                    {(!data.myDevice.certificate_verification && !data.myDevice.certificate_calibration && !data.myDevice.certificate_conformity) &&(
                                                        <List>
                                                            <ListItem><ListItemText>
                                                            <Typography style={{color:"#0000"}}>{t('No Certificate')}</Typography>
                                                            </ListItemText></ListItem>

                                                        </List>)}
                                                    <ListItem><ListItemText> {data.myDevice.notes}</ListItemText></ListItem>

                                                </List>

                                            </Paper>
                                        </Grid>
                                    </TabPanel>


                                    <TabPanel value={value} index={1} dir={theme.direction} style={{width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>
                                        <Grid justify={"center"} item xs={12}>
                                            <Paper className={classes.table}>

                                                <Table stickyHeader component={Paper}>



                                                </Table>

                                            </Paper>

                                        </Grid>

                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction} style={{width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>
                                        <Grid  justify={"center"} item xs={12}>
                                            <Paper className={classes.table}>

                                                <Table stickyHeader component={Paper}>


                                                </Table>




                                            </Paper>

                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction} style={{ width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>

                                        <Grid item justify={"center"} xs={12}>
                                            <Paper className={classes.table}>
                                                <TableContainer component={Paper}>

                                                    <Table stickyHeader >


                                                    </Table>
                                                </TableContainer></Paper>



                                        </Grid>

                                    </TabPanel>
                                </SwipeableViews>



                            </Grid>
                        )}else return null}}
            </Query>
        </div>


    )



}
export default withTranslation()(MyDeviceInfo)
