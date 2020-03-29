import React from "react";

export default function Phone(props) {
    return props.phone ? <phone><a href={`tel:${props.phone}`}><span>📞</span> {props.phone}</a></phone> : ''

}
