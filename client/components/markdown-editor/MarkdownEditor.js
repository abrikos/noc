import React, {useEffect, useState} from "react";
import "./markdown.sass"
import MarkDown from "react-markdown";
import PropTypes from "prop-types";
import {Input} from "reactstrap";

MarkdownEditor.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    invalid: PropTypes.bool,
};


export default function MarkdownEditor(props) {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    function handleChange(e) {

        setValue(e.target.value)
        if (props.onChange) props.onChange(e.target.value)
    }

    return <>
        <Input name={props.name} defaultValue={value} invalid={props.invalid} type="textarea" rows={10} onChange={handleChange}/>
        <MarkDown source={value}/>
    </>

}
