import React from "react";

export default function HtmlView(props) {
    return <span dangerouslySetInnerHTML={{__html: (props.text && props.text.replace('\n', '<br/>'))}}></span>
}
