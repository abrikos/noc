import React, {useEffect, useState} from "react";
import AdminLink from "client/components/AdminLink";

export default function (props) {
    const [list, setList] = useState([])

    useEffect(() => {
        const filter = {where: {published: true}};
        if (props.type === 'presidium') {
            filter.where.isPresidium = true
        } else {
            filter.where.isPresidium = {$ne: true}
        }
        props.api('/document/list', filter)
            .then(r => setList(r.list))
    }, [props.type])
    return <div>
        <h1>Документы {props.type === 'presidium' && 'Президиума'}</h1>
        <ul>
            {list.map(l => <li key={l.id}><a href={l.link} target="_blank" rel="noopener noreferrer">{l.header} - {l.date}</a> <AdminLink model={l} {...props}/> </li>)}
        </ul>
    </div>
}
