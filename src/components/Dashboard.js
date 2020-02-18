import React, {Component, useState} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import ContactUS from "./ContactUS";
import clsx from 'clsx';
import UserMenu from "./UserMenu";
import gql from "graphql-tag";
import {Mutation, Query} from 'react-apollo';
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN} from "../constants";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import * as Moment from 'moment';
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
    CurrentTimeIndicator,
    AllDayPanel, DateNavigator, DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Dialog from "@material-ui/core/Dialog";

import {useSnackbar} from "notistack";
import {DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const authToken = localStorage.getItem(AUTH_TOKEN);



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginLeft: "5%",
        marginRight:"30%"
    },
    chartContainer: {
        height: 400,
        position: 'relative'
    },
    actions: {
        justifyContent: 'flex-end'
    },
    scheduler:{
        marginTop:"40px",
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

const rememberUser =localStorage.getItem('rememberMe');
const QUERY_USER = gql`query{me {name, email,country, companyName,appointments{title,location,notes,start_date,end_date},mydevices{certificate_verification,valid_verification,calibration_data,name_device}}}`;
const MUTATION_APPOINTMENTS= gql`mutation ($title:String, $start_date:DateTime, $end_date:DateTime, $location:String, $notes:String){createNewAppointment(title: $title,start_date:$start_date,end_date: $end_date,location: $location,notes: $notes){
    title,
    start_date,
    end_date,
    location,
    notes,
}}`
function Dashboard ({t}){

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [title,setTitle] = useState("");
    const [location,setLocation] = useState("");
    const [notes,setNotes] = useState("");
    const [start_date,setStart_date] = useState(new Date(''));
    const [end_date,setEnd_date] = useState(new Date(''));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const confirm= async (data, e) => {
        setOpen(false);
    };

    var delays = 80,
        durations = 500;
    const dataChar={
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options : {
            high: 40,
            low: 0,
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }},
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        animation: {
            draw: function(data) {
                if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                        d: {
                            begin: 600,
                            dur: 700,
                            from: data.path
                                .clone()
                                .scale(1, 0)
                                .translate(0, data.chartRect.height())
                                .stringify(),
                            to: data.path.clone().stringify(),

                        }
                    });
                } else if (data.type === "point") {
                    data.element.animate({
                        opacity: {
                            begin: (data.index + 1) * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: "ease"
                        }
                    });
                }
            }
        }
    };

    return(
        <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div style={{ marginTop: 40 }}>
                    <div style={{ marginTop: 20, padding:30}}>
                        <Query query={QUERY_USER} pollInterval={50} onError={(error) => enqueueSnackbar(error.message)}>
                            {({loading, error, data}) => {
                                if (loading) {
                                    return <LinearDeterminate/>
                                }
                                if (error) {
                                    return error.message
                                }
                                const userInfo = data.me;
                                const currentDate=new Date();
                                const appointmentStartDate= data.me.appointments;
                                const verificationStartDate= data.me.mydevices;

                                console.log(appointmentStartDate);

                                const appointmentEndDate= Moment(new Date(data.me.appointments.end_date)).format('YYYY-MM-DD')
                                const Schel= [appointmentStartDate.map(appointment=>(
                                        { startDate:Moment(appointment.start_date).format("YYYY-MM-DD HH:mm") , endDate: Moment(appointment.end_date).format("YYYY-MM-DD HH:mm"), title: appointment.title,location:appointment.location}


                                    ))];
                                    console.log(Schel)
                                    console.log(data.me.name);
                                console.log(data.me.email);
                                if (authToken && data) {
                                    return (
        <div className={classes.root}>

            <div > <Typography  align={"justify"}  >{t('Welcome')} {data.me.name}</Typography>
            </div>    
                <Paper className={classes.scheduler}>
                    <Scheduler  data= {appointmentStartDate.map(appointment=>(
                        {
                            startDate: Moment(new Date(appointment.start_date)).format("YYYY-MM-DD HH:mm"),
                            endDate: Moment(new Date(appointment.end_date)).format("YYYY-MM-DD HH:mm"),
                            title: appointment.title,
                            location: appointment.location
                        }
                        )

                    )}
                                height={400}
                    >
                        <ViewState
                            defaultCurrentDate={currentDate}
                            defaultCurrentViewName="Week"
                        />
                        <DayView
                            startDayHour={8}
                            endDayHour={19}
                        />
                        <WeekView
                            startDayHour={8}
                            endDayHour={19}
                        />
                        <MonthView
                        />
                        <Toolbar />
                        <DateNavigator/>
                        <ViewSwitcher />
                        <Appointments />

                        <AppointmentForm
                            readOnly
                        />
                        <CurrentTimeIndicator/>
                </Scheduler>
                    <Fab
                        color="secondary"
                        className={classes.addButton}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </Paper>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <Mutation mutation={MUTATION_APPOINTMENTS} variables={{title,location,notes,start_date,end_date}} onCompleted={(data) => confirm(data)}>
                    {( mutation,{loading, error}) => {
                        if (loading) { return (<LinearDeterminate /> )}
                        if (authToken ){

                            return(
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <FormControl>
                                        <DialogTitle id="form-dialog-title">{t('New Plan')}</DialogTitle>
                                        <DialogContent>

                                            <TextField
                                                autoFocus
                                                variant="outlined"
                                                id="name"
                                                label={t('Title')}
                                                value={title}
                                                onChange={(event)=>setTitle(event.target.value)}
                                                fullWidth
                                            /><br/>

                                            <DateTimePicker
                                                label={t('Start Date')}
                                                clearable
                                                value={start_date}
                                                onChange={(date)=>setStart_date(date)}
                                            /><br/>
                                            <DateTimePicker
                                                label={t('End Date')}
                                                clearable
                                                defaulValue={new Date()}
                                                value={end_date}
                                                onChange={(date)=>setEnd_date(date)}
                                            />

                                            <TextField
                                                variant="outlined"
                                                id="name"
                                                label={t('Location')}
                                                value={location}
                                                onChange={(event)=>setLocation(event.target.value)}
                                                fullWidth
                                            /><br/>
                                            <TextField
                                                multiline
                                                rows={3}
                                                id="name"
                                                label={t('Notes')}
                                                variant="outlined"
                                                value={notes}
                                                onChange={(event)=>setNotes(event.target.value)}
                                                fullWidth
                                            /><br/>
                                        </DialogContent>

                                        <DialogActions>
                                            <Button onClick={mutation} color="default" variant="outlined">
                                                {t('Save')}
                                            </Button>
                                        </DialogActions>
                                    </FormControl></MuiPickersUtilsProvider>)}}}

                </Mutation>
            </Dialog>

        </div>
                                        )}}}
                                </Query>
                    </div>
                </div>
            </main>
        </div>



    )




}


export default withTranslation()(Dashboard)
