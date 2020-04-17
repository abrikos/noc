import React, {useEffect, useState} from "react";
import "client/pages/persons/person.sass";
import Loader from "client/components/Loader";
import PersonLarge from "client/pages/persons/PersonLarge";


export default function (props) {
    const [persons, setPersons] = useState();
    const [pages, setPages] = useState({});

    useEffect(() => {
        props.api('/person/members').then(ps=>{
            const pgs={supervisors: {label: 'Руководство АН РС(Я)', filter: {where: {supervisorOrder: {$gt: 0}}, order: {supervisorOrder: 1}}}}
            for(let i =0; i <ps.length;i++){
                pgs[i] = ps[i];
            }
            setPages(pgs)
            const filter = pgs[props.member].filter || {where:{member:props.member}, order:{fname:1}};
            console.log(pgs)
            props.api('/person/list', filter)
                .then(r=>setPersons(r.list))
        })

    }, [props.member]);

    if(!persons) return <Loader/>
    return <div className="phone-book">
        <h1>{pages[props.member].label}</h1>
        <div className="d-flex flex-wrap">
            {persons.map(p => <PersonLarge key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
