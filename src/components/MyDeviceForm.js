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
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import TableRow from "@material-ui/core/TableRow";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, CREATE_MY_DEVICE, GC_USER_ID} from "../constants";
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

const drawerWidth = 240;
const deviceid = localStorage.getItem(CREATE_MY_DEVICE);
const authToken = localStorage.getItem(AUTH_TOKEN);
const useStyles = makeStyles(theme => ({

    table: {
        
        maxWidth:"100%",
        marginRight:"0",
        marginLeft:"0",
        color:"#fff",
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
function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const GET_MyDevice = gql`query { me{mydevices{ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }}`;
const DELETE_MYDevice =gql`mutation ($id:ID!){deleteMyDevice(id:$id){ id }}`
function MyDeviceForm({t,className, rest}) {
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
    const confirm = async (data, e) => {
        console.log(data.deleteMyDevice.id);
        const id=setId(deviceid)
    };
    const saveUserData = (token) => {

        localStorage.setItem(CREATE_MY_DEVICE, token)
    };

    const handleClose = () => {setOpen(false);};
    return(
        <div  className={classes.root}>

        <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100} onError={(error) => enqueueSnackbar(error.message)} >
            {( {loading, error, data} ) =>  {
                if (loading) {return <LinearDeterminate />}
                if (error) { return error.message }

                const currentDate =new Date();
                const startDate= new Date(currentDate.setHours(2,0,0,0)).toISOString();
 const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

                console.log(currentDate);
                console.log(startDate);

                const devicelist = data.me.mydevices;
                if(authToken){
                    return(
                        <Grid container spacing={2} xs={12}>
                            <AppBar position={"relative"}  color="default" elevation={5} style={{marginTop:"50px"}}>
            <Toolbar >
                        <Button >{t('Person')}</Button>

                        <Button style={{marginLeft:"auto"}} variant="outlined" onClick={()=> history.push("/add-device")}> {t("Add Device")}</Button>


            </Toolbar>
                            <AppBar position="static" color="default" square>
                                <Tabs value={value} onChange={handleChangeTab} indicatorColor="default" textColor="primary" scrollButtons="auto" variant="scrollable" centered style={{ flexGrow: 1,width: '100%', marginRight:"auto", marginLeft:"auto", backgroundColor:"#fff"}}>
                                    <Tab style={{backgroundColor:"#fff",marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Conformity assessment')}</Typography>} {...a11yProps(0)} />
                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Calibration')}</Typography>} {...a11yProps(1)} />
                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"caption"}>{t('Verification')}</Typography>}  {...a11yProps(2)} />
                                    <Tab style={{backgroundColor:"#fff", marginRight:"auto", marginLeft:"auto"}} label={<Typography variant={"overline"}>{t('None')}</Typography>}  {...a11yProps(3)} />
                                </Tabs>
                            </AppBar>
 </AppBar>
                            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                <TabPanel value={value} index={0} dir={theme.direction} style={{ width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>

                                    <Grid item justify={"center"} xs={12}>
                                    
                                           <Paper className={classes.table}>

                                                <Table stickyHeader component={Paper}>   
                                                   
                                                    {devicelist.map(device =>(

                                                        <TableBody>
                                                            {device.certificate_conformity=== true &&(

                                                                <TableRow key={device.id}>
                                                                            <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.name_device} secondary={device.kind_device}/></ListItem></List></TableCell>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.brand_device} secondary={device.series_device}/></ListItem></List></TableCell>

                                                                 
                                                                   {device.conformity_data >= endDate  &&(<TableCell align="center" > <Typography style={{color:"00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                    {device.conformity_data <= startDate &&(<TableCell align="center" style={{color:"#ff0737"}}>{t('Expired')}</TableCell>) }
                                                                    <TableCell> {device.notes}</TableCell>
                                                                    <TableCell>
                                                                        <Mutation mutation={DELETE_MYDevice}  variables={{id:device.id}}  onCompleted={(data) => confirm(data)} pollInterval={10}>
                                                                            {( deleteDevice,{loading, error, data}) => {
                                                                                if (loading) { return (<LinearDeterminate /> )}
                                                                                if (error) {return (error.message)}
                                                                                if (authToken){
                                                                                    return(
                                                                                        <Tooltip title={t('Delete')}>
                                                                        <IconButton onClick={deleteDevice}><DeleteIcon /></IconButton>
                                                                                        </Tooltip>
                                                                                        )}}}
                                                                        </Mutation>
                                                                        </TableCell>
                                                                </TableRow>)}
                                                                </TableBody> ))}
                                                </Table>                                   
</Paper>
                                    </Grid>

                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction} style={{width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>
                                    <Grid justify={"center"} item xs={12}>
<Paper className={classes.table}>
                                          
                                                 <Table stickyHeader component={Paper}>  

                                                    
                                                    {devicelist.map(device =>(
                                                        <TableBody >
                                                            {device.certificate_calibration=== true &&(

                                                                <TableRow key={device.id}>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.name_device} secondary={device.series_device}/></ListItem></List></TableCell>
                                                                  
                                                                    {device.calibration_data >= endDate &&(<TableCell align="center" ><Typography style={{color:"00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                    {device.calibration_data <= startDate &&(<TableCell align="center" style={{color:"#ff0737"}}>{t('Expired')}</TableCell>)}
                                                                    <TableCell  align="center">{device.notes}</TableCell>
                                                                    <TableCell>
                                                                    <Mutation mutation={DELETE_MYDevice}  variables={{id:device.id}}  onCompleted={(data) => confirm(data)} pollInterval={50}>
                                                                        {( deleteDevice,{loading, error, data}) => {
                                                                            if (loading) { return (<LinearDeterminate /> )}
                                                                            if (error) {return (error.message)}

                                                                            if (authToken){

                                                                                return(

                                                                                    <Tooltip title={t('Delete')}>
                                                                                        <IconButton onClick={deleteDevice}><DeleteIcon /></IconButton>
                                                                                    </Tooltip>
                                                                                )}}}
                                                                    </Mutation>
                                                                </TableCell>
                                                                </TableRow>  )}
                                                        </TableBody>))}
                                                </Table>
                                            
</Paper>

                                    </Grid>

                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction} style={{width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>
                                    <Grid  justify={"center"} item xs={12}>
<Paper className={classes.table}>
                                          
                                                 <Table stickyHeader component={Paper}>  
                                                   
                                                    {devicelist.map(device =>(
                                                        <TableBody >

                                                            {device.certificate_verification===true &&(
                                                                <TableRow key={device.id}>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.name_device} secondary={device.kind_device}/></ListItem></List></TableCell>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.brand_device} secondary={device.series_device}/></ListItem></List></TableCell>
                                                                    
                                                                
                                                                    {device.valid_verification >= endDate &&(<TableCell align="center" ><Typography style={{color:"00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                    {device.valid_verification <= startDate &&(<TableCell align="center" style={{color:"#ff0737"}}>{t('Expired')}</TableCell>)}
                                                                    <TableCell  align="center">{device.notes}</TableCell>
                                                                    <TableCell>
                                                                    <Mutation mutation={DELETE_MYDevice}  variables={{id:device.id}}  onCompleted={(data) => confirm(data)} pollInterval={50}>
                                                                        {( deleteDevice,{loading, error, data}) => {
                                                                            if (loading) { return (<LinearDeterminate /> )}
                                                                            if (error) {return (error.message)}

                                                                            if (authToken){

                                                                                return(

                                                                                    <Tooltip title={t('Delete')}>
                                                                                        <IconButton onClick={deleteDevice}><DeleteIcon /></IconButton>
                                                                                    </Tooltip>
                                                                                )}}}
                                                                    </Mutation>
                                                                </TableCell>
                                                                </TableRow> )}
                                                        </TableBody>))}
                                                </Table>

                                           


</Paper>

                                    </Grid>
                                </TabPanel>
  <TabPanel value={value} index={3} dir={theme.direction} style={{ width:"100%",minHeight: "375px",marginRight:"auto", marginTop: "0px", marginLeft: "auto",}}>

                                    <Grid item justify={"center"} xs={12}>
                                        <Paper className={classes.table}>
                                            <TableContainer component={Paper}>

                                                <Table stickyHeader >
                                                
                                                    {devicelist.map(device =>(

                                                        <TableBody>
                                                            {(!device.certificate_verification && !device.certificate_calibration && !device.certificate_conformity) &&(

                                                                <TableRow key={device.id}>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.name_device} secondary={device.kind_device}/></ListItem></List></TableCell>
                                                                    <TableCell  align="center"><List>
<ListItem>
<ListItemText primary={device.brand_device} secondary={device.series_device}/></ListItem></List></TableCell>
 
 <TableCell  align="center">{device.notes}</TableCell>
                                                                    <TableCell>

                                                                        <Mutation mutation={DELETE_MYDevice}  variables={{id:device.id}}  onCompleted={(data) => confirm(data)} pollInterval={50}>

                                                                            {( deleteDevice,{loading, error, data}) => {

                                                                                if (loading) { return (<LinearDeterminate /> )}
                                                                                if (error) {return (error.message)}
                                                                                if (authToken){
                                                                                    return(
                                                                                        <Tooltip title={t('Delete')}>
                                                                                            <IconButton onClick={deleteDevice}><DeleteIcon /></IconButton>
                                                                                        </Tooltip>
                                                                                    )}}}
                                                                        </Mutation>
                                                                    </TableCell>
                                                                </TableRow>)}
                                                        </TableBody> ))}
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
export default withTranslation()(MyDeviceForm)
