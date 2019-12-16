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
 <div style={{height: '100%', width:"100%"}} >
                <MuiThemeProvider>
                <Grid container style={{ height: '100%'}} >

                    <Grid item lg={5}>
                    <div style={{marginTop:"0px"}} >
                        <IconButton onClick={this.handleBack}>
                            <ArrowBackIcon style={{color:"white"}} />
                        </IconButton>
                    </div>
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        xs={12}
                    >
                    <FormControl style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <h3 style={{color:"#fff"}} >{t("Registration")}</h3><br/>

                            <label style={{color:"#fff"}} htmlFor="email">{t("Email")} </label>
                            <TextField
                                type="text"
                                fullWidth
                                                                           size="Small"
                                variant="outlined"
                                style={{backgroundColor:"#fff"}}
                                value={this.state.email}
                                onChange={e => {
                                    this.setState({ email: e.target.value })
                                }}
                                required
                            />
                            < label style={{color:"#fff"}} htmlFor="password">{t("Password")} </label>
                            <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                                                               size="Small"
                                style={{backgroundColor:"#fff"}}
                                value={this.state.password}
                                onChange={e => {
                                    this.setState({ password: e.target.value })
                                }} required
                            />
                            <label style={{color:"#fff"}} htmlFor="name">{t("Name")} </label>
                            <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                style={{backgroundColor:"#fff"}}
                                size="Small"
                                value={this.state.name}
                                onChange={e => {
                                    this.setState({ name: e.target.value })
                                }}
                            />
                            <label style={{color:"#fff"}} htmlFor="companyName">{t("Company Name")} </label>
                            <TextField
                                type="text"
                                value={this.state.companyName}
                                fullWidth
                                size="Small"
                                variant="outlined"
                                style={{backgroundColor:"#fff"}}
                                onChange={e => {
                                    this.setState({ companyName: e.target.value })
                                }}
                                required
                            /><br/>
                            <Mutation mutation={SIGNUP_MUTATION}  variables={{ email, password, name } } onCompleted={() => this._confirm()}>
                                {signup => (
                                    <RaisedButton onClick={signup}>{t("Submit")} </RaisedButton>)}
                            </Mutation>
                    </FormControl>

                    </Grid> </Grid></MuiThemeProvider>
            </div>
        );
    }

    _confirm = async data => {
        const {id, token} = this.state.signup;

        this._saveUserData(id, token);
        history.push(`/`)
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
