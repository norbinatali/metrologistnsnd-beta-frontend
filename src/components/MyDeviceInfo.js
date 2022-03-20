import React from "react";
import {withTranslation} from "react-i18next";
import {
    TableRow,
    Box,
    AppBar,
    Tab,
    Tabs,
    Toolbar,
    Hidden,
    TableContainer,
    Grid,
    Paper,
    TableBody,
    Table,
    TableCell,
    Typography,
    Button
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import UserMenu from "./UserMenu";
import CircularProgressLoading from "./CircularProgressLoading";
import {AUTH_TOKEN, DEVICE_NAME} from "../constants";
import history from '../history.js'
import SwipeableViews from 'react-swipeable-views';
import {useSnackbar} from 'notistack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';

const deviceName = localStorage.getItem(DEVICE_NAME);

const authToken = localStorage.getItem(AUTH_TOKEN);

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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

const GET_MyDevice = gql`query ($id:ID!){ myDevice(id:$id){ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }`;

function MyDeviceInfo({t}) {
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const [value, setValue] = React.useState(0);
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div>
            <UserMenu/>
            <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100}
                   onError={(error) => enqueueSnackbar(error.message)}
                   variables={{id: localStorage.getItem('device-id').toString()}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <CircularProgressLoading/>
                    }
                    if (error) {
                        return error.message
                    }
                    const currentDate = new Date();
                    const startDate = new Date(currentDate.setHours(2, 0, 0, 0)).toISOString();
                    const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
                    if (authToken) {
                        const tabsMenu = <Tabs value={value} onChange={handleChangeTab} indicatorColor="default"
                                               textColor="primary" scrollButtons="auto" variant="scrollable" centered
                                               style={{
                                                   flexGrow: 1,
                                                   width: '100%',
                                                   marginRight: "auto",
                                                   marginLeft: "auto",
                                                   backgroundColor: "#fff"
                                               }}>
                            <Tab style={{backgroundColor: "#fff", marginRight: "auto", marginLeft: "auto"}}
                                 label={<Typography
                                     variant={"caption"}>{t('Overview')}</Typography>} {...a11yProps(0)} />
                            <Tab disabled style={{backgroundColor: "#fff", marginRight: "auto", marginLeft: "auto"}}
                                 label={<Typography
                                     variant={"caption"}>{t('Activity')}</Typography>} {...a11yProps(1)} />
                            <Tab disabled style={{backgroundColor: "#fff", marginRight: "auto", marginLeft: "auto"}}
                                 label={<Typography
                                     variant={"caption"}>{t('Create a schedule')}</Typography>}  {...a11yProps(2)} />
                            <Tab disabled style={{backgroundColor: "#fff", marginRight: "auto", marginLeft: "auto"}}
                                 label={<Typography
                                     variant={"overline"}>{t('Setting')}</Typography>}  {...a11yProps(3)} />
                        </Tabs>
                        return (
                            <Grid container spacing={2} xs={12}>
                                <AppBar position={"static"} color="default" elevation={5} style={{marginTop: "50px"}}>
                                    <Toolbar>
                                        <Button onClick={() => history.push('/mydevices')}>{t('Person')}</Button>
                                        <ArrowForwardIosIcon/>
                                        <Button
                                            onClick={() => history.push('/mydevices/' + deviceName)}>{data.myDevice.name_device}</Button>
                                        <Button style={{marginLeft: "auto"}} variant="outlined"
                                                onClick={() => history.push("/more")}> {t("More")}</Button>
                                    </Toolbar>
                                    <AppBar position="static" color="default" square>
                                        <Hidden smDown implementation="css">
                                            {tabsMenu}
                                        </Hidden>
                                        <div>
                                            <Hidden mdUp>
                                                <Tabs value={value} onChange={handleChangeTab} indicatorColor="default"
                                                      textColor="primary" scrollButtons="auto" variant="scrollable"
                                                      centered style={{
                                                    flexGrow: 1,
                                                    width: '100%',
                                                    marginRight: "auto",
                                                    marginLeft: "auto",
                                                    backgroundColor: "#fff"
                                                }}>
                                                    <Tab style={{
                                                        backgroundColor: "#fff",
                                                        marginRight: "auto",
                                                        marginLeft: "auto"
                                                    }} label={<InfoIcon style={{color: "#000"}}/>} {...a11yProps(0)}
                                                         onClick={() => (localStorage.removeItem('device-name'), history.push('/mydevices/' + deviceName))}/>
                                                    <Tab disabled style={{
                                                        backgroundColor: "#fff",
                                                        marginRight: "auto",
                                                        marginLeft: "auto"
                                                    }} label={<TimelineIcon style={{color: "#000"}}/>} {...a11yProps(1)}
                                                         onClick={() => history.push('/mydevices/' + deviceName + '/activity')}/>
                                                    <Tab disabled style={{
                                                        backgroundColor: "#fff",
                                                        marginRight: "auto",
                                                        marginLeft: "auto"
                                                    }} label={<ScheduleIcon
                                                        style={{color: "#000"}}/>}  {...a11yProps(2)}
                                                         onClick={() => history.push('/mydevices/' + deviceName + '/schedule')}/>
                                                    <Tab disabled style={{
                                                        backgroundColor: "#fff",
                                                        marginRight: "auto",
                                                        marginLeft: "auto"
                                                    }} label={<SettingsIcon
                                                        style={{color: "#000"}}/>}  {...a11yProps(3)}
                                                         onClick={() => history.push('/mydevices/' + deviceName + '/setting')}/>
                                                </Tabs>
                                            </Hidden>
                                        </div>
                                    </AppBar>
                                </AppBar>
                                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}
                                                onChangeIndex={handleChangeIndex}>
                                    <TabPanel value={value} index={0} dir={theme.direction} style={{
                                        width: "100%",
                                        minHeight: "375px",
                                        marginRight: "auto",
                                        marginTop: "0px",
                                        marginLeft: "auto",
                                    }}>

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="spanning table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell> <Typography
                                                                    style={{color: "#000"}}>{t('Name Device')}</Typography></TableCell>
                                                                <TableCell><Typography
                                                                    style={{color: "#000"}}> {data.myDevice.name_device}</Typography></TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><Typography
                                                                    style={{color: "#000"}}>{t('Type Device')}</Typography></TableCell>
                                                                <TableCell> <Typography
                                                                    style={{color: "#000"}}> {data.myDevice.kind_device}</Typography></TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> <Typography
                                                                    style={{color: "#000"}}>{t('Brand Device')}</Typography></TableCell>
                                                                <TableCell> <Typography
                                                                    style={{color: "#000"}}> {data.myDevice.brand_device}</Typography></TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><Typography
                                                                    style={{color: "#000"}}>{t('Series Device')}</Typography></TableCell>
                                                                <TableCell><Typography
                                                                    style={{color: "#000"}}> {data.myDevice.series_device}</Typography></TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> <Typography
                                                                    style={{color: "#000"}}>{t('Notes')}</Typography></TableCell>
                                                                <TableCell> <Typography
                                                                    style={{color: "#ff0737"}}>{data.myDevice.notes}</Typography></TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="spanning table">
                                                        <TableBody>
                                                            {data.myDevice.certificate_conformity === true && (
                                                                <div>
                                                                    <TableRow>
                                                                        <TableCell><Typography
                                                                            style={{color: "#000"}}>{t('Certificate number')}</Typography></TableCell>
                                                                        <TableCell><Typography
                                                                            style={{color: "#000"}}> {data.myDevice.certificate_assessment_number}</Typography></TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell> <Typography
                                                                            style={{color: "#000"}}>{t('Certificate module')}</Typography></TableCell>
                                                                        <TableCell> <Typography
                                                                            style={{color: "#000"}}> {data.myDevice.module_device}</Typography></TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell> <Typography
                                                                            style={{color: "#000"}}>{t('Issued by')}</Typography></TableCell>
                                                                        <TableCell> <Typography
                                                                            style={{color: "#000"}}>  {data.myDevice.department_assessment_center}</Typography></TableCell>
                                                                    </TableRow>

                                                                    {data.myDevice.conformity_data >= endDate && (
                                                                        <TableRow>
                                                                            <TableCell><Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>

                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#00DE28"}}>{data.myDevice.conformity_data}</Typography></TableCell>
                                                                        </TableRow>
                                                                    )}

                                                                    {data.myDevice.conformity_data <= startDate && (
                                                                        <TableRow><TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>
                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#ff0737"}}>{data.myDevice.conformity_data}</Typography></TableCell>
                                                                        </TableRow>)}
                                                                </div>
                                                            )}
                                                            {data.myDevice.certificate_verification === true && (
                                                                <div>
                                                                    <TableRow>
                                                                        <TableCell> <Typography
                                                                            style={{color: "#000"}}>{t('Certificate number')}</Typography></TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}> {data.myDevice.certificate_verification_number}</Typography></TableCell>
                                                                    </TableRow>
                                                                    <TableRow><TableCell>
                                                                        <Typography
                                                                            style={{color: "#000"}}>{t('Issued by')}</Typography></TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>  {data.myDevice.department_verification_center}</Typography></TableCell>
                                                                    </TableRow>

                                                                    {data.myDevice.valid_verification >= endDate && (
                                                                        <TableRow><TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>
                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#00DE28"}}>{data.myDevice.valid_verification}</Typography></TableCell>
                                                                        </TableRow>)}

                                                                    {data.myDevice.valid_verification <= startDate && (

                                                                        <TableRow><TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>
                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#ff0737"}}>{data.myDevice.valid_verification}</Typography></TableCell>
                                                                        </TableRow>)}
                                                                </div>)}

                                                            {data.myDevice.certificate_calibration === true && (
                                                                <div>
                                                                    <TableRow><TableCell>
                                                                        <Typography
                                                                            style={{color: "#000"}}>{t('Certificate number')}</Typography></TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{data.myDevice.certificate_calibration_number}</Typography></TableCell>
                                                                    </TableRow>
                                                                    <TableRow><TableCell>
                                                                        <Typography
                                                                            style={{color: "#000"}}>{t('Issued by')}</Typography></TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}> {data.myDevice.department_calibration_center}</Typography></TableCell>
                                                                    </TableRow>

                                                                    {data.myDevice.calibration_data >= endDate && (
                                                                        <TableRow><TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>
                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#00DE28"}}>{data.myDevice.calibration_data}</Typography></TableCell>
                                                                        </TableRow>)}
                                                                    {data.myDevice.calibration_data <= startDate && (
                                                                        <TableRow><TableCell>
                                                                            <Typography
                                                                                style={{color: "#000"}}>{t('Valid until')}</Typography></TableCell>
                                                                            <TableCell>
                                                                                <Typography
                                                                                    style={{color: "#ff0737"}}>{data.myDevice.calibration_data}</Typography></TableCell>
                                                                        </TableRow>)}
                                                                </div>)}
                                                            {(!data.myDevice.certificate_verification && !data.myDevice.certificate_calibration && !data.myDevice.certificate_conformity) && (

                                                                <TableRow><TableCell>
                                                                    <Typography
                                                                        style={{color: "#000"}}>{t('No Certificate')}</Typography></TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={value} index={1} dir={theme.direction} style={{
                                        width: "100%",
                                        minHeight: "375px",
                                        marginRight: "auto",
                                        marginTop: "0px",
                                        marginLeft: "auto",
                                    }}>
                                        <Grid justify={"center"} item xs={12}>
                                            <Paper>
                                            </Paper>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction} style={{
                                        width: "100%",
                                        minHeight: "375px",
                                        marginRight: "auto",
                                        marginTop: "0px",
                                        marginLeft: "auto",
                                    }}>
                                        <Grid justify={"center"} item xs={12}>
                                            <Paper>
                                                <Table stickyHeader component={Paper}>
                                                </Table>
                                            </Paper>

                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction} style={{
                                        width: "100%",
                                        minHeight: "375px",
                                        marginRight: "auto",
                                        marginTop: "0px",
                                        marginLeft: "auto",
                                    }}>
                                        <Grid item justify={"center"} xs={12}>
                                            <Paper>
                                                <TableContainer component={Paper}>
                                                    <Table stickyHeader>
                                                    </Table>
                                                </TableContainer></Paper>
                                        </Grid>
                                    </TabPanel>
                                </SwipeableViews>
                            </Grid>
                        )
                    } else return null
                }}
            </Query>
        </div>
    )
}

MyDeviceInfo.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(MyDeviceInfo)
