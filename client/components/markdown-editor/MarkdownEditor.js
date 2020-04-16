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

    function handleChange(text) {
        setValue(text)
        if (props.onChange) props.onChange(text)
    }

    return <>


        <div className="row">
            <div className="col-md-6">
                <Input name={props.name} defaultValue={value} invalid={props.invalid} type="textarea" style={{height: '100%'}}/>
                {/*<Editor
                    value={props.value}
                    locale='ru'
                    onChange={handleChange}
                />*/}
            </div>
            <div className="col-md-6"><MarkDown source={value}/></div>
        </div>


    </>

}
