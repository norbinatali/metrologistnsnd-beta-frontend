import React from 'react';
import {withTranslation} from 'react-i18next';
import MyDeviceForm from "../Form/MyDeviceForm";

function MyDevice() {
    return (
        <div>
            <main style={{flexGrow: 1, height: '100%', width: "100%", overflow: 'auto'}}>
                <div>
                    <MyDeviceForm/>
                </div>
            </main>
        </div>
    );
}
export default withTranslation()(MyDevice)
