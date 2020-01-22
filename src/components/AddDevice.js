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
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

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
function createData(mi, activities) {
  return { mi, activities };   
}
const rows = [
  createData('Автоматичні зважувальні прилади: ваги безперервної дії для сумарного обліку;ваги дискретної дії та бункерні ваги для сумарного обліку;ваги для зважування розділених вантажів;вагові дозатори дискретної дії;прилади автоматичні для зважування дорожніх транспортних засобів у русі та вимірювання навантажень на вісь;залізничні платформні ваги;контрольні ваги', '7) торговельно-комерційні операції та розрахунки між покупцем (споживачем) і продавцем (постачальником, виробником, виконавцем), у тому числі під час надання транспортних, побутових, комунальних, телекомунікаційних послуг, послуг поштового зв’язку, постачання та/або споживання енергетичних і матеріальних ресурсів (електричної і теплової енергії, газу, води, нафтопродуктів тощо),8) обчислення сум податків і зборів, податковий та митний контроль;'),
  createData('Автомобільні цистерни для нафтопродуктів та харчових продуктів', '7) торговельно-комерційні операції та розрахунки між покупцем (споживачем) і продавцем (постачальником, виробником, виконавцем), у тому числі під час надання транспортних, побутових, комунальних, телекомунікаційних послуг, послуг поштового зв’язку, постачання та/або споживання енергетичних і матеріальних ресурсів (електричної і теплової енергії, газу, води, нафтопродуктів тощо),8) обчислення сум податків і зборів, податковий та митний контроль;'),
  createData('Аналізатори медичного призначення:біохімічні;гематологічні;електролітів та газу в крові;імуноферментні;флуоресцентні;хемілюміносцентні;електрохімічні', '1) забезпечення захисту життя та охорони здоров’я громадян;'),
  createData(' Аналізатори показників сільськогосподарської та харчової продукції: молока, зерна, цукрових буряків, олійних культур та продуктів їх переробки', '2) контроль якості та безпечності харчових продуктів і лікарських засобів;'),
  createData('Аналізатори рідин турбідиметричні та нефелометричні для здійснення контролю вод', '1) забезпечення захисту життя та охорони здоров’я громадян;3) контроль стану навколишнього природного середовища;'),
    createData('Аналізатори спектра та характеристик систем зв’язку', '10) роботи із забезпечення технічного захисту інформації згідно із законодавством;'),
    createData('Аудіометри чистого тону', 'контроль безпеки умов праці;'),
    createData('Блоки детектування іонізуючого випромінення', '1) забезпечення захисту життя та охорони здоров’я громадян;2) контроль якості та безпечності харчових продуктів і лікарських засобів;3) контроль стану навколишнього природного середовища;4) контроль безпеки умов праці;'),
    createData('Вимірювальні антени та приймачі, що використовуються органами державного нагляду (контролю) під час виконання робіт з технічного захисту інформації', '1) забезпечення захисту життя та охорони здоров’я громадян;4) контроль безпеки умов праці;10) роботи із забезпечення технічного захисту інформації згідно із законодавством;'),
];
const CREATE_MYDEVICE =gql `mutation($name_device: String!,$brand_device: String!,$series_device: String!,$type_device: String!,$certification_calibration:String,$certification_verification:String,$certification_conformity:String,$module_device: String,$certification_number:String, $department_center:String,$conformity_data:String, $next_conformity:String,$valid_verification:String,$notes:String,$calibration: String,$next_calibration: String){ createNewMyDevice(name_device:$name_device,brand_device:$brand_device,series_device:$series_device,type_device:$type_device,certification_calibration:$certification_calibration,certification_verification:$certification_verification,certification_conformity:$certification_conformity,module_device:$module_device,certification_number:$certification_number,department_center:$department_center,conformity_data:$conformity_data,next_conformity:$next_conformity,valid_verification:$valid_verification,notes:$notes,calibration:$calibration,next_calibration:$next_calibration){
    name_device
    brand_device
    series_device
    type_device
    certification_calibration
    certification_verification
    certification_conformity
    module_device
    certification_number
    department_center
    conformity_data
    next_conformity
    valid_verification
    notes
    calibration
    next_calibration
}}`;
function AddDevice ({t,props}) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const {  ...rest } = props;
    const [ value,setValue]=useState({none:false,certification_calibration:false,certification_verification:false,certification_conformity:false});


    const [ setStateNone]=useState("");
    const [brand_device, setStateBrand_device]=useState("");
    const [type_device, setStateType_device]=useState("");
    const [series_device, setStateSeries_device]=useState("");
    const [name_device, setStateName_device]=useState("");
