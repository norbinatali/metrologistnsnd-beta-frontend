import React from "react";
import {withTranslation} from "react-i18next";
import {
    AppBar,
    Toolbar,
    Button,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Typography,
    Tooltip,
    Hidden
} from "@mui/material";
import {Query} from 'react-apollo';
import CircularProgressLoading from "../../components/circularProgressLoading/CircularProgressLoading";
import {useSnackbar} from 'notistack';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PropTypes from "prop-types";
import {POSTS_QUERY} from '../../graphql/query/Query';

function ForumPage({t}) {
    const {enqueueSnackbar} = useSnackbar();
    return (
        <div>
            <main style={{flexGrow: 1, height: '100%', width: "100%", overflow: 'auto'}}>
                <Query query={POSTS_QUERY} fetchPolicy={"network-only"} pollInterval={50}
                       onError={(error) => enqueueSnackbar(error.message)}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <CircularProgressLoading/>
                        }
                        if (error) {
                            return error.message
                        }
                        const postslist = data.feed;
                        return (
                            <Grid container xs={12}>
                                <AppBar position={"relative"} color="default" elevation={5}>
                                    <Toolbar>
                                        <Typography
                                            style={{marginRight: "auto", marginLeft: "auto"}}>{t('Forum')}</Typography>
                                        <Hidden smDown implementation="css">
                                            <div style={{marginLeft: "auto"}}>
                                                <Button variant={"outlined"}><Typography
                                                    variant={"body2"}>{t('Create topic')}</Typography></Button>
                                                <Button variant={"outlined"}><Typography
                                                    variant={"body2"}>{t('My posts')}</Typography></Button>
                                            </div>
                                        </Hidden>
                                        <Hidden mdUp>
                                            <div>
                                                <Tooltip title={t('Create topic')} aria-label="create topic">
                                                    <IconButton>
                                                        <AddCircleOutlineOutlinedIcon/>
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
                                <Grid container xs={12}>
                                    <Grid item style={{marginRight: "auto", marginLeft: "auto"}}>
                                        <TableContainer component={Paper}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Topic</TableCell>
                                                        <TableCell align="right">Posts</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {postslist.map(posts => (
                                                    <TableBody key={posts.id}>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row"
                                                                       button>{posts.title}</TableCell>
                                                        </TableRow>
                                                    </TableBody>))}
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }}
                </Query>
            </main>
        </div>
    )
}
ForumPage.propTypes = {
    t: PropTypes.node.isRequired
};
export default withTranslation()(ForumPage)
