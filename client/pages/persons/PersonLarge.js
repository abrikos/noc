import MarkDown from "react-markdown";
import React from "react";
import {A} from "hookrouter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

export default function (props) {
    const p = props.person;
    return <div className="supervisor-person">
        <div className="supervisor-image">
            <img src={p.photo} alt={p.fio}/>
        </div>

        <div className="supervisor-text">
            <h4>{p.fio}</h4>
            <div className="status">{p.supervisorStatus}</div>
            <div className="status">{p.memberStatus}</div>
            <MarkDown source={p.description}/>
            {props.authenticatedUser.admin && <A href={p.adminLink}><FontAwesomeIcon icon={faEdit}/></A>}
        </div>
    </div>
}
