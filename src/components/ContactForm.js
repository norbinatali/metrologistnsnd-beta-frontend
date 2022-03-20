import React, {useState} from 'react';
import {FormControl, Typography, TextField, Box, Button} from "@mui/material";
import {Mutation} from 'react-apollo';
import MenuTabPanel from "./MenuTabPanel";
import {useTheme} from "@mui/styles";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import {CREATE_LETTER} from "../constants";
import {useSnackbar} from "notistack";
import {withTranslation} from "react-i18next";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div>
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function RedditTextField(props) {
    return <TextField InputProps={{disableUnderline: true}} {...props} />;
}

const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`

function ContactForm({t}) {
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [from, setFrom] = useState("");
    const confirm = async (token) => {

        saveLetterData(token);
        enqueueSnackbar('Thank you for your request. Дякую за Ваше звернення')
    };
    const saveLetterData = token => {
        localStorage.setItem(CREATE_LETTER, token)
    }
    return (
        <div>
            <MenuTabPanel/>
            <TabPanel value={2} index={2} dir={theme.direction}>
                <div style={{marginRight: "auto", marginLeft: "auto", marginTop: "55px"}}>
                    <FormControl>
                        <label style={{color: "rgba(0,1,47,0.84)", marginTop: "80px"}}
                               htmlFor="from">{t("Email")} </label>
                        <RedditTextField variant="outlined" type="text"
                                         name={"from"}
                                         value={from}
                                         placeholder={"example@example.com"}
                                         onChange={e => setFrom(e.target.value)} required/>
                        < label style={{color: "rgba(0,1,47,0.84)"}} htmlFor="subject">{t("Subject")} </label>
                        <RedditTextField variant="outlined"
                                         type="text" value={subject} onChange={e => setSubject(e.target.value)} required
                        />
                        <label style={{color: "rgba(0,1,47,0.84)"}} htmlFor="text">{t("Text")} </label>
                        <RedditTextField
                                         id="outlined-multiline-static" multiline rows="5" type="text" margin="normal"
                                         variant="outlined" value={text} onChange={e => setText(e.target.value)}
                        /><br/>
                        <Mutation mutation={LETTER_MUTATION} variables={{from, subject, text}}
                                  onCompleted={() => confirm()}>
                            {send => (
                                <Button style={{marginBottom: "10%", color: "rgba(0,1,47,0.84)"}}
                                        onClick={send}>{t("Send")} </Button>)}
                        </Mutation>
                    </FormControl>

                </div>
            </TabPanel>
        </div>
    )

}
ContactForm.propTypes = {
    t: PropTypes.node.isRequired
};
export default withTranslation()(ContactForm);
