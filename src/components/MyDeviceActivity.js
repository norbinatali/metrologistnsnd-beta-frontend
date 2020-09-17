import React from "react";
import Paper from "@material-ui/core/Paper";
import {List, ListItemText, makeStyles} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {withTranslation} from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import {Query} from "react-apollo";
import CircularProgressLoading from "./CircularProgressLoading";
import gql from "graphql-tag";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {AUTH_TOKEN, CREATE_MY_DEVICE, DEVICE_ID, DEVICE_NAME} from "../constants";
import useTheme from "@material-ui/core/styles/useTheme";
import {useSnackbar} from "notistack";

const deviceID = localStorage.getItem(DEVICE_ID);
const deviceName=localStorage.getItem(DEVICE_NAME);
const deviceid = localStorage.getItem(CREATE_MY_DEVICE);
const authToken = localStorage.getItem(AUTH_TOKEN);
const GET_MyDevice = gql`query ($id:ID!){ myDevice(id:$id){ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }`;
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
function MyDeviceActivity() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { enqueueSnackbar } = useSnackbar();
    return(
        <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100} onError={(error) => enqueueSnackbar(error.message)} variables={{id:deviceID}}>
            {( {loading, error, data} ) =>  {
                if (loading) {return <CircularProgressLoading />}
                if (error) { return error.message }

                const currentDate =new Date();
                const startDate= new Date(currentDate.setHours(2,0,0,0)).toISOString();
                const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

                console.log(currentDate);
                console.log(startDate);

                const devicelist = data.myDevice;
                if(authToken) {
                    return(
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
                                            <ListItemText><Typography
                                                style={{color: "#000"}}> {data.myDevice.brand_device}</Typography></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText> </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText> </ListItemText>
                                        </ListItem>
                                    </List>

                                </Paper>
                            </Grid>
                        </TabPanel>
                    )}else return null}}
        </Query>
    )

}
export default withTranslation()(MyDeviceActivity)
