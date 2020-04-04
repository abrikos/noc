import Phone from "client/components/Phone";
import Email from "client/components/Email";
import React from "react";
import "client/pages/persons/persons-list-small.sass"
import noPhoto from "client/images/nouser.png"

export default function PersonListSmall(props) {
    return <div className="persons-list">
        {props.persons.map(p => <span className="person-card">
            <strong>{p.fio}</strong>
            <div className="row">
                <div className="col-4">
                    <img src={p.image ? p.image.path : noPhoto} alt={p.fio} className={p.image ? '' : 'no-photo'}/>
                </div>
                <div className="col-8 d-flex flex-column justify-content-center">
                    <div>
                        {p.division && <span className="division">{p.division.name}</span>}
                        <span className="rank">{p.rank}</span>
                        <span className="status">{p.status}</span>
                    </div>
                </div>
            </div>
            <Phone phone={p.phone}/>
            <Email email={p.email}/>
        </span>)}
    </div>
}
