import React from "react";
import "./styles/AutoComplete.css"

const AutoComplete = (props) => {
    return (
        <li className="autocomplete__item" onClick={props.itemClickHandler}>{props.name}</li>
    )
}

export default AutoComplete;