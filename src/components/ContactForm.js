import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import{Mutation} from 'react-apollo';
import RaisedButton from "material-ui/RaisedButton";
import MenuTabPanel from "./MenuTabPanel";
import {fade, makeStyles, useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import {CREATE_LETTER} from "../constants";
import {useSnackbar} from "notistack";
import {withTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        color:"#fff"
    },
}));


const classes = makeStyles(theme => ({
    root: {
        marginTop:theme.spacing(1),
        width: "90%",
        height:"600px",
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529);",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div >
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
                className={classes.root}
            >
                {value === index && <Box p={3} >{children}</Box>}
            </Typography>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'transparent',
        color:"rgba(0,1,47,0.84)",
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
const LETTER_MUTATION = gql`mutation ($from: String!, $text: String!, $subject: String!){createNewLetter(text:$text , subject: $subject,from:$from){text,subject,from}}`

function ContactForm({t}) {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [from, setFrom] =useState("");
    const [formState, setFormState] = useState({
        isValid: false,
        values: {from},
        touched: {},
        errors: {}
    });
    const confirm = async (token, e) => {

        saveLetterData(token);
        enqueueSnackbar('Thank you for your request. Дякую за Ваше звернення')
    };
    const saveLetterData = token => {
        localStorage.setItem(CREATE_LETTER, token)
    }
    return(
        <div>
            <MenuTabPanel/>
        <TabPanel value={2} index={2} dir={theme.direction} className={classes.panel}>
            <div style={{marginRight:"auto", marginLeft:"auto", marginTop:"55px"}}>
                <FormControl  >
                    <MuiThemeProvider>
                        <label style={{color:"rgba(0,1,47,0.84)", marginTop:"80px"}} htmlFor="from">{t("Email")} </label>
                        <RedditTextField variant="outlined"  type="text"
                                         name={"from"}
                                         value={from}
                                         placeholder={"example@example.com"}
                                         onChange={e => setFrom( e.target.value )   } required/>
                        < label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="subject">{t("Subject")} </label>
                        <RedditTextField variant="outlined"
                                         type="text" value={subject} onChange={e => setSubject(e.target.value )} required
                        />
                        <label style={{color:"rgba(0,1,47,0.84)"}} htmlFor="text">{t("Text")} </label>
                        <RedditTextField variant="outlined"
                                         id="outlined-multiline-static" multiline  rows="5" type="text"  margin="normal" variant="outlined" value={text}  onChange={e => setText( e.target.value )}
                        /><br/>
                        <Mutation mutation={LETTER_MUTATION}  variables={{ from,subject, text } }  onCompleted={() => confirm()  }>
                            {send => (
                                <Button style={{marginBottom:"10%",color:"rgba(0,1,47,0.84)"}} onClick={send}>{t("Send")} </Button>)}
                        </Mutation>


                    </MuiThemeProvider>
                </FormControl>

            </div>
        </TabPanel>
        </div>
    )

}
        export default withTranslation()(ContactForm);
