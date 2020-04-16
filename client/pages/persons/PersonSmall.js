import noPhoto from "client/images/nouser.png";
import Phone from "client/components/Phone";
import Email from "client/components/Email";
import {A} from "hookrouter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function (props) {
    const p = props.person;
    return <div className="person-card">
        <strong>{p.fio}</strong>
        <div className="row">
            <div className="col-4">
                <img src={p.image ? p.image.path : noPhoto} alt={p.fio} className={p.image ? '' : 'no-photo'}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-center">
                <div>
                    {p.division && <span className="division">{p.division.name}</span>}
                    <span className="rank">{p.rank}</span>
                    {/*<i className="status">{p.status}</i>*/}
                </div>
            </div>
        </div>
        <Phone phone={p.phone}/>
        <Email email={p.email}/>
        {props.authenticatedUser.admin && <A href={p.adminLink}><FontAwesomeIcon icon={faEdit}/></A>}
    </div>
}
