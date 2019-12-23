import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ContactUS from "./ContactUS";
import UserMenu from "./UserMenu";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },

}));

 function Dashboard ({t}){

     const classes = useStyles();
        return(
<div>
            <UserMenu/>
                <main style={{ flexGrow: 1, height: '100%', overflow: 'auto'}}>
             <div style={{ marginTop: 40 }}>
                        <div style={{ marginTop: 20, padding:30}}>
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
         </div>
                    </div>
        </main>
 </div>



        )




}
export default withTranslation()(Dashboard)
