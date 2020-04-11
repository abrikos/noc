import React, {useEffect, useRef, useState} from "react";
import JoditEditor from "jodit-react";

import PropTypes from "prop-types";
import {Button} from "reactstrap";
HtmlEditor.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.object,
};

export default function HtmlEditor(props) {
    const [value, setValue] = useState(props.value);
    const [hidePlain, setHidePlain] = useState(true);
    const options = {...props.options}

    function handleChange(text) {
        console.log(text)
        setValue(text)
        //if(props.onChange) props.onChange(text)
    }


    return <div>

        <textarea name={props.name} value={value} readOnly hidden={hidePlain} style={{width:'100%', height:options.height}}/>
        {hidePlain && <JoditEditor
            //ref={editor}
            value={value}
            config={options}
            tabIndex={1} // tabIndex of textarea
            onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
            onChange={props.onChange}
        />}
        {/*{hidePlain || <Button onClick={()=>setHidePlain(true)}>показать Редактор</Button>}
        {hidePlain && <Button onClick={()=>setHidePlain(false)}>показать чистый HTML</Button>}*/}
    </div>
}
