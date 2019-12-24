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
import UserMenu from "./UserMenu";

const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`

const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'transparent',
        color:"#fff",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&$focused': {
            backgroundColor: 'transparent',
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

function ContactUS({t}) {
    const { enqueueSnackbar } = useSnackbar();
    const [sendMail,classes]= useState(true);
     const [from, setFrom] =useState("");
     const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
const [formState, setFormState] = useState({
        isValid: false,
        values: {from},
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
    const confirm = async data => {

        const { token } = sendMail;
        saveLetterData(token);
        enqueueSnackbar('Thank you for your request. Дякую за Ваше звернення')
    };

    const saveLetterData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
     const hasError = field =>
        !!(formState.touched[field] && formState.errors[field]);
    return (
        <div  >
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
            <FormControl  >
                <MuiThemeProvider>
                    <label style={{color:"#fff"}} htmlFor="from">{t("Email")} </label>
                    <RedditTextField variant="outlined"  type="text"
                            name={"from"}
                        value={formState.values.from || ''} 
                            placeholder={"example@example.com"}
                           error={hasError('from')}
                            helperText={hasError('from')? formState.errors.from[0] : null}
                               style={{backgroundColor:"#fff"}} onChange={e => {setFrom( e.target.value )
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
                                }));} } required/>
                    < label style={{color:"#fff"}} htmlFor="subject">{t("Subject")} </label>
                    <RedditTextField variant="outlined"
                               style={{backgroundColor:"#fff"}} type="text" value={subject} onChange={e => setSubject(e.target.value )} required
                    />
                    <label style={{color:"#fff"}} htmlFor="text">{t("Text")} </label>
                    <RedditTextField variant="outlined"
                               style={{backgroundColor:"#fff"}} id="outlined-multiline-static" multiline  rows="5" type="text"  margin="normal" variant="outlined" value={text}  onChange={e => setText( e.target.value )}
                    /><br/>
                    <Mutation mutation={LETTER_MUTATION}  variables={{ from,subject, text } }  onCompleted={() => confirm()  }>
                        {send => (
                            <RaisedButton disabled={!formState.isValid} style={{marginBottom:"10%"}} onClick={send}>{t("Send")} </RaisedButton>)}
                    </Mutation>


                </MuiThemeProvider>
            </FormControl>
                                                                                       </main>
        </div>
    )



}
export default withTranslation()(ContactUS)
