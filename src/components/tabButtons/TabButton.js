import React, {useState} from "react";
import {Button, ButtonGroup} from "@mui/material";
import PropTypes from "prop-types";

export const TabButton = (props) => {
    const {arr} = props;
    const [state, setState] = useState({id: '', value: false});
    const currentTab = localStorage.getItem('tabButton') ? localStorage.getItem('tabButton') : '';
    const onTabClick = (item) => {
        setState({id: item.id, value: true});
        localStorage.setItem('tabButton', item.id)
    };
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            {arr.length && arr.map(el =>
                <Button key={el.id} href={el.link}
                        style={el.id === currentTab ? {'color': '#FFFFFF'} : {}}
                        onClick={() => onTabClick(el)}>{el.title} </Button>
            )}
        </ButtonGroup>
    )
}
TabButton.propTypes = {
    arr: PropTypes.array
}
