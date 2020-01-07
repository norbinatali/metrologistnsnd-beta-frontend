import React, { Component } from 'react';
import MenuUser from "../menu/MenuUser";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
import Check from '@material-ui/icons/Check';
import PropTypes from "prop-types";
import GeneralInfo from "./GeneralInfo";
import ModulesInfo from "./ModulesInfo";
import {withTranslation} from "react-i18next";
import AssessmentTheory from "./AssessmentTheory";
import UserMenu from "./UserMenu";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import history from '../history'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        color:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)"
    },
    boxFlex:"column"

}));
 function History({t,props}) {

    const classes = useStyles();

     const {  ...rest } = props;

    return(
        <div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto',width:'100%'}}>
                    <div style={{ marginTop: 40 }}>
                        <div style={{ marginTop: 20, padding:30}}>
                        <div style={{display:'flex'}}>
                <Grid container spacing={2} >
          
                    <Grid item xs={12} md={4} >
                   <Paper elevation={3}>
                       <Card {...rest} className={clsx(classes.root)} >
                           <CardHeader><Typography gutterBottom variant="h5" component="h2">{t('About')}</Typography></CardHeader>
                           <Divider />
                           <CardContent className={classes.content}>
                               <List>
                                <ListItem button onClick={()=> history.push('/what-is-metrologist')}>
                                       <ListItemText  primary={""} secondary={'What is "Metrologist"'}   />
                                       <IconButton  edge="end"  size="small"  >
                                           <ArrowRightIcon />
                                       </IconButton>
                                   </ListItem>
                                       <ListItem button onClick={()=> history.push('/what-is-metrology')}>
                                           <ListItemText  primary={""} secondary={"What is Metrology?"}   />
                                           <IconButton  edge="end" size="small"   >
                                               <ArrowRightIcon />
                                           </IconButton>
                                       </ListItem>
                                   <ListItem button onClick={()=> history.push('/history-metrology')}>
                                       <ListItemText  primary={""} secondary={"History"}   />
                                       <IconButton  edge="end" size="small"   >
                                           <ArrowRightIcon />
                                       </IconButton>
                                   </ListItem>
                                  
                               </List>
                           </CardContent>
                           <Divider />
                       </Card>
                   </Paper>

                </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <Card {...rest} className={clsx(classes.root)}>
                                <CardHeader><Typography gutterBottom variant="h5" component="h2">{t('Conformity assessment')}</Typography></CardHeader>
                                <Divider />
                                <CardContent className={classes.content}>
                                    <List>
                                        <ListItem button onClick={()=> history.push('/what-is-conformity-assessment')}>
                                            <ListItemText  primary={""} secondary={"What is conformity assessment"}   />
                                            <IconButton  edge="end" size="small" >
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </ListItem>
                                        <ListItem button onClick={()=> history.push('/modules')}>
                                            <ListItemText  primary={""} secondary={"Modules"}   />
                                            <IconButton  edge="end" size="small"   >
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </ListItem>
                                        <ListItem button onClick={()=> history.push('/technical-reglaments')} >
                                            <ListItemText  primary={""} secondary={"Technical Reglaments"} />
                                            <IconButton  edge="end" size="small" >
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </ListItem>
                                         <ListItem button onClick={()=> history.push('/procedure-conformity-assessment')}>
                                        <ListItemText  primary={""} secondary={"Procesure"} />
                                        <IconButton  edge="end" size="small"  >
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </ListItem>
                                    </List>
                                </CardContent>
                                <Divider />
                            </Card>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Paper elevation={3}>
                        <Card {...rest} className={clsx(classes.root)}>
                            <CardHeader><Typography gutterBottom variant="h5" component="h2">{t('Quality Management')}</Typography></CardHeader>
                            <Divider />
                            <CardContent className={classes.content}>
                                <List>
                                    <ListItem button onClick={()=> history.push('/what-is-quality-system')}>
                                        <ListItemText  primary={""} secondary={"What is quality system?"}   />
                                        <IconButton  edge="end" size="small"  >
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </ListItem>
                                    <ListItem button onClick={()=> history.push('/documents-of-quality-system')}>
                                        <ListItemText  primary={""} secondary={"Documents of quality system"}   />
                                        <IconButton  edge="end" size="small"  >
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </ListItem>
                                    <ListItem onClick={()=> history.push('/standards-information')}>
                                        <ListItemText  primary={""} secondary={"Standards"}   />
                                        <IconButton  edge="end" size="small"  >
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </ListItem>
                                </List>
                            </CardContent>
                            <Divider />
                        </Card>
                    </Paper>
                </Grid> 
                </Grid>
       </div>
                        </div>
                    </div>
                </main>
</div>
    )}
History.propTypes = {
    className: PropTypes.string
};
export default withTranslation()(History)
