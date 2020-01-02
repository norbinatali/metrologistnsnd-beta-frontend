import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { withTranslation} from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import CardContent from "@material-ui/core/CardContent";
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import history from '../history';
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from "@material-ui/icons/Delete"
import MyDeviceForm from "./MyDeviceForm";


const authToken = localStorage.getItem(AUTH_TOKEN);
const drawerWidth = 240;

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
          marginRight:"auto",
        marginLeft:"auto",
           },
    table: {
             color:"#fff"
    },
   
    container: {
        maxWidth:"100%",
    maxHeight: "70%",
  },
}));


const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, verification_device calibration next_calibration} }}`;


function MyDevice({t}){
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
    React.useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;}
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });}
        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, [1]);
    const handleBack = () => {
    history.goBack();
};
    return (
        <div>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>

        <div  className={classes.root}>
            <Grid container spacing={1}>
              
             <Grid item lg={4} md={6} xl={3}  xs={12}  >
           <MyDeviceForm/>
                       
                </Grid>
            </Grid>
        </div>
            </main>
        </div>

    );

}
export default withTranslation()(MyDevice)
