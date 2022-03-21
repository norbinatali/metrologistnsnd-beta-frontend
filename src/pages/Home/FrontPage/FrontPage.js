import React from "react";

import {Grid, Button, Typography, Box} from "@mui/material";
import {withTranslation} from "react-i18next";
import history from "../../../history";
import PropTypes from "prop-types";
import MenuTabPanel from "../../../components/menu/MenuTabPanel";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;
    return (
        <div>
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const FrontPage = () => {
    return (
        <div>
            <MenuTabPanel/>
            <div>
                <Grid container spacing={12}>
                    <Grid item >
                        <div>
                            <Typography variant={"h2"}>{'Metrology Software'}</Typography>
                            <Typography variant={"h4"}
                            >{'New software for metrologists, manufacturers and people who want to know more about measuring technology'}</Typography>
                            <Typography variant={"body1"}
                            >{'*** This application is corrently in beta release. More information and pages are in development.'}</Typography>
                        </div>
                        <Grid item >
                            <Button
                                onClick={() => history.push('/login')}>{'Start'}</Button>
                            <Button
                                onClick={() => history.push('/signup')}>{'Sign Up'}</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </div>
    );
}

export default withTranslation()(FrontPage)
