import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ContactUS from "./ContactUS";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
marginLeft: "5%",
        marginRight:"20%"
    },

}));

 function Dashboard ({t}){

     const classes = useStyles();
        return(

            <div className={classes.root}>
<div >
<Typography  align={"justify"}  >
    <p>{t('About Metrologist')}<br/></p>
    <p>{t('Why Metrologist is needed')}<br/></p>
    <p>{t('Metrologist test')} <br/></p>
    <p>{t('Metrologist recommendations')}<br/></p>
</Typography>

</div>
                </div>



        )




}
export default withTranslation()(Dashboard)