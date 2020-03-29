import React from "react";

export default function Email(props) {
    return <a href={`mailto:${props.email}`}><span>📧</span> {props.email}</a>

}
