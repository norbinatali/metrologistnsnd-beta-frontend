import React, {useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
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
import {AUTH_TOKEN, CREATE_MY_DEVICE, GC_USER_ID} from "../constants";
import {fade} from "@material-ui/core/styles";
import LinearDeterminate from "./LinearDeterminate";
import UserMenu from "./UserMenu";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
    root: {
        width: '70%',
      marginRight:"auto",
        marginLeft:"auto"
    },

}));
const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));
function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, verification_device calibration next_calibration} }}`;

const CREATE_MYDEVICE =gql `mutation($brand_device:String!, $type_device:String!, $module_device:String!,$notes:String, $verification_device:String, $calibration:Date, $next_calibration:Date){createNewMyDevice(module_device:$module_device, brand_device:$brand_device,type_device: $type_device, notes:$notes, verification_device:$verification_device, calibration:$calibration,next_calibration:$next_calibration){
    brand_device
    type_device
    module_device
    calibration
    next_calibration
}}`;
function AddDevice ({t,props}) {
    const classes = useStyles();
  const [brand_device, setStateBrand_device]=useState("");
    const [type_device, setStateType_device]=useState("");
    const [module_device, setStateModule_device]=useState("");
     const [notes, setStateNotes]=useState("");
     const [verification_device, setStateVerification_device]=useState("");
    const [calibration, setStateCalibration]=useState(new Date());
    const [next_calibration, setStateNext_calibration]=useState(new Date());
    const [addmydevice] = useState(true);
 const handleBack = () => {
        history.goBack();
    };
    const confirm = async (data, e) => {
        history.push('/mydevices')
    };
    const saveUserData = (token) => {
      
        localStorage.setItem(CREATE_MY_DEVICE, token)
    };
    const handleDateCalibration = date => {
        setStateCalibration(date);
    };
    const handleDateNext_Calibration = date => {
        setStateNext_calibration(date);
    };
    return(
        <div>
        <UserMenu />
         <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
        <div className={classes.root}>
            <MuiThemeProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container style={{ height: '100%'}} >
                    <Grid item >
                         <IconButton onClick={handleBack}>
                                <ArrowBackIcon style={{color:"white"}} />
                            </IconButton>
                    </Grid>
                    <Grid item lg={10} xs={12}>
                     <Mutation mutation={CREATE_MYDEVICE}  variables={{ brand_device, type_device,module_device, calibration, next_calibration} } update={(caches,{data:{addmydevice}})} onCompleted={(data) => confirm(data)}>
                            {( addmydevice,{loading, error, event}) => {
                                 const { mydevice } = caches.readQuery({ query: GET_MyDevice });
                                caches.writeQuery({
                                    query: GET_MyDevice,
                                    data: { mydevice: mydevice.concat([mydevice]) },
                                });
                                if (loading) { return (<LinearDeterminate /> )}
                                if (error) {return (error.message)}
                                    if (authToken){
                                return(
                        <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>


                <label  htmlFor="brand" style={{color:"#fff"}}>{t('Brand')}</label>
                <RedditTextField type="text" fullWidth value={brand_device}  onChange={e => {
                    setStateBrand_device(e.target.value);
                }}
                           required/>

                <label  htmlFor="type" style={{color:"#fff"}}>{t('Type')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={type_device}
                    onChange={e => {
                        setStateType_device(e.target.value);
                    }}  required
                />

                <label  htmlFor="module" style={{color:"#fff"}}>{t('Module')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={module_device}
                    onChange={e => {
                        setStateModule_device(e.target.value);
                    }} required
                />
               <label  htmlFor="notes" style={{color:"#fff"}}>{t('Notes')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    rows="5"
                    value={notes}
                    onChange={e => {
                        setStateNotes(e.target.value);
                    }}
                />
                <label  htmlFor="notes" style={{color:"#fff"}}>{t('Verification')}</label>
                <RedditTextField
                    type="text"
                                                                placeholder="Yes/No"
                    fullWidth
                    value={verification_device}
                    onChange={e => {
                        setStateVerification_device(e.target.value);
                    }}
                />
                <label  htmlFor="calibration" style={{color:"#fff"}}>{t('Calibration')}</label>

                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label= {t('calibration')}
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
                                label={t('next calibration')}
                                format="MM/dd/yyyy"
                                value={next_calibration}
                                onChange={handleDateNext_Calibration}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /><br/>

                <RaisedButton onClick={addmydevice} style={{backgroundColor:"rgba(0,1,47,0.84)", color:"white"}}>{t('Add')}</RaisedButton>
            </FormControl>)}}}
                                                                                                                
                        </Mutation>
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>

        </div>
                                                                                                                  </main>
</div>
    )
}
export default withTranslation()(AddDevice)
