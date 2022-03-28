import React from "react";

import {Grid, Typography, ListItem, Paper, List, ListItemText} from "@mui/material";
import {withTranslation} from "react-i18next";
import {Query} from "react-apollo";
import CircularProgressLoading from "../../../components/circularProgressLoading/CircularProgressLoading";
import {GET_MyDevice} from '../../../graphql/query/Query';
import Auth from "../../../pages/Home/Auth/Auth";
import {DEVICE_ID} from "../../../constants";
import {useSnackbar} from "notistack";

const deviceID = localStorage.getItem(DEVICE_ID);

function MyDeviceActivity() {

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
                if (Auth.isAuthenticated) {
                    return (
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
                    )
                } else return null
            }}
        </Query>
    )
}

export default withTranslation()(MyDeviceActivity)
