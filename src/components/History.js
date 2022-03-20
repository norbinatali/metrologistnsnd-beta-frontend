import React from 'react';

import {
    Grid,
    Typography,
    CardContent,
    Card,
    Paper,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton
} from "@mui/material";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import UserMenu from "./UserMenu";
import history from '../history'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function History({t, props}) {
    const {...rest} = props;
    return (
        <div>
            <UserMenu/>
            <main style={{flexGrow: 1, height: '100%', overflow: 'auto', width: '100%'}}>
                <div style={{marginTop: 40}}>
                    <div style={{marginTop: 20, padding: 30}}>
                        <div style={{display: 'flex'}}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={3}>
                                        <Card {...rest} >
                                            <CardHeader><Typography gutterBottom variant="h5"
                                                                    component="h2">{t('About')}</Typography></CardHeader>
                                            <Divider/>
                                            <CardContent>
                                                <List>
                                                    <ListItem button
                                                              onClick={() => history.push('/what-is-metrologist')}>
                                                        <ListItemText primary={""}
                                                                      secondary={t('What is Metrologist')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button onClick={() => history.push('/what-is-metrology')}>
                                                        <ListItemText primary={""} secondary={t('What is Metrology?')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/history-metrology')}>
                                                        <ListItemText primary={""} secondary={t('History')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                            <Divider/>
                                        </Card>
                                    </Paper>

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={3}>
                                        <Card {...rest}>
                                            <CardHeader><Typography gutterBottom variant="h5"
                                                                    component="h2">{t('Conformity assessment')}</Typography></CardHeader>
                                            <Divider/>
                                            <CardContent>
                                                <List>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/what-is-conformity-assessment')}>
                                                        <ListItemText primary={""}
                                                                      secondary={t('What is conformity assessment')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button disabled onClick={() => history.push('/modules')}>
                                                        <ListItemText primary={""} secondary={t('Modules')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/technical-reglaments')}>
                                                        <ListItemText primary={""}
                                                                      secondary={t('Technical Reglaments')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/procedure-conformity-assessment')}>
                                                        <ListItemText primary={""} secondary={t('Procesure')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                            <Divider/>
                                        </Card>
                                    </Paper>

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={3}>
                                        <Card {...rest}>
                                            <CardHeader><Typography gutterBottom variant="h5"
                                                                    component="h2">{t('Quality Management')}</Typography></CardHeader>
                                            <Divider/>
                                            <CardContent >
                                                <List>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/what-is-quality-system')}>
                                                        <ListItemText primary={""}
                                                                      secondary={t('What is quality system?')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem button disabled
                                                              onClick={() => history.push('/documents-of-quality-system')}>
                                                        <ListItemText primary={""}
                                                                      secondary={t('Documents of quality system')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                    <ListItem disabled button
                                                              onClick={() => history.push('/standards-information')}>
                                                        <ListItemText primary={""} secondary={t('Standards')}/>
                                                        <IconButton edge="end" size="small">
                                                            <ArrowForwardIosIcon/>
                                                        </IconButton>
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                            <Divider/>
                                        </Card>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

History.propTypes = {
    className: PropTypes.string,
    props: PropTypes.node,
    t: PropTypes.object.isRequired
};
export default withTranslation()(History)
