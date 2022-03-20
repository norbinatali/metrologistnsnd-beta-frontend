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
    List,
    Typography,
    ListItemText,
} from "@mui/material";
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import UserMenu from "./UserMenu";
import CircularProgressLoading from "./CircularProgressLoading";
import {
    AUTH_TOKEN,
    TEAM_MEMBER
} from "../constants";
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

const MUTATION_ADDMEMBER = gql`mutation($emailMember:String!, $id:ID! ){createTeamMembers(emailMember: $emailMember, id:$id){id emailMember member memberConfirmToken}}`;
const QUERY_TEAMMEMBERS = gql`query($id:ID!) {teamList(id:$id){name teamMembers{emailMembers memberConfirmToken member memberConfirmed} author{name}} }`;

function TeamInfo({t}) {
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [button, setButton] = React.useState('team');
    const handleChangeButton = event => {
        setButton(event.target.value);
    };
    const [emailMembers, setEmailMembers] = React.useState('');
    const confirm = async () => {
        setOpen(false);
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
                <Query query={QUERY_TEAMMEMBERS} pollInterval={100} variables={{id: localStorage.getItem('team-id')}}
                       fetchPolicy={"network-only"} onError={(error) => enqueueSnackbar(error.message)}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <CircularProgressLoading/>
                        }
                        const teamMembersList = data.teamList.teamMembers;
                        if (authToken) {
                            return (
                                <Grid container spacing={2} xs={12}>
                                    <AppBar position={"relative"} color="default" elevation={5}
                                            style={{marginTop: "50px"}}>
                                        <Toolbar className={classes.toolbar}>
                                            <Select value={button} onChange={handleChangeButton}>
                                                <MenuItem value={'person'}
                                                          onClick={() => history.push('/mydevices')}>{t('Person')}</MenuItem>
                                                <MenuItem value={'team'}
                                                          onClick={() => history.push('/team')}>{t('Team')}</MenuItem>
                                            </Select>
                                            <Button style={{marginLeft: "auto "}} variant="outlined"
                                                    onClick={handleClickOpen}> {t("Add a New Team Member")}</Button>
                                        </Toolbar>
                                    </AppBar>
                                    <List>
                                        {teamMembersList.map(tea =>
                                            <ListItem button key={tea.id}
                                                      onClick={() => (localStorage.setItem(TEAM_MEMBER, tea.emailMembers), history.push('/mydevices/team/team-info'))}>
                                                <ListItemText style={{color: "#000"}}>{tea.emailMembers}</ListItemText>
                                                {tea.memberConfirmed === true && <ListItemText
                                                    style={{color: "#003a9f"}}>{t('Confirmed')}</ListItemText>}
                                                {tea.memberConfirmed === false && <ListItemText
                                                    style={{color: "#9f0018"}}>{t('Waiting...')}</ListItemText>}
                                            </ListItem>)}
                                    </List>
                                </Grid>
                            )
                        } else return null
                    }}
                </Query>
                <Mutation mutation={MUTATION_ADDMEMBER} onError={(error) => enqueueSnackbar(error.message)}
                          variables={{emailMembers, id: localStorage.getItem('team-id')}}
                          onCompleted={(data) => confirm(data)}>
                    {(createteamMember, {loading, error, event}) => {
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
                                    <DialogTitle id="alert-dialog-title">{"Add a new team member"}</DialogTitle>
                                    <DialogContent>
                                        <FormControl>
                                            <Typography>{t('Member Email')}</Typography>
                                            <TextField value={emailMembers}
                                                       onChange={(e) => setEmailMembers(e.target.value)}/>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            {t('Close')}
                                        </Button>
                                        <Button onClick={createteamMember}>{t('Submit')}</Button>
                                    </DialogActions>
                                </Dialog>)
                        }
                    }}
                </Mutation>
            </div>
        </div>)
}

TeamInfo.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(TeamInfo)
