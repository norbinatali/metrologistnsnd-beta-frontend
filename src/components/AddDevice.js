import React, {useEffect, useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import {withTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import {Grid, IconButton, makeStyles} from "@material-ui/core";
import history from '../history.js'
import validate from 'validate.js';
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
import Checkbox from '@material-ui/core/Checkbox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import Paper from '@material-ui/core/Paper';
import LegalMetrology from "./LegalMetrology";

const schema = {
    name_device: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },
    kind_device: {
        presence: { allowEmpty: false, message: 'is required' },
       
        length: {
            maximum: 128
        }
    },
    series_device: {
        presence: { allowEmpty: false, message: 'is required' },
       
        length: {
            maximum: 64
        }
    },
    brand_device: {
        presence: { allowEmpty: false, message: 'is required' },
       
        length: {
            maximum: 64
        }
    }
};

const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 650,
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


const CREATE_MYDEVICE =gql `mutation($name_device: String!,$brand_device:String!,$series_device:String!,$kind_device: String!,$certificate_calibration:Boolean,$certificate_verification:Boolean,$certificate_conformity:Boolean,$module_device: String, $tr_device:String,$certificate_assessment_number:String,$certificate_verification_number:String,$certificate_calibration_number:String, $department_assessment_center:String,$department_verification_center:String,$department_calibration_center:String,$conformity_data:Date, $calibration_data:Date,$valid_verification:Date,$notes:String,){ createNewMyDevice(name_device:$name_device,brand_device:$brand_device,series_device:$series_device,kind_device:$kind_device,certificate_calibration:$certificate_calibration,certificate_verification:$certificate_verification,certificate_conformity:$certificate_conformity,module_device:$module_device, tr_device: $tr_device,certificate_assessment_number: $certificate_assessment_number, certificate_calibration_number: $certificate_calibration_number, certificate_verification_number: $certificate_verification_number,department_assessment_center: $department_assessment_center, department_calibration_center: $department_calibration_center,department_verification_center: $department_verification_center,conformity_data:$conformity_data,calibration_data: $calibration_data,valid_verification:$valid_verification,notes:$notes){
    id
    name_device
    brand_device
    series_device
    kind_device
    certificate_calibration
    certificate_verification
    certificate_conformity
    module_device
    tr_device
    certificate_assessment_number
    certificate_verification_number
    certificate_calibration_number
    department_assessment_center
    department_verification_center
    department_calibration_center
    conformity_data
    calibration_data
    valid_verification
    notes
    
}}`;
function AddDevice ({t,props}) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const {  ...rest } = props;
    const [ value,setValue]=useState({none:false,certification_calibration:false,certification_verification:false,certification_conformity:false});

    const {id} = React.useState("");
    const [ setStateNone]=useState("");
    const [brand_device, setStateBrand_device]=useState("");
    const [kind_device, setStateKind_device]=useState("");
    const [series_device, setStateSeries_device]=useState("");
    const [name_device, setStateName_device]=useState("");
    const [valid_verification, setValid_verification]=useState(new Date(''));
    const [certificate_assessment_number, setCertification_assessment_number]=useState("");
    const [certificate_verification_number, setCertification_verification_number]=useState("");
    const [certificate_calibration_number, setCertification_calibration_number]=useState("");
    const [module_device, setStateModule_device]=useState("");
    const [tr_device, setStateTr_device]=useState("");
    const [notes, setStateNotes]=useState("");
    const [department_assessment_center, setDepartment_assessment_center]=useState("");
    const [department_verification_center, setDepartment_verification_center]=useState("");
    const [department_calibration_center, setDepartment_calibration_center]=useState("");
    const [, setStateCalibration]=useState('');
    const [conformity_data, setStateConformity_data]=useState(new Date(''));
    const [calibration_data, setCalibration_data]=useState(new Date(''));
    const [valueVerification, setValueVerification]=useState(new Date(''));
    const [valueVer, setValueVer]=useState('');
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const { none,certificate_calibration,certificate_verification,certificate_conformity } = value;
    const [addmydevice] = useState(true);
    const handleBack = () => {
        history.goBack();
    };
    const confirm = async (data, e) => {
        saveUserData(data.createNewMyDevice.id)
        history.push('/mydevices');

    };
    const saveUserData = (id) => {

        localStorage.setItem(CREATE_MY_DEVICE, id)
    };
    const handleDateCalibration = date => {
        if (conformity_data === new Date()){
            console.log(new Date().toLocaleDateString());
            return Error
        }
        else return setStateConformity_data(date);

    };
    const handleDateNext_Calibration = e => {
        setCalibration_data(e.target.value);
    };
    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeVerification = e => {
        setValid_verification(e.target.value)
    };
    const handleChangeVer = e => {
        setValueVer(e.target.value)
    };
    const handleChange = name => event => {
        setValue({ ...value, [name]: event.target.checked, none:false });
    };
    const handleChangeNone = name => event => {
        setValue({ ...value, [name]: event.target.checked, certification_calibration: false, certification_conformity: false, certification_verification: false });

    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
     const [formState, setFormState] = React.useState({
        isValid: false,
        values: {name_device, kind_device,brand_device,series_device},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: !errors,
            errors: errors || {}
        }));
    }, [formState.values]);
