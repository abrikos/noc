import React, {useEffect, useState} from "react";
import {A} from "hookrouter"
import ConferenceMenu from "client/pages/conference/ConferenceMenu";

export default function (props) {
    const [members,setMembers] = useState([])

    useEffect(()=>{
        props.api('/conference/list',{order: {createdAt:-1, lname:-1}})
            .then(res=>setMembers(res.list))
    },[])

    return <div>
        <ConferenceMenu/>
                {members.map(m=><div key={m.id}>
                    <A href={m.link}>{m.fio}</A>
                </div>)}
    </div>
}
