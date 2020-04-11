import React, {useEffect, useState} from "react";
import {A} from "hookrouter"

export default function SiteMap(props) {
    const [siteMap, setMap] = useState([])
    useEffect(() => {
        props.api('/site-map').then(setMap)
    }, [])
    return <div>
        <ul>
            {siteMap.map((s, i) => <li key={i}>
                {s.path ? <A href={s.path}>{s.label}</A>:s.label}
                {s.items && <ul>
                    {s.items.map((s2,i2)=><li key={i2}><A href={s2.path}>{s2.label}</A></li>)}
                </ul>}
            </li>)}
        </ul>
    </div>
}
