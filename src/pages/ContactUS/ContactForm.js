import React, {useState} from 'react';
import {FormControl, TextField, Button} from "@mui/material";
import {Mutation} from 'react-apollo';
import MenuTabPanel from "../../components/menu/MenuTabPanel";
import PropTypes from "prop-types";
import {CREATE_LETTER} from "../../constants";
import {LETTER_MUTATION} from "../../graphql/mutations/Mutations"
import {useSnackbar} from "notistack";
import {withTranslation} from "react-i18next";

const RedditTextField = (props) => {
    return <TextField InputProps={{disableUnderline: true}} {...props} />;
}

const ContactForm = ({t}) => {

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
                <div style={{marginRight: "auto", marginLeft: "auto"}}>
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
        </div>
    )

}
ContactForm.propTypes = {
    t: PropTypes.node.isRequired
};
export default withTranslation()(ContactForm);
