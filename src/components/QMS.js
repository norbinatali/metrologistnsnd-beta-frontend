import React from 'react';
import {Grid, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Toolbar} from "@material-ui/core";
import UserMenu from "./UserMenu";
import SANDMenu from "./SANDMenu";
import {withTranslation} from "react-i18next";


function QMS({t}){


return(
 <div>
            <UserMenu/>
            <SANDMenu/>


        </div>

)

}

export default withTranslation() (QMS)
