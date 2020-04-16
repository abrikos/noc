import React from "react";
import "client/pages/persons/persons-list-small.sass"
import PersonSmall from "client/pages/persons/PersonSmall";

export default function PersonListSmall(props) {
    return <div className="persons-list">
        {props.persons.map(p => <PersonSmall key={p.id} person={p} {...props}/>)}
    </div>
}
