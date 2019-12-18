import React, {Component} from 'react';

import gql from "graphql-tag";
import {AUTH_TOKEN, GC_USER_ID} from "./constants";
import {Mutation} from 'react-apollo'
import history from './history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import {withTranslation} from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from "@material-ui/core/Grid";
import LinearDeterminate from "./components/LinearDeterminate";
import SignUpForm from "./SignUpForm";

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            signup:true,
            name:'',
            companyName:"",

        };

    }


    render(){
        const SIGNUP_MUTATION = gql `mutation ($email: String!, $password: String!, $name: String!,$companyName:String){signup(email:$email , password: $password,name:$name,companyName:$companyName  ){token}}`;
        const { email, password,name,companyName } = this.state;
        const userId = localStorage.getItem(GC_USER_ID);
        const { t } = this.props;
        return ( 
 <div style={{height: "100%"}} >
                <MuiThemeProvider>
                <Grid container style={{ height: '100%'}} >

                    <Grid item>
                    <div style={{marginTop:"0px"}} >
                        <IconButton onClick={this.handleBack}>
                            <ArrowBackIcon style={{color:"white"}} />
                        </IconButton>
                    </div>
                    </Grid>
                    <Grid  item lg={10} xs={12} >
            <SignUpForm />

                    </Grid> </Grid></MuiThemeProvider>
            </div>
        );
    }

    _confirm = async data => {
        const {id, token} = this.state.signup;

        this._saveUserData(id, token);
        history.push('/check-email')
    };

    _saveUserData = (id,token) => {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem(GC_USER_ID, id);
    }
    handleBack = () => {
    history.goBack();
};
}
export default withTranslation()(SignUp)
