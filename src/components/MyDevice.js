import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { withTranslation} from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import i18n from "../menu/translations/i18n";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import IconButton from "@material-ui/core/IconButton";
import history from '../history';
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import DeleteIcon from "@material-ui/icons/Delete"
import MyDeviceForm from "./MyDeviceForm";


const authToken = localStorage.getItem(AUTH_TOKEN);

const useStyles = makeStyles(theme => ({
    root: {
        marginTop:"23px",
        width: "100%",
          marginRight:"auto",
        marginLeft:"auto",
           },
    table: {
             color:"rgba(0,1,47,0.84)"
    },
   
    container: {
        width:"100%",
    height: "100%",
  },
}));




function MyDevice({t}){
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
   
    return (
        <div className={classes.container}>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%',width:"100%", overflow: 'auto'}}>

        <div  className={classes.root}>
            
              
             
           <MyDeviceForm/>
                       
                
            
        </div>
            </main>
        </div>

    );

}
export default withTranslation()(MyDevice)
