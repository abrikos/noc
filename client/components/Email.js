import React from "react";

export default function Email(props) {
    return props.email ? <email><a href={`mailto:${props.email}`}><span>📧</span> {props.email}</a></email> : ''

}
