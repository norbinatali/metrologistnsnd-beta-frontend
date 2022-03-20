import React from "react";
import {Box, Grid, Typography, ListItem, Paper, List, ListItemText, useTheme} from "@mui/material";
import {withTranslation} from "react-i18next";
import {Query} from "react-apollo";
import CircularProgressLoading from "./CircularProgressLoading";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import {AUTH_TOKEN, DEVICE_ID} from "../constants";
import {useSnackbar} from "notistack";

const deviceID = localStorage.getItem(DEVICE_ID);
const authToken = localStorage.getItem(AUTH_TOKEN);
const GET_MyDevice = gql`query ($id:ID!){ myDevice(id:$id){ id name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} }`;

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

function MyDeviceSetting() {
    const theme = useTheme();
    const [value] = React.useState(0);
    const {enqueueSnackbar} = useSnackbar();
    return (
        <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={100}
               onError={(error) => enqueueSnackbar(error.message)} variables={{id: deviceID}}>
            {({loading, error, data}) => {
                if (loading) {
                    return <CircularProgressLoading/>
                }
                if (error) {
                    return error.message
                }

                if (authToken) {
                    return (
                        <TabPanel value={value} index={0} dir={theme.direction} style={{
                            width: "100%",
                            minHeight: "375px",
                            marginRight: "auto",
                            marginTop: "0px",
                            marginLeft: "auto",
                        }}>
                            <Grid item justify={"center"} xs={12}>
                                <Paper>
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
                    )
                } else return null
            }}
        </Query>
    )
}

export default withTranslation()(MyDeviceSetting)
