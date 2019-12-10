import PropTypes from 'prop-types';
import React from 'react';

import Nav from './nav';


const DEFAULT_NAV_WIDTH = 100;

const Navs = ({ items, offset, duration, delay, coverWidth, navWidth, linkClass, activeLinkClass }) => {
    navWidth = navWidth ? navWidth : DEFAULT_NAV_WIDTH;
    coverWidth = coverWidth ? coverWidth : items.length * navWidth;
    const coverStyle = {
        width: 1300,
        height: "100%",
        overflow: "hidden",
        WebkitMaskBoxImage: "-webkit-linear-gradient(white 100%)",
        display: "flex",
        backgroundImage:"linear-gradient(to right,#000222, rgba(23, 20, 61, 0.96),  #252529)",
    };
    const navsStyle = {
        margin: 0,
        left: coverWidth /2  - 50,
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
}

export default Navs;