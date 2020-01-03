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
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
      marginRight:"auto",
        marginLeft:"auto",
        marginTop:"20%",
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
    paper:{ backgroundColor:"transparent"},
}));
function RedditTextField(props) {
    const classes = useStylesReddit();
const {  ...rest } = props;
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, verification_device calibration next_calibration} }}`;

const CREATE_MYDEVICE =gql `mutation($brand_device:String!, $type_device:String!, $module_device:String!,$notes:String, $verification_device:String, $calibration:String, $next_calibration:String){createNewMyDevice(module_device:$module_device, brand_device:$brand_device,type_device: $type_device, notes:$notes, verification_device:$verification_device, calibration:$calibration,next_calibration:$next_calibration){
    brand_device
    type_device
    module_device
   verification_device
    calibration
    next_calibration
}}`;
function AddDevice ({t,props}) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

const {  ...rest } = props;

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
    const handleDateCalibration = e => {
        setStateCalibration(e.target.value);
    };
    const handleDateNext_Calibration = e => {
        setStateNext_calibration(e.target.value);
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
                                <ArrowBackIcon style={{color:"rgba(0,1,47,0.84)"}} />
                            </IconButton>
                    </Grid>
                     <Grid item lg={4} md={6} xl={4} xs={12}>
                                <Card{...rest} >
              <CardHeader subheader={t("fill the information")} title={t("Add Device")}/>
              <Divider />
          
                     <Mutation mutation={CREATE_MYDEVICE}  variables={{ brand_device, type_device,module_device, calibration, next_calibration} } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                            {( addmydevice,{loading, error, event}) => {
                                 
                                if (loading) { return (<LinearDeterminate /> )}
                                if (error) {return (error.message)}
                                    if (authToken){
                                return(
                                     
                        <FormControl autoComplete="off" noValidate style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>
  <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>

                <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Brand')}</label>
                <RedditTextField type="text" fullWidth value={brand_device}  onChange={e => {
                    setStateBrand_device(e.target.value);
                }}
                           required/>
 </Grid>
                       
                        <Grid item md={6} xs={12}>
                <label  htmlFor="type" style={{color:"rgba(0,1,47,0.84)"}}>{t('Type')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={type_device}
                    onChange={e => {
                        setStateType_device(e.target.value);
                    }}  required
                />
 </Grid>
                       
                        <Grid item md={6} xs={12}>
                <label  htmlFor="module" style={{color:"rgba(0,1,47,0.84)"}}>{t('Module')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={module_device}
                    onChange={e => {
                        setStateModule_device(e.target.value);
                    }} required
                />
                         </Grid>
                       
                        <Grid item md={6} xs={12}>
               <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Notes')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    multiline
                    rows="5"
                    value={notes}
                    onChange={e => {
                        setStateNotes(e.target.value);
                    }}
                />
 </Grid>
                       
                        <Grid item md={6} xs={12}>
                <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Verification')}</label>
                <RedditTextField
                    type="text" placeholder="Yes/No"
                    fullWidth
                    value={verification_device}
                    onChange={e => {
                        setStateVerification_device(e.target.value);
                    }}
                /><br/>
                      <Divider />
                     </Grid>
                       
                        <Grid item md={6} xs={12}>
                <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Calibration')}</label>
              <Divider />
 <TextField id="date"
    label={t('Calibration')}
    type="date"
   style={{color:"rgba(0,1,47,0.84)"}}
    defaultValue="12-06-2019"
    value={calibration}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={handleDateCalibration}
  />
         </Grid>        
                        <Grid item md={6} xs={12}>
<TextField
    id="date"
    label={t('Next Calibration')}
    type="date"
    style={{color:"rgba(0,1,47,0.84)"}}
    value={next_calibration}
    defaultValue="12-06-2020"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
     onChange={handleDateNext_Calibration}
  /><br/>
</Grid>
                         </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                <RaisedButton onClick={addmydevice} style={{color:"rgba(0,1,47,0.84)"}}>{t('Add')}</RaisedButton>
         </CardActions>
       
            </FormControl>)}}}
                                                                                                                
                        </Mutation> </Card>
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
