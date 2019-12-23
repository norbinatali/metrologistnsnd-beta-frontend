import React, {useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import {Grid, IconButton, makeStyles} from "@material-ui/core";
import history from '../history.js'
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import{Mutation} from 'react-apollo';
import gql from "graphql-tag";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
const useStyles = makeStyles(theme => ({
    root: {
        width:"100",

                backgroundColor:"white"
    },

}));
const CREATE_MYDEVICE =gql `mutation($brand_device:String!, $type_device:String!, $module_device:String!, $calibration:Date, $next_calibration:Date){createNewMyDevice(module_device:$module_device, brand_device:$brand_device,type_device: $type_device, calibration:$calibration,next_calibration:$next_calibration){
    brand_device
    type_device
    module_device
    calibration
    next_calibration
}}`
function AddDevice ({t}) {
    const classes = useStyles();
    const [brand_device, setStateBrand_device]=useState("");
    const [type_device, setStateType_device]=useState("");
    const [module_device, setStateModule_device]=useState("");
    const [calibration, setStateCalibration]=useState("");
    const [next_calibration, setStateNext_calibration]=useState(new Date());
    const [addmydevice] = useState(true);
   const handleBack = () => {
        history.goBack();
    };
    const confirm = async (data, e) => {

        const {id, token } = addmydevice;
        saveUserData(id, token);
        history.push('/mydevice')
    };
    const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    };
    const handleDateCalibration = date => {
        setStateCalibration(date);
    };
    const handleDateNext_Calibration = date => {
        setStateNext_calibration(date);
    };
    return(
        <div style={{height: '100%'}} >

            <MuiThemeProvider>
                <Grid container style={{ height: '100%'}} >
                    <Grid item >
                        <div style={{marginTop:"0px"}} >
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon style={{color:"white"}} />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item lg={10} xs={12}>
                        <Mutation mutation={CREATE_MYDEVICE}  variables={{ brand_device, type_device,module_device, calibration, next_calibration} } onCompleted={() => confirm()}>
                            {( addmydevice,{loading, error, event}) => {
                                if (loading) { return (<span>loading</span> )}
                                if (error) {return (error.message)}
                                return(
                        <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>


                <label  htmlFor="brand">Brand</label>
                <TextField type="text" value={brand_device}/>

                <label  htmlFor="type">Type</label>
                <TextField
                    type="text"
                    value={type_device}

                />

                <label  htmlFor="module">Module</label>
                <TextField
                    type="text"
                    value={module_device}

                />

                <label  htmlFor="calibration">Calibration</label>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="calibration"
                                format="MM/dd/yyyy"
                                value={calibration}
                                onChange={handleDateCalibration}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="next calibration"
                                format="MM/dd/yyyy"
                                value={next_calibration}
                                onChange={handleDateNext_Calibration}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />


                <RaisedButton onClick={addmydevice} style={{backgroundColor:"rgba(0,1,47,0.84)", color:"white"}}>{t('Add')}</RaisedButton>
            </FormControl>)}}
                        </Mutation>
                    </Grid>
                </Grid>
            </MuiThemeProvider>

        </div>
    )

}
export default withTranslation()(AddDevice)