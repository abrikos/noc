import React from "react";
import text from "./rules.json"
import MarkDown from "react-markdown";
export default function Rules(props) {
    return <div><hr/><MarkDown source={text.text} escapeHtml={false}/></div>
}
