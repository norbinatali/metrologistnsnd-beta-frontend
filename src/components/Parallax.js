import React from "react";

import PropTypes from "prop-types";

export default function Parallax() {
    return (
        <div>
            {children}
        </div>
    );
}

Parallax.propTypes = {
    className: PropTypes.string,
    filter: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.string,
    image: PropTypes.string,
    small: PropTypes.bool
};
