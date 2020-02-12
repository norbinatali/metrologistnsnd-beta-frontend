import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import UserMenu from "./UserMenu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {Query} from 'react-apollo';
import LinearDeterminate from "./LinearDeterminate";
import gql from 'graphql-tag';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Hidden from "@material-ui/core/Hidden";
import ListAltIcon from '@material-ui/icons/ListAlt';
const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        marginLeft: "5%",
        marginRight:"20%"
    },
 container: {
        width:"100%",
    height: "100%",
  },
}));
const POSTS_QUERY=gql`query {feed{title,content,author{name}}}`;
function ForumPage ({t},props){
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = (event) => {
        setMobileOpen(!mobileOpen);
        setAnchorEl(event.currentTarget);
    };
    const classes = useStyles();
    const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
    return(
        <div className={classes.container}>
            <UserMenu/>
            <main style={{ flexGrow: 1, height: '100%',width:"100%", overflow: 'auto'}}>
        <Query query={POSTS_QUERY} fetchPolicy={"network-only"} pollInterval={50} onError={(error) => enqueueSnackbar(error.message)} >
    {( {loading, error, data} ) =>  {
        if (loading) {return <LinearDeterminate />}
        if (error) { return error.message }
        const postslist = data.feed;
        return(
        <Grid container xs={12}>
               <AppBar position={"relative"}  color="default" elevation={5} >
                   <Toolbar>
                       <Typography style={{marginRight:"auto", marginLeft:"auto"}}>{t('Forum')}</Typography>
                       <Hidden smDown implementation="css">
                           <div style={{marginLeft:"auto"}}>
                           <Button variant={"outlined"} ><Typography variant={"body2"}>{t('Create topic')}</Typography></Button>
                           <Button variant={"outlined"} ><Typography variant={"body2"}>{t('My posts')}</Typography></Button>
                           </div>
                           </Hidden>
                       <Hidden mdUp>
<div>
                               <Tooltip title={t('Create topic')} aria-label="create topic">
                                   <IconButton>
                                   <AddCircleOutlineIcon />
                                   </IconButton>
                               </Tooltip>
                               <Tooltip title={t('My posts')} aria-label="my posts">
                                   <IconButton>
                              <ListAltIcon/>
                                   </IconButton>
                           </Tooltip>
</div>
                       </Hidden>


                   </Toolbar>
               </AppBar>

        <Grid container xs={12} >
    <Grid item  style={{marginRight:"auto", marginLeft:"auto"}}>
        <TableContainer component={Paper} >
            <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Topic</TableCell>
                        <TableCell align="right">Posts</TableCell>

                    </TableRow>
                </TableHead>
                {postslist.map(posts=>(
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" button>{posts.title}</TableCell>
                        <TableCell align="right"></TableCell>

                    </TableRow>

                </TableBody>))}
            </Table>
        </TableContainer>
    </Grid>

</Grid>
</Grid>
                )}}
</Query>
            </main>

        </div>


    )




}
export default withTranslation()(ForumPage)
