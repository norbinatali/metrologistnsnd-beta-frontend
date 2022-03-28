import React from "react";

import {Box, Grid, Typography, ListItem, Paper, List, ListItemText} from "@mui/material";
import {withTranslation} from "react-i18next";
import {Query} from "react-apollo";
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading";
import {GET_MyDevice} from '../../../graphql/query/Query';
import PropTypes from "prop-types";
import {AUTH_TOKEN, DEVICE_ID} from "../../../constants";
import {useSnackbar} from "notistack";

const deviceID = localStorage.getItem(DEVICE_ID);
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

function MyDeviceActivity() {
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
                        <TabPanel value={value} index={0} style={{
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

export default withTranslation()(MyDeviceActivity)
