import React from "react";

import {Grid, Button, Typography} from "@mui/material";
import {withTranslation} from "react-i18next";
import MenuTabPanel from "../../../components/menu/MenuTabPanel";

const HomeDashboard = () => {
    return (
        <div>
            <MenuTabPanel/>
                <Grid container spacing={12}>
                    <Grid item>
                        <Typography variant={"h2"}>{'Metrology Software'}</Typography>
                        <Typography variant={"h4"}
                        >{'New software for metrologists, manufacturers and people who want to know more about measuring technology'}</Typography>
                        <Typography variant={"body1"}
                        >{'*** This application is corrently in beta release. More information and pages are in development.'}</Typography>
                        <Grid item>
                            <Button href={'/login'}>{'Start'}</Button>
                            <Button href={'/signup'}>{'Sign Up'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
    );
}

export default withTranslation()(HomeDashboard)
