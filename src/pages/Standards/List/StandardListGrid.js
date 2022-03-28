import React from 'react';
import {Typography} from '@mui/material';
import {withTranslation} from 'react-i18next';
import StandardButtons from "../Grid/StandardsButtons";
import PropTypes from "prop-types";

function StandardListGrid({t}) {
    return (
        <div>
            <main style={{flexGrow: 1, height: '100%', overflow: 'auto'}}>
                <div>
                    <div style={{marginTop: "10%"}}>
                        <Typography variant="h5" component="h2">{t('Standards and Devices')}</Typography>
                    </div>
                    <div>
                        <StandardButtons/>
                    </div>

                </div>
            </main>
        </div>
    );

}

StandardListGrid.propTypes = {
    t: PropTypes.node
};
export default withTranslation()(StandardListGrid)