const [valid_verification, setValid_verification]=useState("");
    const [certification_number, setCertification_number]=useState("");
    const [module_device, setStateModule_device]=useState("");
    const [notes, setStateNotes]=useState("");
    const [department_center, setDepartment_center]=useState("");
    const [calibration, setStateCalibration]=useState('');
    const [next_calibration, setStateNext_calibration]=useState('');
    const [conformity_data, setConformity_data]=useState('');
    const [valueVerification, setValueVerification]=useState('');
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const { none,certification_calibration,certification_verification,certification_conformity } = value;
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
    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeVerification = e => {
       setValueVerification(e.target.value)
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
                                    <Card{...rest} style={{marginRight:"auto", marginLeft:"auto", width:"50%"}} >
                                        <CardHeader subheader={t("fill the information")} title={t("Add Device")}/>
                                        <Divider />

                                        <Mutation mutation={CREATE_MYDEVICE}  variables={{name_device,conformity_data, series_device,brand_device,certification_number, type_device,module_device, valid_verification,calibration, next_calibration} } onError={(error) => enqueueSnackbar(error.message)} onCompleted={(data) => confirm(data)}>
                                            {( addmydevice,{loading, error, event}) => {

                                                if (loading) { return (<LinearDeterminate /> )}
                                                if (error) {return (error.message)}
                                                if (authToken){
                                                    return(

                                                        <FormControl autoComplete="off" noValidate style={{flexGrow: 1, display: 'flex', alignItems: 'center', width:"100%"}}>
                                                            <CardContent>
                                                                <Grid container spacing={3}>
                                                                    <Grid item md={6} xs={12}>

                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Name')}</label>
                                                                        <RedditTextField type="text" fullWidth value={name_device}  onChange={e => {
                                                                            setStateName_device(e.target.value);
                                                                        }}
                                                                                         required/>
                                                                    </Grid>
                                                                    <Grid item md={6} xs={12}>

                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Brand')}</label>
                                                                        <RedditTextField type="text" fullWidth value={brand_device}  onChange={e => {
                                                                            setStateBrand_device(e.target.value);
                                                                        }}
                                                                                         required/>
                                                                    </Grid>


                                                                    <Grid item md={6} xs={12}>
                                                                        <label  htmlFor="type" style={{color:"rgba(0,1,47,0.84)"}}>{t('Series number')}</label>
                                                                        <RedditTextField
                                                                            type="text"
                                                                            fullWidth
                                                                            value={series_device}
                                                                            onChange={e => {
                                                                                setStateSeries_device(e.target.value);
                                                                            }}  required
                                                                        />
                                                                    </Grid>
                                                                    <Grid item md={6} xs={12}>

                                                                        <label  htmlFor="brand" style={{color:"rgba(0,1,47,0.84)"}}>{t('Type')}</label>
                                                                        <RedditTextField type="text" fullWidth value={type_device}  onChange={e => {
                                                                            setStateType_device(e.target.value);
                                                                        }}
                                                                                         required/>
                                                                    </Grid>

                                                                     <FormGroup >
                                                                        <FormControlLabel control={<Checkbox checked={certification_conformity} size="small" onChange={handleChange('certification_conformity')} value="certification_conformity"/>}   label={<Typography variant={"overline"}>{t('conformity certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox checked={certification_verification} size="small" value="certification_verification"   onChange={handleChange('certification_verification')}/>}   label={<Typography variant={"overline"}>{t('verification certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox checked={certification_calibration} size="small" value="certification_calibration" onChange={handleChange('certification_calibration')}/>}  label={ <Typography variant={"overline"}>{t('calibration certificate')}</Typography>}/>
                                                                        <FormControlLabel control={<Checkbox value="none" size="small" checked={none} onChange={handleChangeNone('none')}/>}  label={<Typography variant={"overline"}>{t('none')}</Typography>}/>
                                                                    </FormGroup>

                                                                    {certification_conformity === true && (

                                                                        <Grid item xs={12}>
                                                                              <Divider />
                                                                         <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of conforminy assessment')}</Typography>
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField
                                                                                type="text"
                                                                                fullWidth
                                                                                value={certification_number}
                                                                                onChange={e => {
                                                                                    setCertification_number(e.target.value);
                                                                                }}
                                                                            />
                                                                            <label  htmlFor="module_device" style={{color:"rgba(0,1,47,0.84)"}}>{t('Module')}</label>
                                                                            <RedditTextField
                                                                                type="text"
                                                                                fullWidth
                                                                                value={module_device}
                                                                                onChange={e => {
                                                                                    setStateModule_device(e.target.value);
                                                                                }}
                                                                            />
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Department center')}</label>
                                                                            <RedditTextField
                                                                                type="text"
                                                                                fullWidth
                                                                                value={department_center}
                                                                                onChange={e => {
                                                                                    setDepartment_center(e.target.value);
                                                                                }}
                                                                            />
                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <TextField id="date"
                                                                                       label={t('Date')}
                                                                                       type="date"
                                                                                       style={{color:"rgba(0,1,47,0.84)", width:"120px"}}
                                                                                       defaultValue="12-06-2019"
                                                                                       value={conformity_data}
                                                                                       className={classes.textField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       onChange={handleDateCalibration}
                                                                            />
                                                                        </Grid>)}
                                                                    {certification_verification === true && (
                                                                        <Grid item xs={12}>
                                                                         <Divider />
                                                                         <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of verification')}</Typography>
                                                                           
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField
                                                                                type="text"
                                                                                fullWidth
                                                                                value={certification_number}
                                                                                onChange={e => {
                                                                                    setCertification_number(e.target.value);
                                                                                }}
                                                                            />

                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <TextField id="date"
                                                                                       label={t('Date')}
                                                                                       type="date"
                                                                                       style={{color:"rgba(0,1,47,0.84)", width:"120px"}}
                                                                                       defaultValue="12-06-2019"
                                                                                       value={valid_verification}
                                                                                       className={classes.textField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       onChange={handleDateCalibration}
                                                                            />
                                                                        </Grid>
                                                                    )}
                                                                    {certification_calibration === true && (
                                                                        <Grid item xs={12}>
                                                                         <Divider />
                                                                         <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Cetrificate of calibration')}</Typography>
                                                                           
                                                                            <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Certificate number')}</label>
                                                                            <RedditTextField
                                                                                type="text"
                                                                                fullWidth
                                                                                value={certification_number}
                                                                                onChange={e => {
                                                                                    setCertification_number(e.target.value);
                                                                                }}
                                                                            />
                                                                            <label  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Enspire Data')}</label>
                                                                            <Divider />
                                                                            <TextField id="date"
                                                                                       label={t('Date')}
                                                                                       type="date"
                                                                                       style={{color:"rgba(0,1,47,0.84)", width:"120px"}}
                                                                                       defaultValue="12-06-2019"
                                                                                       value={valid_verification}
                                                                                       className={classes.textField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       onChange={handleDateCalibration}
                                                                            />
                                                                        </Grid>

                                                                    )}
                                                                   {none === true && (
                                                                        <Grid item xs={12}>

                                                                            <Divider />
                                                                            <Typography  htmlFor="calibration" style={{color:"rgba(0,1,47,0.84)"}}>{t('Legal metrology?')} <IconButton  size="small" onClick={handleClickOpen('paper')}><HelpOutlineIcon fontSize="inherit"/></IconButton></Typography>
                                                                            <RadioGroup value={valueVerification} row onChange={handleChangeVerification}>
                                                                                <FormControlLabel control={<Radio />} label={<Typography variant={"overline"}>{t('Yes')}</Typography>} value="yes"/>
                                                                                <FormControlLabel control={<Radio/>} label={<Typography variant={"overline"}>{t('No')}</Typography>} value="no"/>
                                                                            </RadioGroup>
                                                                            {valueVerification === 'yes' && (
                                                                                <Grid container spacing={3}>
                                                                                    <Divider />

                                                                                    <Grid item md={6} xs={12}>

                                                                                        <label  htmlFor="type_device" style={{color:"rgba(0,1,47,0.84)"}}>{t('Type')}</label>
                                                                                        <RedditTextField
                                                                                            type="text"
                                                                                            fullWidth
                                                                                            value={type_device}
                                                                                            onChange={e => {
                                                                                                setStateType_device(e.target.value);
                                                                                            }}
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item md={6} xs={12}>
                                                                                        <label  htmlFor="notes" style={{color:"rgba(0,1,47,0.84)"}}>{t('Module')}</label>
                                                                                        <RedditTextField
                                                                                            type="text"
                                                                                            fullWidth
                                                                                            value={module_device}
                                                                                            onChange={e => {
                                                                                                setStateModule_device(e.target.value);
                                                                                            }}
                                                                                        />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            )}
                                                                        </Grid>
                                                                    )}
                                                                    <Grid item xs={12}>
                                                                        <Divider />
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
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                scroll={scroll}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                            >
                                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                                <DialogContent dividers={scroll === 'paper'}>
                                    <Typography>{t('Legal metrology of measuring instruments')} </Typography>
                                                 <TableContainer component={Paper}>
                                    <Table className={classes.table}>
                                        <TableHead  >
                                            <TableRow >
                                                <TableCell align="right">{t('Measuring Instruments')}</TableCell>
                                                <TableCell align="right">{t('Kind of activity')}</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                            <TableRow>
                                                <TableCell lign="center">{row.mi}</TableCell>
                                                <TableCell lign="center">{row.activities}</TableCell>

                                            </TableRow>))}
                                        </TableBody>
                                    </Table>
</TableContainer>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
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
