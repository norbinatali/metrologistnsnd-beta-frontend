import React, { Component } from 'react';
import Navbar, { ElementsWrapper } from '../menu/navbar';
import SignUp from '../SignUp';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import{Mutation} from 'react-apollo';
import { AUTH_TOKEN , GC_USER_ID} from '../constants';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import '../style/login.css';
import ContactUS from "./ContactUS";
import Link from "@material-ui/core/Link";
import ForgetPassword from "./ForgetPassword";





export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            signup: true,
            login: true,
            id: "",
            email: '',
            password: '',
            email_signup: '',
            password_signup: '',
            name_signup: "",
            classes: true,

        };

    }
    openPopupbox() {
        const content = (
            <div className='popup'>
                <div className='popup-inner'>
            <SignUp />
            <div>
                <a className="popup-close" onClick={PopupboxManager.close}>X</a></div>
           </div>
            </div>
        );
        PopupboxManager.open({ content,
            config: {

            fadeIn: true,
                fadeInSpeed: 500
        }});

    }
    render() {
        const navbarItems = [{
            label: "Welcome",
            target: "item-1"
        }, {
            label: "Products",
            target: "item-2"
        }, {
            label: "About",
            target: "item-3"
        }, {
            label: "Contacts",
            target: "item-4"
        }, {
            label: "Login",
            target: "item-5"
        }, {
            label: "Customers",
            target: "item-6"
        }, ];
        const containerStyle = {
            width: "100%",
            margin: "100px 0px 100px"
        };
        const useStyles = makeStyles(theme => ({
            root: {
                height: '100vh',
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            paper: {
                margin: theme.spacing(8, 4),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));
        const HELLO_QUERY = gql `mutation ($email:String!, $password:String!) { login(email:$email , password: $password){token,user{id, posts{id, title}}}}`;

        const { email, password,id } = this.state;
        return (
            <div>
                <Navbar items={navbarItems} offset={-80} duration={500} delay={0}></Navbar>
                <div style={containerStyle}>
                    <ElementsWrapper items={navbarItems} >
                        <div name="item-1" style={{ width: 100, height: 800}} >1</div>
                        <div name="item-2" style={{ width: 100, height: 800}} >item 2</div>
                        <div name="item-3" style={{ width: 100, height: 800}} >item 3</div>
                        <div name="item-4" style={{ width: 800, height: 800}}>
                            <div align={"center"} style={{backgroundColor:"white", marginTop:"50px", width:"50%", marginLeft:"30%"}}> <h3>Contact us</h3> <br/><ContactUS/></div></div>
                        <div name="item-5" style={{ width: 800, height: 800}} >
                            <MuiThemeProvider>

                                <Grid container spacing={6} style={{marginTop:"20%",padding:"40"}}>
                                    <Grid item xs={4} sm={5} style={{backgroundColor:'white'}}>
                                    <FormControl >
                <h3>Login in</h3> <br/>

                <label  htmlFor="email">Email </label>
                <TextField
                    type="text"
                    value={this.state.email}
                    onChange={e => {
                        this.setState({ email: e.target.value })
                    }}
                />
                < label htmlFor="password">Password </label>
                <TextField type="text" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}}/><br/>

    <Link to="/reset" component="button"  >Forget password?</Link>
                <Mutation mutation={HELLO_QUERY}  variables={{ email, password,id } } onCompleted={() => this._confirm()}>
                    {mutation => (
                        <RaisedButton onClick={mutation}>Submit</RaisedButton>)}
                </Mutation><br/>

                                    </FormControl></Grid>
                                    <Grid item xs={4} sm={1} style={{backgroundColor:'transparent'}}><h5 style={{color:"white"}}>Or</h5>
                                    </Grid>
                                    <Grid item xs={4} sm={5} style={{backgroundColor:'white'}}>
                <FormControl >
                    <SignUp />
                </FormControl>

                                    </Grid>
                                </Grid>




                </MuiThemeProvider>

                        </div>
                            <div name="item-6" style={{ width: 100, height: 800}}>item 6</div>


                    </ElementsWrapper></div>


                </div>



        )
    }
    _confirm = async data => {
        const { token } = this.state.login;
     if (this.state.login){
        this._saveUserData(token);
        this.props.history.push('/user')}
     else { this.props.history.push('/');}
    };

    _saveUserData =(id, token) => {
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

