import React from "react";
import {withTranslation} from "react-i18next";
import {
    MenuItem,
    Select,
    Tooltip,
    IconButton,
    Box,
    AppBar,
    Tab,
    Tabs,
    Toolbar,
    TableContainer,
    TableRow,
    Button,
    Grid,
    Paper,
    TableBody,
    TableCell,
    Table,
    Typography
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading";
import {AUTH_TOKEN, DEVICE_ID, DEVICE_NAME} from "../../../constants";
import DeleteIcon from "@mui/icons-material/Delete"
import history from '../../../history.js'
import SwipeableViews from 'react-swipeable-views';
import {Mutation} from "react-apollo";
import {useSnackbar} from 'notistack';
import {DELETE_MYDevice} from '../../../graphql/mutations/Mutations';
import {GET_MyDevice} from '../../../graphql/query/Query';
const authToken = localStorage.getItem(AUTH_TOKEN);

const TabPanel = (props) => {
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

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const MyDeviceForm = ({t}) => {
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
    };
    const confirm = async () => {
    };

    const [button, setButton] = React.useState('person');
    const handleChangeButton = event => {
        setButton(event.target.value);
    };

    return (
        <div>
            <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100}
                   onError={(error) => enqueueSnackbar(error.message)}>
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
                    const devicelist = data.me.mydevices;
                    if (authToken) {
                        return (
                            <div>
                                <AppBar position={"relative"} fixed color="default" elevation={5}
                                        style={{marginTop: "50px"}}>
                                    <Toolbar>
                                        <Select value={button} onChange={handleChangeButton}>
                                            <MenuItem value={'person'}><Button
                                                onClick={() => history.push('/mydevices')}>{t('Person')}</Button></MenuItem>
                                            <MenuItem value={'team'}><Button
                                                onClick={() => history.push('/team')}>{t('Team')}</Button></MenuItem>
                                        </Select>
                                        <Button style={{marginLeft: "auto"}} variant="outlined"
                                                onClick={() => history.push("/add-device")}> {t("Add Device")}</Button>
                                    </Toolbar>
                                    <AppBar position="static" color="default" square>
                                        <Tabs value={value} onChange={handleChangeTab} indicatorColor="default"
                                              textColor="primary" scrollButtons="auto" variant="scrollable" centered
                                              >
                                            <Tab label={<Typography
                                                variant={"caption"}>{t('Conformity assessment')}</Typography>} {...a11yProps(0)} />
                                            <Tab label={<Typography
                                                variant={"caption"}>{t('Calibration')}</Typography>} {...a11yProps(1)} />
                                            <Tab  label={<Typography
                                                variant={"caption"}>{t('Verification')}</Typography>}  {...a11yProps(2)} />
                                            <Tab label={<Typography
                                                variant={"overline"}>{t('None')}</Typography>}  {...a11yProps(3)} />
                                        </Tabs>
                                    </AppBar>
                                </AppBar>
                                <Grid container spacing={2} xs={12}>
                                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}
                                                    onChangeIndex={handleChangeIndex}>
                                        <TabPanel value={value} index={0} dir={theme.direction} >
                                            <Grid item justify={"center"} xs={12}>
                                                <Paper>
                                                    <Table stickyHeader component={Paper}>
                                                        {devicelist.map(device => (
                                                            <TableBody key={device.id}>
                                                                {device.certificate_conformity === true && (
                                                                    <TableRow key={device.id}>
                                                                        <TableCell
                                                                                   align="center" button
                                                                                   onClick={() => (
                                                                                       localStorage.setItem(DEVICE_ID, device.id),
                                                                                           localStorage.setItem(DEVICE_NAME, device.name_device),
                                                                                           history.push('/mydevices/' + device.name_device)
                                                                                   )}>
                                                                            {device.name_device} </TableCell>
                                                                        {device.conformity_data >= endDate && (
                                                                            <TableCell align="center"> <Typography
                                                                                style={{color: "#00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                        {device.conformity_data <= startDate && (
                                                                            <TableCell align="center"
                                                                                       style={{color: "#ff0737"}}>{t('Expired')}</TableCell>)}
                                                                        <TableCell> {device.notes}</TableCell>
                                                                        <TableCell>
                                                                            <Mutation mutation={DELETE_MYDevice}
                                                                                      variables={{id: device.id}}
                                                                                      onCompleted={(data) => confirm(data)}
                                                                                      pollInterval={10}>
                                                                                {(deleteDevice, {
                                                                                    loading,
                                                                                    error,
                                                                                    data
                                                                                }) => {
                                                                                    if (loading) {
                                                                                        return (
                                                                                            <CircularProgressLoading/>)
                                                                                    }
                                                                                    if (error) {
                                                                                        return (error.message)
                                                                                    }
                                                                                    if (authToken) {
                                                                                        return (
                                                                                            <Tooltip
                                                                                                title={t('Delete')}>
                                                                                                <IconButton
                                                                                                    onClick={deleteDevice}><DeleteIcon/></IconButton>
                                                                                            </Tooltip>
                                                                                        )
                                                                                    }
                                                                                }}
                                                                            </Mutation>
                                                                        </TableCell>
                                                                    </TableRow>)}
                                                            </TableBody>))}
                                                    </Table>
                                                </Paper>
                                            </Grid>

                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={theme.direction} >
                                            <Grid justify={"center"} item xs={12}>
                                                <Paper>
                                                    <Table stickyHeader component={Paper}>
                                                        {devicelist.map(device => (
                                                            <TableBody key={device.id}>
                                                                {device.certificate_calibration === true && (
                                                                    <TableRow key={device.id}>
                                                                        <TableCell
                                                                                   align="center" button
                                                                                   onClick={() => (
                                                                                       localStorage.setItem(DEVICE_ID, device.id),
                                                                                           localStorage.setItem(DEVICE_NAME, device.name_device),
                                                                                           history.push('/mydevices/' + device.name_device)
                                                                                   )}>
                                                                            {device.name_device}
                                                                        </TableCell>
                                                                        {device.calibration_data >= endDate && (
                                                                            <TableCell align="center"><Typography
                                                                                style={{color: "#00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                        {device.calibration_data <= startDate && (
                                                                            <TableCell align="center"
                                                                                       style={{color: "#ff0737"}}>{t('Expired')}</TableCell>)}
                                                                        <TableCell
                                                                            align="center">{device.notes}</TableCell>
                                                                        <TableCell>
                                                                            <Mutation mutation={DELETE_MYDevice}
                                                                                      variables={{id: device.id}}
                                                                                      onCompleted={(data) => confirm(data)}
                                                                                      pollInterval={50}>
                                                                                {(deleteDevice, {
                                                                                    loading,
                                                                                    error,
                                                                                    data
                                                                                }) => {
                                                                                    if (loading) {
                                                                                        return (
                                                                                            <CircularProgressLoading/>)
                                                                                    }
                                                                                    if (error) {
                                                                                        return (error.message)
                                                                                    }
                                                                                    if (authToken) {
                                                                                        return (
                                                                                            <Tooltip
                                                                                                title={t('Delete')}>
                                                                                                <IconButton
                                                                                                    onClick={deleteDevice}><DeleteIcon/></IconButton>
                                                                                            </Tooltip>
                                                                                        )
                                                                                    }
                                                                                }}
                                                                            </Mutation>
                                                                        </TableCell>
                                                                    </TableRow>)}
                                                            </TableBody>))}
                                                    </Table>

                                                </Paper>

                                            </Grid>

                                        </TabPanel>
                                        <TabPanel value={value} index={2} dir={theme.direction} >
                                            <Grid justify={"center"} item xs={12}>
                                                <Paper>
                                                    <Table stickyHeader component={Paper}>
                                                        {devicelist.map(device => (
                                                            <TableBody key={device.id}>
                                                                {device.certificate_verification === true && (
                                                                    <TableRow key={device.id}>
                                                                        <TableCell
                                                                                   align="center" button
                                                                                   onClick={() => (
                                                                                       localStorage.setItem(DEVICE_ID, device.id),
                                                                                           localStorage.setItem(DEVICE_NAME, device.name_device),
                                                                                           history.push('/mydevices/' + device.name_device)
                                                                                   )}>
                                                                            {device.name_device} </TableCell>
                                                                        {device.valid_verification >= endDate && (
                                                                            <TableCell align="center"><Typography
                                                                                style={{color: "#00DE28"}}>{t('Valid')}</Typography></TableCell>)}
                                                                        {device.valid_verification <= startDate && (
                                                                            <TableCell align="center"
                                                                                       style={{color: "#ff0737"}}>{t('Expired')}</TableCell>)}
                                                                        <TableCell
                                                                            align="center">{device.notes}</TableCell>
                                                                        <TableCell>
                                                                            <Mutation mutation={DELETE_MYDevice}
                                                                                      variables={{id: device.id}}
                                                                                      onCompleted={(data) => confirm(data)}
                                                                                      pollInterval={50}>
                                                                                {(deleteDevice, {
                                                                                    loading,
                                                                                    error,
                                                                                    data
                                                                                }) => {
                                                                                    if (loading) {
                                                                                        return (
                                                                                            <CircularProgressLoading/>)
                                                                                    }
                                                                                    if (error) {
                                                                                        return (error.message)
                                                                                    }
                                                                                    if (authToken) {
                                                                                        return (
                                                                                            <Tooltip
                                                                                                title={t('Delete')}>
                                                                                                <IconButton
                                                                                                    onClick={deleteDevice}><DeleteIcon/></IconButton>
                                                                                            </Tooltip>
                                                                                        )
                                                                                    }
                                                                                }}
                                                                            </Mutation>
                                                                        </TableCell>
                                                                    </TableRow>)}
                                                            </TableBody>))}
                                                    </Table>
                                                </Paper>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={value} index={3} dir={theme.direction} >
                                            <Grid item justify={"center"} xs={12}>
                                                <Paper>
                                                    <TableContainer component={Paper}>
                                                        <Table stickyHeader>
                                                            {devicelist.map(device => (
                                                                <TableBody key={device.id}>
                                                                    {(!device.certificate_verification && !device.certificate_calibration && !device.certificate_conformity) && (
                                                                        <TableRow
                                                                                  key={device.id}>
                                                                            <TableCell align="center" button
                                                                                       onClick={() => (
                                                                                           localStorage.setItem(DEVICE_ID, device.id),
                                                                                               localStorage.setItem(DEVICE_NAME, device.name_device),
                                                                                               history.push('/mydevices/' + device.name_device)
                                                                                       )}>
                                                                                {device.name_device}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center">{device.notes}</TableCell>
                                                                            <TableCell>
                                                                                <Mutation mutation={DELETE_MYDevice}
                                                                                          variables={{id: device.id}}
                                                                                          onCompleted={(data) => confirm(data)}
                                                                                          pollInterval={50}>
                                                                                    {(deleteDevice, {
                                                                                        loading,
                                                                                        error,
                                                                                        data
                                                                                    }) => {
                                                                                        if (loading) {
                                                                                            return (
                                                                                                <CircularProgressLoading/>)
                                                                                        }
                                                                                        if (error) {
                                                                                            return (error.message)
                                                                                        }
                                                                                        if (authToken) {
                                                                                            return (
                                                                                                <Tooltip
                                                                                                    title={t('Delete')}>
                                                                                                    <IconButton
                                                                                                        onClick={deleteDevice}><DeleteIcon/></IconButton>
                                                                                                </Tooltip>
                                                                                            )
                                                                                        }
                                                                                    }}
                                                                                </Mutation>
                                                                            </TableCell>
                                                                        </TableRow>)}
                                                                </TableBody>))}
                                                        </Table>
                                                    </TableContainer></Paper>
                                            </Grid>
                                        </TabPanel>
                                    </SwipeableViews>
                                </Grid></div>
                        )
                    } else return null
                }}
            </Query>
        </div>
    )
}
MyDeviceForm.propTypes = {
    t:PropTypes.node
};
export default withTranslation()(MyDeviceForm)
