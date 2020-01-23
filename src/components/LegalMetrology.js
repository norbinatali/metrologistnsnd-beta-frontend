import React, {useState} from "react";
import {withTranslation} from "react-i18next";
import List from "@material-ui/core/List";
import {Grid, TableBody, TableCell} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
function createData(mi, activities) {
    return { mi, activities };
}
const rows = [
    createData('mi-1','activity-1'),
    createData('mi-2','activity-2'),
    createData('mi-3','activity-3'),
    createData('mi-4','activity-4'),
    createData('mi-5','activity-5'),
    createData('mi-6','activity-6'),
    createData('mi-7','activity-7'),
    createData('mi-8','activity-8'),
    createData('mi-9','activity-9'),
    createData('mi-10','activity-10'),
    createData('mi-11','activity-11'),
    createData('mi-12','activity-12'),
    createData('mi-13','activity-13'),
    createData('mi-14','activity-14'),
    createData('mi-15','activity-15'),
    createData('mi-16','activity-16'),
    createData('mi-17','activity-17'),
    createData('mi-18','activity-18'),
    createData('mi-19','activity-19'),
    createData('mi-20','activity-20'),
    createData('mi-21','activity-21'),
    createData('mi-22','activity-22'),
    createData('mi-23','activity-23'),
    createData('mi-24','activity-24'),
    createData('mi-25','activity-25'),
    createData('mi-26','activity-26'),
    createData('mi-27','activity-27'),
    createData('mi-28','activity-28'),
    createData('mi-29','activity-29'),
    createData('mi-30','activity-30'),
    createData('mi-31','activity-31'),
    createData('mi-32','activity-32'),
    createData('mi-33','activity-33'),
    createData('mi-34','activity-34'),
    createData('mi-35','activity-35'),





];


function LegalMetrology({t}){
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return(

        <List>
            {rows.map(row =>
            <ListItem>
                <ListItemText primary={t(row.mi)} secondary={t(row.activities)}/>
            </ListItem>

                )}


        </List>


    )


}
export default withTranslation() (LegalMetrology)
