import React, {useState} from "react";
import {withTranslation} from "react-i18next";
import {
    Typography,
    Dialog,
    FormControl,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";
import {Mutation, Query} from 'react-apollo';
import CircularProgressLoading from "./circularProgressLoading/CircularProgressLoading";
import Auth from "../pages/Home/Auth/Auth";
import {useSnackbar} from "notistack";
import {LocalizationProvider} from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import {MUTATION_APPOINTMENTS} from '../graphql/mutations/Mutations';
import {QUERY_USER} from '../graphql/query/Query';

function Dashboard({t}) {

    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [start_date] = useState(new Date(''));
    const [end_date] = useState(new Date(''));
    const handleClose = () => {
        setOpen(false);
    };
    const confirm = async () => {
        setOpen(false);
    };
    return (
        <div>
                    <div style={{marginTop: 20, padding: 30}}>
                        <Query query={QUERY_USER} onError={(error) => enqueueSnackbar(error.message)}>
                            {({loading, error, data}) => {
                                if (loading) {
                                    return <CircularProgressLoading/>
                                }
                                if (error) {
                                    return error.message
                                }
                                if (Auth.isAuthenticated && data) {
                                    return (
                                        <div>
                                            <div><Typography align={"justify"}
                                                             style={{color: "rgba(0,1,14,0.74)"}}>{t('Welcome')} {data.me.name}</Typography>
                                            </div>
                                            <Dialog open={open} onClose={handleClose}
                                                    aria-labelledby="form-dialog-title">

                                                <Mutation mutation={MUTATION_APPOINTMENTS}
                                                          variables={{title, location, notes, start_date, end_date}}
                                                          onCompleted={(data) => confirm(data)}>
                                                    {(mutation, {loading}) => {
                                                        if (loading) {
                                                            return (<CircularProgressLoading/>)
                                                        }
                                                        if (Auth.isAuthenticated) {

                                                            return (
                                                                <LocalizationProvider dateAdapter={DateFnsUtils}>
                                                                    <FormControl>
                                                                        <DialogTitle
                                                                            id="form-dialog-title">{t('New Plan')}</DialogTitle>
                                                                        <DialogContent>

                                                                            <TextField
                                                                                autoFocus
                                                                                variant="outlined"
                                                                                id="name"
                                                                                size="small"
                                                                                placeholder={t('Title')}
                                                                                value={title}
                                                                                onChange={(event) => setTitle(event.target.value)}
                                                                                fullWidth
                                                                            /><br/>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                id="name"
                                                                                size="small"
                                                                                placeholder={t('Location')}
                                                                                value={location}
                                                                                onChange={(event) => setLocation(event.target.value)}
                                                                                fullWidth
                                                                            /><br/>
                                                                            <TextField
                                                                                multiline
                                                                                rows={3}
                                                                                id="name"
                                                                                size="small"
                                                                                placeholder={t('Notes')}
                                                                                variant="outlined"
                                                                                value={notes}
                                                                                onChange={(event) => setNotes(event.target.value)}
                                                                                fullWidth
                                                                            /><br/>
                                                                        </DialogContent>

                                                                        <DialogActions>
                                                                            <Button onClick={mutation} color="default"
                                                                                    variant="outlined">
                                                                                {t('Save')}
                                                                            </Button>
                                                                        </DialogActions>
                                                                    </FormControl></LocalizationProvider>)
                                                        }
                                                    }}
                                                </Mutation>
                                            </Dialog>

                                        </div>
                                    )
                                } else return null
                            }}
                        </Query>
                    </div>
        </div>
    )
}

Dashboard.propTypes = {
    t: PropTypes.node

};
export default withTranslation()(Dashboard)
