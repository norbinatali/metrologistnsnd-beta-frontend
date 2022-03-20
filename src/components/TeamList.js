import React from "react";
import {withTranslation} from "react-i18next";
import {
    DialogActions,
    TextField,
    DialogContent,
    FormControl,
    DialogTitle,
    Dialog,
    MenuItem,
    Select,
    Box,
    AppBar,
    ListItem,
    Toolbar,
    Button,
    Grid,
    Typography,
    List,
    ListItemText,
} from "@mui/material";

import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import UserMenu from "./UserMenu";
import CircularProgressLoading from "./CircularProgressLoading";
import {AUTH_TOKEN, TEAM_ID} from "../constants";
import history from '../history.js'
import {Mutation} from "react-apollo";
import {useSnackbar} from 'notistack';

const authToken = localStorage.getItem(AUTH_TOKEN);


function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
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
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const MUTATION_CREATETEAM = gql`mutation($name:String! ){createNewTeam(name: $name){id name payment}}`;
const QUERY_TEAMLIST = gql`query {me{name teams{id name}}}`;

function TeamList({t}) {
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [button, setButton] = React.useState('team');
    const handleChangeButton = event => {
        setButton(event.target.value);
    };
    const [name, setName] = React.useState('');
    const confirm = async (data) => {
        saveData(data.createNewTeam.id);
        setOpen(false);
    };
    const saveData = (id) => {
        localStorage.setItem(TEAM_ID, id);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <UserMenu/>
            <div>
                <Query query={QUERY_TEAMLIST} pollInterval={100} fetchPolicy={"network-only"}
                       onError={(error) => enqueueSnackbar(error.message)}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <CircularProgressLoading/>
                        }
                        const teamlist = data.me.teams;
                        if (authToken) {
                            return (
                                <div><Grid container spacing={2} xs={12}><AppBar position={"relative"} color="default"
                                                                                 elevation={5}
                                                                                 style={{marginTop: "60px"}}>
                                    <Toolbar>
                                        <Select value={button} onChange={handleChangeButton}>
                                            <MenuItem value={'person'}><Button
                                                onClick={() => history.push('/mydevices')}>{t('Person')}</Button></MenuItem>
                                            <MenuItem value={'team'}><Button
                                                onClick={() => history.push('/team')}>{t('Team')}</Button></MenuItem>
                                        </Select>
                                        <Button style={{marginLeft: "auto "}} variant="outlined"
                                                onClick={handleClickOpen}> {t("Add Team")}</Button>
                                    </Toolbar>
                                </AppBar>
                                    <List>
                                        {teamlist.map(tea =>
                                            <ListItem button key={tea.id}
                                                      onClick={() => (localStorage.setItem(TEAM_ID, tea.id), history.push('/team/' + tea.id))}>
                                                <ListItemText style={{color: "#000"}}>{tea.name}</ListItemText>
                                            </ListItem>)}
                                    </List>
                                    <Typography style={{color: "#000"}}>{data.me.teams.name}</Typography>
                                </Grid>
                                </div>)
                        } else return null
                    }}
                </Query>
                <Mutation mutation={MUTATION_CREATETEAM} onError={(error) => enqueueSnackbar(error.message)}
                          variables={{name}} onCompleted={(data) => confirm(data)}>
                    {(createteam, {loading, error, event}) => {
                        if (loading) {
                            return (<CircularProgressLoading/>)
                        }
                        if (authToken) {
                            return (
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Create new team"}</DialogTitle>
                                    <DialogContent>
                                        <FormControl>
                                            <Typography>{t('Team Name')}</Typography>
                                            <TextField value={name} onChange={(e) => setName(e.target.value)}/>

                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            {t('Close')}
                                        </Button>
                                        <Button onClick={createteam}>{t('Submit')}</Button>
                                    </DialogActions>
                                </Dialog>)
                        }
                    }}
                </Mutation>
            </div>
        </div>)
}

TeamList.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(TeamList)
