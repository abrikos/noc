import React from "react";

export default function Email(props) {
    return props.email ? <span className="email"><a href={`mailto:${props.email}`}><span role="img" aria-label="email">📧</span> {props.email}</a></span> : ''

}
