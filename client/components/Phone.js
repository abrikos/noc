import React from "react";

export default function Phone(props) {
    return <a href={`tel:${props.phone}`}><span>📞</span> {props.phone}</a>

}
