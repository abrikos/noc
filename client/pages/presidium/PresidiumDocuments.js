import React, {useEffect, useState} from "react";

export default function (props) {
    const [list,setList] = useState([])

    useEffect(()=>{
        props.api('/presidium/list')
            .then(r=>setList(r.list))
    },[])
    return <div>
        <h1>Документы Президиума</h1>
        <ul>
            {list.map(l=><li key={l.id}><a href={l.link} target="_blank" rel="noopener noreferrer">{l.header} - {l.date}</a></li>)}
        </ul>
    </div>
}
