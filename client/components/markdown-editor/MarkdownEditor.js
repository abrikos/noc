import Editor from "@opuscapita/react-markdown";
import React, {useState} from "react";
import "./markdown.sass"
import MarkDown from "react-markdown";

export default function MarkdownEditor(props) {
    const [value, setValue] = useState(props.value);
    return <div>
        <textarea name={props.name} value={value} hidden/>
        <div className="row">
            <div className="col-md-6">
                <Editor
                    value={props.value}
                    locale='ru'
                    onChange={setValue}
                />
            </div>
            <div className="col-md-6"><MarkDown source={value}/></div>
        </div>


    </div>

}
