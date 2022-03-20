import React from 'react';
import UserMenu from "./UserMenu";
import SANDMenu from "./SANDMenu";
import {withTranslation} from "react-i18next";

function QMS() {
    return (
        <div>
            <UserMenu/>
            <SANDMenu/>
        </div>
    )
}
export default withTranslation()(QMS)
