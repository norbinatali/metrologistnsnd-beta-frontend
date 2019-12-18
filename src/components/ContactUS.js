import React, {Component, useState} from 'react';
import {withTranslation} from "react-i18next";
import gql from "graphql-tag";
import FormControl from "@material-ui/core/FormControl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import RaisedButton from "material-ui/RaisedButton";
import {AUTH_TOKEN} from "../constants";
import {Mutation} from 'react-apollo'
import { useSnackbar } from 'notistack';


const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`

function ContactUS({t}) {
    const { enqueueSnackbar } = useSnackbar();
    const [sendMail,classes]= useState(true);
     const [from, setFrom] =useState("");
     const [subject, setSubject] = useState("");
    const [text, setText] = useState("");

    const confirm = async data => {

        const { token } = sendMail;
        saveLetterData(token);
        enqueueSnackbar('Thank you for your request. Дякую за Ваше звернення')
    };

    const saveLetterData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
    return (
        <div  >
            <FormControl  >
                <MuiThemeProvider>
                    <label style={{color:"#fff"}} htmlFor="from">{t("Email")} </label>
                    <TextField variant="outlined"
                               style={{backgroundColor:"#fff"}} placeholder="example@example.com" type="text" value={from} onChange={e => setFrom( e.target.value )} required/>
                    < label style={{color:"#fff"}} htmlFor="subject">{t("Subject")} </label>
                    <TextField variant="outlined"
                               style={{backgroundColor:"#fff"}} type="text" value={subject} onChange={e => setSubject(e.target.value )} required
                    />
                    <label style={{color:"#fff"}} htmlFor="text">{t("Text")} </label>
                    <TextField variant="outlined"
                               style={{backgroundColor:"#fff"}} id="outlined-multiline-static" multiline  rows="5" type="text"  margin="normal" variant="outlined" value={text}  onChange={e => setText( e.target.value )}
                    /><br/>
                    <Mutation mutation={LETTER_MUTATION}  variables={{ from,subject, text } }  onCompleted={() => confirm()  }>
                        {send => (
                            <RaisedButton style={{marginBottom:"10%"}} onClick={send}>{t("Send")} </RaisedButton>)}
                    </Mutation>


                </MuiThemeProvider>
            </FormControl>
        </div>
    )



}
export default withTranslation()(ContactUS)
