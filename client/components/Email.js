import React from "react";

export default function Email(props) {
    return props.email ? <span className="email"><a href={`mailto:${props.email}`}><span>📧</span> {props.email}</a></span> : ''

}
