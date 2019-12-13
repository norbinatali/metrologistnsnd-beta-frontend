import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import gql from "graphql-tag";
import FormControl from "@material-ui/core/FormControl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import RaisedButton from "material-ui/RaisedButton";
import {AUTH_TOKEN} from "../constants";
import {Mutation} from 'react-apollo'
import {
    Grid
} from '@material-ui/core';

class ContactUS extends Component {
    constructor(props) {
        super(props);

        this.state = {
           sendMail:true,
            from:"",
            subject:"",
            text:"",
            classes: true,

        };

    }
render() {
const {t}= this.props;
   const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`
    const { from, subject,text } = this.state;
    return (
        <div >
           <Grid container spacing={6} style={{ marginLeft: "auto", marginRight:"auto", width:"80%" }} >
                  <Grid item xs={6} style={{marginLeft: "auto", marginRight:"auto"}}>
            <FormControl >
                <MuiThemeProvider>
         <Grid container spacing={5} >
                                    <Grid item xs={12} md={4} >
                                        <Typography style={{color:"#fff"}}>  <h4 >{t('If you have any questions or recommendations, please fill the form. ')}</h4></Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                    <label style={{color:"#fff"}} htmlFor="from">From </label>
                    <TextField  fullWidth
                    variant="outlined"
                    style={{backgroundColor:"#fff"}} type="text" value={this.state.form} onChange={e => {this.setState({ form: e.target.value })}} required/>
                    < label style={{color:"#fff"}} htmlFor="subject">Subject </label>
                    <TextField  fullWidth
                    variant="outlined"
                    style={{backgroundColor:"#fff"}} type="text" value={this.state.subject} onChange={e => {this.setState({ subject: e.target.value })}} required
                    />
                    <label style={{color:"#fff"}} htmlFor="text">Text </label>
                    <TextField  fullWidth
                    variant="outlined"
                    style={{backgroundColor:"#fff"}} id="outlined-multiline-static" multiline  rows="5" type="text"  margin="normal" variant="outlined" value={this.state.text}  onChange={e => {this.setState({ text: e.target.value })}}
                    /><br/>
                    <Mutation mutation={LETTER_MUTATION}  variables={{ from,subject, text } } onCompleted={() => this._confirm()}>
                        {send => (
                            <RaisedButton style={{marginBottom:"10%"}} onClick={send}>Send </RaisedButton>)}
                    </Mutation>
 </Grid>
                                </Grid>

                </MuiThemeProvider>
            </FormControl>

</Grid></Grid>
        </div>
    )

}
    _confirm = async data => {
        const { token } = this.state.sendMail;

        this._saveLetterData(token);

    };

    _saveLetterData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}
export default withTranslation()(ContactUS)
