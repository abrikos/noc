import Editor from "@opuscapita/react-markdown";
import React from "react";
import "./markdown.sass"

export default function MarkdownEditor(props) {
    return <Editor
        value={props.value}
        locale='ru'
        onChange={props.onChange}
        autoCorrect={''}
    />

}
