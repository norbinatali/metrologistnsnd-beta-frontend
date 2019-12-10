import PropTypes from 'prop-types';
import React from 'react';

import Nav from './nav';
import i18n from "../translations/i18n";
import LogoV2 from "../style/LogoMakr_6pZrzB.png";
import Toolbar from "@material-ui/core/Toolbar";
import FlagUA from "../style/LogoMakr_1Xl0t4.png";
import FlagUS from "../style/LogoMakr_4V1dPm.png";


const DEFAULT_NAV_WIDTH = 100;
const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

};
const Navs = ({ items, offset, duration, delay, coverWidth, navWidth, linkClass, activeLinkClass }) => {
    navWidth = navWidth ? navWidth : DEFAULT_NAV_WIDTH;
    coverWidth = coverWidth ? coverWidth : items.length * navWidth;
    const coverStyle = {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        WebkitMaskBoxImage: "-webkit-linear-gradient(white 100%)",
        display: "flex",
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)",
    };
    const navsStyle = {
        margin: "0 auto",
        paddingLeft: 0,
        position: "relative",
        height: "100%",
        display: "flex",
        listStyle: "none",

    };

    var navsNode = React.createRef();

    return (
        <div style={coverStyle}>

            <ul style={navsStyle} ref={navsNode}>
                <img src={LogoV2}/>
                {items.map((item, i) => (
                    <Nav
                        key={i}
                        index={i}
                        item={item}
                        offset={offset}
                        duration={duration}
                        delay={delay}

                        width={navWidth}
                        linkClass={linkClass}
                        activeLinkClass={activeLinkClass} />
                ))}
                <button style={{height:"40%", backgroundColor:"rgba(0,1,14,0.74)",border:"none",outline:"none"}} onClick={() => changeLanguage('ua')}><img src={FlagUA}/></button>
                <button style={{height:"40%",backgroundColor:"rgba(0,1,14,0.86)", border:"none",outline:"none"}} onClick={() => changeLanguage('en')}><img src={FlagUS}/></button>
            </ul>

        </div>
    );
};

Navs.propTypes = {
    items: PropTypes.array.isRequired,
    offset: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    coverWidth: PropTypes.number,
    navWidth: PropTypes.number
};

export default Navs;