const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
    return(
        <div>
            <UserMenu />
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>

                <MuiThemeProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className={classes.root}>
                            <Grid container xs={12} >
                                <Grid item >
                                    <IconButton onClick={handleBack}>
                                        <ArrowBackIcon style={{color:"rgba(0,1,47,0.84)"}} />
                                    </IconButton>
                                </Grid>
                                <Grid item justify="center" alignItems="center" mxs={12}>
                                    <Card{...rest} style={{marginRight:"auto", marginLeft:"auto", width:"60%"}} >
                                        <CardHeader subheader={t("fill the information")} title={t("Add Device")}/>
                                        <Divider />
                                        <Mutation mutation={CREATE_MYDEVICE}  variables={{id,name_device,brand_device,series_device,kind_device,certificate_calibration,certificate_verification,certificate_conformity,module_device,tr_device,certificate_assessment_number,certificate_verification_number,certificate_calibration_number,department_assessment_center,department_verification_center,department_calibration_center,conformity_data,calibration_data,valid_verification,notes} } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                                            {( addmydevice,{loading, error, event}) => {
                                                if (loading) { return (<LinearDeterminate /> )}
                                                if (error) {return (error.message)}
                                                if (authToken){
                                                    return(
                                                        <FormControl autoComplete="off" noValidate style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%",overflow: 'auto'}}>
                                                            <CardContent>
                                                                <Grid container spacing={3}>
                                                                    <Grid item md={6} xs={12}>
                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Name device')}</label>
                                                                        <RedditTextField type="text" fullWidth value={formState.values.name_device || ''} error={hasError('name_device')}
                                                                                         name={"name_device"}
                                                                                         helperText={hasError('name_device')? formState.errors.name_device[0] : null}
                                                                                         onChange={e => { setStateName_device(e.target.value);
                                                                                         e.persist();
                                                                                         setFormState(formState => ({
                                                                                    ...formState,
                                                                                    values: {
                                                                                        ...formState.values,
                                                                                        [e.target.name]:
                                                                                            e.target.type === 'checkbox'
                                                                                                ? e.target.checked
                                                                                                : e.target.value
                                                                                    },
                                                                                    touched: {
                                                                                        ...formState.touched,
                                                                                        [e.target.name]: true
                                                                                    }
                                                                                }
                                                                            )); }}  required/>
                                                                    </Grid>
                                                                    <Grid item md={6} xs={12}>
                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Brand')}</label>
                                                                        <RedditTextField type="text" fullWidth value={formState.values.brand_device || ''}
                                                                                         error={hasError('brand_device')}
                                                                                         name={"brand_device"}
                                                                                         helperText={hasError('brand_device')? formState.errors.brand_device[0] : null}
                                                                                         onChange={e => { setStateBrand_device(e.target.value); e.persist();
                                                                            setFormState(formState => ({
                                                                                    ...formState,
                                                                                    values: {
                                                                                        ...formState.values,
                                                                                        [e.target.name]:
                                                                                            e.target.type === 'checkbox'
                                                                                                ? e.target.checked
                                                                                                : e.target.value
                                                                                    },
                                                                                    touched: {
                                                                                        ...formState.touched,
                                                                                        [e.target.name]: true
                                                                                    }
                                                                                }
                                                                            )); }} required/>
                                                                    </Grid>
                                                                    <Grid item md={6} xs={12}>
                                                                        <label  htmlFor="type" style={{color:"rgba(0,1,47,0.84)"}}>{t('Series number')}</label>
                                                                        <RedditTextField  type="text" fullWidth value={formState.values.series_device || ''} error={hasError('series_device')}
                                                                                          name={"series_device"}
                                                                                          helperText={hasError('series_device')? formState.errors.series_device[0] : null} onChange={e => { setStateSeries_device(e.target.value); e.persist();
                                                                            setFormState(formState => ({
                                                                                    ...formState,
                                                                                    values: {
                                                                                        ...formState.values,
                                                                                        [e.target.name]:
                                                                                            e.target.type === 'checkbox'
                                                                                                ? e.target.checked
                                                                                                : e.target.value
                                                                                    },
                                                                                    touched: {
                                                                                        ...formState.touched,
                                                                                        [e.target.name]: true
                                                                                    }
                                                                                }
                                                                            )); }}    required  />
                                                                    </Grid>
                                                                    <Grid item md={6} xs={12}>

                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Type')}</label>
                                                                        <RedditTextField type="text" fullWidth value={formState.values.kind_device || ''}
                                                                                         error={hasError('kind_device')}
                                                                                         name={"kind_device"}
                                                                                         helperText={hasError('kind_device')? formState.errors.kind_device[0] : null}
                                                                                         onChange={e => { setStateKind_device(e.target.value);
                                                                                         e.persist();
                                                                            setFormState(formState => ({
                                                                                    ...formState,
                                                                                    values: {
                                                                                        ...formState.values,
                                                                                        [e.target.name]:
                                                                                            e.target.type === 'checkbox'
                                                                                                ? e.target.checked
                                                                                                : e.target.value
                                                                                    },
                                                                                    touched: {
                                                                                        ...formState.touched,
                                                                                        [e.target.name]: true
                                                                                    }
                                                                                }
                                                                            ));}} required/>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item md={6} xs={12}>
                                                                    <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Do you have any certificate')}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                    <FormGroup >
                                                                        <FormControlLabel control={<Checkbox checked={certificate_conformity} size="small" onChange={handleChange('certificate_conformity')} value={certificate_conformity}/>}   label={<Typography variant={"overline"}>{t('conformity certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox checked={certificate_verification} size="small" value={certificate_verification}   onChange={handleChange('certificate_verification')}/>}   label={<Typography variant={"overline"}>{t('verification certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox checked={certificate_calibration} size="small" value={certificate_calibration} onChange={handleChange('certificate_calibration')}/>}  label={ <Typography variant={"overline"}>{t('calibration certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox value="none" size="small" checked={none} onChange={handleChangeNone('none')}/>}  label={<Typography variant={"overline"}>{t('none')}</Typography>}/>
                                                                    </FormGroup>
                                                                    </Grid>
                                                                    {certificate_conformity === true && (
                                                                        <Grid item xs={12}>
                                                                            <Divider />
                                                                            <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of conforminy assessment')}</Typography>

                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField    type="text"   fullWidth   value={certificate_assessment_number} onChange={e => { setCertification_assessment_number(e.target.value); }}  />
                                                                            <label  htmlFor="module_device" style={{color:"rgba(0,1,47,0.84)"}}>{t('Module')}</label>
                                                                            <RedditTextField   type="text" fullWidth value={module_device} onChange={e => { setStateModule_device(e.target.value);  }} />

                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Department center')}</label>
                                                                            <RedditTextField  type="text"  fullWidth  value={department_assessment_center} onChange={e => { setDepartment_assessment_center(e.target.value); }} />
                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <Typography>{t('Date')}</Typography>
                                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                                <Grid container justify="space-around">
                                                                                    <KeyboardDatePicker
                                                                                        disableToolbar
                                                                                        variant="inline"
                                                                                        format="MM/dd/yyyy"
                                                                                        margin="normal"
                                                                                        id="date-picker-inline"
                                                                                        value={conformity_data}
                                                                                        onChange={handleDateCalibration}
                                                                                        KeyboardButtonProps={{
                                                                                            'aria-label': 'change date',
                                                                                        }}
                                                                                    /></Grid></MuiPickersUtilsProvider>
                                                                        </Grid>)}
                                                                    {certificate_verification === true && (
                                                                        <Grid item xs={12}>
                                                                            <Divider />
                                                                            <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of verification')}</Typography>

                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField type="text" fullWidth value={certificate_verification_number} onChange={e => {
                                                                                setCertification_verification_number(e.target.value);
                                                                            }}
                                                                            />
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Department center')}</label>
                                                                            <RedditTextField  type="text"  fullWidth  value={department_verification_center} onChange={e => { setDepartment_verification_center(e.target.value); }} />

                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <TextField id="date"   label={t('Date')} type="date"  style={{color:"rgba(0,1,47,0.84)", width:"120px"}} defaultValue="12-06-2019"
                                                                                       value={valid_verification}
                                                                                       className={classes.textField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       onChange={handleChangeVerification}
                                                                            />
                                                                        </Grid>
                                                                    )}
                                                                    {certificate_calibration === true && (
                                                                        <Grid item xs={12}>
                                                                            <Divider />
                                                                            <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of calibration')}</Typography>
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField  type="text"   fullWidth value={certificate_calibration_number} onChange={e => { setCertification_calibration_number(e.target.value); }} />
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Department center')}</label>
                                                                            <RedditTextField  type="text"  fullWidth  value={department_calibration_center} onChange={e => { setDepartment_calibration_center(e.target.value); }} />

                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <TextField id="date" label={t('Date')} type="date"  style={{color:"rgba(0,1,47,0.84)", width:"120px"}} defaultValue="12-06-2019"
                                                                                       value={calibration_data}
                                                                                       className={classes.textField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       onChange={handleDateNext_Calibration}
                                                                            />
                                                                        </Grid>

                                                                    )}
                                                                    {none === true && (
                                                                        <Grid item xs={12}>
                                                                            <Divider />

                                                                                    <Typography className={classes.title} gutterBottom>{t('Recommendation')}</Typography>
                                                                                    <Typography variant="body2" component="p">{t('Choose option')}</Typography>
                                                                                    <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Legal metrology?')} <IconButton  size="small" onClick={handleClickOpen('paper')}><HelpOutlineIcon fontSize="inherit"/></IconButton></Typography>
                                                                                    <RadioGroup value={valueVerification} row onChange={handleChangeVerification}>
                                                                                        <FormControlLabel control={<Radio />} label={<Typography variant={"overline"}>{t('Yes')}</Typography>} value="yes"/>
                                                                                        <FormControlLabel control={<Radio/>} label={<Typography variant={"overline"}>{t('No')}</Typography>} value="no"/>
                                                                                    </RadioGroup>
                                                                                    {valueVerification === 'yes' && (
                                                                                        <Grid container spacing={3}>
                                                                                            <Divider />
                                                                                                    <Grid item xs={12}>
                                                                                                                <Typography> {t('conformity assessment or calibration')}</Typography>
                                                                                                    </Grid>

                                                                                        </Grid>)}
                                                                                    {valueVerification === 'no' && (
                                                                                        <Grid container spacing={3}>
                                                                                            <Divider />
                                                                                            <Grid item xs={12}>

                                                                                                    <Typography> {t('calibration')}</Typography>

                                                                                            </Grid>

                                                                                        </Grid>
                                                                                    )}

                                                                        </Grid>
                                                                    )}
                                                                    <Grid item xs={12}>
                                                                        <Divider />
                                                                        <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Notes')}</label>
                                                                        <RedditTextField  type="text"      fullWidth    multiline rows="5" value={notes} onChange={e => { setStateNotes(e.target.value);
                                                                        }}
                                                                        />
                                                                    </Grid>

                                                                </Grid>
                                                            </CardContent>
                                                            <Divider />
                                                            <CardActions>
                                                                <RaisedButton onClick={addmydevice} disabled={!formState.isValid} style={{color:"rgba(0,1,47,0.84)"}}>{t('Add')}</RaisedButton>
                                                            </CardActions>
                                                        </FormControl>)}}}
                                        </Mutation> </Card>
                                </Grid>

                            </Grid>
                            <Dialog  open={open} onClose={handleClose}  scroll={scroll} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description"
                            >
                                <DialogTitle id="scroll-dialog-title"><Typography>{t('Legal metrology of measuring instruments')} </Typography></DialogTitle>
                                <DialogContent dividers={scroll === 'paper'}>
                                  <LegalMetrology/>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">{t('Ok')}</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </main>
        </div>
    )
}
export default withTranslation()(AddDevice)
