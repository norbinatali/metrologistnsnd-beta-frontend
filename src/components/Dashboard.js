import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ContactUS from "./ContactUS";
import UserMenu from "./UserMenu";
import gql from "graphql-tag";
import {Mutation, Query} from 'react-apollo';
import LinearDeterminate from "./LinearDeterminate";
import {
    Scheduler,
    Toolbar,
    MonthView,
    WeekView,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    DragDropProvider,
    EditRecurrenceMenu,
    AllDayPanel, DateNavigator, DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {AUTH_TOKEN} from "../constants";
const authToken = localStorage.getItem(AUTH_TOKEN);
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginLeft: "5%",
        marginRight:"30%"
    },
text:{
    color:"rgba(0,1,14,0.74)",
},
}));
const QUERY_USER = gql`query{me {name, email,country, companyName}}`;
function Dashboard ({t}){

    const classes = useStyles();
    return(
        <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div style={{ marginTop: 40 }}>
                    <div style={{ marginTop: 20, padding:30}}>
                        <Query query={QUERY_USER}>
                            {({loading, error, data}) => {
                                if (loading) {
                                    return <LinearDeterminate/>
                                }
                                if (error) {
                                    return error.message
                                }
                                    const currentDate=new Date();
                                const userInfo = data.me;
                                console.log(data.me.name);
                                console.log(data.me.email);
                                if (authToken && data) {
                                    return (
        <div className={classes.root}>

            <div > <Typography  align={"center"} className={classes.text}  >{t('Welcome')} {data.me.name}</Typography>
               
            </div>
                                    <div style={{width:"200px"}}>
                              <Scheduler  data={[
      { startDate: '2018-10-31 10:00', endDate: '2018-10-31 11:00', title: 'Meeting' },
      { startDate: '2018-11-01 18:00', endDate: '2018-11-01 19:30', title: 'Go to a gym' },
    ]}
                                        height={500} 
                                    >
                                        <ViewState
                                            defaultCurrentDate={currentDate}
                                        />
                                        <DayView/>
                                        <Toolbar />
                                        <DateNavigator/>

                                        <Appointments />
                                    </Scheduler>      
                                                </div>
        </div>)}}}</Query>
                    </div>
                </div>
            </main>
        </div>



    )




}
export default withTranslation()(Dashboard)
