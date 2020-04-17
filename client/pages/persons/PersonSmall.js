import noPhoto from "client/images/nouser.png";
import Phone from "client/components/Phone";
import Email from "client/components/Email";
import React from "react";
import AdminLink from "client/components/AdminLink";

export default function (props) {
    const p = props.person;
    return <div className="person-small">
        <strong>{p.fio}</strong>
        <div className="row">
            <div className="col-4">
                <img src={p.image ? p.image.path : noPhoto} alt={p.fio} className={p.image ? '' : 'no-photo'}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-center">
                <div>
                    {p.division && <span className="division">{p.division.name}</span>}
                    <span className="rank">{p.rank}</span>
                    <i className="status">{props.status}</i>
                </div>
            </div>
        </div>
        <Phone phone={p.phone}/>
        <Email email={p.email}/>
        <AdminLink model={p} {...props}/>
    </div>
}
