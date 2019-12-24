import React from "react";
import FormControl from '@material-ui/core/FormControl';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor:"white"
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

        const {id, token } = addmydevice;
        saveUserData(id, token);
        history.push('/mydevice')
    };
    const saveUserData = (id,token) => {
        localStorage.setItem(GC_USER_ID, id);
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
        <div className={classes.root}>
            <MuiThemeProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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


                <label  htmlFor="brand">{t('Brand)}</label>
                <RedditTextField type="text" fullWidth value={brand_device}  onChange={e => {
                    setStateBrand_device(e.target.value);
                }}
                           required/>

                <label  htmlFor="type">{t('Type')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={type_device}
                    onChange={e => {
                        setStateType_device(e.target.value);
                    }}  required
                />

                <label  htmlFor="module">{t('Module')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={module_device}
                    onChange={e => {
                        setStateModule_device(e.target.value);
                    }} required
                />
               <label  htmlFor="notes">{t('Notes')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={notes}
                    onChange={e => {
                        setStateNotes(e.target.value);
                    }}
                />
                <label  htmlFor="notes">{t('Verification')}</label>
                <RedditTextField
                    type="text"
                    fullWidth
                    value={verification_device}
                    onChange={e => {
                        setStateVerification_device(e.target.value);
                    }}
                />
                <label  htmlFor="calibration">{t('Calibration')}</label>

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
                            />


                <RaisedButton onClick={addmydevice} style={{backgroundColor:"rgba(0,1,47,0.84)", color:"white"}}>{t('Add')}</RaisedButton>
            </FormControl>)}}
                        </Mutation>
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>

        </div>
</div>
    )
}
export default withTranslation()(AddDevice)
